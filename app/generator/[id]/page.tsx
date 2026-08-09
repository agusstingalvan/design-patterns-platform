import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { GeneratorClient } from "./generator-client";

export default async function GeneratorPatternPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();

  // Check if user is authenticated
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/");
  }

  // Get the project with its patterns
  const { data: project, error: projectError } = await supabase
    .from("projects")
    .select(
      `
      id,
      name,
      shared,
      patterns(
        id,
        pattern,
        category_id,
        categories(name)
      )
    `
    )
    .eq("id", params.id)
    .single();

  if (projectError || !project) {
    redirect("/collections");
  }

  // Verify user has access to this project
  const { data: profile } = await supabase
    .from("profiles")
    .select("team_id")
    .eq("user_id", user.id)
    .single();

  // Check if project is accessible (user's project or team's shared project)
  let projectAccessQuery = supabase
    .from("projects")
    .select("id")
    .eq("id", params.id);

  if (profile?.team_id) {
    projectAccessQuery = projectAccessQuery.or(
      `user_id.eq.${user.id},and(team_id.eq.${profile.team_id},shared.eq.true)`
    );
  } else {
    projectAccessQuery = projectAccessQuery.eq("user_id", user.id);
  }

  const { data: projectAccess } = await projectAccessQuery.single();

  if (!projectAccess) {
    redirect("/collections");
  }

  return <GeneratorClient project={project} />;
}
