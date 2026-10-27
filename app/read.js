// ---------- Reading ----------
let RS=[],RT=[],RBAD=[];
function loadReading(){
  let story=null;
  (window.LEZEN||'').split('\n').forEach(raw=>{
    const s=raw.trim();if(!s||s.startsWith('//'))return;
    if(s.startsWith('## ')){story=null;return}
    if(s.startsWith('# ')){story={t:s.slice(2).trim(),l:[]};RT.push(story);return}
    const f=s.split('|').map(x=>x.trim());if(f.length<3)return;
    const l={nl:f[0],tok:f[0].split(/\s+/),en:f[1],ks:f[2].split(',').map(x=>x.trim())};
    if(l.tok.length!=l.ks.length)RBAD.push(f[0]);
    (story?story.l:RS).push(l);
  });
}
const rKeys=l=>l.ks.filter(k=>k!='-');
const rOpen=l=>rKeys(l).every(k=>S.w[k]);
const rMissing=ls=>[...new Set(ls.flatMap(rKeys).filter(k=>!S.w[k]))];
const rLine=(l,tap)=>l.tok.map((t,i)=>tap?`<span class="sw" onclick="${tap}${i})">${esc(t)}</span>`:esc(t)).join(' ');
const rGloss=(l,i)=>{const w=WB[l.ks[i]];return `<div class="wi"><b>${esc(l.tok[i].replace(/[.,!?:"]/g,''))}</b>${w?` · from <b>${esc(dn(w))}</b>: ${esc(w[1])}`:' <span class="mu">(a name or a small word)</span>'}</div>`};
const rNeed=ks=>ks.slice(0,8).map(k=>`<b>${esc(dn(WB[k]||[k]))}</b> <span class="mu">(${esc(WB[k]?LS[WB[k][4]].t:'')})</span>`).join(', ')+(ks.length>8?` and ${ks.length-8} more`:'');
function rHome(){
  const open=RS.filter(rOpen),next=RS.filter(l=>!rOpen(l)).sort((a,b)=>rMissing([a]).length-rMissing([b]).length)[0];
  $.innerHTML=`<button class="lk" onclick="home()">All sections</button>${H('book','Reading','lezen')}
  <p class="mu">Sentences and short stories made only of words you have learned. Read each one aloud, then check what it means.</p>
  <div class="stats"><div><b>${open.length}/${RS.length}</b>sentences open</div><div><b>${RT.filter(s=>s.l.every(rOpen)).length}/${RT.length}</b>stories open</div></div>
  <div class="btns">${open.length?`<button class="p" onclick="rStart()">Read ${Math.min(8,open.length)} sentences</button>`:''}</div>
  ${open.length?'':'<div class="fb">The first sentences open after a few lessons in Words, or straight away after the level test if you know the basics.</div>'}
  ${next?`<p class="mu" style="margin-top:14px">Next sentence opens when you learn: ${rNeed(rMissing([next]))}</p>`:''}
  <h2>Stories</h2>${RT.map((s,i)=>{const m=rMissing(s.l);return `<button class="ll" onclick="rStory(${i})"><span>${esc(s.t)}</span><span class="mu">${m.length?m.length+' word'+(m.length>1?'s':'')+' to go':S.rs[i]?'✓ read':'open'}</span></button>`}).join('')}`;
}
// Wrong meanings for a sentence: the same sentence with one word swapped for a close one (cheese for bread),
// then other sentences sharing the most words with it.
const glossHead=g=>g.split(/[,;(/]/)[0].replace(/^to /,'').trim();
const STOPEN=/^(the|and|you|are|was|his|her|she|its|for|not|but|this|that|with|have|has|did|our|your|their)$/;
function rDecoys(l){
  const en=l.en,out=new Set(),ws=s=>new Set((s.toLowerCase().match(/[a-z']+/g)||[]).filter(x=>x.length>2&&!STOPEN.test(x))),mine=ws(en);
  for(const k of sh(rKeys(l))){
    // Verbs are left alone: English verb forms change (has, is), so a swapped verb reads as broken English.
    const w=WB[k],g=w&&glossHead(w[1]);if(!w||out.size>=2||/^to /.test(w[1])||g.length<3||!/^[a-z' ]+$/i.test(g))continue;
    const re=new RegExp('\\b'+g+'\\b','i');if(!re.test(en))continue;
    const d=wDecoys(w,x=>/^[a-z' ]+$/i.test(glossHead(x[1]))&&!re.test(glossHead(x[1])),false)[0];if(!d)continue;
    const dg=glossHead(d[1]),s=en.replace(re,m=>m[0]!=m[0].toLowerCase()?dg[0].toUpperCase()+dg.slice(1):dg);
    if(s!=en)out.add(s);
  }
  const pool=RS.filter(x=>x.en!=en),op=pool.filter(rOpen),sc=x=>[...ws(x.en)].filter(t=>mine.has(t)).length+Math.random()*.9;
  return [...new Set([...out,...(op.length>=3?op:pool).map(x=>[sc(x),x.en]).sort((a,b)=>b[0]-a[0]).map(x=>x[1])])].slice(0,3);
}
let RQ,rc,rss;
function rStart(){const sc=i=>{const r=S.rd[i];return !r?0:(r.ok?2e13:1e13)+r.t};RQ=sh(RS.map((_,i)=>i).filter(i=>rOpen(RS[i])).sort((a,b)=>sc(a)-sc(b)).slice(0,8));rss={ok:0,n:0};rAsk()}
function rAsk(){
  if(!RQ.length)return rFin();
  const i=RQ[0],l=RS[i];
  rc={i,l,o:sh([l.en,...rDecoys(l)]),done:0};
  $.innerHTML=`${bar('rHome()',rss.n,RQ.length)}<p class="mu" style="margin-top:14px">Read it out loud first.</p><div class="rsent">${rLine(l)}</div>${sayB(l.nl)}
  <p><b>What does it mean?</b></p><div class="opts vqs">${rc.o.map((x,j)=>`<button class="opt" onclick="rPick(${j})">${esc(x)}</button>`).join('')}</div><div id="fb"></div>`;
  $.focus({preventScroll:true});
}
function rPick(j){
  if(!rc||rc.done)return;rc.done=1;const {i,l,o}=rc,ok=o[j]==l.en;
  document.querySelectorAll('.opt').forEach((e,k)=>{if(o[k]==l.en)e.classList.add('ok');else if(k==j)e.classList.add('no');e.disabled=true});
  rss.n++;if(ok)rss.ok++;RQ.shift();S.rd[i]={n:((S.rd[i]||{}).n||0)+1,ok:ok?1:0,t:Date.now()};tick();save();
  document.querySelector('.rsent').innerHTML=rLine(l,'rTap(');
  document.getElementById('fb').innerHTML=`<div class="fb ${ok?'g':'b'}"><b>${ok?'Correct.':'Not quite.'}</b> “${esc(l.en)}”<p class="mu" style="font-size:.85rem;margin-top:6px">Tap a word above to see where it comes from.</p><div id="rg"></div></div><button class="nx p" id="nx" onclick="rAsk()">${RQ.length?'Next':'Finish'}</button>`;
  document.getElementById('nx').focus();
}
function rTap(i){document.getElementById('rg').innerHTML=rGloss(rc.l,i)}
function rFin(){rc=null;$.innerHTML=`<h1>${rss.ok} / ${rss.n}</h1><p>${rss.ok==rss.n?'You understood every sentence.':'Sentences you missed come back first next time.'}</p><div class="btns"><button class="p" onclick="rStart()">Read more</button><button onclick="rHome()">Done</button></div>`}
let RSV;
function rStory(n){
  RSV=n;const s=RT[n],m=rMissing(s.l);
  if(m.length){$.innerHTML=`<button class="lk" onclick="rHome()">Back</button><h1>${esc(s.t)}</h1><p>This story opens when you have learned ${m.length} more word${m.length>1?'s':''}: ${rNeed(m)}.</p>`;return}
  if(!S.rs[n]){S.rs[n]=1;save()}
  $.innerHTML=`<button class="lk" onclick="rHome()">Back</button><h1>${esc(s.t)}</h1>
  <label class="ck"><input type="checkbox" id="rtr" ${S.re!==0?'checked':''} onchange="S.re=this.checked?1:0;save();rStory(RSV)"> Show the translation</label>
  <p>${sayB(s.l.map(l=>l.nl).join(' '))} <span class="mu" style="font-size:.85rem">Read each line aloud. Tap a word to see where it comes from.</span></p>
  ${s.l.map((l,li)=>`<div class="rl"><div class="rfa">${rLine(l,`rTapS(${li},`)}</div>${S.re!==0?`<div class="mu">${esc(l.en)}</div>`:''}<div id="rs${li}"></div></div>`).join('')}`;
}
function rTapS(li,i){document.getElementById('rs'+li).innerHTML=rGloss(RT[RSV].l[li],i)}

