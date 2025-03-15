"use client"

import { PromptEditor } from "@/components/prompt-editor"

export default function PromptCreatePage() {
  return (
    <>
      <div className="p-5 border-b border-border">
        <h3 className="font-semibold">Create New Prompt</h3>
      </div>
      <div className="overflow-auto p-5">
        <PromptEditor />
      </div>
    </>
  )
}