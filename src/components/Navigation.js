import React from 'react';
import { FileText } from 'lucide-react';

function Navigation({ currentPage, setCurrentPage }) {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FileText className="text-blue-600" size={32} />
            <h1 className="text-2xl font-bold text-gray-800">ResumeRevamp</h1>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => setCurrentPage('home')}
              className={`px-2 py-1 ${currentPage === 'home' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
            >
              Home
            </button>
            <button 
              onClick={() => setCurrentPage('analysis')}
              className={`px-2 py-1 ${currentPage === 'analysis' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
            >
              AI Analysis
            </button>
            <button 
              onClick={() => setCurrentPage('expert')}
              className={`px-2 py-1 ${currentPage === 'expert' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
            >
              Expert Tips
            </button>
            <button 
              onClick={() => setCurrentPage('tailoring')}
              className={`px-2 py-1 ${currentPage === 'tailoring' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
            >
              Job Tailoring
            </button>
          </nav>
          
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Login</button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Sign Up</button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navigation;