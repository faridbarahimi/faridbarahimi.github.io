(function(){
"use strict";
var DATA={
  architecture:{
    title:"AICP Control Plane",
    text:"A governed work-control layer between human intent, AI models, workers and real-world tools.",
    bullets:["Governance & policy","Task orchestration","Cost/context routing","State & checkpoints","Evidence & verification","Recovery & continuity"]
  },
  routing:{
    title:"Cost-Aware Routing",
    text:"AICP routes work by task complexity, capability, context budget and execution risk.",
    bullets:["Free / local for simple work","Cheap APIs for routine work","KAT Coder Pro for stronger coding","Claude Code as specialist escalation"]
  },
  continuity:{
    title:"Worker Continuity",
    text:"A worker can stop without making the task stop. Checkpoints preserve the work state so another worker can continue.",
    bullets:["Checkpoint","STOPPED","Resume","Verify","Publish"]
  },
  evidence:{
    title:"Evidence Architecture",
    text:"Every important execution can be represented as Claim → Evidence → Command → Result.",
    bullets:["OBSERVED","VERIFIED","INFERRED","PROPOSED","UNKNOWN"]
  }
};
function ready(fn){document.readyState!=="loading"?fn():document.addEventListener("DOMContentLoaded",fn);}
function q(s,c){return (c||document).querySelector(s);}
function qa(s,c){return Array.from((c||document).querySelectorAll(s));}
function modal(){  if(q("#aicp-modal")) return;
  var m=document.createElement("div");
  m.id="aicp-modal";m.className="aicp-modal";
  m.innerHTML='<div class="aicp-modal-backdrop"></div><div class="aicp-modal-panel" role="dialog" aria-modal="true"><button class="aicp-modal-close" aria-label="Close">×</button><div class="aicp-modal-kicker">AICP / INTERACTIVE EXPLORER</div><h3></h3><p></p><ul></ul></div>';
  document.body.appendChild(m);
  function close(){m.classList.remove("open");document.body.classList.remove("modal-open");}
  q(".aicp-modal-close",m).onclick=close;q(".aicp-modal-backdrop",m).onclick=close;
  document.addEventListener("keydown",function(e){if(e.key==="Escape")close();});
  m.open=function(d){q("h3",m).textContent=d.title;q("p",m).textContent=d.text;var u=q("ul",m);u.innerHTML="";d.bullets.forEach(function(x){var li=document.createElement("li");li.textContent=x;u.appendChild(li);});m.classList.add("open");document.body.classList.add("modal-open");};
}
function makeInteractive(){
  modal();
  qa(".arch-core .mod").forEach(function(el){
    var title=el.textContent.replace(/\s+/g," ").trim().split("Governance")[0];
    el.setAttribute("tabindex","0");el.setAttribute("role","button");
    el.onclick=function(){var key=(el.textContent||"").toLowerCase();var d={title:el.firstChild.textContent,text:"AICP "+key+" module.",bullets:["Policy-aware execution","Observable state","Independent verification"]};q("#aicp-modal").open(d);};
    el.onkeydown=function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();el.click();}};
  });
  [".route-options .r-opt",".cont-flow .c-box",".ev-flow .ev-item",".eco-item",".pipe-step"].forEach(function(sel){
    qa(sel).forEach(function(el){el.classList.add("aicp-clickable");el.tabIndex=0;el.onclick=function(){var d=DATA.routing;if(el.closest(".continuity"))d=DATA.continuity;if(el.closest(".evidence"))d=DATA.evidence;if(el.closest(".ecosystem"))d={title:el.textContent.trim(),text:"AICP ecosystem component.",bullets:["Defined role","Clear boundary","Connected through the control plane"]};if(el.closest(".pipeline"))d={title:"Pipeline / "+el.textContent.replace(/\s+/g," ").trim(),text:"A visible stage in the AICP execution lifecycle.",bullets:["Intent","Execution","Evidence","Verification"]};q("#aicp-modal").open(d);};el.onkeydown=function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();el.click();}};});
  });
}
function glowCards(){
  qa(".card,.models-box,.tools-box,.live-overview").forEach(function(el){
    el.addEventListener("pointermove",function(e){var r=el.getBoundingClientRect();el.style.setProperty("--mx",((e.clientX-r.left)/r.width*100)+"%");el.style.setProperty("--my",((e.clientY-r.top)/r.height*100)+"%");});
  });
}
function reveal(){  if(!("IntersectionObserver" in window))return;
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("aicp-in");io.unobserve(e.target);}})},{threshold:.12});
  qa(".card").forEach(function(e){e.classList.add("aicp-reveal");io.observe(e);});
}
function activeNav(){
  var nav=q(".nav");if(!nav)return;
  var ids=qa("section[id]").map(function(x){return x.id;});
  window.addEventListener("scroll",function(){var best="";ids.forEach(function(id){var e=q("#"+id);if(e&&e.getBoundingClientRect().top<180)best=id;});qa(".nav a").forEach(function(a){a.classList.toggle("active",a.getAttribute("href")==="#"+best);});},{passive:true});
}
function spark(){
  var c=document.createElement("canvas");c.className="aicp-spark";c.setAttribute("aria-hidden","true");
  var host=q(".telemetry");if(!host)return;host.appendChild(c);var x=c.getContext("2d"),dpr=window.devicePixelRatio||1;
  function size(){var r=host.getBoundingClientRect();c.width=r.width*dpr;c.height=120*dpr;c.style.width=r.width+"px";c.style.height="120px";x.setTransform(dpr,0,0,dpr,0,0);}
  var vals=Array.from({length:64},function(_,i){return 38+Math.sin(i*.42)*9+Math.random()*13;});
  var last=0;
  function draw(t){var w=c.clientWidth,h=120;if(t-last>180){last=t;vals.shift();vals.push(Math.max(18,Math.min(72,40+Math.sin(t*.0013)*9+Math.sin(t*.0031)*6+Math.random()*15)));}x.clearRect(0,0,w,h);
    x.strokeStyle="rgba(99,102,241,.13)";x.lineWidth=1;for(var y=20;y<h;y+=25){x.beginPath();x.moveTo(0,y);x.lineTo(w,y);x.stroke();}
    var grad=x.createLinearGradient(0,0,w,0);grad.addColorStop(0,"rgba(99,102,241,.25)");grad.addColorStop(.5,"rgba(6,182,212,.95)");grad.addColorStop(1,"rgba(129,140,248,.85)");x.strokeStyle=grad;x.lineWidth=2;x.beginPath();
    vals.forEach(function(v,i){var px=i/(vals.length-1)*w,py=h-v/80*h;if(i===0)x.moveTo(px,py);else x.lineTo(px,py);});x.stroke();
    var area=x.createLinearGradient(0,0,0,h);area.addColorStop(0,"rgba(6,182,212,.12)");area.addColorStop(1,"rgba(6,182,212,0)");x.lineTo(w,h);x.lineTo(0,h);x.closePath();x.fillStyle=area;x.fill();requestAnimationFrame(draw);
  }
  size();window.addEventListener("resize",size);requestAnimationFrame(draw);
}
function bars(){
  qa(".status .bar div").forEach(function(b){var w=b.style.width;b.style.width="0";setTimeout(function(){b.style.width=w;},180);});
}
ready(function(){makeInteractive();glowCards();reveal();activeNav();spark();bars();});
})();
ready(function(){
  var host=q("#architecture"); if(!host)return;
  var rail=document.createElement("div"); rail.className="aicp-visual-rail";
  ["aicp-architecture.svg","aicp-execution.svg","aicp-routing.svg","aicp-workers.svg"].forEach(function(name){
    var img=document.createElement("img"); img.src="assets/"+name; img.alt="AICP system visualization"; img.loading="lazy"; rail.appendChild(img);
  });
  host.appendChild(rail);
});

