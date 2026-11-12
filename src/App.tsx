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
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";

// Pages are loaded on demand: the presentation page does not download the tool's code.
const Home = lazy(() => import("./pages/Home"));
const Index = lazy(() => import("./pages/Index"));

const App = () => (
  <TooltipProvider>
    <Toaster />
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/app" element={<Index />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
