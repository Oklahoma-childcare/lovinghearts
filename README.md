# Loving Hearts & Hands CDC 2 — Fresh Website

**Location:** Elk City, Oklahoma · **Childcare license:** K830058297  
**Style:** Soft editorial / illustrated paper collage · cream, peach, sage and lavender

A completely new, accessible, six-page website with original artwork. All concrete business facts are based on this specific Oklahoma childcare license, not the similarly named provider at 712 N Washington Ave. The design uses no photographs pretending to show the center.

## Run locally (VS Code)

1. Unzip the project and open the **Loving_Hearts_CDC2_Fresh_Editable_2026** folder in VS Code.
2. Open **Terminal → New Terminal** in that folder.
3. Run:

```bash
npm run dev
```

There are **no npm dependencies**; no `npm install` is necessary if Node.js 20+ is available.

`npm run dev` builds the site, starts a local server, and prints your actual URLs:

```
Local:    http://localhost:5173/
Network:  http://<YOUR-PC-LAN-IP>:5173/
```

If that port is in use, it automatically tries a higher port (e.g. 5174). On a phone, use the Network URL when the phone and computer are on the same Wi-Fi. If access is blocked, allow the Node process through the Windows Private Network firewall.

Saving changes to `content/`, `src/` or `public/` rebuilds and refreshes the browser automatically.

## Website pages

- `/` — Home, key facts and four age groups
- `/our-center/` — Verified licensing details and practical information
- `/age-groups/` — Four interactive age tabs (infants, toddlers, preschool, school-age)
- `/for-families/` — Browser-only family checklist
- `/questions/` — Editable FAQ section
- `/contact/` — Contact details and email-draft form

No payment, accounts, server forms, or automatic email sending are included.

## Editing without touching page code

- `content/EDIT-ME-site.json` — All business details, phone, email, address, hours, director, age groups, heading text, optional social URLs and production domain
- `content/EDIT-ME-questions.json` — Every FAQ question and answer
- `content/EDIT-ME-visibility.json` — Show/hide director, quality level, subsidy details, optional photos, enrollment and tuition notices
- `content/EDIT-ME-media.json` — Images/logo and alt descriptions
- `content/EDIT-ME-theme.css` — Site color variables
- `public/branding/logo.svg` — Original temporary branding; replace with permission
- `public/art/` — Original illustration assets, not facility photos
- `public/photos/` — Place for approved photos (instructions included)

Detailed instructions: **EDITING-GUIDE.md**. Unsupported claims and the potential Facebook identity mismatch: **UNVERIFIED-ITEMS.txt**.

## Build & deploy

```bash
npm run build
npm run check
```

This produces `dist/index.html` and all six site routes. Publish the contents of `dist`.

**Vercel:** Framework Preset = `Other`; Build Command = `npm run build`; Output Directory = `dist`; Root Directory = repository root containing `package.json` and `vercel.json`.

**Cloudflare Pages:** Build Command = `npm run build`; Build output directory = `dist`.

Commit `vercel.json`, `package.json`, `scripts/`, `content/`, `src/`, `public/` and the README to your repository. The included `dist/` can also be uploaded to static hosts.

After deployment, set `siteUrl` in `content/EDIT-ME-site.json` to the real, approved `https://...` URL and rebuild. This enables canonical URLs and `sitemap.xml` automatically. Leave it blank until the correct domain is known.

## Before making the site public

Confirm the center's permission, current details, approved logo and photos; ask which social accounts are really for CDC 2; ask about tuition, availability, enrollment and tours. Do not publish pictures of identifiable children without appropriate permission. See **FACT-CHECK.md**.
