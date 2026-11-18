import {readFileSync,writeFileSync,mkdirSync,rmSync,cpSync,existsSync} from 'node:fs';
import {join,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {layout,pages} from '../src/pages.mjs';
const root=resolve(fileURLToPath(new URL('..',import.meta.url)));
const read=name=>JSON.parse(readFileSync(join(root,'content',name),'utf8'));
const s=read('EDIT-ME-site.json');
const m=read('EDIT-ME-media.json');
const v=read('EDIT-ME-visibility.json');
const faq=read('EDIT-ME-questions.json').map(item=>({question:item.question,answer:item.answer.replaceAll('{{phone}}',s.phoneDisplay).replaceAll('{{email}}',s.email)}));
if(!s.businessName||!s.license||!s.phoneHref||!s.email||!s.streetAddress||!Array.isArray(s.ageGroups)||s.ageGroups.length!==4)throw new Error('A required provider field or age group is missing from EDIT-ME-site.json');
for(const key of ['brandLogo','hero','about',...s.ageGroups.map(g=>g.key)])if(!m[key]?.src||!m[key]?.alt)throw new Error(`Missing media slot ${key} in EDIT-ME-media.json`);
for(const url of [s.facebookUrl,s.instagramUrl].filter(Boolean))if(!/^https:\/\//i.test(url))throw new Error('Social links must be full https:// links');
for(const item of faq)if(!item.question||!item.answer)throw new Error('Blank FAQ question or answer');
for(const key of ['facilityPhoto','teamPhoto'])if(v[`show${key[0].toUpperCase()+key.slice(1)}`]&&(!m[key]?.src||m[key].authenticCenterAsset!==true||!existsSync(join(root,'public',m[key].src.replace(/^\//,'')))))throw new Error(`You enabled ${key}, but it must have an authenticated, existing photo first`);
const dist=join(root,'dist');rmSync(dist,{recursive:true,force:true});mkdirSync(dist,{recursive:true});cpSync(join(root,'public'),dist,{recursive:true});mkdirSync(join(dist,'assets'),{recursive:true});
const css=readFileSync(join(root,'src','style.css'),'utf8'),theme=readFileSync(join(root,'content','EDIT-ME-theme.css'),'utf8');
const imports=css.match(/^(?:@import[^\n]*\n)*/)?.[0]||'';
writeFileSync(join(dist,'assets','style.css'),`${imports}\n${theme}\n${css.slice(imports.length)}`);
cpSync(join(root,'src','app.js'),join(dist,'assets','app.js'));
const pagesData=pages(s,m,v,faq);
for(const page of pagesData){const folder=join(dist,page.path.replace(/^\/+|\/+$/g,''));mkdirSync(folder,{recursive:true});writeFileSync(join(folder,'index.html'),layout({s,m,v,page}));console.log('Generated',page.path)}
const base=(s.siteUrl||'').trim().replace(/\/$/,'');
writeFileSync(join(dist,'robots.txt'),`User-agent: *\nAllow: /\n${/^https:\/\//.test(base)?`Sitemap: ${base}/sitemap.xml\n`:''}`);
if(/^https:\/\//.test(base)){writeFileSync(join(dist,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pagesData.map(p=>`<url><loc>${base}${p.path}</loc></url>`).join('')}</urlset>`)}
writeFileSync(join(dist,'404.html'),`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="Page not found. Return to the Loving Hearts &amp; Hands CDC 2 homepage."><title>Page not found | ${s.businessName}</title><link rel="icon" href="/branding/favicon.svg"><link rel="stylesheet" href="/assets/style.css"></head><body><main class="section-pad"><div class="container"><p class="kicker">404 / Lost little page</p><h1 class="display-heading">This page took a<br><em>little detour.</em></h1><p style="margin:30px 0">Find the correct page using the link below.</p><a href="/" class="btn btn-dark">Go to homepage →</a></div></main></body></html>`);
console.log('Production build ready: dist/ — six HTML pages, styles, scripts, original artwork, and metadata.');