(function githubIntelligence(){
  var user="faridbarahimi", api="https://api.github.com";
  function esc(v){return String(v||"").replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});}
  function ago(iso){var sec=Math.max(0,(Date.now()-new Date(iso).getTime())/1000);if(sec<3600)return Math.floor(sec/60)+"m ago";if(sec<86400)return Math.floor(sec/3600)+"h ago";return Math.floor(sec/86400)+"d ago";}
  function repoCard(r){var lang=r.language||"Mixed";return '<a class="repo-card" href="'+esc(r.html_url)+'" target="_blank" rel="noopener"><div class="repo-top"><strong>'+esc(r.name)+'</strong><span>↗</span></div><p>'+esc(r.description||"A public engineering repository.")+'</p><div class="repo-meta"><span>'+esc(lang)+'</span><span>★ '+r.stargazers_count+'</span><span>⑂ '+r.forks_count+'</span></div></a>';}
  function eventCard(e){var repo=e.repo&&e.repo.name||"GitHub";var type=(e.type||"").replace("Event","");var icon={Push:"↟",Create:"+",PullRequest:"⇄",Issues:"!",IssueComment:"◌",Watch:"★",Fork:"⑂"}[type]||"•";return '<a class="event-card" href="https://github.com/'+esc(repo)+'" target="_blank" rel="noopener"><span class="event-icon">'+icon+'</span><span><b>'+esc(type)+'</b> · '+esc(repo.split("/").pop())+'<small>'+ago(e.created_at)+'</small></span></a>';}
  function addNav(){var nav=q(".aicp-nav");if(!nav||nav.querySelector('a[href="#github-live"]'))return;var a=document.createElement("a");a.href="#github-live";a.textContent="GitHub Live";nav.appendChild(a);}
  async function load(){var sec=q("#github-live");if(!sec)return;addNav();try{
    var cached=null;try{cached=JSON.parse(localStorage.getItem("aicp-gh-cache")||"null");}catch(e){}
    var fresh=cached&&Date.now()-cached.at<300000;
    var profile,repos,events;
    if(fresh){profile=cached.profile;repos=cached.repos;events=cached.events;}else{
      var res=await Promise.all([fetch(api+"/users/"+user),fetch(api+"/users/"+user+"/repos?per_page=100&sort=updated"),fetch(api+"/users/"+user+"/events/public?per_page=12")]);
      if(!res[0].ok||!res[1].ok||!res[2].ok)throw new Error("GitHub API unavailable");
      profile=await res[0].json();repos=await res[1].json();events=await res[2].json();
      try{localStorage.setItem("aicp-gh-cache",JSON.stringify({at:Date.now(),profile:profile,repos:repos,events:events}));}catch(e){}
    }
    var stars=repos.reduce(function(n,r){return n+(r.stargazers_count||0);},0);
    q("#gh-avatar").src=profile.avatar_url;q("#gh-name").textContent=profile.name||profile.login;q("#gh-bio").textContent=profile.bio||"AI systems engineer · AICP builder";q("#gh-repos").textContent=profile.public_repos;q("#gh-followers").textContent=profile.followers;q("#gh-stars").textContent=stars;
    var featured=repos.filter(function(r){return !r.fork;}).slice(0,6);q("#gh-repos-list").innerHTML=featured.length?featured.map(repoCard).join(""):'<div class="gh-empty">No public repositories found.</div>';
    q("#gh-events").innerHTML=events.slice(0,7).map(eventCard).join("")||'<div class="gh-empty">No recent public activity.</div>';
    q("#gh-updated").textContent="Updated "+new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"});
  }catch(err){q("#gh-name").textContent="GitHub intelligence offline";q("#gh-bio").textContent="The portfolio remains fully usable without live API data.";q("#gh-repos-list").innerHTML='<div class="gh-empty">Unable to reach GitHub right now. <a href="https://github.com/faridbarahimi" target="_blank" rel="noopener">Open profile ↗</a></div>';q("#gh-events").innerHTML='<div class="gh-empty">Live activity will return automatically.</div>';}}
  if(document.readyState!=="loading")load();else document.addEventListener("DOMContentLoaded",load);
})();

