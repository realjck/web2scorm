/**

 * This file is part of a project licensed under the GNU General Public License v3.0.
 *
 * Copyright (c) 2025 JCK
 *
 * This program is free software: you can redistribute it and/or modify it under the terms of the
 * GNU General Public License as published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * See <https://www.gnu.org/licenses/> for more details.
 */
import heroImage from '@/assets/portal/web2scorm_illustration.webp';
import { Link } from 'react-router-dom';
import { ArrowRight, Github } from 'lucide-react';
import { GITHUB_URL } from '@/components/Navbar';

const Hero = () => {
  return (
    <section className="py-12 md:py-24 bg-gradient-to-br from-blue-50 to-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          {/* Text Content */}
          <div className="md:w-2/3 mb-12 md:mb-0 md:pr-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Simply Generate SCORM Packages from Web Resources
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
              web2scorm provides a practical solution for the creation of SCORM compliant packages (1.2 and 2004), ensuring broad compatibility across Learning Management Systems (LMS). This tool enables the integration of diverse web content, including URLs and shared HTML code, into structured e-learning modules.
            </p>

            <div className="place-self-center mb-8">
              <Link
                to="/app"
                className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold px-10 py-4 rounded-lg text-lg md:text-xl transition duration-300 transform hover:scale-105 shadow-lg"
              >
                Start Packaging
                <ArrowRight className="w-6 h-6 ml-2" />
              </Link>
            </div>

          
            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 flex items-start">
              <Github className="text-blue-600 mr-3 mt-1 flex-shrink-0" size={20} />
              <p className="text-blue-800">
                <strong>No account required.</strong> This tool is completely free and open-source. 
                <a 
                  href={GITHUB_URL} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-600 hover:text-blue-800 underline ml-1"
                >
                  Access the project on GitHub
                </a> for more information and contributions.
              </p>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="md:w-1/3 transform hover:scale-105 transition-transform duration-500">
            <img 
              src={heroImage} 
              alt="web2scorm illustration showing web resources being converted to SCORM packages" 
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
