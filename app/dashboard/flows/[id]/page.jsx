"use client"

import { FlowBlock } from "@/components/flow-block";
import { FlowChain } from "@/components/flow-chain";
import { Button } from "@/components/ui/button";
import { getAllFlowsByUser, getFlowById, updateBlockOrder, updateFlowPublishStatus } from "@/lib/data/flow";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, ChevronUp } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getTeamById } from "@/lib/data/team";

export default function FlowEditPage() {
  const [flow, setFlow] = useState(null)
  const [allFlows, setAllFlows] = useState([])
  const [team, setTeam] = useState(null)
  const params = useParams()
  const router = useRouter()

  useEffect(() => {
    (async () => {
      if (!flow) {
        const _flow = await getFlowById(params.id)

        if (!_flow.Block) {
          _flow.Block = []
        }

        _flow.Block.sort((a, b) => a.order - b.order)
        setFlow(_flow)

        const _team = await getTeamById(_flow.team_id)
        setTeam(_team)

        const _allFlows = await getAllFlowsByUser()
        setAllFlows(_allFlows)
      }
    })()
  })

  async function reorder(indexA, indexB) {
    try {
      const orderA = flow.Block[indexA].order
      const orderB = flow.Block[indexB].order
      flow.Block[indexB].order = orderA
      flow.Block[indexA].order = orderB

      await updateBlockOrder(flow.Block[indexB].id, orderA)
      await updateBlockOrder(flow.Block[indexA].id, orderB)
    } catch { }

    flow.Block.sort((a, b) => a.order - b.order)

    setFlow(flow => {
      return {
        ...flow, 
        blocks: flow.Block
      }
    })
  }

  async function updatePublishStatus(isPublished) {
    await updateFlowPublishStatus(params.id, isPublished)
    window.location.reload()
  }

  return (
    <div>
      <div className="w-full h-svh grid grid-cols-[280px_1fr]">
        <div className="flex flex-col max-h-svh border-r border-border">
          <div className="border-b border-border p-5">
            <h3 className="font-semibold">Flows</h3>
          </div>
          <div className="flex-1 overflow-auto h-full">
            <div className="flex flex-col gap-1 p-3">
              {allFlows?.map((flow, index) => (
                <Button key={index} variant="ghost" className={cn("w-full justify-start p-3 cursor-pointer rounded-lg", {
                  "text-primary bg-primary/10": flow.id == params.id
                })} onClick={() => router.push("/dashboard/flows/" + flow.id)}>
                  <span className="line-clamp-1">{flow.name}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 max-h-svh">
          <div className="flex gap-4 items-center px-5 py-3 border-b border-border">

            <div className="flex gap-2 items-center flex-1">
              <h3 className="font-semibold text-muted-foreground py-2">{team?.name}</h3>
              <ChevronRight className="text-muted-foreground size-5 h-10" />
              <h3 className="font-semibold py-2">{flow?.name}</h3>
            </div>

            {flow?.is_published 
              ? <Button variant="secondary" className="h-max py-2 font-bold cursor-pointer" onClick={() => updatePublishStatus(false)}>Make private</Button>
              : <Button className="h-max py-2 font-bold cursor-pointer" onClick={() => updatePublishStatus(true)}>Publish</Button> }
          </div>
          
          <div className="overflow-auto p-5">
            <div className="flex flex-col items-center">
              {flow && flow.Block.map((block, index) => (       
                <React.Fragment key={index}>
                  <div className="grid grid-cols-[auto_1fr] items-center gap-2 md:hover:[&>.order-button]:opacity-100">
                    <div className="order-button flex flex-col gap-2 mb-10 md:opacity-0 transition-opacity">
                      {index > 0 && <Button size="icon" variant="secondary" className="w-8 h-8 cursor-pointer" onClick={() => reorder(index-1, index)}>
                        <ChevronUp className="size-5 text-muted-foreground" />
                      </Button>}
                      {index < flow.Block.length - 1 && <Button size="icon" variant="secondary" className="w-8 h-8 cursor-pointer" onClick={() => reorder(index, index+1)}>
                        <ChevronDown className="size-5 text-muted-foreground" />
                      </Button>}
                    </div>
                    <div className="flex flex-col items-center">
                      <FlowBlock isActive={false} blockId={block.id} title={block.title} summary={block.summary} content={block.content} duration={block.duration} files={block.file_paths || []} allowEdit={true} />
                      {index < flow.Block.length - 1 && <FlowChain />}
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}