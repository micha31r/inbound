"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { downloadFile, getAllFilesByTeam } from "@/lib/data/file"
import { getTeamById } from "@/lib/data/team"
import { cn, extractTextFromPDF, getFileNameFromPath } from "@/lib/utils"
import { Check } from "lucide-react"
import { useEffect, useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { createPrompt, savePrompt } from "@/lib/data/prompt"
import { useRouter } from "next/navigation"
import { createFlow, saveBlock, saveFlow } from "@/lib/data/flow"
import { getManager } from "@/lib/data/profile"
import { generateOnboardingFlow } from "@/lib/openai/openai"

export function PromptEditor({ initial }) {
  const [name, setName] = useState(initial?.name || '')
  const [instructions, setInstructions] = useState(initial?.instructions || [''])
  const [selectedFiles, setSelectedFiles] = useState(initial?.file_paths || [])
  const [selectedTeam, setSelectedTeam] = useState(initial?.team_id || '');
  const [manager, setManager] = useState(null)
  const [files, setFiles] = useState([])
  const [teams, setTeams] = useState([])
  const router = useRouter()

  useEffect(() => {
    (async () => {
      if (manager) return

      const _manager = await getManager()
      setManager(_manager)

      const allFiles = []
      for (let teamId of _manager.team_ids) {
        const _files = await getAllFilesByTeam(teamId)
        _files.forEach(file => allFiles.push(file))
      }
      setFiles(allFiles)

      const allTeams = []
      for (let teamId of _manager.team_ids) {
        const team = await getTeamById(teamId)
        allTeams.push(team)
      }
      setTeams(allTeams)
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

  function selectFile(filePath) {
    setSelectedFiles(selectedFiles => {
        if (selectedFiles.includes(filePath)) {
          return selectedFiles.filter(id => id !== filePath)
        } else {
          return [...selectedFiles, filePath]
        }
    })
  }

  async function saveActionHandler() {
    try {
      if (initial) {
        await savePrompt(initial.id, {
          id: initial.id,
          name: name || "Untitled Prompt",
          instructions: instructions,
          filePaths: selectedFiles,
          teamId: selectedTeam
        })

        window.location.reload()
      } else {
        // Create new prompt
        const data = await createPrompt({
          name: name || "Untitled Prompt",
          instructions: instructions,
          filePaths: selectedFiles,
          teamId: selectedTeam
        })

        router.push("/dashboard/prompts/" + data.id)
      }
    } catch {
      console.error("Failed to save/create prompt")
    }
  }

  async function createOnboardingFlow() {
    if (!selectedTeam) {
      console.log("Failed to create onboarding flow. Must select a team.")
      return 
    }

    const documents = []

    for (let filePath of selectedFiles) {
      const blob = await downloadFile(filePath)
      const text = await extractTextFromPDF(blob)
      documents.push({
        filePath: filePath,
        text: text
      })
    }

    const response = await generateOnboardingFlow(instructions, documents)

    const flowData = await createFlow({
      name: response.title,
      teamId: selectedTeam,
      isPublished: false,
    })

    for (let i=0; i<response.learning_tasks.length; i++) {
      const block = response.learning_tasks[i]
      await saveBlock({
        title: block.title,
        summary: block.summary,
        content: block.content,
        duration: block.estimated_time_minutes,
        filePaths: block.file_paths,
        flowId: flowData.id,
        order: i
      })
    }

    router.push("/dashboard/flows/" + flowData.id)
  }
  
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Prompt Name</h3>
      <Input className="w-[240px]" placeholder="Prompt name" value={name} onChange={event => setName(event.target.value)} />

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
              <div key={index} onClick={_ => selectFile(file.fullPath)} className="flex items-center border-2 border-border bg-secondary/30 rounded-full p-1 px-2 w-max cursor-pointer hover:border-primary transition-colors">
                <span className="text-sm font-medium p-1 pr-2">{getFileNameFromPath(file.name)}</span>
                <div className={cn("w-5 h-5 border-2 border-secondary-accent rounded-full", {
                  "border-primary bg-primary": selectedFiles.includes(file.fullPath)
                })}>
                  {selectedFiles.includes(file.fullPath) && <Check className="size-4" />}
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
          </SelectContent>
        </Select>
      </div>
      <div className="space-x-4">
        <Button variant="secondary" className="font-bold rounded-full w-max cursor-pointer mt-8" onClick={saveActionHandler}>Save</Button>
        <Button className="font-bold rounded-full w-max cursor-pointer mt-8" onClick={createOnboardingFlow} disabled={!selectedTeam}>Generate onboarding guide</Button>
      </div>
    </div>
  )
}