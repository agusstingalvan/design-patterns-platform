"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createTeam(teamName: string) {
  try {
    const supabase = await createClient();

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return { error: "Debes iniciar sesión para crear un equipo" };
    }

    // Check if user already has a team
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("team_id")
      .eq("user_id", user.id)
      .single();

    if (profileError && profileError.code !== "PGRST116") {
      return { error: "Error al verificar el perfil del usuario" };
    }

    if (profile?.team_id) {
      return { error: "Ya perteneces a un equipo" };
    }

    // Create team
    const { data: team, error: teamError } = await supabase
      .from("teams")
      .insert({ name: teamName })
      .select()
      .single();

    if (teamError) {
      console.error("Team error:", teamError);
      return { error: "Error al crear el equipo" };
    }

    // Update user's profile with team_id
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ team_id: team.id })
      .eq("user_id", user.id);

    if (updateError) {
      // Try to delete the team if profile update failed
      await supabase.from("teams").delete().eq("id", team.id);
      return { error: "Error al actualizar el perfil con el equipo" };
    }

    revalidatePath("/collections");
    return { success: true, team };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: "Error inesperado al crear el equipo" };
  }
}

export async function inviteCollaborator(email: string) {
  try {
    const supabase = await createClient();

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return { error: "Debes iniciar sesión para invitar colaboradores" };
    }

    // Get current user's team
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("team_id")
      .eq("user_id", user.id)
      .single();

    if (profileError || !profile?.team_id) {
      return { error: "No perteneces a un equipo" };
    }

    // Find the collaborator by email
    const { data: collaboratorUser, error: collaboratorUserError } =
      await supabase.rpc("get_user_by_email", { email_param: email });

    if (collaboratorUserError || !collaboratorUser) {
      return {
        error:
          "No se encontró un usuario con ese email. El usuario debe estar registrado.",
      };
    }

    // Check if collaborator already has a team
    const { data: collaboratorProfile, error: collaboratorProfileError } =
      await supabase
        .from("profiles")
        .select("team_id")
        .eq("user_id", collaboratorUser.id)
        .single();

    if (
      collaboratorProfileError &&
      collaboratorProfileError.code !== "PGRST116"
    ) {
      return { error: "Error al verificar el perfil del colaborador" };
    }

    if (collaboratorProfile?.team_id) {
      return { error: "Este usuario ya pertenece a un equipo" };
    }

    // Add collaborator to team
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ team_id: profile.team_id })
      .eq("user_id", collaboratorUser.id);

    if (updateError) {
      console.error("Update error:", updateError);
      return { error: "Error al agregar el colaborador al equipo" };
    }

    revalidatePath("/collections");
    return { success: true };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: "Error inesperado al invitar al colaborador" };
  }
}

export async function leaveTeam() {
  try {
    const supabase = await createClient();

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return { error: "Debes iniciar sesión" };
    }

    // Update user's profile to remove team_id
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ team_id: null })
      .eq("user_id", user.id);

    if (updateError) {
      console.error("Update error:", updateError);
      return { error: "Error al abandonar el equipo" };
    }

    revalidatePath("/collections");
    return { success: true };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: "Error inesperado al abandonar el equipo" };
  }
}

export async function getUserTeam() {
  try {
    const supabase = await createClient();

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return { error: "Debes iniciar sesión" };
    }

    // Get user's profile with team info
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("team_id, teams(id, name)")
      .eq("user_id", user.id)
      .single();

    if (profileError && profileError.code !== "PGRST116") {
      return { error: "Error al obtener información del equipo" };
    }

    return { success: true, team: profile?.teams || null };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: "Error inesperado al obtener el equipo" };
  }
}
