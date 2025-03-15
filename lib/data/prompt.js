import { supabase } from "@/utils/supabase/client"

export async function createPrompt({ name, instructions, fileIds, teamId }) {
  const { data, error } = await supabase
    .from('Prompt')
    .upsert({ 
      name: name, 
      instructions: instructions, 
      file_ids: fileIds, 
      team_id: teamId })
    .select()
    .single()
  return data
}

export async function savePrompt(promptId, { name, instructions, fileIds, teamId }) {
  const { error } = await supabase
    .from('Prompt')
    .update({ 
      name: name, 
      instructions: instructions, 
      file_ids: fileIds, 
      team_id: teamId })
    .eq('id', promptId)
}

export async function getAllPromptsByTeam(teamId) {
  const { data, error } = await supabase
    .from('Prompt')
    .select('*')
    .eq('team_id', teamId)
    .order('id', { ascending: false })

  return data
}

export async function getPromptById(promptId) {
  const { data, error } = await supabase
    .from('Prompt')
    .select('*')
    .eq('id', promptId)
    .single()

  return data
}