"use server";

import { createClient } from "@/lib/supabase/server";

interface Repository {
  id: number;
  name: string;
  full_name: string;
  default_branch: string;
  private: boolean;
  permissions?: {
    admin: boolean;
    push: boolean;
    pull: boolean;
  };
}

interface CreatePRParams {
  repository: string;
  branchName: string;
  prTitle: string;
  prDescription: string;
  files: Array<{
    path: string;
    content: string;
  }>;
}

/**
 * Get user's GitHub repositories where they have write access
 */
export async function getUserRepositories(): Promise<Repository[]> {
  const supabase = await createClient();

  // Get the authenticated user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error("User authentication error:", userError);
    throw new Error("Usuario no autenticado");
  }

  // Get the GitHub access token from the session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log("Session exists:", !!session);
  console.log("Provider token exists:", !!session?.provider_token);
  console.log("Provider:", session?.user?.app_metadata?.provider);

  // Try to get the token from different sources
  let token = session?.provider_token;

  if (!token) {
    // Try to get from provider_refresh_token and refresh the session
    console.log("No provider_token found, checking for refresh...");

    const {
      data: { session: refreshedSession },
      error: refreshError,
    } = await supabase.auth.refreshSession();

    if (!refreshError && refreshedSession?.provider_token) {
      console.log("Token refreshed successfully");
      token = refreshedSession.provider_token;
    }
  }

  if (!token) {
    throw new Error(
      "No se encontró el token de GitHub. Por favor, cierra sesión y vuelve a iniciar sesión con GitHub para autorizar los permisos necesarios (repo, read:user, user:email)."
    );
  }

  try {
    // Fetch repositories from GitHub API
    // affiliation=owner,collaborator ensures we get repos where we have access
    // type=all ensures we get both public and private repos
    const url =
      "https://api.github.com/user/repos" +
      "?per_page=100&sort=updated" +
      "&affiliation=owner,collaborator,organization_member" +
      "&visibility=all"; // opcional

    console.log("Fetching repositories from GitHub...");
    console.log("URL:", url);

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    console.log("Response status:", response.status);
    console.log("Response statusText:", response.statusText);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("GitHub API Error:", errorData);
      console.error("Response status:", response.status);

      // Mensajes de error específicos según el código de respuesta
      if (response.status === 401) {
        throw new Error(
          "Token de GitHub inválido o expirado. Por favor, cierra sesión y vuelve a iniciar sesión con GitHub."
        );
      }

      if (response.status === 403) {
        throw new Error(
          "Permisos insuficientes. Por favor, cierra sesión y vuelve a iniciar sesión con GitHub para autorizar los permisos necesarios."
        );
      }

      throw new Error(
        `Error al obtener repositorios de GitHub (${response.status}): ${
          errorData.message || response.statusText
        }`
      );
    }

    const repos: Repository[] = await response.json();
    console.log(`Found ${repos.length} repositories`);

    // Filter repositories where user has push access (both public and private)
    const filteredRepos = repos.filter(
      (repo) => repo.permissions?.push || repo.permissions?.admin
    );

    console.log(
      `Filtered to ${filteredRepos.length} repositories with write access`
    );

    return filteredRepos;
  } catch (error) {
    console.error("Error fetching GitHub repositories:", error);
    // Re-throw the error with the specific message
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Error al obtener repositorios de GitHub");
  }
}

/**
 * Create a Pull Request with the generated files
 */
export async function createPullRequest(
  params: CreatePRParams
): Promise<{ success: boolean; prUrl?: string; error?: string }> {
  const supabase = await createClient();

  // Get the authenticated user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { success: false, error: "Usuario no autenticado" };
  }

  // Get the GitHub access token from the session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.provider_token) {
    return {
      success: false,
      error:
        "No se encontró el token de GitHub. Por favor, vuelve a iniciar sesión.",
    };
  }

  const [owner, repo] = params.repository.split("/");
  const token = session.provider_token;

  try {
    // 1. Get the default branch reference
    const defaultBranchResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (!defaultBranchResponse.ok) {
      throw new Error("Error al obtener información del repositorio");
    }

    const repoData = await defaultBranchResponse.json();
    const defaultBranch = repoData.default_branch;

    // 2. Get the SHA of the default branch
    const refResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/git/ref/heads/${defaultBranch}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (!refResponse.ok) {
      throw new Error("Error al obtener la referencia de la rama principal");
    }

    const refData = await refResponse.json();
    const baseSHA = refData.object.sha;

    // 3. Create a new branch
    const createBranchResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/git/refs`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ref: `refs/heads/${params.branchName}`,
          sha: baseSHA,
        }),
      }
    );

    if (!createBranchResponse.ok) {
      const errorData = await createBranchResponse.json();
      throw new Error(errorData.message || "Error al crear la rama en GitHub");
    }

    // 4. Create blobs for each file
    const blobs = await Promise.all(
      params.files.map(async (file) => {
        const blobResponse = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/git/blobs`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/vnd.github.v3+json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              content: file.content,
              encoding: "utf-8",
            }),
          }
        );

        if (!blobResponse.ok) {
          throw new Error(`Error al crear blob para ${file.path}`);
        }

        const blobData = await blobResponse.json();
        return {
          path: file.path,
          mode: "100644",
          type: "blob",
          sha: blobData.sha,
        };
      })
    );

    // 5. Get the base tree
    const baseTreeResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/git/trees/${baseSHA}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (!baseTreeResponse.ok) {
      throw new Error("Error al obtener el árbol base");
    }

    const baseTreeData = await baseTreeResponse.json();

    // 6. Create a new tree with the files
    const createTreeResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/git/trees`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          base_tree: baseTreeData.sha,
          tree: blobs,
        }),
      }
    );

    if (!createTreeResponse.ok) {
      throw new Error("Error al crear el árbol de archivos");
    }

    const treeData = await createTreeResponse.json();

    // 7. Create a commit
    const createCommitResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/git/commits`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: params.prTitle,
          tree: treeData.sha,
          parents: [baseSHA],
        }),
      }
    );

    if (!createCommitResponse.ok) {
      throw new Error("Error al crear el commit");
    }

    const commitData = await createCommitResponse.json();

    // 8. Update the branch reference to point to the new commit
    const updateRefResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/git/refs/heads/${params.branchName}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sha: commitData.sha,
          force: false,
        }),
      }
    );

    if (!updateRefResponse.ok) {
      throw new Error("Error al actualizar la referencia de la rama");
    }

    // 9. Create the Pull Request
    const createPRResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/pulls`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: params.prTitle,
          body: params.prDescription,
          head: params.branchName,
          base: defaultBranch,
        }),
      }
    );

    if (!createPRResponse.ok) {
      const errorData = await createPRResponse.json();
      throw new Error(errorData.message || "Error al crear el Pull Request");
    }

    const prData = await createPRResponse.json();

    return {
      success: true,
      prUrl: prData.html_url,
    };
  } catch (error) {
    console.error("Error creating pull request:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido",
    };
  }
}
