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
import Hero from '@/components/portal/Hero';
import Features from '@/components/portal/Features';
import FutureDevelopment from '@/components/portal/FutureDevelopment';
import Footer from '@/components/portal/Footer';
import { ScrollArea } from '@/components/ui/scroll-area';

/** Presentation page. Scrolls inside its own container (html/body are overflow-hidden), styled like the tool sidebar. */
const Home = () => (
  <ScrollArea className="h-full black-scrollbar font-system">
    <Hero />
    <Features />
    <FutureDevelopment />
    <Footer />
  </ScrollArea>
);

export default Home;
