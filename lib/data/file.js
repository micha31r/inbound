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
  
  return data.map(file => {
    return {
      ...file,
      fullPath: teamId.toString() + "/" + file.name
    }
  })
}

export async function uploadFile(teamId, file) {
  const name = file.name.split(".").slice(0, -1).join()
  const extension = file.name.split(".").at(-1)
  const path = teamId + '/' + name + '-' + generateRandomString(6) + '.' + extension

  const { error } = await supabase
    .storage
    .from('files')
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false
    })

  return path
}

export async function getPublicUrl(filePath) {
  const { data } = await supabase
      .storage
      .from('files')
      .createSignedUrl(filePath, 3600)
  
  return data.signedUrl
}

export async function downloadFile(filePath) {
  const { data } = await supabase
      .storage
      .from('files')
      .download(filePath)
  
  return data
}