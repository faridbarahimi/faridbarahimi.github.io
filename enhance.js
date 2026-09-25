(()=>{const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const user="faridbarahimi";
const api="https://api.github.com";
const go=t=>{const el=$(t);if(el)el.scrollIntoView({behavior:"smooth",block:"start"})};
$$("[data-target]").forEach(el=>el.addEventListener("click",()=>go(el.dataset.target)));
$$("nav a").forEach(a=>a.addEventListener("click",e=>{e.preventDefault();go(a.getAttribute("href"));history.replaceState(null,"",a.getAttribute("href"))}));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("in")}),{threshold:.1});
$$(".reveal").forEach(e=>io.observe(e));
const sections=$$("section[id]"),navLinks=$$("nav a");
const navIO=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)navLinks.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+e.target.id))}),{rootMargin:"-35% 0px -55% 0px"});
sections.forEach(s=>navIO.observe(s));
const glow=$(".cursor-glow");addEventListener("pointermove",e=>{if(glow){glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px"}});
const canvas=$("#stars"),ctx=canvas&&canvas.getContext("2d");let pts=[];
function resize(){if(!canvas)return;canvas.width=innerWidth*devicePixelRatio;canvas.height=innerHeight*devicePixelRatio;canvas.style.width=innerWidth+"px";canvas.style.height=innerHeight+"px";ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);pts=Array.from({length:Math.min(95,Math.max(40,innerWidth/18))},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-.5)*.13,vy:(Math.random()-.5)*.13}))}
function draw(){if(!ctx)return;ctx.clearRect(0,0,innerWidth,innerHeight);for(let i=0;i<pts.length;i++){const p=pts[i];p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>innerWidth)p.vx*=-1;if(p.y<0||p.y>innerHeight)p.vy*=-1;ctx.fillStyle="rgba(82,232,255,.35)";ctx.beginPath();ctx.arc(p.x,p.y,1,0,7);ctx.fill();for(let j=i+1;j<pts.length;j++){const q=pts[j],d=Math.hypot(p.x-q.x,p.y-q.y);if(d<105){ctx.strokeStyle="rgba(146,124,255,"+(1-d/105)*.055+")";ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke()}}}requestAnimationFrame(draw)}
resize();addEventListener("resize",resize);if(!matchMedia("(prefers-reduced-motion: reduce)").matches)draw();
async function fetchJSON(url){const r=await fetch(url,{headers:{Accept:"application/vnd.github+json"}});if(!r.ok)throw new Error(r.status);return r.json()}
function fmt(n){return new Intl.NumberFormat("en-US",{notation:"compact",maximumFractionDigits:1}).format(n||0)}
function setText(id,v){const el=$("#"+id);if(el)el.textContent=v}
function drawRepoChart(repos){
 const c=$("#repoChart");if(!c)return;const box=c.getBoundingClientRect(),dpr=devicePixelRatio||1;c.width=Math.max(300,box.width*dpr);c.height=150*dpr;const x=c.getContext("2d");x.scale(dpr,dpr);
 const w=box.width,h=150,pad={l:12,r:12,t:18,b:30};x.clearRect(0,0,w,h);
 const data=repos.filter(r=>!r.fork).slice(0,10);const max=Math.max(1,...data.map(r=>r.stargazers_count||0));const gap=8;const bw=Math.max(14,(w-pad.l-pad.r-gap*(data.length-1))/Math.max(1,data.length));
 data.forEach((r,i)=>{const bh=((r.stargazers_count||0)/max)*(h-pad.t-pad.b);const xx=pad.l+i*(bw+gap),yy=h-pad.b-bh;const g=x.createLinearGradient(0,yy,0,h);g.addColorStop(0,"#54e9ff");g.addColorStop(1,"#927cff");x.fillStyle=g;x.roundRect(xx,yy,bw,bh,4);x.fill();x.fillStyle="#6d8197";x.font="8px DM Mono";x.textAlign="center";x.fillText((r.name||"repo").slice(0,12),xx+bw/2,h-10)});
 x.fillStyle="#53677d";x.font="8px DM Mono";x.textAlign="left";x.fillText("stars",pad.l,10);
}
function renderModels(models){
 const host=$("#liveModelList");if(!host)return;host.replaceChildren();
 const prefixes=["openai/","anthropic/","google/","qwen/","deepseek/","meta-llama/","mistralai/","x-ai/"];
 const chosen=[];for(const p of prefixes){const m=models.find(x=>String(x.id||"").toLowerCase().startsWith(p));if(m)chosen.push(m)}
 models.forEach(m=>{if(chosen.length<8&&!chosen.includes(m))chosen.push(m)});
 chosen.slice(0,8).forEach(m=>{
  const a=document.createElement("a");a.href="https://openrouter.ai/"+String(m.id||"");a.target="_blank";a.rel="noopener";
  const b=document.createElement("b");b.textContent=m.id||"model";const s=document.createElement("span");s.textContent="LIVE DIRECTORY · "+(m.context_length?fmt(m.context_length)+" ctx":"provider model");
  a.append(b,s);host.append(a);
 });
}
async function loadLive(){
 try{
  const [profile,repos,models]=await Promise.all([
   fetchJSON(api+"/users/"+user),
   fetchJSON(api+"/users/"+user+"/repos?per_page=100&sort=updated"),
   fetchJSON("https://openrouter.ai/api/v1/models")
  ]);
  const publicRepos=repos.filter(r=>!r.private);
  const stars=publicRepos.reduce((s,r)=>s+(r.stargazers_count||0),0);
  const langs=new Set(publicRepos.map(r=>r.language).filter(Boolean));
  setText("repoCount",publicRepos.length);setText("followerCount",profile.followers||0);setText("starCount",stars);setText("languageCount",langs.size);
  const modelData=Array.isArray(models.data)?models.data:[];
  const modelTotal=modelData.length||null;
  setText("modelCount",modelTotal??"—");setText("modelCountLarge",modelTotal??"—");
  renderModels(modelData);
  const pulse=$("#modelPulse");if(pulse){pulse.textContent=modelTotal?"LIVE DIRECTORY":"OFFLINE";pulse.style.color=modelTotal?"var(--green)":"var(--red)"}
  drawRepoChart(publicRepos);
  setText("lastUpdated","updated "+new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"}));
 }catch(e){
  setText("lastUpdated","public API unavailable — visual fallback");
  setText("modelPulse","FALLBACK");
 }
}
loadLive();setInterval(loadLive,300000);
})();
/* Interaction layer */
(()=>{
const modal=$("#uiModal"),modalTitle=$("#modalTitle"),modalBody=$("#modalBody"),modalKicker=$("#modalKicker"),modalMeta=$("#modalMeta");
const nodeInfo={
 human:{k:"01 / HUMAN AUTHORITY",t:"Human Intent",b:"The human defines the goal, authority boundary and decisions that cannot be silently delegated. AICP treats human approval as a first-class control point.",m:["Goals","Authority","Decisions"]},
 aicp:{k:"02 / CONTROL PLANE",t:"AICP",b:"AICP coordinates governance, state, routing, execution and evidence. The model is replaceable; the work state and control boundary are not.",m:["Governance","State","Routing"]},
 models:{k:"03 / INTELLIGENCE",t:"Model Network",b:"Multiple providers can be discovered and routed by capability, cost and task requirements instead of binding the whole workflow to one model.",m:["Capability","Providers","Cost-aware"]},
 workers:{k:"04 / WORKFORCE",t:"AI Workers",b:"Planner, Executor, Reviewer and specialist workers can operate inside bounded task transactions with checkpoints and independent verification.",m:["Planner","Executor","Reviewer"]},
 tools:{k:"05 / ACTION LAYER",t:"Tools & Environments",b:"Real work crosses tools and environments such as GitHub, web services, VPS machines and applications through explicit control boundaries.",m:["GitHub","Web","VPS"]},
 evidence:{k:"06 / TRUST LAYER",t:"Evidence",b:"Claims become inspectable through evidence, commands, results and verification. Important work should leave a durable trail.",m:["Claim","Result","Verify"]}
};
function openNode(key){const n=nodeInfo[key];if(!n||!modal)return;modalKicker.textContent=n.k;modalTitle.textContent=n.t;modalBody.textContent=n.b;modalMeta.replaceChildren();n.m.forEach(v=>{const s=document.createElement("span");s.textContent=v;modalMeta.append(s)});modal.classList.add("open");modal.setAttribute("aria-hidden","false")}
function closeModal(){if(!modal)return;modal.classList.remove("open");modal.setAttribute("aria-hidden","true")}
$$("[data-node]").forEach(el=>el.addEventListener("click",e=>{e.stopPropagation();openNode(el.dataset.node)}));
$$("[data-close-modal]").forEach(el=>el.addEventListener("click",closeModal));
addEventListener("keydown",e=>{if(e.key==="Escape")closeModal();if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();document.querySelector(".hero-actions .primary")?.focus()}});
$$(".board-grid button,.map-node,.project,.model-grid a").forEach(el=>el.addEventListener("pointermove",e=>{const r=el.getBoundingClientRect();el.style.setProperty("--mx",((e.clientX-r.left)/r.width*100)+"%");el.style.setProperty("--my",((e.clientY-r.top)/r.height*100)+"%") }));
const progress=$("#scrollProgress");
function updateProgress(){if(!progress)return;const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max>0?(scrollY/max)*100:0)+"%"}
addEventListener("scroll",updateProgress,{passive:true});addEventListener("resize",updateProgress);updateProgress();
const railLinks=$$(".section-rail a"),railSections=sections;
const railIO=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)railLinks.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+e.target.id))}),{rootMargin:"-42% 0px -42% 0px",threshold:.01});railSections.forEach(s=>railIO.observe(s));
$$(".section-rail a").forEach(a=>a.addEventListener("click",e=>{e.preventDefault();go(a.getAttribute("href"));history.replaceState(null,"",a.getAttribute("href"))}));
const reduced=matchMedia("(prefers-reduced-motion: reduce)");
if(!reduced.matches){document.documentElement.classList.add("motion-ready");}
})();
