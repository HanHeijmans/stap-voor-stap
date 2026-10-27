// ---------- Start screen ----------
function home(){
  const met=W.filter(w=>S.w[w[3]]).length,wd=wDue().length,gd=gDue(S.gv,[...VB,...VS].map(v=>v[0])).length+gDue(S.gb,SB.map((_,i)=>String(i))).length+gDue(S.gr,grKeys()).length;
  const xo=RS.filter(rOpen).length,xd=gDue(S.wr,RS.map((_,i)=>String(i))).length,ur=Object.keys(S.u).length,gr=Object.keys(S.g).length,ro=RS.filter(rOpen).length,wl=LS.filter(lDone).length;
  const next=!S.pl?'p':wd?'w':gd?'g':xd?'x':ur<P.length?'u':wl<LS.length?'w':gr<G.length?'g':'r';
  const tile=(id,f,t,nl,art,stat,frac,due)=>`<button class="tl" onclick="${f}">${id==next?`<span class="chip">${due?'Reviews due':'Up next'}</span>`:''}
    ${art}<span class="tlt"><b>${t}</b><i>${nl}</i>
    <span class="tls">${stat}${due?` · <b>${due} due</b>`:''}</span><span class="tlbar"><i style="width:${Math.round(100*Math.min(1,frac))}%"></i></span></span></button>`;
  const T={
    p:tile('p','plIntro()','Find your level','niveautest',delftSec('steps'),S.pl?`Last result: ${esc(S.pl.level)}`:'About five minutes',S.pl?1:0,0),
    u:tile('u','uHome()','Pronunciation','uitspraak',delftSec('voice'),`${ur} of ${P.length} sections`,ur/P.length,0),
    w:tile('w','wHome()','Words','woorden',delftSec('scroll'),`${met} of ${W.length} words`,met/W.length,wd),
    g:tile('g','gHome()','Grammar','grammatica',delftSec('puzzle'),`${gr} of ${G.length} sections`,gr/G.length,gd),
    r:tile('r','rHome()','Reading','lezen',delftSec('book'),`${ro} of ${RS.length} sentences open`,ro/RS.length,0),
    x:tile('x','xHome()','Writing','schrijven',delftSec('quill'),`${xo} of ${RS.length} sentences open`,Object.keys(S.wr).length/Math.max(1,RS.length),xd)
  };
  const arrow='<div class="arr" aria-hidden="true"><svg width="34" height="20" viewBox="0 0 34 20"><path d="M2 10h26M20 3l8 7-8 7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></div>';
  const step=(n,label,ids)=>`<section class="step"><div class="stepl"><b>${n}</b>${label}</div><div class="stept">${ids.map(i=>T[i]).join('')}</div></section>`;
  $.innerHTML=`<div class="top2"><header class="hero"><div><div class="hero-k">Dutch for English speakers</div><h1>Stap voor Stap</h1><p>Find your level, then build up words, sounds and grammar, then read and write real Dutch made of words you know.</p></div><div class="hero-tiles">${['mill','tulip','ship'].map(delft).join('')}</div></header>${dayBox()}</div>
  <div class="path">${step(1,'Start here',['p'])}${arrow}${step(2,'Build up',['w','u'])}${arrow}${step(3,'Put it together',['g'])}${arrow}${step(4,'Use it',['r','x'])}</div>
  <p class="mu" style="font-size:.9rem;max-width:62em">Each day, clear what is due first, then take at most one new lesson. Ten minutes every day beats an hour once a week.</p>
  <label class="ck"><input type="checkbox" ${S.au!==0?'checked':''} onchange="S.au=this.checked?1:0;save()"> Say the Dutch out loud after each answer${NLV?'':' (needs a browser with a Dutch voice, such as Chrome or Edge)'}</label>
  <h2>Your progress</h2><p class="mu" id="sync">${syncText()}</p>
  <div class="bk"><button onclick="exportState()">Save backup file</button><label class="bkl">Load backup file<input type="file" accept=".json,application/json" onchange="importState(this.files[0]);this.value=''"></label></div><div id="bkm"></div>`;
}

// ---------- Keyboard ----------
// 1–4 pick an option in the first question still waiting for an answer, 0 is "I don’t know". In the
// sentence builder 1–9 place a word, Backspace takes one back, Enter checks. Enter presses a focused button.
document.addEventListener('keydown',e=>{
  const t=e.target;
  if(e.ctrlKey||e.metaKey||e.altKey||t.tagName=='TEXTAREA'||t.tagName=='SELECT'||(t.tagName=='INPUT'&&!['checkbox','file'].includes(t.type)))return;
  const n=e.key.length==1&&e.key>='0'&&e.key<='9'?+e.key:-1;
  if(document.querySelector('.sbpool')&&sbc&&!sbc.done){
    if(n>0){const b=document.querySelectorAll('.sbpool .tile')[n-1];if(b){e.preventDefault();b.click()}}
    else if(e.key=='Backspace'&&sbc.picked.length){e.preventDefault();sbUn(sbc.picked.length-1)}
    else if(e.key=='Enter'&&sbc.picked.length==sbc.toks.length){e.preventDefault();sbCheck()}
    return;
  }
  if(n<0||n>4)return;
  const g=[...document.querySelectorAll('.opts')].find(o=>o.querySelector('.opt:not(:disabled)'));if(!g)return;
  const b=n==0?g.querySelector('.opt.dk'):g.querySelectorAll('.opt:not(.dk)')[n-1];
  if(b&&!b.disabled){e.preventDefault();b.click()}
});
const focusMain=()=>{const b=document.querySelector('.btns .p, .nx.p');if(b)b.focus({preventScroll:true})};
['wHome','wLesson','uHome','uPage','gHome','gPage','rHome','xHome','plIntro','plFin','wFin','cjFin','sbFin','rFin','grFin','xFin','weekHome']
  .forEach(f=>{const o=window[f];window[f]=function(){const r=o.apply(this,arguments);focusMain();return r}});
// End-of-round screens get a small burst of confetti.
['plFin','wFin','cjFin','sbFin','rFin','grFin','xFin']
  .forEach(f=>{const o=window[f];window[f]=function(){const r=o.apply(this,arguments);confetti(0);return r}});

loadWords();loadReading();
home();
syncInit();
