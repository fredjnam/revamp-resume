// src/pages/Home.js
import React from 'react';
import { BarChart, BookOpen, Briefcase, ChevronRight } from 'lucide-react';

const Home = ({ setCurrentPage }) => {
  return (
    <div className="py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Elevate Your Resume, Land Your Dream Job</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Advanced AI analysis and expert recruiter insights to help you stand out in the job market.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button 
            onClick={() => setCurrentPage('analysis')}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center"
          >
            Analyze Your Resume <ChevronRight className="ml-2" size={20} />
          </button>
          <button 
            onClick={() => setCurrentPage('expert')}
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            See Expert Tips
          </button>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <FeatureCard 
          icon={<BarChart className="text-blue-600" size={32} />}
          title="AI-Powered Analysis"
          description="Get instant feedback on your resume's strengths and weaknesses with our advanced AI tool."
          onClick={() => setCurrentPage('analysis')}
        />
        <FeatureCard 
          icon={<BookOpen className="text-blue-600" size={32} />}
          title="Expert Recruiter Insights"
          description="Learn from real-world recruiting experience with personalized suggestions."
          onClick={() => setCurrentPage('expert')}
        />
        <FeatureCard 
          icon={<Briefcase className="text-blue-600" size={32} />}
          title="Job-Specific Tailoring"
          description="Customize your resume for specific job postings to increase your chances of getting noticed."
          onClick={() => setCurrentPage('tailoring')}
        />
      </div>
      
      {/* How It Works Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <StepCard 
            number="1"
            title="Upload Your Resume"
            description="Upload your current resume in PDF, DOCX or other formats."
          />
          <StepCard 
            number="2"
            title="Get AI Analysis"
            description="Our AI analyzes your resume and provides detailed feedback."
          />
          <StepCard 
            number="3"
            title="Review Expert Tips"
            description="See personalized suggestions from industry recruiters."
          />
          <StepCard 
            number="4"
            title="Optimize & Apply"
            description="Make improvements and tailor your resume for specific jobs."
          />
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="text-center p-8 bg-blue-50 rounded-xl">
        <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Resume?</h2>
        <p className="text-lg text-gray-600 mb-6">Join thousands of job seekers who've improved their job search results with ResumeRevamp.</p>
        <button 
          onClick={() => setCurrentPage('analysis')}
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Get Started For Free
        </button>
      </div>
    </div>
  );
};

// Feature card component
const FeatureCard = ({ icon, title, description, onClick }) => {
  return (
    <div 
      className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer" 
      onClick={onClick}
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

// Step card component
const StepCard = ({ number, title, description }) => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <div className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mb-4 font-bold">
        {number}
      </div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Home;