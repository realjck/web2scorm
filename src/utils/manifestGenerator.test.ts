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
import { describe, expect, it } from 'vitest';
import { baseFormData } from '@/test/runPackage';
import { generateScorm12Manifest, generateScorm2004Manifest } from './manifestGenerator';

// Pattern of DurationString in public/xsd/scorm2004/common/dataTypes.xsd
const ISO_DURATION = /^P(\d+Y)?(\d+M)?(\d+D)?(T(\d+H)?(\d+M)?(\d+(\.\d+)?S)?)?$/;

const between = (xml: string, tag: string) => xml.match(new RegExp(`<${tag}>(.*?)</${tag}>`))?.[1];

describe('typical learning time (duration entered in minutes)', () => {
  it.each([
    ['60', 'PT60M'],
    ['90', 'PT90M'],
    ['', 'PT30M'],
    ['abc', 'PT30M'],
  ])('SCORM 2004: "%s" gives a valid ISO 8601 duration %s', (duration, expected) => {
    const value = between(generateScorm2004Manifest({ ...baseFormData, duration }), 'duration');
    expect(value).toBe(expected);
    expect(value).toMatch(ISO_DURATION);
  });

  it.each([
    ['60', '01:00:00'],
    ['90', '01:30:00'],
    ['5', '00:05:00'],
    ['', '00:30:00'],
  ])('SCORM 1.2: "%s" gives %s', (duration, expected) => {
    expect(between(generateScorm12Manifest({ ...baseFormData, duration }), 'datetime')).toBe(expected);
  });
});
