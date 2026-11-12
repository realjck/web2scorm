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
import featureImage1 from '@/assets/portal/feature-tracking.png';
import featureImage2 from '@/assets/portal/feature-completion.png';

const Features = () => {
  return (
    <section id="features" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          Key Features
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Feature Card 1 */}
          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100">
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="hidden md:block md:w-1/3 flex-shrink-0">
                  <img 
                    src={featureImage1} 
                    alt="Resource integration tracking interface" 
                    className="w-full rounded-lg"
                  />
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Resource Integration with Access and Duration Tracking
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    This mode facilitates the embedding of web-based resources, tracking learner access and the time spent engaging with the content. An optional "autocomplete on duration" feature allows for automatic completion status based on a specified time threshold. The behavior of the LMS upon module completion may vary.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Feature Card 2 */}
          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100">
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="hidden md:block md:w-1/3 flex-shrink-0">
                  <img 
                    src={featureImage2} 
                    alt="Code-based completion interface" 
                    className="w-full rounded-lg"
                  />
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    PassCode-Based Completion
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    This mode offers a mechanism for explicit module completion. An iframe is displayed, prompting learners to input a designated code, typically found within the learning material. Upon successful entry, the module is marked as complete, and a customizable message can be displayed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
