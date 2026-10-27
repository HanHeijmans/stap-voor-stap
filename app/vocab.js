// ---------- Words ----------
// woorden.js: "## Stage", "# Lesson", then "Dutch | English | note". Each word here:
// [Dutch, English, note, key, lesson index]; the key is the Dutch text, made unique if it repeats.
let W=[],LS=[],WB={};
function loadWords(){
  let stage='';const seen={};
  (window.WOORDEN||'').split('\n').forEach(raw=>{
    const s=raw.trim();if(!s||s.startsWith('//'))return;
    if(s.startsWith('## ')){stage=s.slice(3).trim();return}
    if(s.startsWith('# ')){LS.push({stage,t:s.slice(2).trim(),w:[]});return}
    const f=s.split('|').map(x=>x.trim());if(f.length<2||!LS.length)return;
    let key=f[0];seen[key]=(seen[key]||0)+1;if(seen[key]>1)key+='·'+seen[key];
    const w=[f[0],f[1],f[2]||'',key,LS.length-1];W.push(w);LS[LS.length-1].w.push(w);WB[key]=w;
  });
}
const dn=w=>w[0].split('/').join(' / ');
const stages=()=>[...new Set(LS.map(l=>l.stage))];
const wDue=()=>W.filter(w=>S.w[w[3]]&&S.w[w[3]].d<=Date.now());
const lDone=l=>l.w.every(w=>S.w[w[3]]);
const isNoun=w=>w[0].split('/').some(t=>/^(de|het) \S+$/.test(t));
const wcard=w=>`<div class="card"><div class="ctile">${esc(dn(w))}</div><div class="cb"><h3>${esc(w[1])}</h3>${w[2]?`<p class="mu" style="font-size:.9rem">${esc(w[2])}</p>`:''}${stLine(S.w[w[3]])}${sayB(w[0])}</div></div>`;
function wHome(){
  wc=null;
  const met=W.filter(w=>S.w[w[3]]),dnN=wDue().length,nx=LS.findIndex(l=>!lDone(l));
  const st=stages().map(s=>{const ws=W.filter(w=>LS[w[4]].stage==s),n=ws.filter(w=>S.w[w[3]]).length;return `<div class="sg"><span>${esc(s)}</span><span class="mu">${n}/${ws.length}</span><div class="bar"><i style="width:${Math.round(100*n/ws.length)}%"></i></div></div>`}).join('');
  $.innerHTML=`<button class="lk" onclick="home()">All sections</button>${H('scroll','Words','woorden')}
  <p class="mu">${W.length} common words in ${LS.length} short lessons. Nouns come with their article, de or het: learn it as part of the word.</p>
  <div class="stats"><div><b>${met.length}</b>met</div><div><b>${met.filter(w=>S.w[w[3]].b>=3).length}</b>known well</div><div><b>${dnN}</b>due now</div></div>
  <div class="btns">${dnN?`<button class="p" onclick="wReview()">Review ${dnN} due word${dnN>1?'s':''}</button>`:''}
  ${nx>=0?`<button class="${dnN?'':'p'}" onclick="wLesson(${nx})">Next lesson: ${esc(LS[nx].t)}</button>`:''}
  <button onclick="wLessons()">All lessons</button>${met.length&&!dnN?'<button onclick="wPractice()">Extra practice</button>':''}</div>
  ${forecast(met.map(w=>S.w[w[3]]))}
  <h2>Progress by stage</h2>${st}
  ${met.length?`<details><summary>Browse your ${met.length} words</summary><div class="wg">${met.sort((a,b)=>S.w[a[3]].d-S.w[b[3]].d).map(w=>{const c=S.w[w[3]];return `<button class="wt b${c.b}" onclick="wDetail('${esc(w[3]).replace(/'/g,"\\'")}')">${esc(dn(w))}${pips(c.b)}${c.d<=Date.now()?'<span class="dd"></span>':''}</button>`}).join('')}</div><p class="mu" style="font-size:.85rem">Sorted by next review. The dots show strength; an orange dot means due now.</p></details>`:''}
  <details><summary>How this works</summary><ul>
  <li><b>Recognise, then recall.</b> A new lesson first asks what each word means, then asks you to type it in Dutch from its English. Typing it yourself is what makes a word stick.</li>
  <li><b>Reviews</b> mix three kinds of question: what does it mean, type the Dutch word, and (with a Dutch voice) what did you hear. Recall becomes more common as a word gets stronger.</li>
  <li><b>No more choices once you know a word.</b> From Known on, you type its meaning in English too. Any listed meaning counts, and if yours was a fair synonym, press “My meaning was right too”.</li>
  <li><b>Typing is forgiving</b> about capitals, punctuation and accents, and one slip in a longer word counts as a typo. It is strict about de and het.</li>
  <li><b>Spaced reviews</b>: each word returns after about 1, 3, 7, 16 and 35 days. A miss drops it two levels and brings it back soon.</li></ul></details>`;
}
function wLessons(){
  let h='',st=null;
  LS.forEach((l,i)=>{if(l.stage!=st){st=l.stage;h+=`<h2>${esc(st)}</h2>`}const n=l.w.filter(w=>S.w[w[3]]).length;
    h+=`<button class="ll" onclick="wLesson(${i})"><span>${esc(l.t)}</span><span class="mu">${n==l.w.length?'✓ learned':n?n+' of '+l.w.length:l.w.length+' words'}</span></button>`});
  $.innerHTML=`<button class="lk" onclick="wHome()">Back</button><h1>All lessons</h1><p class="mu">Take them in order, or jump to a topic you need.</p>${h}`;
}
let WL,WQ,ws,wc;
function wLesson(i){
  const l=LS[i],nw=l.w.filter(w=>!S.w[w[3]]);WL=nw;
  $.innerHTML=`<button class="lk" onclick="wHome()">Back</button><p class="mu">${esc(l.stage)} · lesson ${i+1} of ${LS.length}</p><h2 style="margin-top:.2em">${esc(l.t)}</h2>
  <p class="mu">${nw.length?'Read each word out loud (or listen), and connect it to its meaning. Then you are tested straight away.':'You have learned these words. Practising them here does not change their review schedule.'}</p>
  ${l.w.map(wcard).join('')}
  <button class="nx p" onclick="${nw.length?'wStart()':`wRun(sh(LS[${i}].w).map(w=>({k:w[3],t:wType(w[3])})),true)`}">${nw.length?'Test me':'Practise this lesson'}</button>`;
  scrollTo(0,0);
}
function wDetail(k){const w=WB[k];$.innerHTML=`<button class="lk" onclick="wHome()">Back</button>${wcard(w)}${stBox(S.w[k])}`}
function wStart(){
  const b=WL.map(w=>w[3]);WL=null;b.forEach(k=>S.w[k]={b:0,d:Date.now(),f:Date.now()});save();ws_fresh=b;
  wRun([...sh(b).map(k=>({k,t:'rec'})),...sh(b).map(k=>({k,t:'rcl'}))],false);
}
// rec: Dutch → pick the meaning; rcl: English → type the Dutch; lis: hear it → pick the meaning.
// Once a word is Known, nothing is multiple choice any more: rec and lis become recT and lisT, meaning typed in English.
const TYPED_FROM=3;
const wType=k=>{const b=(S.w[k]||{b:0}).b,r=Math.random();return b<2?(r<.45?'rec':'rcl'):r<.65?'rcl':(NLV?'lis':'rec')};
// Interleave topics: words from the same lesson give each other away (a run of number words), so a
// session is ordered to keep same-lesson words at least two questions apart wherever possible.
function wSpread(ws){
  const left=sh(ws),out=[];
  while(left.length){
    const near=new Set(out.slice(-2).map(w=>w[4]));
    // Among the allowed words, take one from the lesson with the most words left, so the end of the
    // session is not left with a run from one lesson.
    const cnt={};left.forEach(w=>cnt[w[4]]=(cnt[w[4]]||0)+1);
    const best=ok=>left.reduce((bi,w,j)=>ok(w)&&(bi<0||cnt[w[4]]>cnt[left[bi][4]])?j:bi,-1);
    let i=best(w=>!near.has(w[4]));
    if(i<0)i=best(w=>w[4]!=(out[out.length-1]||[])[4]);
    out.push(left.splice(Math.max(i,0),1)[0]);
  }
  return out;
}
// Reviews take the weakest due words first; at the same level the most overdue first, with a little
// randomness so one lesson's words are not all pulled in together.
function wReview(){
  const now=Date.now(),score=w=>{const c=S.w[w[3]];return c.b*1e3-(now-c.d)/DAY+Math.random()*2};
  const pick=wDue().map(w=>[score(w),w]).sort((a,b)=>a[0]-b[0]).slice(0,15).map(x=>x[1]);
  wRun(wSpread(pick).map(w=>({k:w[3],t:wType(w[3])})),false);
}
function wPractice(){wRun(wSpread(sh(Object.keys(S.w).filter(k=>WB[k])).slice(0,10).map(k=>WB[k])).map(w=>({k:w[3],t:wType(w[3])})),true)}
let ws_fresh=null;
function wRun(items,prac){WQ=items;ws={ok:0,n:0,prac,pro:new Set(),miss:new Set(),fresh:ws_fresh};ws_fresh=null;wAsk()}
// Quitting: words still waiting for a question keep their old schedule (nothing was changed yet), so due
// words stay due. New words from a lesson that were not finished are taken out again.
function wQuit(){
  if(ws&&ws.fresh&&!ws.prac){ws.fresh.forEach(k=>{if(WQ.some(x=>x.k===k))delete S.w[k]});save()}
  wc=null;wHome();
}
// Wrong options close to the right one, so one familiar word can't give the answer away: the same kind of word
// (noun with nouns, verb with verbs, number with numbers), the same lesson or topic, and a similar-looking Dutch
// word (more so in listening, where similar sounds are the trap); words you know first. `fit` narrows the pool.
const wKind=w=>isNoun(w)?'n':/^to /.test(w[1])?'v':/number|amounts/i.test(LS[w[4]].t)?'#':'x';
const bare=w=>norm(w[0].split('/')[0]).replace(/^(de|het) /,'');
function wDecoys(w,fit,sound){
  const k=wKind(w),b=bare(w),seen=new Set([w[1]]);
  const sc=x=>(x[4]==w[4]?3:0)+(wKind(x)==k?3:-3)+(S.w[x[3]]?2:0)+Math.random()*1.5+(sound?4:2)*(1-lev(bare(x),b)/Math.max(b.length,bare(x).length));
  return W.filter(x=>x!=w&&fit(x)).map(x=>[sc(x),x]).sort((a,c)=>c[0]-a[0]).map(x=>x[1]).filter(x=>!seen.has(x[1])&&seen.add(x[1])).slice(0,3);
}
function wAsk(){
  if(!WQ.length)return wFin();
  const it=WQ[0],w=WB[it.k];let t=it.t;if(t=='lis'&&!NLV)t='rec';
  if(t!='rcl'&&(S.w[it.k]||{b:0}).b>=TYPED_FROM)t+='T';
  wc={it,w,t,done:0};
  let body;
  if(t=='rcl'){
    body=`<p class="mu" style="margin-top:16px">How do you say this in Dutch?</p><h2 style="font-size:2rem;margin:.2em 0">${esc(w[1])}</h2>
    ${isNoun(w)?'<p class="mu">A noun: include <b>de</b> or <b>het</b>.</p>':''}
    <form class="ans" onsubmit="wSubmit();return false"><input id="in" class="in" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" lang="nl" aria-label="Dutch word"><button class="p" id="ck">Check</button></form>`;
  }else if(t.endsWith('T')){
    body=(t=='lisT'?`<div class="dt"><b style="font-size:1.4rem">Listen</b><button class="say" onclick="say(wc.w[0])">Play again</button></div><p><b>What did you hear? Type its meaning in English.</b></p>`
      :`<div class="dt"><b style="font-size:${dn(w).length>16?1.35:dn(w).length>11?1.7:2.1}rem">${esc(dn(w))}</b>${sayB(w[0])}</div><p><b>What does it mean?</b> Type it in English.</p>`)
      +`<form class="ans" onsubmit="wMean();return false"><input id="in" class="in" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" lang="en" aria-label="Meaning in English" placeholder="meaning"><button class="p" id="ck">Check</button></form>`;
  }else{
    wc.o=sh([w,...wDecoys(w,x=>true,t=='lis')]);
    body=(t=='lis'?`<div class="dt"><b style="font-size:1.4rem">Listen</b><button class="say" onclick="say(wc.w[0])">Play again</button></div><p><b>What did you hear? Pick its meaning.</b></p>`
      :`<div class="dt"><b style="font-size:${dn(w).length>16?1.35:dn(w).length>11?1.7:2.1}rem">${esc(dn(w))}</b>${sayB(w[0])}</div><p><b>What does it mean?</b></p>`)
      +`<div class="opts">${wc.o.map((x,i)=>`<button class="opt" onclick="wPick(${i})">${esc(x[1])}</button>`).join('')}</div>`;
  }
  $.innerHTML=bar('wQuit()',ws.n,WQ.length)+body+'<div id="fb"></div>';
  if(t.startsWith('lis'))setTimeout(()=>say(w[0]),150);
  const inp=document.getElementById('in');if(inp)inp.focus();else $.focus({preventScroll:true});
}
function wSubmit(){
  if(!wc||wc.done)return;const inp=document.getElementById('in'),v=inp.value.trim(),g=v?gradeNL(v,wc.w):{ok:0};
  inp.disabled=true;document.getElementById('ck').disabled=true;wDone(!!g.ok,g.note,v);
}
// A typed meaning: any listed meaning counts, also that of another word spelled the same (zijn: his, to be).
function wMean(){
  if(!wc||wc.done)return;const inp=document.getElementById('in'),v=inp.value.trim(),w=wc.w;
  const ok=W.some(x=>(x==w||x[0]==w[0])&&gradeEN(v,x[1]));
  inp.disabled=true;document.getElementById('ck').disabled=true;wDone(ok,'',v);
}
function wPick(i){
  if(!wc||wc.done)return;const {w,o}=wc;
  document.querySelectorAll('.opt').forEach((e,j)=>{if(o[j]==w)e.classList.add('ok');else if(j==i)e.classList.add('no');e.disabled=true});
  wDone(o[i]==w,'',null);
}
// Apply one result to the word's schedule. The previous state is kept so "Count it as right" can redo it.
function wSched(ok){
  const {it,w}=wc,k=w[3],c=S.w[k];
  if(ws.prac||!c)return;
  if(ok){if(it.w)c.d=Math.max(c.d,Date.now()+DAY);else if(!WQ.slice(1).some(x=>x.k===k)&&!ws.pro.has(k)&&!ws.miss.has(k)){ws.pro.add(k);srsUp(c)}}
  else srsDown(c);
}
function wDone(ok,note,typed){
  wc.done=1;const {w}=wc,k=w[3],c=S.w[k];
  Object.assign(wc,{ok,note,typed,b0:c?c.b:0,snap:c?{...c}:null,missBefore:ws.miss.has(k)});
  ws.n++;if(ok)ws.ok++;
  if(!ok&&c&&!ws.prac){c.m=(c.m||0)+1;c.lm=Date.now()}
  wSched(ok);tick();save();
  WQ.shift();if(!ok){ws.miss.add(k);WQ.splice(Math.min(3,WQ.length),0,{k,t:'rcl',w:1})}
  if(S.au!==0)say(w[0]);
  wFeedback();
}
function wFeedback(){
  const {w,ok,note,typed,t}=wc,c=S.w[w[3]],canOver=!ok&&t.endsWith('T')&&!wc.overruled;
  document.getElementById('fb').innerHTML=`<div class="fb ${ok?'g':'b'}"><b>${ok?'Correct.':'Not quite.'}</b>${note?' '+note:''}${!ok&&typed?` You typed <b>${esc(typed)}</b>.`:''}
  <p style="margin-top:6px"><b style="font-family:var(--disp);font-size:1.25rem">${esc(dn(w))}</b> · ${esc(w[1])}${w[2]?` <span class="mu">· ${esc(w[2])}</span>`:''}</p>${sayB(w[0])}${schTxt(c,wc.b0,ok,ws.prac)}
  ${canOver?'<p style="margin-top:8px"><button class="lk" onclick="wOverrule()">My meaning was right too: count it as right</button></p>':''}</div>
  <button class="nx p" id="nx" onclick="wAsk()">${WQ.length?'Next':'Finish'}</button>`;
  document.getElementById('nx').focus();
}
// "Count it as right": undo the miss (schedule, miss count, the repeat question), then score it as right.
function wOverrule(){
  const k=wc.w[3],c=S.w[k];if(wc.ok||wc.overruled)return;
  wc.overruled=1;wc.ok=true;wc.typed='';wc.note='Counted as right.';ws.ok++;
  if(c&&wc.snap){Object.keys(c).forEach(x=>delete c[x]);Object.assign(c,wc.snap)}
  if(!wc.missBefore)ws.miss.delete(k);
  const i=WQ.findIndex(x=>x.k===k&&x.w);if(i>=0)WQ.splice(i,1);
  WQ.unshift(null);wSched(true);WQ.shift();
  if(!ws.prac&&c)save();
  wFeedback();
}
function wFin(){
  wc=null;const m=[...ws.miss].map(k=>WB[k]);
  $.innerHTML=`<h1>${ws.ok} / ${ws.n}</h1><p>${m.length?'Words to watch:':'No misses. Goed gedaan!'}</p>${m.map(wcard).join('')}
  <div class="btns"><button class="p" onclick="wHome()">Done</button></div>`;
}


