// API Integration for Resume Analysis
// This file contains the functions to analyze resumes using OpenAI's API

/**
 * Analyzes a resume using OpenAI's API
 * @param {string} resumeText - The text content of the resume
 * @param {string} apiKey - The OpenAI API key
 * @returns {Promise<Object>} - The analysis results
 */
export async function analyzeResume(resumeText, apiKey) {
  try {
    // Input validation
    if (!resumeText || resumeText.trim() === '') {
      throw new Error('Resume text is required');
    }
    
    if (!apiKey || apiKey.trim() === '') {
      throw new Error('API key is required');
    }
    
    // OpenAI API endpoint
    const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
    
    // Prepare the prompt for OpenAI
    const prompt = createResumeAnalysisPrompt(resumeText);
    
    // Make the API call
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4', // Using GPT-4 for better analysis
        messages: [
          {
            role: 'system',
            content: 'You are an expert resume analyzer that provides detailed, constructive feedback. Analyze the resume for structure, content, impact, and alignment with job market standards.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.5, // Lower temperature for more focused responses
        max_tokens: 1000 // Adjust based on expected response length
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API Error: ${errorData.error?.message || 'Unknown error'}`);
    }
    
    const data = await response.json();
    
    // Parse the response into a structured format
    return parseAnalysisResponse(data.choices[0].message.content);
    
  } catch (error) {
    console.error('Resume analysis error:', error);
    throw error;
  }
}

/**
 * Creates a detailed prompt for resume analysis
 * @param {string} resumeText - The text content of the resume
 * @returns {string} - The formatted prompt
 */
function createResumeAnalysisPrompt(resumeText) {
  return `
Please analyze the following resume and provide detailed feedback:

${resumeText}

Provide your analysis in the following JSON format:
{
  "overallScore": [A number between 0-100],
  "strengths": [
    "strength1",
    "strength2",
    "strength3"
  ],
  "weaknesses": [
    "weakness1",
    "weakness2",
    "weakness3"
  ],
  "improvementSuggestions": [
    "suggestion1",
    "suggestion2",
    "suggestion3",
    "suggestion4",
    "suggestion5"
  ],
  "formatReview": "Short paragraph about the resume's format and structure",
  "contentReview": "Short paragraph about the resume's content quality",
  "keywordOptimization": "Short paragraph about ATS optimization",
  "detailedFeedback": {
    "professionalSummary": "Feedback on the professional summary/objective",
    "workExperience": "Feedback on the work experience section",
    "skills": "Feedback on the skills section",
    "education": "Feedback on the education section",
    "achievements": "Feedback on achievements and impact"
  }
}

Ensure your response is ONLY the JSON object with no additional text.`;
}

/**
 * Parses the analysis response from OpenAI
 * @param {string} responseText - The raw text response from OpenAI
 * @returns {Object} - The structured analysis results
 */
function parseAnalysisResponse(responseText) {
  try {
    // Extract JSON from the response (in case there's surrounding text)
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      throw new Error('Could not extract JSON from the API response');
    }
    
    const analysisData = JSON.parse(jsonMatch[0]);
    
    // Validate the analysis data structure
    if (!analysisData.overallScore || !analysisData.strengths || !analysisData.weaknesses) {
      throw new Error('Incomplete analysis data received');
    }
    
    // Add timestamp
    analysisData.timestamp = new Date().toISOString();
    
    return analysisData;
  } catch (error) {
    console.error('Error parsing analysis response:', error);
    throw new Error('Failed to parse the resume analysis results');
  }
}

/**
 * Analyze a resume by comparing it to a job description
 * @param {string} resumeText - The text content of the resume
 * @param {string} jobDescription - The job description text
 * @param {string} apiKey - The OpenAI API key
 * @returns {Promise<Object>} - The job-specific analysis results
 */
export async function analyzeResumeForJob(resumeText, jobDescription, apiKey) {
  try {
    // Input validation
    if (!resumeText || resumeText.trim() === '') {
      throw new Error('Resume text is required');
    }
    
    if (!jobDescription || jobDescription.trim() === '') {
      throw new Error('Job description is required');
    }
    
    if (!apiKey || apiKey.trim() === '') {
      throw new Error('API key is required');
    }
    
    // OpenAI API endpoint
    const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
    
    // Prepare the prompt for OpenAI
    const prompt = createJobMatchPrompt(resumeText, jobDescription);
    
    // Make the API call
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4', // Using GPT-4 for better analysis
        messages: [
          {
            role: 'system',
            content: 'You are an expert ATS system and recruiter that analyzes how well a resume matches a specific job description. Provide detailed feedback on match quality and suggestions for improvement.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3, // Lower temperature for more focused responses
        max_tokens: 1200 // Adjust based on expected response length
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API Error: ${errorData.error?.message || 'Unknown error'}`);
    }
    
    const data = await response.json();
    
    // Parse the response into a structured format
    return parseJobMatchResponse(data.choices[0].message.content);
    
  } catch (error) {
    console.error('Job match analysis error:', error);
    throw error;
  }
}

/**
 * Creates a detailed prompt for job-specific resume analysis
 * @param {string} resumeText - The text content of the resume
 * @param {string} jobDescription - The job description text
 * @returns {string} - The formatted prompt
 */
function createJobMatchPrompt(resumeText, jobDescription) {
  return `
Please analyze how well the following resume matches the job description provided. 

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

Provide your analysis in the following JSON format:
{
  "matchScore": [A number between 0-100 representing how well the resume matches the job],
  "keywordMatch": {
    "score": [A number between 0-100],
    "matchedKeywords": [
      "keyword1",
      "keyword2",
      "..."
    ],
    "missingKeywords": [
      "keyword1",
      "keyword2",
      "..."
    ]
  },
  "skillsMatch": {
    "score": [A number between 0-100],
    "matchedSkills": [
      "skill1",
      "skill2",
      "..."
    ],
    "missingSkills": [
      "skill1",
      "skill2",
      "..."
    ]
  },
  "experienceMatch": {
    "score": [A number between 0-100],
    "analysis": "Brief analysis of how the candidate's experience aligns with the job requirements"
  },
  "improvementSuggestions": [
    "suggestion1",
    "suggestion2",
    "suggestion3",
    "suggestion4"
  ],
  "suggestedBulletPoints": [
    "Suggested bullet point 1 for the resume based on the job description",
    "Suggested bullet point 2 for the resume based on the job description",
    "...",
    "..."
  ]
}

Ensure your response is ONLY the JSON object with no additional text.`;
}

/**
 * Parses the job match analysis response from OpenAI
 * @param {string} responseText - The raw text response from OpenAI
 * @returns {Object} - The structured job match results
 */
function parseJobMatchResponse(responseText) {
  try {
    // Extract JSON from the response (in case there's surrounding text)
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      throw new Error('Could not extract JSON from the API response');
    }
    
    const matchData = JSON.parse(jsonMatch[0]);
    
    // Validate the analysis data structure
    if (!matchData.matchScore || !matchData.keywordMatch || !matchData.skillsMatch) {
      throw new Error('Incomplete job match data received');
    }
    
    // Add timestamp
    matchData.timestamp = new Date().toISOString();
    
    return matchData;
  } catch (error) {
    console.error('Error parsing job match response:', error);
    throw new Error('Failed to parse the job match results');
  }
}