// onboarding guide
// import { extractTextFromPDF } from "@/lib/utils";
import { supabase } from "@/utils/supabase/client";

export async function generateFlow({ name, teamId, is_published }) {
  // Extract text from files:
  // const fileTextContents = files.map(file => extractTextFromPDF(file))
  // generate filler content
  // const fileTextContents = "filler content balls in your mouth mouth mouth";

  const { data, error } = await supabase
    .from("Flow")
    .insert([{
      name: name,
      team_id: teamId,
      is_published: is_published,
    }]);
  if (error) {
    console.error("Error saving flow:", error);
  }
}

export async function saveBlock(
  { title, summary, duration, files, flowId },
) {
  // check if the flow already exists
  const { _data, count } = supabase
    .from("Flow")
    .select("*", { count: "exact" })
    .eq("flow_id", flowId);

  if (count == 0) {
    console.error("Flow does not exist");
    return;
  }

  //files is uuid
  const { data, error } = await supabase
    .from("Block")
    .insert({
      title: title,
      summary: summary,
      duration: duration,
      flow_id: flowId,
      files: files,
    });

  if (error) {
    console.error("Error saving flow:", error);
  }

  return data;
}

export async function updateBlockOrder(blockId, newOrder) {
  const { error } = await supabase
    .from("Block")
    .update({ order: newOrder })
    .eq("id", blockId);

  if (error) {
    console.error("Error updating block order:", error);
  }
}

export async function getFlowById(flowId) {
  const { data, _error } = await supabase
    .from("Flow")
    .select(`
      *, 
      Block ( * )
    `)
    .eq("id", flowId)
    .single();

  return data;
}

export async function getAllFlowsByUser() {
  const { data, _error } = await supabase
    .from("Flow")
    .select("*");

  return data;
}

export async function getMostRecentFlow() {
  const { data, _error } = await supabase
    .from("Flow")
    .select("*")
    .order("id", { ascending: false })
    .limit(1);

  return data;
}

export async function getMostRecentPublishedFlowByTeam(teamId) {
  const { data, _error } = await supabase
    .from("Flow")
    .select("*")
    .eq("team_id", teamId);

  return data;
}
