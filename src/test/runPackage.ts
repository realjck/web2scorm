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
import { JSDOM, VirtualConsole } from 'jsdom';
import { ScormFormData } from '@/types/scorm';
import { generateIndexHtml } from '@/utils/scormGenerator';

export const baseFormData: ScormFormData = {
  scormVersion: '1.2',
  title: 'Test module',
  description: '',
  duration: '',
  iframeContent: 'https://example.com/',
  completionCode: '',
  endMessage: '',
  codePromptMessage: '',
  alertMessageRight: '',
  alertMessageWrong: '',
  packageType: 'iframe-only',
};

/** Minimal in-memory LMS API recording every call (SCORM 1.2 and 2004 method names). */
export const createLmsApi = (initialValues: Record<string, string> = {}) => {
  const values: Record<string, string> = { ...initialValues };
  const calls: string[] = [];
  const record = (name: string) => (...args: string[]) => {
    calls.push(`${name}(${args.join(', ')})`);
    return 'true';
  };
  const getValue = (key: string) => {
    calls.push(`GetValue(${key})`);
    return values[key] ?? '';
  };
  const setValue = (key: string, value: string) => {
    calls.push(`SetValue(${key}, ${value})`);
    values[key] = value;
    return 'true';
  };
  return {
    values,
    calls,
    LMSInitialize: record('Initialize'),
    LMSFinish: record('Terminate'),
    LMSCommit: record('Commit'),
    LMSGetValue: getValue,
    LMSSetValue: setValue,
    LMSGetLastError: () => '0',
    Initialize: record('Initialize'),
    Terminate: record('Terminate'),
    Commit: record('Commit'),
    GetValue: getValue,
    SetValue: setValue,
    GetLastError: () => '0',
  };
};

export type LmsApi = ReturnType<typeof createLmsApi>;

/**
 * Generates the package index.html and runs it in jsdom with the given LMS API
 * exposed on window, resolving once the page has loaded. Script errors are collected.
 */
export const runPackage = async (overrides: Partial<ScormFormData>, api: LmsApi = createLmsApi()) => {
  const formData = { ...baseFormData, ...overrides };
  const html = await generateIndexHtml(formData);
  const errors: string[] = [];
  const virtualConsole = new VirtualConsole();
  virtualConsole.on('jsdomError', (e) => errors.push(e.message));

  const dom = new JSDOM(html, {
    runScripts: 'dangerously',
    pretendToBeVisual: true,
    virtualConsole,
    beforeParse(window) {
      // As in a real LMS, the API lives on the parent frame, not on the SCO window.
      const key = formData.scormVersion === '1.2' ? 'API' : 'API_1484_11';
      Object.defineProperty(window, 'parent', { value: { [key]: api } });
      Object.defineProperty(window, 'opener', { value: null });
    },
  });
  await new Promise<void>((resolve) => {
    if (dom.window.document.readyState === 'complete') resolve();
    else dom.window.addEventListener('load', () => resolve());
  });
  return { dom, window: dom.window, document: dom.window.document, api, errors, html };
};
