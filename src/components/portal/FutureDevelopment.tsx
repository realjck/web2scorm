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
import assessmentImage from '@/assets/portal/feature-assessment.webp';

const FutureDevelopment = () => {
  return (
    <section id="future" className="py-16 md:py-24 bg-blue-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            Coming Soon
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Integrated Assessment Capabilities
          </h2>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mb-8"></div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-12">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Customizable Quizzes
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Development is underway to include a customizable quiz feature for content validation. This enhancement will enable the creation of assessments directly linked to the web resource, with performance data reporting to the LMS.
              </p>
            </div>
            <div className="md:w-1/2">
              <img 
                src={assessmentImage} 
                alt="Assessment capabilities interface" 
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className='text-center'>
          <p className="text-gray-700 leading-relaxed">
            web2scorm is currently under development. I highly value your feedback and experiences. Please feel free to <a href="mailto:contact@pxly.fr" target="_blank" className="underline text-blue-600 hover:text-blue-800">share</a> any comments or suggestions you may have as you use the tool.
          </p>
        </div>
      </div>
    </section>
  );
}

export default FutureDevelopment;
