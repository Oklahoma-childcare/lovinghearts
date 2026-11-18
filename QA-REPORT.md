# QA report — New Loving Hearts & Hands CDC 2 website

Audit date: November 18, 2026

**Completed checks:**

- `npm run build`: passed, all 6 route `index.html` files generated.
- `npm run check`: passed, 203 static checks, 0 errors.
- `dist/index.html`: exists directly at the published output root.
- Local HTTP GET: all 6 routes returned HTTP 200.
- Local HTTP GET: CSS, JS, logo and main illustration returned HTTP 200.
- `npm run dev`: printed the localhost URL and an actual LAN Network URL; automatically selected 5174 because 5173 was occupied in the test container.
- FAQ uses configurable phone/email text replacement.
- Unverified Facebook and Instagram links are omitted from deployed pages.
- Optional facility/team photos require authentic asset flags and actual files.

**Not completed in this environment:** Automated graphical browser screenshots and hands-on mobile browser interactions. The local browser returned an administrator-policy navigation block, unrelated to the local HTTP server. Responsive CSS layouts, navigation JS, age selectors and checklist are implemented but should receive a final visual smoke test in Chrome/Edge on Windows and on a phone before production publishing.

**Recommended manual QA before launch:** Open all six URLs locally; test the mobile menu, tabs and checklist; resize down to 320px; check keyboard navigation, tel/mailto links and any new photos. In Vercel confirm deployment Source → Output includes `index.html`.

Public business facts: see `FACT-CHECK.md` and `UNVERIFIED-ITEMS.txt`.
