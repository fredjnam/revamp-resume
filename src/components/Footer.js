import React from 'react';
import { FileText } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <FileText className="text-blue-400" size={24} />
            <h2 className="text-xl font-bold">ResumeRevamp</h2>
          </div>
          <p className="text-gray-400">© 2025 ResumeRevamp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;