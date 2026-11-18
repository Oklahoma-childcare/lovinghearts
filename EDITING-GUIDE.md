# EDITING GUIDE — Everything You Might Need to Change

The content files intentionally begin with `EDIT-ME` so they are easy to locate. You do **not** have to touch `src/pages.mjs` for ordinary facts or photos.

## 1 — Edit contact details, director, ages and hours

Open `content/EDIT-ME-site.json` in VS Code. For example:

```json
"phoneDisplay": "(580) 339-5024",
"phoneHref": "+15803395024",
"email": "princessmartin46@gmail.com"
```

`phoneHref` must be a callable international-format number (`+1...`, digits only after plus). Change both the display and clickable number if the center gives you a different phone number. The contact form recipient automatically follows the email field. Other fields in the same file control every age-group description, brand text, address, location link, city, director, operating hours, capacity, license and state quality level.

For a new schedule, review **both** `weekHoursLong`, `weekHoursShort` and `hoursOpen24`/`hoursClose24`; the last two also feed the SEO structured data. Change the FAQ schedule answer in `content/EDIT-ME-questions.json` if the schedule changes.

## 2 — Add a VERIFIED Facebook or Instagram account

In `content/EDIT-ME-site.json`, set:

```json
"facebookUrl": "https://www.facebook.com/YOUR-VERIFIED-PAGE",
"instagramUrl": ""
```

Social links appear only when they have a non-empty https URL. **Do not copy the `possibleUnverifiedFacebookUrl` automatically.** A similarly named CDC business exists in Elk City, and the proposed Facebook page has not been tied to CDC 2 with sufficient evidence. Ask the operator to confirm the exact page and branch.

## 3 — Replace the temporary logo

Add an approved `logo.png` or `logo.svg` to `public/branding/`, then change `brandLogo.src` in `content/EDIT-ME-media.json` to `/branding/logo.png` (or `.svg`). Update the `brandLogo.alt` and optionally replace `public/branding/favicon.svg`.

The original logo in this project is an original, temporary heart illustration — it is **not** presented as the center's verified logo.

## 4 — Replace any illustration with an approved photograph

Copy the photo into `public/photos/`, for example `approved-building.jpg`. Then change the desired slot in `content/EDIT-ME-media.json`, for example:

```json
"hero": {
  "src": "/photos/approved-building.jpg",
  "alt": "Approved photograph of the center's entrance",
  "authenticCenterAsset": true
}
```

It replaces the hero illustration automatically. Other slots are `about`, `infants`, `toddlers`, `preschool` and `schoolage`. Original artwork is safely packaged in `public/art/`. The default illustrations have explicit alt text saying they are **not** real center photos.

To ADD an authentic facility or team photograph to the Our Center page instead of replacing an existing illustration:

- Put its file in `public/photos/`.
- Set the `facilityPhoto` / `teamPhoto` slot's `src`, `alt` and `authenticCenterAsset: true`.
- In `content/EDIT-ME-visibility.json`, change `showFacilityPhoto` / `showTeamPhoto` to `true`.
- The build intentionally stops if you try to enable an unverified or nonexistent facility/team photo.

## 5 — Hide details that may have changed

Open `content/EDIT-ME-visibility.json`. These switches control the optional pieces:

```json
"showDirector": true,
"showCapacity": true,
"showQualityLevel": true,
"showSubsidies": true,
"showYearRound": true,
"showFacilityPhoto": false,
"showTeamPhoto": false,
"showTuitionInfo": false,
"showEnrollmentNotice": false
```

Set a value to `false` to hide it. For tuition or enrollment notices, first replace the text in `tuitionInfo` or `enrollmentNotice`, verify the information with the center, then turn the flag on.

## 6 — Change colors

Open `content/EDIT-ME-theme.css`. Edit the hex codes after `--ink`, `--paper`, `--coral`, `--lavender`, `--sage`, etc. This controls the design without editing the main CSS layout.

## 7 — Edit FAQs

Open `content/EDIT-ME-questions.json`. Each item is a `question` and `answer`. You can add, remove, or edit items as valid JSON. The FAQ supports `{{phone}}` and `{{email}}`, which automatically become the current contact details from `EDIT-ME-site.json` during the build.

## 8 — Rebuild and publish changes

```bash
npm run build
npm run check
```

If `npm run dev` is already running, saving a content file rebuilds and reloads automatically. For Vercel, **commit and push all changes** to GitHub to trigger a genuinely new deployment. A Vercel redeploy of an old commit does not include your local changes. Verify that Vercel displays a new commit ID and includes `dist/index.html`.

## 9 — Domain, SEO and sitemap

When you know the real deployed domain, put it in `siteUrl` (HTTPS only) in `content/EDIT-ME-site.json`, for example `https://your-actual-domain.com`. Run `npm run build` again. The website then generates canonical page links, `sitemap.xml` and a sitemap reference in `robots.txt`. Don't use a made-up domain.
