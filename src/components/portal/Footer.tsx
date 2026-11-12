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
import { Link } from 'react-router-dom';
import { Github } from 'lucide-react';
import { GITHUB_URL } from '@/components/Navbar';
import logo from '@/assets/portal/web2scorm_logo_white.webp';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0">
            <img src={logo} alt="web2scorm logo" className="h-10 w-auto" />
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            <Link to="/" className="hover:text-blue-400 transition duration-200">Presentation</Link>
            <Link to="/app" className="hover:text-blue-400 transition duration-200">Packaging Tool</Link>
            <a href={GITHUB_URL} target="_blank" rel="noopener" aria-label="GitHub repository" title="GitHub" className="hover:text-blue-400 transition duration-200">
              <Github size={22} />
            </a>
          </nav>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} jck
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
