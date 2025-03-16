"use client"

import { cn, getFileNameFromPath } from "@/lib/utils"
import { BookOpen, Settings2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useRef, useState } from "react"
import { Textarea } from "./ui/textarea"
import { getPublicUrl } from "@/lib/data/file"
import { updateBlockContent } from "@/lib/data/flow"

function PDFViewer({ filePath }) {
  const [PDFUrl, setPDFUrl] = useState(null);

  useEffect(() => {
    (async () => {
      const url = await getPublicUrl(filePath)
      setPDFUrl(url)
    })()
  })

  if (!PDFUrl) return null

  return (
    <iframe
      src={PDFUrl}
      className="rounded-xl w-full h-full max-h-[calc(100svh-10rem)] aspect-[3/4] border-2 border-secondary-accent"
    ></iframe>
  )
}

function FilePreviewDialog({ filePath, children }) {
  const fileName = getFileNameFromPath(filePath)
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[calc(100svh-2rem)] bg-secondary">
        <DialogHeader>
          <DialogTitle>{fileName}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 text-sm dark:text-foreground/70">
          <PDFViewer filePath={filePath} />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" className="border border-secondary-accent hover:!bg-secondary-accent/50 rounded-full w-full cursor-pointer">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function FlowBlock({ isActive, blockId, title, summary, content, duration, files, allowEdit = false }) {
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
        ) : <div className="w-5 h-5 border-2 border-secondary-accent rounded-full"></div>}
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
            Review block content to ensure that information in the onboarding flow is factual. Remember to save your changes when done.
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