"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

interface SavePatternParams {
  projectName: string;
  isShared: boolean;
  pattern: string;
  className: string;
  generatedFiles: { [key: string]: string };
}

export async function savePattern({
  projectName,
  isShared,
  pattern,
  className,
  generatedFiles,
}: SavePatternParams) {
  try {
    const supabase = await createClient();

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return { error: "Debes iniciar sesión para guardar patrones" };
    }

    // Get user's profile to check for team_id
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("team_id")
      .eq("user_id", user.id)
      .single();

    if (profileError && profileError.code !== "PGRST116") {
      console.error("Profile error:", profileError);
      return { error: "Error al obtener el perfil del usuario" };
    }

    // Get category_id based on pattern name
    const { data: category, error: categoryError } = await supabase
      .from("categories")
      .select("id")
      .eq("name", pattern)
      .single();

    if (categoryError) {
      console.error("Category error:", categoryError);
      return { error: `Categoría "${pattern}" no encontrada` };
    }

    // Create project first
    const { data: project, error: projectError } = await supabase
      .from("projects")
      .insert({
        name: projectName,
        shared: isShared,
        team_id: isShared && profile?.team_id ? profile.team_id : null,
      })
      .select()
      .single();

    if (projectError) {
      console.error("Project error:", projectError);
      return { error: "Error al crear el proyecto" };
    }

    // Prepare pattern data (JSONB)
    const patternData = {
      className,
      files: generatedFiles,
      generatedAt: new Date().toISOString(),
    };

    // Insert pattern
    const { error: patternError } = await supabase.from("patterns").insert({
      user_id: user.id,
      team_id: isShared && profile?.team_id ? profile.team_id : null,
      category_id: category.id,
      project_id: project.id,
      pattern: patternData,
    });

    if (patternError) {
      console.error("Pattern error:", patternError);
      // Try to delete the project if pattern creation failed
      await supabase.from("projects").delete().eq("id", project.id);
      return { error: "Error al guardar el patrón" };
    }

    revalidatePath("/generator");
    return { success: true };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: "Error inesperado al guardar el patrón" };
  }
}
