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
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Github } from 'lucide-react';
import logo from '@/assets/portal/web2scorm_logo.webp';
import packageJson from '../../package.json';

export const GITHUB_URL = 'https://github.com/realjck/web2scorm';

const NAV_ITEMS = [
  { to: '/', label: 'Presentation' },
  { to: '/app', label: 'Packaging Tool' },
];

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `font-medium transition duration-200 ${isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  return (
    <header className="font-system relative bg-white shadow-sm z-50 flex-shrink-0">
      <div className="mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-end gap-2">
          <Link to="/" onClick={close}>
            <img src={logo} alt="web2scorm logo" className="h-10 w-auto" />
          </Link>
          <span className="text-xs text-gray-400">v{packageJson.version}</span>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          {NAV_ITEMS.map(({ to, label }) => (
            <NavLink key={to} to={to} end className={linkClass}>
              {label}
            </NavLink>
          ))}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener"
            aria-label="GitHub repository"
            title="GitHub"
            className="text-gray-700 hover:text-blue-600 transition duration-200"
          >
            <Github size={22} />
          </a>
        </nav>

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          className="md:hidden text-gray-700 hover:text-blue-600 transition duration-200"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <nav className="md:hidden absolute inset-x-0 top-full bg-white border-t shadow-md px-4 py-4 flex flex-col space-y-4">
          {NAV_ITEMS.map(({ to, label }) => (
            <NavLink key={to} to={to} end onClick={close} className={linkClass}>
              {label}
            </NavLink>
          ))}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener"
            onClick={close}
            className="flex items-center gap-2 font-medium text-gray-700 hover:text-blue-600 transition duration-200"
          >
            <Github size={20} /> GitHub
          </a>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
