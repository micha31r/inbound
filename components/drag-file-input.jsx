"use client"

import { File } from "lucide-react";
import { useRef } from "react";

const ACCEPTED_EXTENSIONS = [
  "pdf"
]

export function DragFileInput({ files, setFiles }) {
  const hiddenInputRef = useRef(null)

  function isFileTypeValid(file) {
    const extension = file.name.split(".").pop()

    if (!ACCEPTED_EXTENSIONS.includes(extension)) {
      console.log("File type not accepted")
      return false
    }

    return true
  }

  function dropHandler(event) {
    const _files = []

    event.preventDefault()

    if (event.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      [...event.dataTransfer.items].forEach((item, i) => {
        // If dropped items aren't files, reject them
        if (item.kind === "file") {
          const file = item.getAsFile()

          isFileTypeValid(file) 
            ? _files.push(file)
            : console.log("File type not accepted")
        }
      })
    } else {
      // Use DataTransfer interface to access the file(s)
      [...event.dataTransfer.files].forEach((file, i) => {
        isFileTypeValid(file) 
          ? _files.push(file)
          : console.log("File type not accepted")
      })
    }

    if (_files.length) {
      setFiles([...files, ..._files])
    }
  }

  function clickHandler() {
    hiddenInputRef.current.click();
  }

  function inputChangeHandler() {
    const inputFiles = hiddenInputRef.current.files
    const _files = []

    Array.from(inputFiles).forEach(file => {
      isFileTypeValid(file) 
          ? _files.push(file)
          : console.log("File type not accepted")
    })
    console.log(_files)

    if (_files.length) {
      setFiles([...files, ..._files])
    }
  }

  return (
    <div className="flex flex-col h-64 items-center hover:bg-secondary/30 transition-colors cursor-pointer rounded-xl" onClick={clickHandler} onDrop={dropHandler} onDragOver={(ev) => ev.preventDefault()}>
      <div className="flex flex-col gap-2 justify-center items-center border-3 border-dashed border-border w-full h-full p-4 rounded-xl">
        <div className="w-12 h-12 rounded-full border-2 border-dashed border-border flex justify-center items-center">
          <File className="size-6 text-muted-foreground" />
        </div>
        <p className="text-lg font-medium text-muted-foreground text-center">Drag & drop files here, or click to select files.</p>
      </div>
      <input ref={hiddenInputRef} onInput={inputChangeHandler} type="file" id="file-input" className="hidden" multiple />
    </div>
  )
}