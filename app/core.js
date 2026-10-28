// ---------- State ----------
const K='stap-v1',DAY=864e5,INT=[0,1,3,7,16,35];
let S={};try{S=JSON.parse(localStorage.getItem(K))||{}}catch(e){}
function normS(){S.w=S.w||{};S.g=S.g||{};S.u=S.u||{};S.gv=S.gv||{};S.gb=S.gb||{};S.rd=S.rd||{};S.rs=S.rs||{};S.wr=S.wr||{};S.day=S.day||{d:'',n:0};S.streak=S.streak||{n:0,last:''};S.goal=S.goal||20;S.gr=S.gr||{};S.hist=S.hist||{};
  // Verb drill items used to be one per verb; now one per verb and tense ('lopen|present').
  for(const k in S.gv)if(!k.includes('|')){const c=S.gv[k];['present','past'].forEach(t=>S.gv[k+'|'+t]=S.gv[k+'|'+t]||{b:c.b,d:c.d});delete S.gv[k]}}
normS();
// On a plain website, ask the browser not to clear the saved progress when space runs low.
try{navigator.storage.persist().catch(()=>{})}catch(e){}
const lsSave=()=>{try{localStorage.setItem(K,JSON.stringify(S))}catch(e){}};
const save=()=>{S.t=Date.now();lsSave();syncSoon()};
const $=document.getElementById('app');
const sh=a=>a.map(x=>[Math.random(),x]).sort((p,q)=>p[0]-q[0]).map(x=>x[1]);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);
// ---------- Speech ----------
// Chrome and Edge ship a Dutch voice; when there is none, Listen buttons hide themselves.
let NLV=null;
function gv(){try{NLV=speechSynthesis.getVoices().find(v=>/^nl/i.test(v.lang))||null}catch(e){}document.body.classList.toggle('novoice',!NLV)}
if('speechSynthesis' in window){gv();speechSynthesis.onvoiceschanged=gv}else document.body.classList.add('novoice');
function say(t){if(!NLV)return;try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t.replace(/\//g,', '));u.voice=NLV;u.lang=NLV.lang;u.rate=.92;speechSynthesis.speak(u)}catch(e){}}
const sayB=t=>`<button class="say" onclick="say(this.dataset.t)" data-t="${esc(t)}">Listen</button>`;

// ---------- Sync and backup ----------
// Published as a Claude artifact, the state is also kept in the viewer’s own private storage
// (data/users/<id>/state), so it follows them between devices. Otherwise it stays in this browser.
const SY={ref:null,busy:false,again:false,status:'local',dl:null};
async function syncInit(){
  if(!window.claude||!claude.use)return;
  claude.use('downloads').then(d=>{SY.dl=d});
  const [db,user]=await Promise.all([claude.use('db'),claude.use('user')]);
  const id=user?await user.id():null;
  if(!db||!id)return;
  SY.ref=db.doc('data/users/'+id+'/state');SY.status='on';
  await syncPull();
  document.addEventListener('visibilitychange',()=>{if(document.visibilityState=='visible')syncPull()});
}
async function syncPull(){
  try{
    const snap=await SY.ref.get(),d=snap.exists?snap.data():null;
    if(d&&d.t>(S.t||0)){S=JSON.parse(d.state);normS();lsSave();if(document.querySelector('.path'))home()}
    else if(!d||d.t<(S.t||0))await syncPush();
    if(SY.status!='full')SY.status='on';
  }catch(e){SY.status='err'}
  syncShow();
}
async function syncPush(){
  if(!SY.ref)return;if(SY.busy){SY.again=true;return}
  SY.busy=true;
  try{await SY.ref.set({state:JSON.stringify(S),t:S.t||Date.now()});SY.status='on'}catch(e){SY.status=e&&e.code=='quota_exceeded'?'full':'err'}
  SY.busy=false;syncShow();if(SY.again){SY.again=false;syncPush()}
}
let SYT;function syncSoon(){if(!SY.ref)return;clearTimeout(SYT);SYT=setTimeout(syncPush,2500)}
const syncText=()=>({on:'Saved to your Claude account, so it follows you between devices.',local:'Saved in this browser only. Use a backup file to move it to another device.',err:'Could not reach online storage just now; saved in this browser and will sync later.',full:'Online storage is full; saved in this browser. Save a backup file to be safe.'})[SY.status];
function syncShow(){const el=document.getElementById('sync');if(el)el.textContent=syncText()}
async function exportState(){
  const data=JSON.stringify({app:'stapvoorstap',v:1,saved:new Date().toISOString(),state:S}),filename='stap-voor-stap-backup-'+new Date().toLocaleDateString('en-CA')+'.json';
  if(SY.dl){try{await SY.dl.save({filename,data})}catch(e){if(e&&e.code!='declined')bkMsg('The backup could not be saved here. Try again in a moment.')}return}
  const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([data],{type:'application/json'}));a.download=filename;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),5000);
}
let BKP=null;
function importState(file){
  if(!file)return;const r=new FileReader();
  r.onload=()=>{let o;try{o=JSON.parse(r.result)}catch(e){}
    if(!o||o.app!='stapvoorstap'||!o.state){bkMsg('That file is not a Stap voor Stap backup.');return}
    BKP=o;bkMsg(`Replace all progress here with the backup from ${esc(new Date(o.saved).toLocaleString())}? <button class="lk" onclick="importDo()">Replace</button> · <button class="lk" onclick="BKP=null;bkMsg('')">Cancel</button>`)};
  r.readAsText(file);
}
function bkMsg(h){const el=document.getElementById('bkm');if(el)el.innerHTML=h?`<div class="fb">${h}</div>`:''}
function importDo(){if(!BKP)return;S=BKP.state;BKP=null;normS();save();home();bkMsg('Backup loaded.')}

