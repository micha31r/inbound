"use client"

import { cn } from "@/lib/utils"
import { BookOpen, Settings2 } from "lucide-react"
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
import { Children, useRef, useState } from "react"
import { Textarea } from "./ui/textarea"

export function FlowBlockButton() {
  return (
    <button className="border-2 border-secondary-accent bg-secondary-accent/50 rounded-lg py-1 px-2.5 w-max cursor-pointer">
      <span className="text-sm font-medium">Azure.pdf</span>
    </button>
  )
}

export function FlowBlock({ isActive, title, summary, duration, files, allowEdit = false }) {
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
            <Editor title={title} summary={summary} duration={duration}>
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
          <p className="text-sm line-clamp-3">{summary}</p>
          <span className="text-sm text-muted-foreground">Read more • {duration} mins</span>
        </div>
    
        {/* Related files */}
        <div className="flex gap-2">
          {files.map((file, index) => (
            <FlowBlockButton key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

function Editor({ title, summary, duration, children }) {
  const [titleValue, setTitleValue] = useState(title)
  const [summaryValue, setSummaryValue] = useState(summary)
  const [durationValue, setDurationValue] = useState(duration)

  async function saveChanges() {
    console.log(titleValue)
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
            <Label htmlFor="summary" className="text-right">
              Summary
            </Label>
            <Textarea id="summary" className="h-28 max-h-40 !bg-secondary-accent/50 border-secondary-accent" value={summaryValue} onChange={event => setSummaryValue(event.target.value)} />
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