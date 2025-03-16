'use server'

import { OpenAI } from "openai";

export async function generateOnboardingFlow(documentText) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  const prompt = `
You are an AI assistant that creates structured learning tasks for users.
Given a document, summarize it, provide learning objectives, and estimate the time needed.

DOCUMENT TEXT:
"""${documentText}"""

Format the output as a JSON object with the following structure. 
There can be be anywhere from 1 to 20 learning tasks.
It's important to make sure that there is no outer string formatting, so that it follows the structure below exactly:
{
  "title": "An overall title that describes all learning tasks.",
  "learning_tasks": [
    {
      "title": "A short title of the learning task.",
      "summary": "A brief summary of the document (max 3 sentences).",
      "content": "Detailed explaination of the content (max 100 sentences).",
      "estimated_time_minutes": 30
    },
    {
      "title": "Another task title ...",
      "summary": "Another task summary ...",
      "content": "Another detailed explanation ...",
      "estimated_time_minutes": 20
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