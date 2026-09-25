(()=>{const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
function go(target){const el=$(target);if(el)el.scrollIntoView({behavior:'smooth',block:'start'});}
$$('[data-target]').forEach(el=>el.addEventListener('click',()=>go(el.dataset.target)));
$$('nav a').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();go(a.getAttribute('href'));history.replaceState(null,'',a.getAttribute('href'));}));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')}),{threshold:.12});
$$('.reveal').forEach(e=>io.observe(e));
const sections=$$('section[id]'), navLinks=$$('nav a'); const navIO=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id))}),{rootMargin:'-35% 0px -55% 0px'});
sections.forEach(s=>navIO.observe(s));
const glow=$('.cursor-glow');addEventListener('pointermove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'});
const c=$('#stars'),ctx=c.getContext('2d');let pts=[];
function resize(){c.width=innerWidth*devicePixelRatio;c.height=innerHeight*devicePixelRatio;c.style.width=innerWidth+'px';c.style.height=innerHeight+'px';ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);pts=Array.from({length:Math.min(80,Math.max(35,innerWidth/20))},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-.5)*.15,vy:(Math.random()-.5)*.15}))}
function draw(){ctx.clearRect(0,0,innerWidth,innerHeight);for(let i=0;i<pts.length;i++){let p=pts[i];p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>innerWidth)p.vx*=-1;if(p.y<0||p.y>innerHeight)p.vy*=-1;ctx.fillStyle='rgba(82,232,255,.35)';ctx.beginPath();ctx.arc(p.x,p.y,1,0,7);ctx.fill();for(let j=i+1;j<pts.length;j++){let q=pts[j],d=Math.hypot(p.x-q.x,p.y-q.y);if(d<110){ctx.strokeStyle='rgba(139,124,255,'+(1-d/110)*.07+')';ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke()}}}requestAnimationFrame(draw)}
resize();addEventListener('resize',resize);if(!matchMedia('(prefers-reduced-motion: reduce)').matches)draw();
})();