(function polishInteractions(){
  function run(){
    qa(".worker-card,.model-icons span,.tool-icons span").forEach(function(el){el.classList.add("aicp-clickable");el.tabIndex=0;el.onclick=function(){var title=el.textContent.trim();var d={title:title,text:"AICP treats this node as a replaceable capability inside the work-control plane.",bullets:["Capability boundary","Task-aware routing","Evidence-producing execution"]};if(title==="HUMAN")d.text="Human intent, goals and decisions remain the source of authority.";q("#aicp-modal").open(d);};});
    qa(".r-item").forEach(function(el){el.classList.add("aicp-clickable");el.onclick=function(){q("#aicp-modal").open({title:el.querySelector(".r-name")?.textContent||"Roadmap",text:"A visible milestone in the AICP engineering trajectory.",bullets:[el.querySelector(".r-state")?.textContent||"Status","Architecture-first development","Incremental verification"]});};});
  }
  if(document.readyState!=="loading")run();else document.addEventListener("DOMContentLoaded",run);
})();

(function siteChrome(){
  function init(){
    var sections=[["about","About"],["architecture","Architecture"],["github-live","GitHub Live"],["pipeline","Pipeline"],["routing","Routing"],["continuity","Continuity"],["evidence","Evidence"],["ecosystem","Ecosystem"],["status","Status"],["roadmap","Roadmap"]];
    var nav=document.createElement("nav");nav.className="aicp-nav";nav.setAttribute("aria-label","Primary navigation");
    sections.forEach(function(pair){if(!q("#"+pair[0]))return;var a=document.createElement("a");a.href="#"+pair[0];a.textContent=pair[1];a.onclick=function(e){e.preventDefault();var el=q("#"+pair[0]);if(el){window.scrollTo({top:el.getBoundingClientRect().top+scrollY-70,behavior:"smooth"});history.replaceState(null,"","#"+pair[0]);}};nav.appendChild(a);});
    document.body.insertBefore(nav,document.querySelector(".hero")||document.body.firstChild);
    var links=qa(".aicp-nav a");var io=new IntersectionObserver(function(entries){entries.forEach(function(en){if(en.isIntersecting){links.forEach(function(a){a.classList.toggle("active",a.getAttribute("href")==="#"+en.target.id);});}})},{rootMargin:"-25% 0px -65% 0px",threshold:0});sections.forEach(function(p){var el=q("#"+p[0]);if(el)io.observe(el);});
    var progress=document.createElement("div");progress.className="aicp-progress";document.body.appendChild(progress);window.addEventListener("scroll",function(){var max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max>0?scrollY/max*100:0)+"%";},{passive:true});
    var top=document.createElement("button");top.className="aicp-top";top.setAttribute("aria-label","Back to top");top.textContent="↑";document.body.appendChild(top);top.onclick=function(){scrollTo({top:0,behavior:"smooth"});};window.addEventListener("scroll",function(){top.classList.toggle("show",scrollY>700);},{passive:true});
  }
  if(document.readyState!=="loading")init();else document.addEventListener("DOMContentLoaded",init);
})();

