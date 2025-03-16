import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
// import { getDocument } from 'pdfjs-dist'
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist/build/pdf';
// import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';

// GlobalWorkerOptions.workerSrc = pdfjsWorker;
if (typeof window !== 'undefined') {
  GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@5.0.375/build/pdf.worker.min.mjs`;
}

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function generateRandomString(n) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < n; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export function getFileNameFromPath(filePath) {
  return filePath.split("/").at(-1).split("-").slice(0, -1).join() + "." + filePath.split(".").at(-1)
}

export async function extractTextFromPDF(pdfBlob) {
  const arrayBuffer = await pdfBlob.arrayBuffer()
  const pdf = await getDocument({ data: arrayBuffer }).promise
  let fullText = ''

  for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const content = await page.getTextContent()
      const strings = content.items.map(item => item.str)
      fullText += strings.join(' ') + '\n'
  }

  return fullText
}