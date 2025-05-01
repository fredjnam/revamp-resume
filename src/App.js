import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import ResumeAnalysis from './pages/ResumeAnalysis';
import ExpertSuggestions from './pages/ExpertSuggestions';
import JobTailoring from './pages/JobTailoring';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  
  // Basic page navigation
  const renderPage = () => {
    switch(currentPage) {
      case 'home': 
        return <Home setCurrentPage={setCurrentPage} />;
      case 'analysis':
        return <ResumeAnalysis />;
      case 'expert':
        return <ExpertSuggestions />;
      case 'tailoring':
        return <JobTailoring />;
      default: 
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="container mx-auto px-4 py-8 flex-grow">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;