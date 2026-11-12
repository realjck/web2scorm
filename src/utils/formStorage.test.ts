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
import { afterEach, describe, expect, it, vi } from 'vitest';
import { baseFormData } from '@/test/runPackage';
import { loadFormData, saveFormData } from './formStorage';

const memoryStorage = (initial: Record<string, string> = {}) => {
  const items = { ...initial };
  return {
    getItem: (key: string) => items[key] ?? null,
    setItem: (key: string, value: string) => { items[key] = value; },
    items,
  };
};

const throwingStorage = (name: string) => ({
  getItem: () => { throw new DOMException('denied', name); },
  setItem: () => { throw new DOMException('full', name); },
});

afterEach(() => vi.unstubAllGlobals());

describe('form storage', () => {
  it('round-trips the form data', () => {
    vi.stubGlobal('localStorage', memoryStorage());
    expect(saveFormData(baseFormData)).toBe(true);
    expect(loadFormData()).toEqual(baseFormData);
  });

  it('reports a failed save instead of throwing when the quota is exceeded (large logo)', () => {
    vi.stubGlobal('localStorage', throwingStorage('QuotaExceededError'));
    expect(saveFormData({ ...baseFormData, logo: 'data:image/png;base64,AAAA' })).toBe(false);
  });

  it('returns null when storage is unavailable', () => {
    vi.stubGlobal('localStorage', throwingStorage('SecurityError'));
    expect(loadFormData()).toBeNull();
  });

  it('returns null when the saved data is corrupted', () => {
    vi.stubGlobal('localStorage', memoryStorage({ scorm_form_data: '{not json' }));
    expect(loadFormData()).toBeNull();
  });
});
