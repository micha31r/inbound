'use client'
import { getMostRecentFlow } from "@/lib/data/flow"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function FlowPage() {
  const router = useRouter()

  useEffect(() => {
    (async () => {
      try {
        const flow = (await getMostRecentFlow())[0]
        router.push("/dashboard/flows/" + flow.id)
      } catch {
        router.push("/dashboard/prompts")
      }
    })()
  })

  return null
}