"use client"

import { DragFileInput } from "@/components/drag-file-input";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { getAllFilesByTeam, uploadFile } from "@/lib/data/file";
import { getManager } from "@/lib/data/profile";

export default function FilePage() {
  const [files, setFiles] = useState([])
  const [existingFiles, setExistingFiles] = useState([])
  const [manager, setManager] = useState(null)

  useEffect(() => {
    (async () => {
      if (manager) return

      const _manager = await getManager()
      setManager(_manager)

      _manager.team_ids.forEach(async teamId => {
        const _files = await getAllFilesByTeam(_manager)
        setExistingFiles(existingFiles => [...existingFiles, _files])
      })
    })()
  })

  async function uploadFiles() {
    for (let file of files) {
      await uploadFile(manager.team_id, file)
    }
    window.location.reload()
  }

  return (
    <div>
      <div className="w-full h-svh grid grid-cols-[240px_1fr]">
        <div className="border-r border-border">
          <div className="border-b border-border p-5">
            <h3 className="font-semibold">Documents</h3>
          </div>
          <div className="flex flex-col gap-1 p-3">
            {existingFiles.map((file, index) => (
              <Button key={index} variant="ghost" className="w-full justify-start p-3 rounded-lg">{file.name}</Button>
            ))}
          </div>
        </div>
        <div className="flex flex-col flex-1 max-h-svh">
          <div className="p-5 border-b border-border">
            <h3 className="font-semibold">Upload files</h3>
          </div>
          <div className="overflow-auto p-5">
            <div className="flex flex-col gap-4">
              <DragFileInput files={files} setFiles={setFiles} />
              
              {files.length > 0 && (
                  <div className="flex gap-4 flex-wrap">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center border-2 border-border bg-secondary/30 rounded-full p-1 px-2 w-max">
                      <span className="text-sm font-medium p-1 pr-2">{file.name}</span>
                      <Button size="icon" variant="secondary" className="cursor-pointer w-6 h-6 rounded-full text-muted-foreground hover:!bg-primary hover:!text-primary-foreground" onClick={() => setFiles(files.filter((_, i) => i !== index))}>
                        <X className="w-5 h-5" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <Button className="w-max rounded-full px-4 py-4 font-bold cursor-pointer" disabled={!files.length} onClick={uploadFiles}>Upload files</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}