import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';

/**
 * Extracts plaintext from a PDF represented as an ArrayBuffer.
 *
 * @param {ArrayBuffer} pdfArrayBuffer - The PDF file as an ArrayBuffer.
 * @returns {Promise<string>} The concatenated text extracted from the PDF.
 */
export async function pdfToText(pdfArrayBuffer) {
  // Load the PDF document from the ArrayBuffer
  const loadingTask = pdfjsLib.getDocument({ data: pdfArrayBuffer });
  const pdfDocument = await loadingTask.promise;
  
  let fullText = '';

  // Iterate over each page and extract text
  for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
    const page = await pdfDocument.getPage(pageNum);
    const textContent = await page.getTextContent();

    // Combine text items from the page into a single string
    const pageText = textContent.items
      .map(item => item.str)
      .join(' ');

    fullText += pageText + '\n';
  }

  return fullText;
}

