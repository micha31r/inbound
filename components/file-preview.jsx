"use client"

import { getFileNameFromPath } from "@/lib/utils"
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
import { useEffect, useState } from "react"
import { getPublicUrl } from "@/lib/data/file"

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

export function FilePreviewDialog({ filePath, children }) {
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