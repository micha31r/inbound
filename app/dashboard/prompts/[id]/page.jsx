"use client"

import { PromptEditor } from "@/components/prompt-editor"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { getPromptById } from "@/lib/data/prompt"

export default function PromptEditPage() {
  const [prompt, setPrompt] = useState()
  const params = useParams()

  useEffect(() => {
    (async () => {
      if (prompt) return 
      const data = await getPromptById("abc")
      setPrompt(data)
    })()
  })

  return (
    <>
      <div className="p-5 border-b border-border">
        <h3 className="font-semibold">Edit Prompt</h3>
      </div>
      <div className="overflow-auto p-5">
        {prompt && <PromptEditor initial={prompt} />}
      </div>
    </>
  )
}