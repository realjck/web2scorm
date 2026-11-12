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
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// The service worker is registered by vite-plugin-pwa (injected registerSW.js)
createRoot(document.getElementById("root")!).render(<App />);