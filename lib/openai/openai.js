'use server'

import { OpenAI } from "openai";

export async function generateOnboardingFlow(instructions, documents) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  const prompt = `
You are an AI assistant that creates structured guides to help new employees integrate into their teams.
Given multiple documents with key business and team information, and multiple instructions from the manager, summarise points documents that employees would need to know estimate the time needed to read.
It is crucial to summarise and extract key information accurately so that employees can be integrated into their teams as fast as possible.

Here are key steps you must include when creating the guide:
1. Analyse document contents.
2. Analyse manager instructions, pay attention to the ordering of the instructions.
3. Based on manager instructions, group document information together to create sections for the guide. Each section can include multiple documents if the information is related. 

Note: The number of documents and manager instructions doesn't need to match the number of sections in a guide.

Document information as JSON string (includes the file path and text content):
"""${JSON.stringify(documents)}"""

Manager instructions as JSON string:
"""${JSON.stringify(instructions)}"""

Format the output as a JSON object with the following structure. 
There can be be anywhere from 1 to 20 sections (learning tasks) in a guide.
It's important to make sure that there is no outer string formatting, so that it follows the structure below exactly:
{
  "title": "An overall title that describes the guide.",
  "learning_tasks": [
    {
      "title": "A short title of the learning task.",
      "summary": "A brief summary of the document (max 3 sentences).",
      "content": "Detailed explaination of the content.",
      "estimated_time_minutes": 5,
      "file_paths": [
        "File path of the document used in this section",
        "File path of the another document used in this section",
      ]
    },
    {
      "title": "Another task title ...",
      "summary": "Another task summary ...",
      "content": "Another detailed explanation ...",
      "estimated_time_minutes": 2,
      "file_paths": [
        "File path of the document used in this section",
        "File path of the another document used in this section",
      ]
    },
  ]
}
  `

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const rawResponse = response.choices[0].message.content
    const cleanedResponse = rawResponse.replace(/^json/, '')
    console.log(cleanedResponse)
    return JSON.parse(cleanedResponse);
  } catch (error) {
    console.error("Error generating learning task:", error);
    return null;
  }
}