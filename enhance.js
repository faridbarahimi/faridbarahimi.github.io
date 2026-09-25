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
  var vals=Array.from({length:48},function(_,i){return 35+Math.sin(i*.55)*10+Math.random()*14;});
  function draw(t){var w=c.clientWidth,h=120;x.clearRect(0,0,w,h);x.strokeStyle="rgba(6,182,212,.8)";x.lineWidth=2;x.beginPath();vals.forEach(function(v,i){var px=i/(vals.length-1)*w,py=h-v/80*h;if(i===0)x.moveTo(px,py);else x.lineTo(px,py);});x.stroke();x.strokeStyle="rgba(99,102,241,.16)";for(var y=20;y<h;y+=25){x.beginPath();x.moveTo(0,y);x.lineTo(w,y);x.stroke();}requestAnimationFrame(draw);}
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
