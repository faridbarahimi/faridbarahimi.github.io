const dialog=document.getElementById('toolDialog'),body=document.getElementById('dialogBody'),tag=document.getElementById('dialogTag');
const tools=[...document.querySelectorAll('.tool')];
function openTool(card){
 const slug=card.dataset.slug, mode=card.dataset.mode, title=card.querySelector('h3').textContent;
 tag.textContent=mode==='client'?'BROWSER / LOCAL':'QUEUE / HEAVY';
 if(slug==='word-counter') body.innerHTML='<h3>'+title+'</h3><p>Everything stays in your browser.</p><form class="tool-form" id="wordForm"><textarea id="wordText" rows="8" placeholder="Paste text…"></textarea><button>Count</button></form><div class="result" id="wordResult"></div>';
 else if(slug==='password-generator') body.innerHTML='<h3>'+title+'</h3><p>Generated locally with the Web Crypto API.</p><form class="tool-form" id="passForm"><input id="passLen" type="number" min="8" max="128" value="24"><button>Generate</button></form><div class="result" id="passResult"></div>';
 else if(slug==='qr-code') body.innerHTML='<h3>'+title+'</h3><p>Generate a QR locally. Nothing is uploaded.</p><form class="tool-form" id="qrForm"><input id="qrText" placeholder="Text or URL"><button>Generate QR</button></form><div id="qrResult"></div>';
 else if(mode==='client') body.innerHTML='<h3>'+title+'</h3><p>This browser-first capability is reserved for the next execution slice. The catalog contract is active; no upload is performed yet.</p><div class="result">MODE: CLIENT / SAFE-LOCAL<br>EXECUTION: NEXT SLICE</div>';
 else body.innerHTML='<h3>'+title+'</h3><p>This capability is classified as heavy. AICP will submit the request to an isolated worker/queue after policy, quota and input checks.</p><div class="result">QUEUE CONTRACT: READY<br>FREE HEAVY USES: 3–5 / MONTH<br>EXECUTION API: /api/tools/'+slug+'/execute<br>STATUS: SCAFFOLD — NOT YET DEPLOYED</div>';
 dialog.showModal();
 if(slug==='word-counter') document.getElementById('wordForm').onsubmit=e=>{e.preventDefault();const t=document.getElementById('wordText').value;const words=(t.trim().match(/\S+/g)||[]).length;document.getElementById('wordResult').textContent='WORDS '+words+'\nCHARACTERS '+t.length+'\nLINES '+(t?t.split(/\r?\n/).length:0)};
 if(slug==='password-generator') document.getElementById('passForm').onsubmit=e=>{e.preventDefault();const n=Math.min(128,Math.max(8,Number(document.getElementById('passLen').value)||24));const chars='ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*_-+=';const a=new Uint32Array(n);crypto.getRandomValues(a);let out='';for(let i=0;i<n;i++)out+=chars[a[i]%chars.length];document.getElementById('passResult').textContent=out};
 if(slug==='qr-code') document.getElementById('qrForm').onsubmit=e=>{e.preventDefault();const value=document.getElementById('qrText').value.trim(),out=document.getElementById('qrResult');out.innerHTML='';if(!value){out.textContent='Enter text first';return}const img=document.createElement('img');img.className='qr';QRCode.toDataURL(value,{width:220,margin:1}).then(src=>{img.src=src;out.appendChild(img)}).catch(()=>out.textContent='QR generation failed')};
}
tools.forEach(card=>card.querySelector('.tool-btn').addEventListener('click',()=>openTool(card)));
document.getElementById('closeDialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
document.getElementById('buildSuggestion').addEventListener('click',()=>{document.getElementById('buildNote').textContent='Suggestion recorded locally as a discovery gap. No automatic build was started.'});
