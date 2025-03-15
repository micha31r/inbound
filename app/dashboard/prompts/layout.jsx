"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { getAllPromptsByTeam } from "@/lib/data/prompt"
import { useParams, usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { getManager } from "@/lib/data/profile"

export default function PromptLayout({ children }) {
  const [prompts, setPrompts] = useState([])
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()

  useEffect(() => {
    (async () => {
      if (prompts.length) return

      const manager = await getManager()

      const allPrompts = []
      for (let teamId of manager.team_ids) {
        const _prompts = await getAllPromptsByTeam(teamId)
        _prompts.forEach(prompt => allPrompts.push(prompt))
      }
      setPrompts(allPrompts)
    })()
  })

  return (
    <div>
      <div className="w-full h-svh grid grid-cols-[280px_1fr]">
        <div className="border-r border-border">
          <div className="border-b border-border p-5">
            <h3 className="font-semibold">Prompts</h3>
          </div>
          <div className="flex flex-col gap-1 p-3">
            <Button variant="ghost" className={cn("w-full justify-start p-3 cursor-pointer rounded-lg", {
              "text-primary bg-primary/10": pathname === "/dashboard/prompts"
            })} onClick={() => router.push("/dashboard/prompts")}>New Prompt</Button>
            
            {prompts.map((prompt, index) => (
              <Button key={index} variant="ghost" className={cn("w-full justify-start p-3 cursor-pointer rounded-lg overflow-hidden", {
                "text-primary bg-primary/10": params.id == prompt.id
              })} onClick={() => router.push("/dashboard/prompts/" + prompt.id)}>{prompt.name}</Button>
            ))}
          </div>
        </div>
        <div className="flex flex-col flex-1 max-h-svh">
          {children}
        </div>
      </div>
    </div>
  )
}