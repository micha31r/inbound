'use client'
import { getMostRecentPublishedFlowByTeam } from "@/lib/data/flow"
import { getEmployee } from "@/lib/data/profile"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function FlowPage() {
  const router = useRouter()
  const [hasData, setHasData] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        const employee = await getEmployee()
        const flow = (await getMostRecentPublishedFlowByTeam(employee.team_id))[0]
        router.push("/employee/published/" + flow.id)
      } catch {
        setHasData(false)
      }
    })()
  })

  if (hasData) {
    return null
  }

  return (
    <div>
      No onboarding guides available. Please contact your manager for more detail.
    </div>
  )
}