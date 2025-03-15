import { extractTextFromPDF } from "@/lib/utils"

export async function generateFlow(instructions, files, teamId) {
  // Extract text from files:
  const fileTextContents = files.map(file => extractTextFromPDF(file))

  return {
    id: "flow1",
    name: "Flow 1",
    blocks: [
      {
        title: "Read: What are Azure Availability Zones?",
        summary: "A brief statement or account of the main points of something. a brief statement or account of the main points of something. a brief statement or account of the main points of something.",
        duration: 4,
        files: files,
        teamId: teamId
      }
    ]
  }
}

export async function saveFlow({ title, summary, duration, files, teamId }) {
  return 1, 2
}

export async function updateBlockOrder(blockId, order) {

}

export async function getFlowById(flowId) {
  return {
    id: "flow1",
    name: "Flow 1",
    teamId: "cube",
    isPublished: false,
    blocks: [
      {
        id: "block1",
        order: 2,
        title: "Read: What are Azure Availability Zones?",
        summary: "A brief statement or account of the main points of something. a brief statement or account of the main points of something. a brief statement or account of the main points of something.",
        duration: 4,
        files: [
          { 
            id: "1",
            name: "test.pdf"
          },
          { 
            id: "2",
            name: "test1.pdf"
          },
        ],
        teamId: "cube"
      },
      {
        id: "block2",
        order: 1,
        title: "Michael is awesome",
        summary: "A brief statement or account of the main points of something. a brief statement or account of the main points of something. a brief statement or account of the main points of something.",
        duration: 4,
        files: [
          { 
            id: "1",
            name: "test.pdf"
          },
          { 
            id: "2",
            name: "test1.pdf"
          },
        ],
        teamId: "cube"
      },
      {
        id: "block3",
        order: 3,
        title: "This comes last",
        summary: "A brief statement or account of the main points of something. a brief statement or account of the main points of something. a brief statement or account of the main points of something.",
        duration: 4,
        files: [
          { 
            id: "1",
            name: "test.pdf"
          },
          { 
            id: "2",
            name: "test1.pdf"
          },
        ],
        teamId: "cube"
      }
    ]
  }
}

export async function getAllFlowsByUser() {
  return [
    {
      id: "flow1",
      name: "Flow 1",
      blocks: []
    },
    {
      id: "flow2",
      name: "Flow 2",
      blocks: []
    },
    {
      id: "flow3",
      name: "Flow 3",
      blocks: []
    }
  ]
}

export async function getMostRecentFlow() {
  return {
    id: "flow1",
    blocks: []
  }
}

export async function getMostRecentPublishedFlowByTeam() {
  return {
    id: "flow1",
    blocks: []
  }
}