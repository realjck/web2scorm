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

const STORAGE_KEY = 'scorm_form_data';

/** Returns the saved form data, or null when there is none or it cannot be read. */
export const loadFormData = (): ScormFormData | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error('Failed to load saved form data:', error);
    return null;
  }
};

/**
 * Saves the form data. Returns false instead of throwing when storage is full
 * (e.g. a large base64 logo) or unavailable.
 */
export const saveFormData = (data: ScormFormData): boolean => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Failed to save form data:', error);
    return false;
  }
};
