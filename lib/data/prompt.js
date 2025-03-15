export async function savePrompt(instructions, selectedFileIds, teamId) {

}

export async function getAllPromptsByUser() {
  // Get all prompts by user
  return [
    {
      id: "abc",
      instructions: [
        "asdfghjkl",
        "qwertyuiop",
        "zxcvbnm",
      ],
      files: [
        "file1.pdf",
        "file2.pdf",
        "file3.pdf",
      ],
      teamId: "cube"
    }
  ]
}

export async function getPromptById(id) {
  return {
    id: "abc",
    instructions: [
      "asdfghjkl",
      "qwertyuiop",
      "zxcvbnm",
    ],
    selectedFileIds: [
      "1",
      "2",
      "3",
    ],
    teamId: "cube"
  }
}