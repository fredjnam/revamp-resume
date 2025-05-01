import React from 'react';
import { CheckCircle } from 'lucide-react';

const ExpertSuggestions = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Expert Recruiter Suggestions</h1>
      <p className="text-gray-600 mb-6">
        Based on years of experience as a recruiter at top companies, here are my professional recommendations for creating a standout resume.
      </p>
      
      <div className="space-y-8">
        <SuggestionSection 
          title="Formatting & Layout"
          tips={[
            "Keep your resume to 1-2 pages maximum - recruiters spend an average of just 7 seconds on initial review",
            "Use a clean, professional template with consistent formatting",
            "Include clear section headings and plenty of white space",
            "Put your most impressive and relevant achievements near the top",
            "Use bullet points rather than paragraphs to improve readability"
          ]}
        />
        
        <SuggestionSection 
          title="Content Recommendations"
          tips={[
            "Quantify your achievements with specific numbers and percentages",
            "Use action verbs at the beginning of each bullet point",
            "Tailor your skills section to match the job description keywords",
            "Focus on achievements rather than responsibilities",
            "Include relevant projects, certifications, or volunteer work that demonstrates key skills"
          ]}
        />
        
        <SuggestionSection 
          title="Common Mistakes to Avoid"
          tips={[
            "Using generic objectives or summaries",
            "Including outdated or irrelevant experience",
            "Listing job duties without showing impact",
            "Typos or grammatical errors",
            "Using an unprofessional email address"
          ]}
        />
        
        <SuggestionSection 
          title="Tech Industry Specific Tips"
          tips={[
            "Highlight specific technical skills and technologies you've mastered",
            "Include links to your Github, portfolio, or relevant projects",
            "Showcase your experience with agile methodologies",
            "Mention your contributions to open-source projects",
            "Emphasize soft skills like problem-solving and teamwork"
          ]}
        />
      </div>
      
      <div className="mt-10 p-6 bg-blue-50 rounded-xl">
        <h3 className="text-xl font-bold mb-4">Personal Consultation</h3>
        <p className="mb-4">
          Want personalized feedback on your specific resume? Upgrade to our premium plan for a 1-on-1 consultation with our expert recruiter.
        </p>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Upgrade to Premium
        </button>
      </div>
    </div>
  );
};

// Suggestion section component
const SuggestionSection = ({ title, tips }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <ul className="space-y-3">
        {tips.map((tip, index) => (
          <li key={index} className="flex items-start">
            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5 font-bold text-sm">
              {index + 1}
            </div>
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpertSuggestions;