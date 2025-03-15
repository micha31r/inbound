// getting team
import { supabase } from "@/utils/supabase/client";

export async function getTeamById(teamId) {
  const { data, error } = await supabase
    .from("Team")
    .select("*")
    .eq("id", teamId)
    .single();

  return data;
}

export async function getAllTeamsByUser(userID) {
  const { data, error } = await supabase
    .from("Employee")
    .select("team_id, Team (name)")
    .eq("user_id", userID);

  return data;
}
