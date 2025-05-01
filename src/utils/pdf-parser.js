// Resume File Parser 
// This file contains utilities to extract text from resume files (PDF, DOCX, etc.)

/**
 * Extract text from a PDF file
 * @param {File} file - The PDF file to parse
 * @returns {Promise<string>} - The extracted text
 */
export async function extractTextFromPDF(file) {
    try {
      // This implementation uses PDF.js, a widely used PDF parsing library
      const pdfjsLib = await import('pdfjs-dist/build/pdf');
      const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.entry');
      
      // Set the PDF.js worker
      pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
      
      // Convert file to ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();
      
      // Load PDF document
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      
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
      // Using mammoth.js for DOCX parsing
      const mammoth = await import('mammoth');
      
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
  
  /**
   * Sanitize the extracted text
   * @param {string} text - The raw extracted text
   * @returns {string} - The sanitized text
   */
  export function sanitizeResumeText(text) {
    if (!text) return '';
    
    // Remove excessive whitespace
    let sanitized = text.replace(/\s+/g, ' ');
    
    // Remove special characters that might interfere with parsing
    sanitized = sanitized.replace(/[^\w\s.,;:?!()'"[\]{}\/\-–—&@#$%*+]/g, '');
    
    // Remove any HTML tags that might have been extracted
    sanitized = sanitized.replace(/<[^>]*>/g, '');
    
    return sanitized.trim();
  }
  
  /**
   * Identify resume sections
   * @param {string} text - The resume text
   * @returns {Object} - The identified sections
   */
  export function identifyResumeSections(text) {
    // Common section headers in resumes
    const sectionHeaders = {
      summary: ['summary', 'professional summary', 'profile', 'objective', 'about me'],
      education: ['education', 'academic background', 'qualifications', 'degrees'],
      experience: ['experience', 'work experience', 'employment history', 'work history', 'professional experience'],
      skills: ['skills', 'technical skills', 'core competencies', 'qualifications', 'expertise'],
      projects: ['projects', 'academic projects', 'personal projects'],
      certifications: ['certifications', 'certificates', 'licenses'],
      languages: ['languages', 'language proficiency'],
      interests: ['interests', 'hobbies', 'activities'],
      references: ['references', 'referees']
    };
    
    // Initialize sections object
    const sections = {};
    
    // Convert text to lowercase for easier matching
    const lowerText = text.toLowerCase();
    
    // Find the start indices of each section
    const sectionIndices = [];
    
    // Find potential section headers
    Object.entries(sectionHeaders).forEach(([section, headerVariations]) => {
      headerVariations.forEach(header => {
        // Look for the header followed by a colon or newline
        const pattern = new RegExp(`\\b${header}\\s*(?::|\n)`, 'i');
        const match = lowerText.match(pattern);
        
        if (match) {
          sectionIndices.push({
            section,
            index: match.index,
            header: match[0]
          });
        }
      });
    });
    
    // Sort section indices by their position in the text
    sectionIndices.sort((a, b) => a.index - b.index);
    
    // Extract content for each section
    for (let i = 0; i < sectionIndices.length; i++) {
      const currentSection = sectionIndices[i];
      const nextSection = sectionIndices[i + 1];
      
      // Calculate the end of the current section
      const sectionStart = currentSection.index + currentSection.header.length;
      const sectionEnd = nextSection ? nextSection.index : text.length;
      
      // Extract the section content
      const sectionContent = text.substring(sectionStart, sectionEnd).trim();
      
      // Add to sections object if content exists
      if (sectionContent) {
        sections[currentSection.section] = sectionContent;
      }
    }
    
    return sections;
  }
  
  /**
   * Extract contact information from resume text
   * @param {string} text - The resume text
   * @returns {Object} - The extracted contact information
   */
  export function extractContactInfo(text) {
    const contactInfo = {
      email: null,
      phone: null,
      linkedin: null,
      website: null,
      location: null
    };
    
    // Email pattern
    const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
    const emailMatch = text.match(emailPattern);
    if (emailMatch) {
      contactInfo.email = emailMatch[0];
    }
    
    // Phone pattern (various formats)
    const phonePattern = /\b(\+\d{1,3}[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}\b/;
    const phoneMatch = text.match(phonePattern);
    if (phoneMatch) {
      contactInfo.phone = phoneMatch[0];
    }
    
    // LinkedIn pattern
    const linkedinPattern = /(?:linkedin\.com\/in\/|linkedin:)([A-Za-z0-9_-]+)/i;
    const linkedinMatch = text.match(linkedinPattern);
    if (linkedinMatch) {
      contactInfo.linkedin = linkedinMatch[1] || linkedinMatch[0];
    }
    
    // Website pattern
    const websitePattern = /\b(?:https?:\/\/)?(?:www\.)?([A-Za-z0-9-]+\.[A-Za-z0-9.-]+(?:\/[A-Za-z0-9-._~:/?#[\]@! // Resume File Parser 
  // This file contains utilities to extract text from resume files (PDF, DOCX, etc.)
  
  /**
   * Extract text from a PDF file
   * @param {File} file - The PDF file to parse
   * @returns {Promise<string>} - The extracted text
   */
  export async function extractTextFromPDF(file) {
    try {
      // Using PDF.js library for PDF parsing
      // In a real implementation, you woul'()*+,;=]*)?)\b/i;
    const websiteMatch = text.match(websitePattern);
    if (websiteMatch && !websiteMatch[0].includes('linkedin.com')) {
      contactInfo.website = websiteMatch[0];
    }
    
    // Location might be harder to detect accurately, but we can make some assumptions
    // Look for common city/state patterns
    const locationPattern = /\b[A-Z][a-z]+(?:[\s,]+[A-Z][a-z]+)*(?:[\s,]+[A-Z]{2})?\b/;
    const lines = text.split('\n');
    
    // Look in the first few lines, as location is typically near the top of a resume
    for (let i = 0; i < Math.min(5, lines.length); i++) {
      const locationMatch = lines[i].match(locationPattern);
      if (locationMatch && !lines[i].toLowerCase().includes('university') && !lines[i].toLowerCase().includes('college')) {
        contactInfo.location = locationMatch[0];
        break;
      }
    }
    
    return contactInfo;
}