// src/utils/file-parser.js
import * as pdfjs from 'pdfjs-dist';
import * as mammoth from 'mammoth';

// Set the PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

/**
 * Extract text from a PDF file
 * @param {File} file - The PDF file to parse
 * @returns {Promise<string>} - The extracted text
 */
export async function extractTextFromPDF(file) {
  try {
    // Convert file to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    
    // Load PDF document
    const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
    
    let fullText = '';
    
    // Iterate through each page to extract text
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ');
      fullText += pageText + '\n\n';
    }
    
    return fullText.trim();
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error('Failed to extract text from the PDF file');
  }
}

/**
 * Extract text from a DOCX file
 * @param {File} file - The DOCX file to parse
 * @returns {Promise<string>} - The extracted text
 */
export async function extractTextFromDOCX(file) {
  try {
    // Convert file to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    
    // Extract text from DOCX
    const result = await mammoth.extractRawText({ arrayBuffer });
    
    return result.value.trim();
  } catch (error) {
    console.error('Error extracting text from DOCX:', error);
    throw new Error('Failed to extract text from the DOCX file');
  }
}

/**
 * Extract text from a plain text file
 * @param {File} file - The text file to parse
 * @returns {Promise<string>} - The extracted text
 */
export async function extractTextFromTXT(file) {
  try {
    // Read file as text
    const text = await file.text();
    return text.trim();
  } catch (error) {
    console.error('Error extracting text from TXT:', error);
    throw new Error('Failed to extract text from the text file');
  }
}

/**
 * Detect file type and extract text accordingly
 * @param {File} file - The file to parse
 * @returns {Promise<string>} - The extracted text
 */
export async function extractTextFromFile(file) {
  // Get file extension
  const fileName = file.name.toLowerCase();
  
  // Check file type and use appropriate parser
  if (fileName.endsWith('.pdf')) {
    return extractTextFromPDF(file);
  } else if (fileName.endsWith('.docx') || fileName.endsWith('.doc')) {
    return extractTextFromDOCX(file);
  } else if (fileName.endsWith('.txt') || fileName.endsWith('.rtf')) {
    return extractTextFromTXT(file);
  } else {
    throw new Error('Unsupported file format. Please upload a PDF, DOCX, or TXT file.');
  }
}