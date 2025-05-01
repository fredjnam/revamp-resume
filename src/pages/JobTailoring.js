import React, { useState } from 'react';
import { Upload, FileText, RefreshCw, Download, CheckCircle, AlertTriangle } from 'lucide-react';
import { analyzeResume } from '../utils/api-integration';

// Placeholder function for extracting text from files
// In a production app, you would implement proper file parsing
const extractTextFromFile = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      // For a real implementation, you would use proper parsing libraries
      // based on file type (PDF.js for PDF, mammoth for DOCX, etc.)
      resolve(event.target.result);
    };
    
    reader.onerror = (error) => {
      reject(new Error('Failed to read the resume file'));
    };
    
    // For text files this works, for PDFs and DOCXs you'd need specialized libraries
    if (file.type === 'text/plain') {
      reader.readAsText(file);
    } else {
      // For demo purposes, we'll just read as text
      // In a real app, you'd use the appropriate method based on file type
      reader.readAsText(file);
    }
  });
};

const ResumeAnalysis = () => {
  // State for file uploads
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeText, setResumeText] = useState('');
  
  // State for analysis
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [error, setError] = useState(null);
  
  // API key would typically come from a secure backend
  // This is just for demonstration purposes
  const [apiKey, setApiKey] = useState('');
  
  // Handle resume file upload
  const handleResumeUpload = async (e) => {
    try {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        setResumeFile(file);
        
        // Extract text from the file
        const text = await extractTextFromFile(file);
        setResumeText(text);
      }
    } catch (err) {
      setError(`Error reading resume file: ${err.message}`);
    }
  };
  
  // Handle analysis submission
  const handleAnalyzeClick = async () => {
    try {
      if (!resumeText) {
        setError('Please upload a resume first');
        return;
      }
      
      if (!apiKey) {
        setError('Please enter your OpenAI API key');
        return;
      }
      
      setIsAnalyzing(true);
      setError(null);
      
      // Call the OpenAI API through our utility function
      const results = await analyzeResume(resumeText, apiKey);
      setAnalysisResults(results);
    } catch (err) {
      setError(`Analysis failed: ${err.message}`);
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  // Rest of the component remains the same...
  // ...


const JobTailoring = () => {
  // State
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  // Handle resume upload
  const handleResumeUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  // Handle job description input
  const handleJobDescriptionChange = (e) => {
    setJobDescription(e.target.value);
  };

  // Handle analysis
  const handleAnalyzeClick = () => {
    if (!resumeFile) {
      setError('Please upload your resume');
      return;
    }

    if (!jobDescription) {
      setError('Please enter a job description');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    // Simulate API call
    setTimeout(() => {
      setIsAnalyzing(false);
      setResults({
        matchScore: 65,
        keywords: ["project management", "agile methodologies", "cross-functional teams", "stakeholder communication", "JIRA"],
        suggestedSkills: ["Scrum", "Kanban", "Sprint planning", "Resource allocation", "Risk management"],
        suggestedExperience: [
          "Led cross-functional teams to deliver projects on time and within budget",
          "Implemented agile methodologies to improve team efficiency by X%",
          "Managed stakeholder expectations through clear communication channels",
          "Utilized JIRA for project tracking and sprint management"
        ]
      });
    }, 2000);
  };

  // Reset
  const handleReset = () => {
    setResumeFile(null);
    setJobDescription('');
    setResults(null);
    setError(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Job-Specific Resume Tailoring</h1>
      <p className="text-gray-600 mb-6">
        Customize your resume for specific job postings to significantly increase your chances of getting an interview.
      </p>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6 flex items-center">
          <AlertTriangle className="mr-2" size={20} />
          <span>{error}</span>
        </div>
      )}
      
      {!results ? (
        <div className="bg-white p-8 rounded-xl shadow-md">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Resume Upload Section */}
            <div>
              <h2 className="text-xl font-bold mb-4">Upload Your Resume</h2>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="mx-auto text-gray-400 mb-4" size={36} />
                <p className="text-gray-500 mb-4">
                  {resumeFile ? resumeFile.name : 'Drag and drop your resume file here, or click to browse'}
                </p>
                <input
                  type="file"
                  className="hidden"
                  id="resume-file"
                  onChange={handleResumeUpload}
                  accept=".pdf,.doc,.docx,.txt"
                />
                <label 
                  htmlFor="resume-file"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer"
                >
                  Select File
                </label>
                {resumeFile && (
                  <div className="mt-4 flex items-center justify-center text-green-600">
                    <CheckCircle className="mr-2" size={18} />
                    <span>Resume uploaded successfully</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Job Description Section */}
            <div>
              <h2 className="text-xl font-bold mb-4">Paste Job Description</h2>
              <textarea
                className="w-full h-64 p-4 border border-gray-300 rounded-md"
                placeholder="Paste the complete job description here..."
                value={jobDescription}
                onChange={handleJobDescriptionChange}
              ></textarea>
            </div>
          </div>
          
          {/* Analysis Button */}
          <button 
            onClick={handleAnalyzeClick}
            disabled={!resumeFile || !jobDescription || isAnalyzing}
            className={`w-full py-3 mt-6 rounded-md ${
              resumeFile && jobDescription && !isAnalyzing 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isAnalyzing ? (
              <span className="flex items-center justify-center">
                <RefreshCw className="animate-spin mr-2" size={20} />
                Analyzing...
              </span>
            ) : (
              'Analyze & Generate Tailored Suggestions'
            )}
          </button>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-xl shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Tailoring Suggestions</h2>
            <button 
              onClick={handleReset}
              className="text-blue-600 hover:underline"
            >
              Analyze Another Job
            </button>
          </div>
          
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-bold">Match Score</span>
              <span className="text-lg font-bold">{results.matchScore}/100</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="bg-blue-600 h-4 rounded-full" 
                style={{ width: `${results.matchScore}%` }}
              ></div>
            </div>
            <p className="text-gray-600 mt-2">
              Your resume matches {results.matchScore}% of the job requirements. With some tailoring, you can significantly improve your chances.
            </p>
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-3">Key Keywords Identified</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {results.keywords.map((keyword, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  {keyword}
                </span>
              ))}
            </div>
            <p className="text-gray-600">
              Include these keywords in your resume to improve visibility to ATS (Applicant Tracking Systems).
            </p>
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-3">Suggested Skills to Highlight</h3>
            <ul className="space-y-2">
              {results.suggestedSkills.map((skill, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle className="text-green-500 mr-2" size={18} />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-3">Suggested Experience Bullet Points</h3>
            <p className="text-gray-600 mb-4">
              Consider adapting these bullet points for your resume (customize with your actual achievements):
            </p>
            <ul className="space-y-3">
              {results.suggestedExperience.map((exp, index) => (
                <li key={index} className="bg-blue-50 p-4 rounded-lg">
                  {exp}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex justify-between">
            <button className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
              Download Suggestions
            </button>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Get Premium Tailoring
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobTailoring;