"use client"

import { FlowBlock } from "@/components/flow-block";
import { FlowChain } from "@/components/flow-chain";
import { Button } from "@/components/ui/button";
import { getAllFlowsByUser, getFlowById } from "@/lib/data/flow";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getTeamById } from "@/lib/data/team";
import { TipsBanner } from "@/components/tips-banner";

export default function FlowViewPage() {
  const [flow, setFlow] = useState(null)
  const [allFlows, setAllFlows] = useState([])
  const [team, setTeam] = useState(null)
  const params = useParams()
  const router = useRouter()

  useEffect(() => {
    (async () => {
      if (!flow) {
        const _flow = await getFlowById(params.id)
        _flow.Block.sort((a, b) => a.order - b.order)
        setFlow(_flow)

        const _team = await getTeamById(_flow.team_id)
        setTeam(_team)

        const _allFlows = await getAllFlowsByUser()
        setAllFlows(_allFlows)
      }
    })()
  })

  return (
    <div>
      <div className="w-full h-svh grid grid-cols-[280px_1fr]">
        <div className="border-r border-border">
          <div className="border-b border-border p-5">
            <h3 className="font-semibold">Flows</h3>
          </div>
          <div className="flex flex-col gap-1 p-3">
            {allFlows?.map((flow, index) => (
              <Button key={index} variant="ghost" className={cn("w-full justify-start p-3 cursor-pointer rounded-lg", {
                "text-primary bg-primary/10": flow.id == params.id
              })} onClick={() => router.push("/employee/published/" + flow.id)}>
                <span className="line-clamp-1">{flow.name}</span>
              </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-col flex-1 max-h-svh">
          <div className="flex gap-4 items-center px-5 py-3 border-b border-border">
            {team && (
              <div className="flex gap-2 items-center flex-1">
                <h3 className="font-semibold text-muted-foreground py-2">{team.name}</h3>
                <ChevronRight className="text-muted-foreground size-5" />
                <h3 className="font-semibold py-2">{flow?.name}</h3>
              </div>
            )}

            <Button variant="secondary" className="h-max py-2 font-bold cursor-pointer">Ask AI</Button>
          </div>
          
          <div className="overflow-auto p-5">
            <div className="flex flex-col items-center mb-5">
              <TipsBanner />
            </div>

            <div className="flex flex-col items-center">
              {flow && flow.Block.map((block, index) => (       
                <React.Fragment key={index}>
                  <FlowBlock isActive={false} blockId={block.id} title={block.title} summary={block.summary} content={block.content} duration={block.duration} files={block.file_paths} />
                  {index < flow.Block.length - 1 && <FlowChain />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}