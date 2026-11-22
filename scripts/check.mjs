import {readFileSync,existsSync,readdirSync,statSync} from 'node:fs';
import {join,resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(fileURLToPath(new URL('..',import.meta.url))), dist=join(root,'dist');
let checks=0, errors=[];
const paths=['/','/our-center/','/age-groups/','/for-families/','/questions/','/contact/'];
const must=(condition,message)=>{checks++;if(!condition)errors.push(message)};
const collect=dir=>readdirSync(dir,{withFileTypes:true}).flatMap(item=>{const p=join(dir,item.name);return item.isDirectory()?collect(p):[p]});
const files=collect(dist);
const htmlFiles=files.filter(f=>f.endsWith('.html'));
const ignoreExternal=p=>/^(https?:|mailto:|tel:|#|data:|javascript:)/i.test(p);
for(const route of paths){const f=join(dist,route,'index.html');must(existsSync(f),`Missing route: ${route}`)};
for(const f of htmlFiles){let html=readFileSync(f,'utf8');must(/<title>[^<]+<\/title>/.test(html),`Missing title ${f}`);must(/<h1[\s>]/.test(html),`Missing h1 ${f}`);must(!html.includes('${'),`Unrendered template variable in ${f}`);must(!html.includes('REPLACE-ME'),`Unreviewed placeholder in HTML ${f}`);must(/<meta name="description"/.test(html),`Missing description ${f}`);
 for(const match of html.matchAll(/(?:href|src)="([^"]+)"/g)){const link=match[1];if(ignoreExternal(link))continue;const clean=decodeURI(link.split('?')[0].split('#')[0]);if(!clean)continue;let p=clean.startsWith('/')?join(dist,clean):join(dirname(f),clean);if(clean.endsWith('/'))p=join(p,'index.html');else if(!existsSync(p)&&!p.includes('.'))p=join(p,'index.html');must(existsSync(p),`Broken link ${link} in ${f}`)}
}
for(const f of files.filter(f=>f.endsWith('.svg'))){const body=readFileSync(f,'utf8');must(body.includes('<svg'),`Invalid SVG ${f}`)}
const config=JSON.parse(readFileSync(join(root,'content','EDIT-ME-site.json'),'utf8'));
must(config.facebookUrl==='https://www.facebook.com/p/Loving-Hearts-Hands-CDC-61594077848691/','Facebook page link must match the URL provided for this update');
must(!config.instagramUrl,'Instagram link should remain disabled by default');
must(htmlFiles.length===7,'Expected six pages and one custom 404');
console.log(`${checks} checks, ${errors.length} errors. ${files.length} production files, ${htmlFiles.length} HTML documents.`);
if(errors.length){console.error(errors.slice(0,25).join('\n'));process.exit(1)}
