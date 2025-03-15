import { supabase } from "@/utils/supabase/client"
import { generateRandomString } from "../utils"

export async function getAllFilesByTeam(teamId) {
  const { data, error } = await supabase
    .storage
    .from('files')
    .list(teamId.toString(), {
      limit: 100,
      offset: 0,
      sortBy: { column: 'created_at', order: 'asc' },
    })

  if (error) {
    console.error(error)
  }
  
  return data
}

export async function uploadFile(teamId, file) {
  const name = file.name.split(".").slice(0, -1).join()
  const extension = file.name.split(".").at(-1)

  const { error } = await supabase
    .storage
    .from('files')
    .upload(teamId + '/' + name + '-' + generateRandomString(6) + '.' + extension, file, {
      cacheControl: '3600',
      upsert: false
    })

  if (error) {
    console.error(error)
  }
}