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
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

/** Full-height shell: the navbar stays on top, each page manages its own scrolling. */
const Layout = () => (
  <div className="h-full flex flex-col">
    <Navbar />
    <main className="flex-1 min-h-0">
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </main>
  </div>
);

export default Layout;