// ---------- Daily goal ----------
const today=()=>new Date().toLocaleDateString('en-CA'),dstr=n=>{const d=new Date();d.setHours(12);d.setDate(d.getDate()-n);return d.toLocaleDateString('en-CA')};
// One rest day a week: a single missed day keeps the streak, if no rest day was taken in the week before it.
const restOk=()=>!S.streak.rest||(new Date(dstr(1))-new Date(S.streak.rest))/DAY>=7;
const restNow=()=>S.streak.last==dstr(2)&&restOk();
function tick(){
  const t=today();if(S.day.d!=t)S.day={d:t,n:0};S.day.n++;S.hist[t]=S.day.n;
  Object.keys(S.hist).sort().slice(0,-60).forEach(k=>delete S.hist[k]);
  let rest=0;
  if(S.day.n==S.goal&&S.streak.last!=t){rest=restNow();if(rest)S.streak.rest=dstr(1);S.streak={...S.streak,n:S.streak.last==dstr(1)||rest?S.streak.n+1:1,last:t}}
  if(S.day.n==S.goal)setTimeout(()=>{confetti(1);toast(`Daily goal reached: ${S.goal} answers. ${S.streak.n>1?`${S.streak.n} days in a row!`:'Come back tomorrow to start a streak.'}${rest?' Yesterday was your rest day for this week.':''}`)},0);
}
function toast(t){const el=document.createElement('div');el.className='toast';el.setAttribute('role','status');el.textContent=t;document.body.appendChild(el);setTimeout(()=>el.remove(),4500)}
function dayBox(){
  const t=today(),n=S.day.d==t?S.day.n:0,y=dstr(1),st=S.streak.last==t||S.streak.last==y||restNow()?S.streak.n:0;
  const rest=restNow()?'Rest day used: reach today’s goal to keep the streak':restOk()?'1 rest day a week: ready':'Rest day used this week';
  return `<div class="day"><div style="flex:1"><p class="dl"><b>Today</b> <span class="mu">${n} / ${S.goal} answers${n>=S.goal?' · goal reached':''}</span></p><div class="bar"><i style="width:${Math.min(100,Math.round(100*n/S.goal))}%"></i></div>
  <label class="mu dg">Daily goal <select onchange="S.goal=+this.value;save();home()">${[10,20,40,60].map(g=>`<option ${g==S.goal?'selected':''}>${g}</option>`).join('')}</select> answers</label>
  <p class="mu rest"><span title="Missing one day a week keeps your streak">${rest}</span> · <button class="lk" onclick="weekHome()">Your week</button></p></div>
  <div class="sk"><b>${st}</b><span class="mu">day${st==1?'':'s'} streak</span></div></div>`;
}

