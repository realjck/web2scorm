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
import { createLmsApi, runPackage } from '@/test/runPackage';

describe('SCORM 1.2 initialization', () => {
  it('marks a first attempt as incomplete', async () => {
    const api = createLmsApi({ 'cmi.core.lesson_status': 'not attempted' });
    await runPackage({ scormVersion: '1.2' }, api);
    expect(api.values['cmi.core.lesson_status']).toBe('incomplete');
  });

  it.each(['completed', 'passed'])('keeps a previous "%s" status on relaunch', async (status) => {
    const api = createLmsApi({ 'cmi.core.lesson_status': status });
    await runPackage({ scormVersion: '1.2' }, api);
    expect(api.values['cmi.core.lesson_status']).toBe(status);
  });
});

describe.each([
  ['1.2', 'cmi.core.session_time'],
  ['2004', 'cmi.session_time'],
] as const)('SCORM %s session end', (scormVersion, sessionTimeKey) => {
  it('saves the session time and terminates when the page is hidden', async () => {
    const { window, api } = await runPackage({ scormVersion });

    window.dispatchEvent(new window.Event('pagehide'));

    const setTime = api.calls.findIndex((c) => c.startsWith(`SetValue(${sessionTimeKey}`));
    const terminate = api.calls.indexOf('Terminate()');
    expect(setTime).toBeGreaterThanOrEqual(0);
    expect(terminate).toBeGreaterThan(setTime);
  });

  it('terminates only once when several unload events fire', async () => {
    const { window, api } = await runPackage({ scormVersion });

    window.dispatchEvent(new window.Event('beforeunload'));
    window.dispatchEvent(new window.Event('pagehide'));

    expect(api.calls.filter((c) => c === 'Terminate()')).toHaveLength(1);
  });
});

describe('SCORM 2004 initialization', () => {
  it('marks a first attempt as incomplete', async () => {
    const api = createLmsApi({ 'cmi.completion_status': 'unknown', 'cmi.success_status': 'unknown' });
    await runPackage({ scormVersion: '2004' }, api);
    expect(api.values['cmi.completion_status']).toBe('incomplete');
  });

  it('keeps a previous completion and success on relaunch', async () => {
    const api = createLmsApi({ 'cmi.completion_status': 'completed', 'cmi.success_status': 'passed' });
    await runPackage({ scormVersion: '2004' }, api);
    expect(api.values['cmi.completion_status']).toBe('completed');
    expect(api.values['cmi.success_status']).toBe('passed');
  });
});
