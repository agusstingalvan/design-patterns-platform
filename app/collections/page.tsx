import { CollectionsClient } from "./collections-client";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function CollectionsPage() {
  const supabase = await createClient();

  // Check if user is authenticated
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/");
  }

  // Get user's profile with team info
  const { data: profile } = await supabase
    .from("profiles")
    .select("team_id, teams(id, name)")
    .eq("user_id", user.id)
    .single();

  const team = Array.isArray(profile?.teams)
    ? profile.teams[0]
    : profile?.teams;

  // Get the user's projects, plus shared projects from their current team.
  let projectsQuery = supabase
    .from("projects")
    .select(
      `
      id,
      name,
      shared,
      created_at,
      patterns(id, category_id, pattern, categories(name))
    `
    );

  if (profile?.team_id) {
    projectsQuery = projectsQuery.or(
      `user_id.eq.${user.id},and(team_id.eq.${profile.team_id},shared.eq.true)`
    );
  } else {
    projectsQuery = projectsQuery.eq("user_id", user.id);
  }

  const { data: projects, error: projectsError } = await projectsQuery.order(
    "created_at",
    { ascending: false }
  );

  if (projectsError) {
    console.error("Projects error:", projectsError);
  }

  return (
    <CollectionsClient
      initialProjects={projects || []}
      hasTeam={!!profile?.team_id}
      teamName={team?.name || null}
    />
  );
}