// ---------- Your week ----------
// Answers per day, words learned in the last seven days, the words missed most, and a practice round of them.
function weekHome(){
  const now=Date.now(),days=[6,5,4,3,2,1,0].map(dstr),cnt=d=>S.hist[d]||(S.day.d==d?S.day.n:0),mx=Math.max(S.goal,...days.map(cnt));
  const fresh=W.filter(w=>(S.w[w[3]]||{}).f>=now-7*DAY),wk=weekWeak(),tot=days.reduce((a,d)=>a+cnt(d),0),gd=days.filter(d=>cnt(d)>=S.goal).length;
  const row=w=>{const c=S.w[w[3]];return `<button class="ll" onclick="wDetail(W[${W.indexOf(w)}][3])"><span><b>${esc(dn(w))}</b> <span class="mu">${esc(w[1])}</span></span><span class="mu">${c.m?`${c.m} miss${c.m>1?'es':''} · `:''}${LVN[c.b]}</span></button>`};
  $.innerHTML=`<button class="lk" onclick="home()">All sections</button><h1>Your week</h1>
  <div class="wk">${days.map(d=>{const n=cnt(d);return `<div class="${n>=S.goal?'on':''}${d==S.streak.rest?' rd':''}"><span class="wkb"><i style="height:${Math.round(100*n/mx)}%"></i><s style="bottom:${Math.round(100*S.goal/mx)}%"></s></span><b>${n||''}</b><span class="mu">${new Date(d+'T12:00').toLocaleDateString(undefined,{weekday:'short'})}</span></div>`}).join('')}</div>
  <p class="mu" style="font-size:.85rem">The line is your daily goal; filled days reached it.${days.includes(S.streak.rest)?' The dotted day was your rest day.':''}</p>
  <div class="stats"><div><b>${tot}</b>answers</div><div><b>${gd}</b>goal days</div><div><b>${fresh.length}</b>new words</div></div>
  <div class="btns">${wk.length?`<button class="p" onclick="weekDrill()">Drill my ${wk.length>1?wk.length+' weakest words':'weakest word'}</button>`:''}<button onclick="home()">Back to the start</button></div>
  <h2>Trickiest words</h2>${wk.length?wk.slice(0,8).map(row).join(''):'<p class="mu">No words yet. Words you get wrong show up here.</p>'}
  <p class="mu" style="font-size:.85rem">Most misses first, recent ones counting double; then the weakest words. The drill is practice: it doesn’t change when words come back.</p>
  <h2>Learned this week</h2>${fresh.length?fresh.map(row).join(''):'<p class="mu">No new words in the last seven days. Take a lesson in Words.</p>'}`;
}
function weekWeak(){
  const now=Date.now(),sc=c=>(c.m||0)+(c.lm>now-7*DAY?c.m||0:0);
  const hit=W.filter(w=>(S.w[w[3]]||{}).m).sort((a,b)=>sc(S.w[b[3]])-sc(S.w[a[3]]));
  const low=W.filter(w=>{const c=S.w[w[3]];return c&&!c.m&&c.b<=2}).sort((a,b)=>S.w[a[3]].b-S.w[b[3]].b);
  return [...hit,...low].slice(0,10);
}
function weekDrill(){ws_fresh=null;wRun(wSpread(weekWeak()).map(w=>({k:w[3],t:wType(w[3])})),true)}