// ---------- Spaced repetition ----------
// Right: up one level (two if still remembered a whole interval past its due date). Wrong: down two levels,
// back in 10 minutes. Intervals from Familiar up get ±10% jitter.
const LVN=['New','Learning','Familiar','Known','Secure','Mastered'];
function srsUp(c){const late=Date.now()-c.d,step=c.b>0&&late>=INT[Math.min(c.b+1,5)]*DAY?2:1;c.b=Math.min(c.b+step,5);c.d=Date.now()+INT[c.b]*DAY*(c.b>1?.9+Math.random()*.2:1)}
function srsDown(c){c.b=Math.max(1,c.b-2);c.d=Date.now()+6e5}
const when=d=>{const m=(d-Date.now())/6e4;if(m<=0)return 'due now';if(m<60)return `in ${Math.max(1,Math.round(m))} min`;if(m<20*60)return `in ${Math.round(m/60)} h`;const n=Math.round(m/1440);return n<=1?'tomorrow':n<14?`in ${n} days`:`in ${Math.round(n/7)} weeks`};
const pips=b=>`<span class="pips" aria-label="${LVN[b]}">${[1,2,3,4,5].map(i=>`<i class="${i<=b?'on':''}"></i>`).join('')}</span>`;
const stLine=c=>c?`<p class="sl">${pips(c.b)} <b>${LVN[c.b]}</b> <span class="mu">· ${c.d<=Date.now()?'due now':'next review '+when(c.d)}</span></p>`:'';
function stBox(c){
  if(!c)return '';const up=Math.min(c.b+1,5);
  return `<div class="st"><p class="sl">${pips(c.b)} <b>${LVN[c.b]}</b> <span class="mu">· level ${c.b} of 5</span></p><p>Next review: <b>${when(c.d)}</b></p>
  <div class="lad">${[1,2,3,4,5].map(i=>`<span class="${i<=c.b?'on':''}${i==c.b?' now':''}"><b>${LVN[i]}</b>${INT[i]} d</span>`).join('')}</div>
  <p class="mu" style="font-size:.85rem">Get it right then and it moves up to ${LVN[up]}, with the next review about ${INT[up]} days later. A miss drops it two levels.</p></div>`;
}
const schTxt=(c,b0,ok,prac)=>!c?'':prac?'<p class="mu sch">Practice round: the review schedule stays the same.</p>'
  :`<p class="sch">${pips(c.b)} ${ok?(c.b>b0?`Up to <b>${LVN[c.b]}</b>. `:'')+`Comes back ${when(c.d)}.`:`${c.b<b0?'Back to':'Stays at'} <b>${LVN[c.b]}</b>. You’ll see it again shortly, then ${when(c.d)}.`}</p>`;
function forecast(cs){
  if(!cs.length)return '';const t0=new Date().setHours(0,0,0,0),n=[0,0,0],lv=[0,0,0,0,0,0];
  cs.forEach(s=>{if(s.d<t0+DAY)n[0]++;else if(s.d<t0+2*DAY)n[1]++;else if(s.d<t0+8*DAY)n[2]++;lv[Math.min(s.b,5)]++});
  return `<h2>Coming up</h2><div class="stats" style="margin-top:0"><div><b>${n[0]}</b>today</div><div><b>${n[1]}</b>tomorrow</div><div><b>${n[2]}</b>next 7 days</div></div>
  <h2>Strength</h2><div class="lvb">${lv.map((k,i)=>k?`<i class="s${i}" style="flex:${k}"></i>`:'').join('')}</div>
  <div class="lvl">${lv.map((k,i)=>k?`<span><i class="s${i}"></i>${LVN[i]} <b>${k}</b></span>`:'').join('')}</div>`;
}

