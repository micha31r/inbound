import { getMostRecentPublishedFlowByTeam } from "@/lib/data/flow"
import { redirect } from "next/navigation"

export default async function EmployeePage() {
  const flow = await getMostRecentPublishedFlowByTeam()
  return redirect("/employee/published/" + flow.id)
}