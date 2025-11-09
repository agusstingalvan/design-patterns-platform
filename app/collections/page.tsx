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

  // Get projects (user's private projects + team's shared projects)
  const { data: projects } = await supabase
    .from("projects")
    .select(
      `
      id,
      name,
      shared,
      created_at,
      patterns(id, category_id, pattern, categories(name))
    `
    )
    .or(
      `and(team_id.is.null,shared.eq.false),and(team_id.eq.${profile?.team_id},shared.eq.true)`
    )
    .order("created_at", { ascending: false });

  return (
    <CollectionsClient
      initialProjects={projects || []}
      hasTeam={!!profile?.team_id}
      teamName={team?.name || null}
    />
  );
}
