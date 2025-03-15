"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getAllFilesByUser } from "@/lib/data/file"
import { getAllTeamsByUser } from "@/lib/data/team"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"
import { useEffect, useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { savePrompt } from "@/lib/data/prompt"
import { useRouter } from "next/navigation"
import { generateFlow, saveFlow } from "@/lib/data/flow"

export function PromptEditor({ initial }) {
  const [instructions, setInstructions] = useState(initial?.instructions || [''])
  const [selectedFiles, setSelectedFiles] = useState(initial?.selectedFileIds || [])
  const [selectedTeam, setSelectedTeam] = useState(initial?.teamId || '');
  const [files, setFiles] = useState([])
  const [teams, setTeams] = useState([])
  const router = useRouter()

  useEffect(() => {
    (async () => {
      if (!files.length) {
        const data = await getAllFilesByUser()
        setFiles(data)
      }
      if (!teams.length) {
        const data = await getAllTeamsByUser()
        setTeams(data)
      }
    })()
  })

  function addInstruction() {
    setInstructions(instructions => [...instructions, ''])
  }

  function onInputChange(event, index) {
    if (event.target.value === "") {
      // Remove prompt if empty
      setInstructions(instructions => instructions.filter((_, i) => i !== index))
    } else {
      // Update prompt
      setInstructions(instructions => instructions.map((instruction, i) => i === index ? event.target.value : instruction))
    }
  }

  function selectFile(fileId) {
    setSelectedFiles(selectedFiles => {
        if (selectedFiles.includes(fileId)) {
          return selectedFiles.filter(id => id !== fileId)
        } else {
          return [...selectedFiles, fileId]
        }
    })
  }

  async function saveActionHandler() {
    const { data, error } = await savePrompt(instructions, selectedFiles, teamId)
  }

  async function createOnboardingFlow() {
    const flowData = await generateFlow(instructions, files.filter(file => selectedFiles.includes(file.id)), selectedTeam)
    const { data, error } = await saveFlow(flowData)
    router.push("/dashboard/flows")
  }
  
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Provide Instructions</h3>
      {/* Enter instructions */}
      <div className="space-y-4">
        {instructions.map((instruction, index) => (
          <div key={index} className="flex gap-2 items-center">
            <div className="flex items-center justify-center rounded-full bg-secondary w-8 h-8">{index + 1}</div>
            <Input className="flex-1" placeholder="Write instructions here" value={instruction} onChange={event => onInputChange(event, index)} />
          </div>
        ))}
        
        <Button variant="secondary" className="font-bold rounded-full w-max cursor-pointer" onClick={addInstruction}>Add instruction</Button>
      </div>


      {/* Select files */}
      <div className="space-y-4">
        <h3 className="font-semibold mt-8">Choose Files To Include</h3>

        {files.length > 0 && (
            <div className="flex gap-4 flex-wrap">
            {files.map((file, index) => (
              <div key={index} onClick={_ => selectFile(file.id)} className="flex items-center border-2 border-border bg-secondary/30 rounded-full p-1 px-2 w-max cursor-pointer hover:border-primary transition-colors">
                <span className="text-sm font-medium p-1 pr-2">{file.name}</span>
                <div className={cn("w-5 h-5 border-2 border-secondary-accent rounded-full", {
                  "border-primary bg-primary": selectedFiles.includes(file.id)
                })}>
                  {selectedFiles.includes(file.id) && <Check className="size-4" />}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Select team */}
      <div className="space-y-4">
        <h3 className="font-semibold mt-8">Select Team</h3>

        <Select value={selectedTeam} onValueChange={value => {
          setSelectedTeam(value);
        }}>
          <SelectTrigger className="w-[240px]">
            <SelectValue placeholder="Team" />
          </SelectTrigger>
          <SelectContent>
            {teams.map((team, index) => (
              <SelectItem key={index} value={team.id}>{team.name}</SelectItem>
            ))}
            {/* <SelectItem value="dark">Dark</SelectItem> */}
            {/* <SelectItem value="system">System</SelectItem> */}
          </SelectContent>
        </Select>
      </div>
      <div className="space-x-4">
        <Button variant="secondary" className="font-bold rounded-full w-max cursor-pointer mt-8" onClick={saveActionHandler}>Save</Button>
        <Button className="font-bold rounded-full w-max cursor-pointer mt-8" onClick={createOnboardingFlow}>Create Onboarding Flow</Button>
      </div>
    </div>
  )
}