(function particleField(){
  if(matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  var c=document.createElement("canvas");c.className="aicp-particles";c.setAttribute("aria-hidden","true");document.body.prepend(c);var ctx=c.getContext("2d"),pts=[],n=Math.min(55,Math.max(24,Math.floor(innerWidth/28))),dpr=devicePixelRatio||1;
  function resize(){c.width=innerWidth*dpr;c.height=innerHeight*dpr;c.style.width=innerWidth+"px";c.style.height=innerHeight+"px";ctx.setTransform(dpr,0,0,dpr,0,0);}function seed(){pts=Array.from({length:n},function(){return{x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-.5)*.16,vy:(Math.random()-.5)*.16};});}
  function draw(){ctx.clearRect(0,0,innerWidth,innerHeight);for(var i=0;i<pts.length;i++){var p=pts[i];p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>innerWidth)p.vx*=-1;if(p.y<0||p.y>innerHeight)p.vy*=-1;for(var j=i+1;j<pts.length;j++){var z=pts[j],dx=p.x-z.x,dy=p.y-z.y,dist=Math.hypot(dx,dy);if(dist<115){ctx.strokeStyle="rgba(99,102,241,"+((1-dist/115)*.12)+")";ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(z.x,z.y);ctx.stroke();}}ctx.fillStyle="rgba(103,232,249,.38)";ctx.beginPath();ctx.arc(p.x,p.y,1.2,0,Math.PI*2);ctx.fill();}requestAnimationFrame(draw);}
  resize();seed();addEventListener("resize",function(){resize();seed();});requestAnimationFrame(draw);
})();
