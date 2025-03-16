"use client"

import { cn, getFileNameFromPath } from "@/lib/utils"
import { BookOpen, Check, Settings2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { Textarea } from "./ui/textarea"
import { createProgress, deleteProgress, getProgress, updateBlockContent } from "@/lib/data/flow"
import { getEmployee } from "@/lib/data/profile"
import { FilePreviewDialog } from "./file-preview"

export function FlowBlock({ isActive, blockId, title, summary, content, duration, files, allowEdit = false }) {
  const [isComplete, setIsComplete] = useState(false)
  
  useEffect(() => {
    (async () => {
      if (allowEdit) return
      // Execute code below if an employee is viewing this page

      const employee = await getEmployee()
      const data = await getProgress(employee.user_id, blockId)
      setIsComplete(!!data)
    })()
  })

  async function toggleProgress() {
    const employee = await getEmployee()
    try {
      if (!isComplete) {
        await createProgress(employee.user_id, blockId)
      } else {
        await deleteProgress(employee.user_id, blockId)
      }
    } catch {
      console.error("Failed to update block progress")
    }
    window.location.reload()
  }

  return (
    <div className={cn("border border-secondary-accent rounded-xl bg-secondary w-xl max-w-full", {
      "border-primary": isActive,
    })}>
      <div className="flex gap-3 p-4 items-center">
        <div className="bg-secondary-accent w-8 h-8 rounded-md flex items-center justify-center">
          <BookOpen className="size-4" />
        </div>
        <h3 className="font-semibold flex-1">{title}</h3>
        
        {allowEdit ? (
          <div>
            <Editor blockId={blockId} title={title} content={content} duration={duration}>
              <Button variant="ghost" size="icon" className="w-8 h-8 cursor-pointer border border-secondary-accent">
                <Settings2 className="size-4" />
              </Button>
            </Editor>
          </div>
        ) : (
          <div className={cn("w-5 h-5 border-2 border-secondary-accent rounded-full cursor-pointer", {
            "border-primary bg-primary": isComplete
          })} onClick={toggleProgress}>
            {isComplete && <Check className="size-4" />}
          </div>
        )}
      </div>

      {/* HR */}
      <div className="w-full h-px bg-secondary-accent"></div>

      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-3">
          <p className="text-sm">{content}</p>
          <span className="text-sm text-muted-foreground">Time: {duration} mins</span>
        </div>
    
        {/* Related files */}
        {files.length > 0 && (
          <div className="flex gap-2">
            {files.map((file, index) => (
              <FilePreviewDialog key={index} filePath={file}>
                <button className="border-2 border-secondary-accent bg-secondary-accent/50 rounded-lg py-1 px-2.5 w-max cursor-pointer text-sm font-medium">{getFileNameFromPath(file)}</button>
              </FilePreviewDialog>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function Editor({ blockId, title, content, duration, children }) {
  const [titleValue, setTitleValue] = useState(title)
  const [contentValue, setContentValue] = useState(content)
  const [durationValue, setDurationValue] = useState(duration)

  async function saveChanges() {
    await updateBlockContent(blockId, { 
      title: titleValue,
      content: contentValue,
      duration: durationValue
    })
    window.location.reload()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg bg-secondary">
        <DialogHeader>
          <DialogTitle>Edit Block</DialogTitle>
          <DialogDescription>
            Review block content to ensure that information in the onboarding guide is factual. Remember to save your changes when done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input className="!bg-secondary-accent/50 border-secondary-accent" id="title" value={titleValue} onChange={event => setTitleValue(event.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content" className="text-right">
              Content
            </Label>
            <Textarea id="content" className="h-28 max-h-40 !bg-secondary-accent/50 border-secondary-accent" value={contentValue} onChange={event => setSummaryValue(event.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="duration" className="text-right">
              Duration (minutes)
            </Label>
            <Input className="!bg-secondary-accent/50 border-secondary-accent" type="number" id="duration" min={1} max={240} value={durationValue} onChange={event => setDurationValue(event.target.value)} />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="rounded-full w-full cursor-pointer" onClick={saveChanges}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}