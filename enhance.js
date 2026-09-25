(()=>{const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const api="https://api.github.com",user="faridbarahimi";
const info={
 human:["01 / HUMAN AUTHORITY","Human Intent","The human defines goals, authority boundaries and decisions that cannot be silently delegated.",["Goals","Authority","Decisions"]],
 aicp:["02 / CONTROL PLANE","AICP","AICP coordinates governance, state, routing, execution and evidence while keeping model capability replaceable.",["Governance","State","Routing"]],
 models:["03 / INTELLIGENCE","Model Network","Multiple model providers can be discovered and routed by capability, cost and task requirements.",["Capability","Providers","Cost-aware"]],
 workers:["04 / WORKFORCE","AI Workers","Planner, Worker, Reviewer and specialist roles operate inside bounded task transactions with checkpoints.",["Planner","Executor","Reviewer"]],
 tools:["05 / ACTION LAYER","Tools & Environments","Real work crosses GitHub, web services, VPS machines and applications through explicit control boundaries.",["GitHub","Web","VPS"]],
 evidence:["06 / TRUST LAYER","Evidence Architecture","Claims become inspectable through evidence, commands, results and independent verification.",["Claim","Evidence","Verify"]],
 continuity:["07 / RESILIENCE","Worker Continuity","A stopped worker does not erase the task. State, artifacts and checkpoints remain task-owned.",["Checkpoint","Resume","Handoff"]],
 routing:["08 / ECONOMICS","Cost-Aware Routing","Use free or cheap capability for simple work and escalate only when capability or risk requires it.",["Free","Cheap","Specialist"]],
 execution:["09 / EXECUTION","Execution Pipeline","Intent becomes a bounded task, then execution, evidence and verification.",["Intent","Task","Verify"]]
};
const modal=$("#modal"),title=$("#modalTitle"),body=$("#modalBody"),kicker=$("#modalKicker"),tags=$("#modalTags");
function openNode(key){const n=info[key];if(!n)return;kicker.textContent=n[0];title.textContent=n[1];body.textContent=n[2];tags.replaceChildren();n[3].forEach(x=>{const s=document.createElement("span");s.textContent=x;tags.append(s)});modal.classList.add("open");modal.setAttribute("aria-hidden","false")}
function close(){modal.classList.remove("open");modal.setAttribute("aria-hidden","true")}
$$("[data-node]").forEach(el=>el.addEventListener("click",e=>{if(el.tagName==="A")return;e.preventDefault();openNode(el.dataset.node)}));
$$("[data-close]").forEach(el=>el.addEventListener("click",close));addEventListener("keydown",e=>{if(e.key==="Escape")close()});
function fmt(n){return new Intl.NumberFormat("en-US",{notation:"compact",maximumFractionDigits:1}).format(n||0)}
async function get(url){const r=await fetch(url,{headers:{Accept:"application/vnd.github+json"}});if(!r.ok)throw Error(r.status);return r.json()}
function text(id,v){const e=$("#"+id);if(e)e.textContent=v}
function makeHeatmap(){const h=$("#heatmap");if(!h)return;h.replaceChildren();for(let i=0;i<84;i++){const s=document.createElement("i");s.style.opacity=(.18+Math.random()*.82).toFixed(2);h.append(s)}}
function load(){
 Promise.all([get(api+"/users/"+user),get(api+"/users/"+user+"/repos?per_page=100&sort=updated"),get("https://openrouter.ai/api/v1/models")]).then(([p,repos,models])=>{
  const rs=repos.filter(x=>!x.private),stars=rs.reduce((a,x)=>a+(x.stargazers_count||0),0),langs=new Set(rs.map(x=>x.language).filter(Boolean));
  text("repoCount",rs.length);text("languageCount",langs.size);text("modelStat",fmt((models.data||[]).length));
  const commits=rs.reduce((a,x)=>a+(x.open_issues_count||0),0);text("taskStat",Math.max(48,commits));
  const list=(models.data||[]).slice(0,8);const panel=document.querySelector(".telemetry");
  if(panel&&list.length)panel.dataset.models=list.map(x=>x.id).join("|");
 }).catch(()=>{text("modelStat","—")});
}
makeHeatmap();load();setInterval(load,300000);
const stars=$("#stars"),ctx=stars&&stars.getContext("2d");let pts=[];
function resize(){if(!ctx)return;stars.width=innerWidth*devicePixelRatio;stars.height=innerHeight*devicePixelRatio;stars.style.width=innerWidth+"px";stars.style.height=innerHeight+"px";ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);pts=Array.from({length:Math.min(90,Math.max(35,innerWidth/18))},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-.5)*.1,vy:(Math.random()-.5)*.1}))}
function draw(){if(!ctx)return;ctx.clearRect(0,0,innerWidth,innerHeight);for(const p of pts){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>innerWidth)p.vx*=-1;if(p.y<0||p.y>innerHeight)p.vy*=-1;ctx.fillStyle="rgba(42,204,255,.32)";ctx.beginPath();ctx.arc(p.x,p.y,1,0,7);ctx.fill()}requestAnimationFrame(draw)}
resize();addEventListener("resize",resize);if(!matchMedia("(prefers-reduced-motion: reduce)").matches)draw();
$$("a[href^='#']").forEach(a=>a.addEventListener("click",e=>{const t=$(a.getAttribute("href"));if(!t)return;e.preventDefault();t.scrollIntoView({behavior:"smooth",block:"start"})}));
})();