// Grading a typed Dutch answer: forgiving about capitals, punctuation and accents, strict about the
// article of a noun; one slip in a longer word counts as a typo.
const norm=s=>s.toLowerCase().replace(/[’`´]/g,"'").replace(/[.,!?;:"“”()]/g,'').replace(/\s+/g,' ').trim();
const deacc=s=>s.normalize('NFD').replace(/[̀-ͯ]/g,'');
function lev(a,b){const d=Array.from({length:a.length+1},(_,i)=>[i]);for(let j=1;j<=b.length;j++)d[0][j]=j;for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++)d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]==b[j-1]?0:1));return d[a.length][b.length]}
function gradeNL(ans,w){
  const a=norm(ans),alts=w[0].split('/').map(norm),art=/^(de|het) /;
  if(!a)return {ok:0};
  for(const t of alts){if(a==t)return {ok:1};if(deacc(a)==deacc(t))return {ok:1,note:`Mind the accents: <b>${esc(t)}</b>`}}
  for(const t of alts)if(/^(de|het) \S+$/.test(t)&&deacc(a.replace(art,''))==deacc(t.replace(art,'')))
    return {ok:0,art:1,note:art.test(a)?`Right word, wrong article: it’s <b>${esc(t)}</b>.`:`Right word, but nouns need their article: <b>${esc(t)}</b>.`};
  for(const t of alts)if(t.length>=6&&lev(deacc(a),deacc(t))==1)return {ok:1,note:`Almost: watch the spelling, <b>${esc(t)}</b>.`};
  const other=W.find(x=>x!==w&&x[1]==w[1]&&x[0].split('/').some(t=>norm(t)==a));
  if(other)return {ok:1,note:`Also right. The word we were after: <b>${esc(dn(w))}</b>.`};
  return {ok:0};
}
// Typed English meanings: any of the listed meanings counts, ignoring notes in brackets, "to", "a",
// "the", a plural -s and a small typo.
const enNorm=s=>s.toLowerCase().replace(/\(.*?\)/g,' ').replace(/[^a-z' ]/g,' ').replace(/\b(to|a|an|the)\b/g,' ').replace(/\s+/g,' ').trim();
function gradeEN(ans,gloss){
  const a=enNorm(ans);if(!a)return false;
  const alts=[...gloss.split(/[,;/]|\bor\b/),gloss].map(enNorm).filter(Boolean);
  return alts.some(t=>a==t||a.replace(/s$/,'')==t.replace(/s$/,'')||(t.length>=5&&lev(a,t)<=1)||(t.length>=9&&lev(a,t)<=2));
}
let VQ;
function vAns(qi,oi){
  const v=VQ[qi];if(v.done)return;v.done=1;const ok=v.o[oi]==v.q[1];
  document.querySelectorAll(`#vq${qi} .opt`).forEach((e,j)=>{if(v.o[j]==v.q[1])e.classList.add('ok');else if(j==oi)e.classList.add('no');e.disabled=true});
  document.getElementById('vf'+qi).innerHTML=`<div class="fb ${ok?'g':'b'}">${ok?'<b>Correct.</b>':`<b>Not quite.</b> The answer is <b>${v.q[1]}</b>.`}</div>`;
  tick();save();
}
function guidePage(set,i,store,backF,pageF,title){
  store[i]=1;save();const p=set[i];VQ=p.q.map(q=>({q,o:sh(q.slice(1)),done:0}));
  $.innerHTML=`<button class="lk" onclick="${backF}()">All ${title} sections</button><p class="mu">${i+1} of ${set.length}</p><h2 style="margin-top:.2em;font-size:1.6rem">${p.t}</h2>${p.h}
  <h2>Check yourself</h2>${VQ.map((v,qi)=>`<div class="vq" id="vq${qi}"><p class="gq">${v.q[0]}</p><div class="opts vqs">${v.o.map((o,oi)=>`<button class="opt" onclick="vAns(${qi},${oi})">${o}</button>`).join('')}</div><div id="vf${qi}"></div></div>`).join('')}
  <div class="btns">${i<set.length-1?`<button class="p" onclick="${pageF}(${i+1})">Next: ${set[i+1].t}</button>`:`<button class="p" onclick="${backF}()">Done</button>`}</div>`;
  scrollTo(0,0);
}
