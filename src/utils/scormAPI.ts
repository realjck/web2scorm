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
// SCORM API implementations for both 1.2 and 2004 standards

// SCORM 1.2 API template
export const scorm12ApiTemplate = `
// SCORM 1.2 API Implementation
var API = null;

// Bounded, exception-safe search (as in the ADL reference algorithm): frames from
// another origin throw on access, and a frame chain must not be walked forever.
function findAPIInFrames(win) {
  for (var depth = 0; win && depth < 10; depth++) {
    try {
      if (win.API != null && typeof(win.API) === "object") return win.API;
      var parent = win.parent;
      if (!parent || parent === win) return null;
      win = parent;
    } catch (e) {
      return null;
    }
  }
  return null;
}

function findAPI(win) {
  return findAPIInFrames(win) || (win.opener ? findAPIInFrames(win.opener) : null);
}

function getAPI() {
  if (API !== null) return API;
  
  API = findAPI(window);
  return API;
}

// Initialize SCORM
function initializeSCORM() {
  const api = getAPI();
  if (api) {
    api.LMSInitialize("");
    // Only a first attempt becomes "incomplete": never downgrade a previous result on relaunch
    var status = api.LMSGetValue("cmi.core.lesson_status");
    if (status === "" || status === "not attempted") {
      api.LMSSetValue("cmi.core.lesson_status", "incomplete");
    }
    // Session time is computed from this and saved once, when terminating
    sessionStartTime = new Date();
  } else {
    console.error("SCORM API not found");
  }
}

var sessionStartTime;

var isTerminated = false;

function saveSessionTime(api) {
  const elapsedSeconds = Math.floor((new Date() - sessionStartTime) / 1000);
  api.LMSSetValue("cmi.core.session_time", formatTime(elapsedSeconds));
}


// Format time as HH:MM:SS
function formatTime(timeInSeconds) {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;
  
  return hours.toString().padStart(2, '0') + ':' +
         minutes.toString().padStart(2, '0') + ':' + 
         seconds.toString().padStart(2, '0');
}

// Mark completion
function completeSCO() {
  const api = getAPI();
  if (api) {
    api.LMSSetValue("cmi.core.lesson_status", "completed");
    api.LMSCommit("");
  }
}

// Close SCORM connection
function terminateSCORM() {
  const api = getAPI();
  if (api && sessionStartTime && !isTerminated) {
    isTerminated = true;
    saveSessionTime(api);
    api.LMSFinish("");
  }
}

// Initialize SCORM when the page loads
window.addEventListener("load", initializeSCORM);
// "unload" is unreliable in modern browsers: pagehide/beforeunload are the supported signals
window.addEventListener("pagehide", terminateSCORM);
window.addEventListener("beforeunload", terminateSCORM);

// Function to check entered code and mark as complete if correct
function validateCompletionCode(enteredCode, correctCode) {
  if (enteredCode.toLowerCase() === correctCode.toLowerCase()) {
    completeSCO();
    return true;
  }
  return false;
}
`;

// SCORM 2004 API template
export const scorm2004ApiTemplate = `
// SCORM 2004 API Implementation
var API_1484_11 = null;

// Bounded, exception-safe search (as in the ADL reference algorithm): frames from
// another origin throw on access, and a frame chain must not be walked forever.
function findAPIInFrames(win) {
  for (var depth = 0; win && depth < 10; depth++) {
    try {
      if (win.API_1484_11 != null && typeof(win.API_1484_11) === "object") return win.API_1484_11;
      var parent = win.parent;
      if (!parent || parent === win) return null;
      win = parent;
    } catch (e) {
      return null;
    }
  }
  return null;
}

function findAPI(win) {
  return findAPIInFrames(win) || (win.opener ? findAPIInFrames(win.opener) : null);
}

function getAPI() {
  if (API_1484_11 !== null) return API_1484_11;
  
  API_1484_11 = findAPI(window);
  return API_1484_11;
}

// Initialize SCORM
function initializeSCORM() {
  const api = getAPI();
  if (api) {
    api.Initialize("");
    // Only a first attempt becomes "incomplete": never downgrade a previous result on relaunch
    var status = api.GetValue("cmi.completion_status");
    if (status === "" || status === "unknown" || status === "not attempted") {
      api.SetValue("cmi.completion_status", "incomplete");
    }
    // Session time is computed from this and saved once, when terminating
    sessionStartTime = new Date();
  } else {
    console.error("SCORM 2004 API not found");
  }
}

var sessionStartTime;

var isTerminated = false;

function saveSessionTime(api) {
  const elapsedSeconds = Math.floor((new Date() - sessionStartTime) / 1000);
  api.SetValue("cmi.session_time", formatTime(elapsedSeconds));
}


// Format time as ISO 8601 for SCORM 2004
function formatTime(timeInSeconds) {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;
  
  return "PT" + hours + "H" + minutes + "M" + seconds + "S";
}

// Mark completion
function completeSCO() {
  const api = getAPI();
  if (api) {
    api.SetValue("cmi.completion_status", "completed");
    api.SetValue("cmi.success_status", "passed");
    api.Commit("");
  }
}

// Close SCORM connection
function terminateSCORM() {
  const api = getAPI();
  if (api && sessionStartTime && !isTerminated) {
    isTerminated = true;
    saveSessionTime(api);
    api.Terminate("");
  }
}

// Initialize SCORM when the page loads
window.addEventListener("load", initializeSCORM);
// "unload" is unreliable in modern browsers: pagehide/beforeunload are the supported signals
window.addEventListener("pagehide", terminateSCORM);
window.addEventListener("beforeunload", terminateSCORM);
`;
