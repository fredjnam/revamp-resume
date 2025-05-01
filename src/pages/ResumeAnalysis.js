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

// For now, we'll create placeholder functions that we'll implement later
const analyzeResume = async (resumeText, apiKey) => {
  // This is a placeholder - we'll implement the real API call later
  console.log("Analyzing resume:", resumeText.substring(0, 100) + "...");
  
  // Return mock data for now
  return {
    overallScore: 78,
    strengths: ["Clear job history", "Good use of action verbs", "Appropriate length"],
    weaknesses: ["Missing quantifiable achievements", "Generic skills section", "Inconsistent formatting"],
    improvementSuggestions: [
      "Add metrics to showcase your achievements",
      "Tailor your skills to the job you're applying for",
      "Ensure consistent formatting throughout your resume"
    ],
    formatReview: "Your resume has a clean structure, but there are some inconsistencies in formatting that should be addressed.",
    contentReview: "The content is generally good, but lacks specific metrics and achievements that would make it stand out.",
    keywordOptimization: "Your resume contains some relevant keywords, but could benefit from more industry-specific terminology.",
    detailedFeedback: {
      professionalSummary: "Your summary is concise, but could be more impactful with specific achievements.",
      workExperience: "Work experience is clearly presented, but needs more quantifiable results.",
      skills: "Skills section needs more specificity and relevance to your target roles.",
      education: "Education section is well-formatted and complete.",
      achievements: "Consider adding a dedicated achievements section to highlight key accomplishments."
    }
  };
};

const extractTextFromFile = async (file) => {
  // This is a placeholder - we'll implement real file parsing later
  console.log("Extracting text from:", file.name);
  return "Sample resume text extracted from file. This would normally contain the full text of the resume.";
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
      
      setIsAnalyzing(true);
      setError(null);
      
      // In a real app, you would use a backend API to keep your API key secure
      // For demo purposes, we're using placeholders
      const results = await analyzeResume(resumeText, apiKey);
      setAnalysisResults(results);
    } catch (err) {
      setError(`Analysis failed: ${err.message}`);
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  // Reset the form
  const handleReset = () => {
    setResumeFile(null);
    setResumeText('');
    setAnalysisResults(null);
    setError(null);
  };
  
  // Download analysis as text file
  const handleDownload = () => {
    if (!analysisResults) return;
    
    // Generate downloadable content
    let content = '# Resume Analysis Report\n\n';
    content += `## Overall Score: ${analysisResults.overallScore}/100\n\n`;
    
    // Add other sections
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume-analysis-report.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">AI Resume Analysis</h1>
      <p className="text-gray-600 mb-6">
        Get detailed feedback on your resume's strengths and weaknesses with our AI-powered analysis tool.
      </p>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6 flex items-center">
          <AlertTriangle className="mr-2" size={20} />
          <span>{error}</span>
        </div>
      )}
      
      {!analysisResults ? (
        <div className="bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-xl font-bold mb-4">Upload Your Resume</h2>
          <p className="text-gray-600 mb-6">
            Our AI will analyze your resume and provide detailed feedback on its strengths and weaknesses.
          </p>
          
          <div className="mb-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="mx-auto text-gray-400 mb-4" size={48} />
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
          
          {/* Supported File Types */}
          <div className="flex justify-center mb-6">
            <div className="flex space-x-4 text-sm text-gray-500">
              <span className="flex items-center">
                <FileText className="mr-1" size={16} />
                PDF
              </span>
              <span className="flex items-center">
                <FileText className="mr-1" size={16} />
                DOCX
              </span>
              <span className="flex items-center">
                <FileText className="mr-1" size={16} />
                TXT
              </span>
            </div>
          </div>
          
          {/* API Key Input (in real app, this would be handled on the backend) */}
          <div className="mb-6">
            <label className="block mb-2 text-gray-700">OpenAI API Key:</label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter your OpenAI API key (kept private and not stored)"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <p className="text-sm text-gray-500 mt-2">
              This is for demonstration purposes. In a production app, API keys would be handled securely on the backend.
            </p>
          </div>
          
          <button 
            onClick={handleAnalyzeClick}
            disabled={!resumeFile || isAnalyzing}
            className={`w-full py-3 rounded-md ${
              resumeFile && !isAnalyzing 
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
              'Analyze My Resume'
            )}
          </button>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-xl shadow-md">
          {/* Results section - we'll implement this later */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Analysis Results</h2>
            <div className="flex space-x-4">
              <button 
                onClick={handleReset}
                className="text-blue-600 hover:underline flex items-center"
              >
                <RefreshCw className="mr-1" size={16} />
                Analyze Another Resume
              </button>
              <button 
                onClick={handleDownload}
                className="text-blue-600 hover:underline flex items-center"
              >
                <Download className="mr-1" size={16} />
                Download Report
              </button>
            </div>
          </div>
          
          {/* Resume Score */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-bold">Resume Score</span>
              <span className="text-lg font-bold">{analysisResults.overallScore}/100</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className={`h-4 rounded-full ${
                  analysisResults.overallScore >= 80 ? 'bg-green-500' :
                  analysisResults.overallScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${analysisResults.overallScore}%` }}
              ></div>
            </div>
            <p className="text-gray-600 mt-2">
              {analysisResults.overallScore >= 80 ? 'Excellent! Your resume is well-optimized.' : 
               analysisResults.overallScore >= 60 ? 'Good start! With a few improvements, your resume will be much more effective.' :
               'Your resume needs significant improvements to stand out to recruiters.'}
            </p>
          </div>
          
          {/* Strengths and Weaknesses */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-lg font-bold mb-3 text-green-600">Strengths</h3>
              <ul className="space-y-2">
                {analysisResults.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="text-green-500 mr-2 flex-shrink-0 mt-1" size={18} />
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3 text-red-600">Areas to Improve</h3>
              <ul className="space-y-2">
                {analysisResults.weaknesses.map((weakness, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-red-100 text-red-500 flex items-center justify-center mr-2 flex-shrink-0 mt-1">!</div>
                    <span>{weakness}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Suggested Improvements */}
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-3">Suggested Improvements</h3>
            <ul className="space-y-3">
              {analysisResults.improvementSuggestions.map((suggestion, index) => (
                <li key={index} className="bg-blue-50 p-4 rounded-lg">
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Premium Feature Upsell */}
          <div className="p-6 bg-blue-50 rounded-xl">
            <h3 className="text-xl font-bold mb-4">Want More Detailed Analysis?</h3>
            <p className="mb-4">
              Upgrade to Premium for advanced resume metrics, industry-specific recommendations, and one-on-one consultation with a professional recruiter.
            </p>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Upgrade to Premium
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeAnalysis;