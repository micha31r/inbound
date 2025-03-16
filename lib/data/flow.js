// onboarding guide
// import { extractTextFromPDF } from "@/lib/utils";
import { supabase } from "@/utils/supabase/client";

export async function createFlow({ name, teamId, isPublished }) {
  // Extract text from files:
  // const fileTextContents = files.map(file => extractTextFromPDF(file))
  // generate filler content
  // const fileTextContents = "filler content balls in your mouth mouth mouth";

  await supabase
    .from("Flow")
    .insert([{
      name: name,
      team_id: teamId,
      is_published: isPublished,
    }])

  const { data } = await supabase
    .from("Flow")
    .select()
    .order("id", { ascending: false })
    .limit(1)

  if (data.length > 0) {
    return data[0]
  } else {
    return null
  }
}

export async function saveBlock(
  { title, summary, content, duration, filePaths, flowId, order },
) {
  // check if the flow already exists
  const { count } = supabase
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
      content: content,
      duration: duration,
      flow_id: flowId,
      file_paths: filePaths,
      order: order
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

export async function updateBlockContent(blockId, { title, content, duration }) {
  const { error } = await supabase
    .from("Block")
    .update({ 
      title: title,
      content: content,
      duration: duration
    })
    .eq("id", blockId);

  if (error) {
    console.error("Error updating block content:", error);
  }
}

export async function getFlowById(flowId) {
  const { data, error } = await supabase
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
  const { data } = await supabase
    .from("Flow")
    .select("*");

  return data;
}

export async function getMostRecentFlow() {
  const { data } = await supabase
    .from("Flow")
    .select("*")
    .order("id", { ascending: false })
    .limit(1);

  return data;
}

export async function getMostRecentPublishedFlowByTeam(teamId) {
  const { data } = await supabase
    .from("Flow")
    .select("*")
    .eq("team_id", teamId);

  return data;
}

export async function updateFlowPublishStatus(flowId, isPublished) {
  const { error } = await supabase
    .from("Flow")
    .update({
      is_published: isPublished
    })
    .eq("id", flowId)
}