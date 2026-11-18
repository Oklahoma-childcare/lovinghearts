import {createServer} from 'node:http';
import {readFileSync,existsSync,statSync,watch} from 'node:fs';
import {resolve,join,extname,sep} from 'node:path';
import os from 'node:os';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const root=resolve(fileURLToPath(new URL('..',import.meta.url)));
const dist=join(root,'dist');
const dev=process.argv.includes('--watch');
if(dev||!existsSync(join(dist,'index.html'))){const r=spawnSync(process.execPath,[join(root,'scripts','build.mjs')],{cwd:root,stdio:'inherit'});if(r.status!==0)process.exit(1);}
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.gif':'image/gif','.ico':'image/x-icon','.xml':'application/xml; charset=utf-8','.txt':'text/plain; charset=utf-8'};
let reloadStreams=[];
const snippet=`<script>(()=>{const source=new EventSource('/__dev_reload');source.addEventListener('reload',()=>location.reload());})();</script>`;
const server=createServer((req,res)=>{
 let pathName;
 try{pathName=decodeURIComponent(new URL(req.url,'http://localhost').pathname)}catch{res.writeHead(400);return res.end('Bad request')}
 if(dev&&pathName==='/__dev_reload'){
  res.writeHead(200,{'Content-Type':'text/event-stream','Cache-Control':'no-cache','Connection':'keep-alive'});res.write(': connected\n\n');reloadStreams.push(res);req.on('close',()=>{reloadStreams=reloadStreams.filter(r=>r!==res)});return;
 }
 if(pathName.includes('\0')){res.writeHead(400);return res.end()}
 let candidate=resolve(dist,'.'+pathName);
 if(!candidate.startsWith(dist+sep)&&candidate!==dist){res.writeHead(403);return res.end()}
 if(existsSync(candidate)&&statSync(candidate).isDirectory())candidate=join(candidate,'index.html');
 if(!existsSync(candidate)&&!extname(candidate))candidate=join(candidate,'index.html');
 if(!existsSync(candidate)||!statSync(candidate).isFile()){res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});return res.end(readFileSync(join(dist,'404.html')))}
 const type=types[extname(candidate)]||'application/octet-stream';
 try{let bytes=readFileSync(candidate);if(dev&&extname(candidate)==='.html')bytes=Buffer.from(bytes.toString('utf8').replace('</body>',snippet+'</body>'));
 res.writeHead(200,{'Content-Type':type,'Cache-Control':dev?'no-store':'public, max-age=60'});return res.end(bytes)}catch{res.writeHead(500);return res.end('Server error')}
});
let port=Number(process.env.PORT||5173);
server.on('error',err=>{
 if(err.code==='EADDRINUSE'&&port<5200){port++;server.listen(port,'0.0.0.0')}
 else {console.error(err);process.exit(1)}
});
server.on('listening',()=>{
 console.log('\n  LOVING HEARTS & HANDS CDC 2 · '+(dev?'Development + Live Reload':'Production Preview'));
 console.log(`  Local:    http://localhost:${port}/`);
 const nets=os.networkInterfaces();let found=false;
 for(const values of Object.values(nets))for(const info of values||[]){
  if(info.family==='IPv4'&&!info.internal){console.log(`  Network:  http://${info.address}:${port}/`);found=true}
 }
 if(!found)console.log('  Network:  Connect your PC to a LAN and allow Node through your firewall.');
 if(dev)console.log('  Editing:  Saving a file in content/, src/, or public/ rebuilds and refreshes the browser.\n');
});
server.listen(port,'0.0.0.0');
if(dev){let timer;const rebuild=()=>{clearTimeout(timer);timer=setTimeout(()=>{console.log('\nChanges detected, rebuilding...');const result=spawnSync(process.execPath,[join(root,'scripts','build.mjs')],{cwd:root,stdio:'inherit'});if(result.status===0){reloadStreams.forEach(r=>r.write('event: reload\ndata: ok\n\n'));console.log('Browser refreshed.')}else console.error('Build failed; correct your JSON and save again.');},200)};
 for(const dir of ['content','src','public'])try{watch(join(root,dir),{recursive:true},rebuild)}catch(err){console.warn(`File watching unavailable for ${dir}:`,err.message)}
}
