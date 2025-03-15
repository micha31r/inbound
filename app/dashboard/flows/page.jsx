import { getMostRecentFlow } from "@/lib/data/flow"
import { redirect } from "next/navigation"

export default async function FlowPage() {
  const flow = await getMostRecentFlow()
  return redirect("/dashboard/flows/" + flow.id)
}