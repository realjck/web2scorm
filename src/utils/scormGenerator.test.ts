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
import { runPackage } from '@/test/runPackage';

const iframeHtml = (document: Document) => {
  const frame = document.getElementById('content-frame') as HTMLIFrameElement;
  return frame.contentDocument?.documentElement.outerHTML ?? '';
};

describe('completion code', () => {
  const submitCode = async (completionCode: string, entered: string) => {
    const run = await runPackage({ packageType: 'iframe-with-code', completionCode });
    const input = run.document.getElementById('completion-code') as HTMLInputElement;
    input.value = entered;
    (run.document.getElementById('validate-btn') as HTMLButtonElement).click();
    await new Promise((resolve) => setTimeout(resolve, 50)); // let the async hash resolve
    return run;
  };

  it.each([
    ['the exact code', 'Secret42', 'Secret42'],
    ['a different case', 'Secret42', 'sECRET42'],
    ['surrounding spaces on the entered code', 'Secret42', '  Secret42 '],
    ['surrounding spaces on the configured code', ' Secret42 ', 'Secret42'],
  ])('accepts %s', async (_label, completionCode, entered) => {
    const { api, errors } = await submitCode(completionCode, entered);
    expect(errors).toEqual([]);
    expect(api.values['cmi.core.lesson_status']).toBe('completed');
  });

  it('rejects a wrong code', async () => {
    const { api } = await submitCode('Secret42', 'Secret43');
    expect(api.values['cmi.core.lesson_status']).toBe('incomplete');
  });
});

describe('iframe HTML content', () => {
  it.each([
    ['a closing script tag', '<p>before</p><script>var x = 1;</script><p>after</p>'],
    ['a template literal placeholder', '<p>price: ${amount}</p>'],
    ['backslashes', '<p>C:\\temp\\new</p>'],
  ])('is injected unchanged when it contains %s', async (_label, content) => {
    const { document, errors } = await runPackage({ iframeContent: content });

    expect(errors).toEqual([]);
    const injected = iframeHtml(document);
    for (const fragment of content.match(/<p>.*?<\/p>/g) ?? []) {
      expect(injected).toContain(fragment);
    }
  });

  it('loads a URL as the iframe source', async () => {
    const url = 'https://example.com/page?a=1&b="x"';
    const { document, errors } = await runPackage({ iframeContent: url });

    expect(errors).toEqual([]);
    expect(document.getElementById('content-frame')?.getAttribute('src')).toBe(url);
  });

  it('still initializes the SCORM session when the content contains a script', async () => {
    const { api } = await runPackage({ iframeContent: '<script>var x = 1;</script><p>ok</p>' });
    expect(api.calls).toContain('Initialize()');
  });
});
