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
import { ScormFormData } from '@/types/scorm';

const DEFAULT_DURATION_MINUTES = 30;

/** Parses the duration field (minutes), falling back to the default when empty or invalid. */
const durationMinutes = (duration: string): number => {
  const minutes = parseInt(duration, 10);
  return minutes > 0 ? minutes : DEFAULT_DURATION_MINUTES;
};

/** Minutes as HH:MM:SS, for the SCORM 1.2 LOM datetime. */
const toClockTime = (minutes: number): string => {
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${pad(Math.floor(minutes / 60))}:${pad(minutes % 60)}:00`;
};

// Generate imsmanifest.xml for SCORM 1.2
export const generateScorm12Manifest = (formData: ScormFormData): string => {
  const uniqueId = "SCORM_" + Date.now();
  const title = formData.title || "SCORM Module";
  const description = formData.description || "SCORM content generated with Web2SCORM";

  return `<?xml version="1.0" standalone="no" ?>
<manifest identifier="${uniqueId}" version="1.0"
  xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2"
  xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.imsproject.org/xsd/imscp_rootv1p1p2 imscp_rootv1p1p2.xsd
                      http://www.imsglobal.org/xsd/imsmd_rootv1p2p1 imsmd_rootv1p2p1.xsd
                      http://www.adlnet.org/xsd/adlcp_rootv1p2 adlcp_rootv1p2.xsd">
  
  <metadata>
    <schema>ADL SCORM</schema>
    <schemaversion>1.2</schemaversion>
    <lom xmlns="http://www.imsglobal.org/xsd/imsmd_rootv1p2p1">
      <general>
        <title>
          <langstring>${escapeXml(title)}</langstring>
        </title>
        <description>
          <langstring>${escapeXml(description)}</langstring>
        </description>
      </general>
      <educational>
        <typicallearningtime>
          <datetime>${toClockTime(durationMinutes(formData.duration))}</datetime>
        </typicallearningtime>
      </educational>
    </lom>
  </metadata>
  
  <organizations default="default_org">
    <organization identifier="default_org">
      <title>${escapeXml(title)}</title>
      <item identifier="item_1" identifierref="resource_1" isvisible="true">
        <title>${escapeXml(title)}</title>
      </item>
    </organization>
  </organizations>
  
  <resources>
    <resource identifier="resource_1" type="webcontent" adlcp:scormtype="sco" href="index.html">
      <file href="index.html" />
    </resource>
  </resources>
</manifest>
`;
};

// Generate imsmanifest.xml for SCORM 2004
export const generateScorm2004Manifest = (formData: ScormFormData): string => {
  const uniqueId = "SCORM_" + Date.now();
  const title = formData.title || "SCORM Module";
  const description = formData.description || "SCORM content generated with web2scorm";

  return `<?xml version="1.0" encoding="UTF-8" standalone="no" ?>
<manifest identifier="${uniqueId}" version="1"
  xmlns="http://www.imsglobal.org/xsd/imscp_v1p1"
  xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_v1p3"
  xmlns:adlseq="http://www.adlnet.org/xsd/adlseq_v1p3"
  xmlns:adlnav="http://www.adlnet.org/xsd/adlnav_v1p3"
  xmlns:imsss="http://www.imsglobal.org/xsd/imsss"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.imsglobal.org/xsd/imscp_v1p1 imscp_v1p1.xsd
                      http://www.adlnet.org/xsd/adlcp_v1p3 adlcp_v1p3.xsd
                      http://www.adlnet.org/xsd/adlseq_v1p3 adlseq_v1p3.xsd
                      http://www.adlnet.org/xsd/adlnav_v1p3 adlnav_v1p3.xsd
                      http://www.imsglobal.org/xsd/imsss imsss_v1p0.xsd">
  
  <metadata>
    <schema>ADL SCORM</schema>
    <schemaversion>2004 4th Edition</schemaversion>
    <lom xmlns="http://ltsc.ieee.org/xsd/LOM">
      <general>
        <title>
          <string language="en-US">${escapeXml(title)}</string>
        </title>
        <description>
          <string language="en-US">${escapeXml(description)}</string>
        </description>
      </general>
      <educational>
        <typicalLearningTime>
          <duration>PT${durationMinutes(formData.duration)}M</duration>
        </typicalLearningTime>
      </educational>
    </lom>
  </metadata>
  
  <organizations default="default_org">
    <organization identifier="default_org">
      <title>${escapeXml(title)}</title>
      <item identifier="item_1" identifierref="resource_1">
        <title>${escapeXml(title)}</title>
        <imsss:sequencing>
          <imsss:objectives>
            <imsss:primaryObjective objectiveID="completionobj" satisfiedByMeasure="false" />
          </imsss:objectives>
        </imsss:sequencing>
      </item>
    </organization>
  </organizations>
  
  <resources>
    <resource identifier="resource_1" type="webcontent" adlcp:scormType="sco" href="index.html">
      <file href="index.html" />
    </resource>
  </resources>
</manifest>
`;
};

// Helper function to escape XML entities
function escapeXml(unsafe: string): string {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
