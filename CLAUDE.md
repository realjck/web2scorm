# web2scorm

Client-side React + TypeScript app (Vite) that generates SCORM 1.2 / 2004 packages from a URL or HTML code. No backend. Live at https://web2scorm.pxly.fr (GitHub Pages).

## Commands

- `npm run dev`: dev server at http://localhost:5173/
- `npm test`: Vitest (run before every commit)
- `npm run lint`: ESLint (0 errors expected; 2 known warnings)
- `npm run build`: production build into `dist/`

CI (`.github/workflows/deploy.yml`) runs lint, tests and build on every push to `main`, then deploys `dist/` to the `gh-pages` branch. A push to `main` is a production deploy.

## Structure

- `/` presentation portal (`src/pages/Home.tsx`, `src/components/portal/`), `/app` packaging tool (`src/pages/Index.tsx`). Both are lazy-loaded inside `src/components/Layout.tsx` (shared navbar).
- `src/utils/scormGenerator.ts`: builds the package `index.html` and the zip.
- `src/utils/scormAPI.ts`: SCORM runtime JS for the package, kept as template strings (plain browser JS, not TypeScript).
- `src/utils/manifestGenerator.ts`: `imsmanifest.xml`. A new identifier per generation is intended (the LMS sees each package as a new module).
- `public/xsd/`: schemas copied into every package.

## Conventions

- Code, comments, docs and commit messages in English.
- Every source file starts with the GPL header block: copy it from a neighbouring file.
- Commit messages use gitmoji, one logical change per commit. Never add a `Co-Authored-By` or any Claude attribution.
- Fix bugs test-first: reproduce with a failing test, then fix.

## Testing generated packages

`src/test/runPackage.ts` generates a real package and runs it in jsdom against a mock LMS. As in a real LMS, the API is exposed on the parent frame, not on the package window. jsdom lacks `TextEncoder` and `crypto.subtle`, so the helper injects Node's versions.

## Pitfalls

- Anything inserted into the generated package must go through `toInlineJson` (JS / inline script data) or `escapeHtml` (HTML). Raw interpolation breaks the package on `</script>`, quotes or `${`.
- Completion codes ignore case and surrounding spaces (`normalizeCompletionCode`). The package's inline JS applies the same rule and must stay in sync.
- Never reset `lesson_status` / `completion_status` on launch: only a first attempt becomes `incomplete`.
- Tailwind loads `tailwind.config.js`. `html`, `body` and `#root` are `overflow: hidden`, so each page scrolls inside its own container. The portal uses the `font-system` font stack, the tool uses Inter.
- Deployment: Vite `base` is `/` (custom domain, `public/CNAME`). The build copies `index.html` to `404.html` (SPA fallback) and to `app.html`, so `/app` is served with a 200 status. A new top-level route needs the same copy in the `build` script.
- The CI runs on Node 22. Some build dependencies need a global `crypto`, so do not go back to Node 18.
