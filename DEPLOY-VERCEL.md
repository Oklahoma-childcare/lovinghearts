# Vercel deployment (for this exact new project)

1. Create a GitHub repo for this website, or replace your intended repository's website files with the files in this ZIP. Keep the actual `package.json`, `vercel.json`, `scripts/`, `content/`, `src/`, `public/` at the repository root.
2. In Vercel, import the correct GitHub repository and the `main` branch.
3. Settings → Build and Deployment:
   - Framework Preset: **Other**
   - Build Command: **npm run build**
   - Output Directory: **dist** (Override ON if required)
   - Root Directory: **blank / repository root**
4. Deploy. This project generates **dist/index.html** and five subdirectories with their own **index.html**.
5. After a change, commit and push to GitHub so Vercel uses a new commit. Merely redeploying an old commit rebuilds the old source.
6. On the new deployment, visit Source → Output and verify `index.html` and the five route directories exist in the published root. If ready but 404, compare project settings and the Source → Output file list, and check you're visiting the correct deployment's URL.
7. When the real live domain is known, enter it as `siteUrl` in `content/EDIT-ME-site.json` and publish a new commit. Canonical URLs and `sitemap.xml` are generated then.

This is a **dependency-free static** website; it does not need a Node server on Vercel. `npm run dev` is only for your computer.
