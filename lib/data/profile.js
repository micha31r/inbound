import { supabase } from "@/utils/supabase/client"

export async function getEmployee() {
  const { data: { user } } = await supabase.auth.getUser()
  const { data, error } = await supabase
    .from('Employee')
    .select('*')
    .eq('user_id', user.id)
    .single()
  return data
}

export async function getManager() {
  const { data: { user } } = await supabase.auth.getUser()
  const { data, error } = await supabase
    .from('Manager')
    .select('*')
    .eq('user_id', user.id)
    .single()
  return data
}