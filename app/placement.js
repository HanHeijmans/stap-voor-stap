// ---------- Placement test ----------
// Eight words from each stage, easiest stage first, all typed (no choices to guess from): half Dutch → English,
// half English → Dutch. A stage counts as known with 7 of 8 right; the test stops at the first stage below that.
// The grammar part caps the level, so knowing words alone can't place you high. Words answered right become
// Familiar; untested words of known stages become Learning and come back within two weeks, so the test's
// result gets checked rather than trusted.
const PG=[
 ['“Tomorrow I’m going to Amsterdam.”','Morgen ga ik naar Amsterdam.','Morgen ik ga naar Amsterdam.','Ik morgen ga naar Amsterdam.',0],
 ['“…because I am tired.”','…omdat ik moe ben.','…omdat ik ben moe.','…omdat ben ik moe.',12],
 ['Which article? “___ huis” (house)','het','de','den',3],
 ['“a big house”','een groot huis','een grote huis','een groots huis',4],
 ['“We went home.”','Wij zijn naar huis gegaan.','Wij hebben naar huis gegaan.','Wij zijn gegaan naar huis.',10],
 ['“I’ll phone you tomorrow.” (opbellen)','Ik bel je morgen op.','Ik opbel je morgen.','Ik bel je op morgen op.',9],
 ['“I have no time.”','Ik heb geen tijd.','Ik heb niet tijd.','Ik niet heb tijd.',6],
 ['“Yesterday I read a book.” (simple past)','Gisteren las ik een boek.','Gisteren leesde ik een boek.','Gisteren ik las een boek.',11]
];
let PL=null;
function plIntro(){
  $.innerHTML=`<button class="lk" onclick="home()">All sections</button>${H('steps','Find your level','niveautest')}
  <p>About five to ten minutes. First words, from the most common upwards, then eight short grammar questions.</p>
  <ul><li>You type the words: sometimes the English meaning, sometimes the Dutch word (with <i>de</i> or <i>het</i> for nouns). Small typos are fine.</li>
  <li>Don’t know it? Press <b>Enter</b> on an empty box. Guessing doesn’t help you: it only puts you where the lessons are too hard.</li>
  <li>Grammar questions use the number keys, or <b>0</b> for “I don’t know”.</li>
  <li>Words you clearly know are skipped in the lessons. They still come back in your reviews soon, so nothing is assumed for good.</li>
  <li>You can take the test again at any time.</li></ul>
  ${S.pl?`<p class="mu">Last result: <b>${esc(S.pl.level)}</b> on ${esc(new Date(S.pl.date).toLocaleDateString())}.</p>`:''}
  <div class="btns"><button class="p" onclick="plStart()">Start the test</button></div>`;
}
function plStart(){PL={st:0,pass:[],res:{},g:[],gi:0};plStage()}
function plStage(){
  const s=stages()[PL.st];PL.items=sh(W.filter(w=>LS[w[4]].stage==s)).slice(0,8);PL.i=0;PL.ok=0;plAsk();
}
function plAsk(){
  const w=PL.items[PL.i],s=stages(),nl=PL.i%2;PL.done=0;
  $.innerHTML=`${bar('home()',PL.st*8+PL.i,(s.length-PL.st)*8-PL.i)}<p class="mu" style="margin-top:14px">Part 1: words · ${esc(s[PL.st])} · ${PL.i+1} of 8</p>
  ${nl?`<div class="dt"><b style="font-size:1.6rem">${esc(w[1])}</b></div><p><b>Type it in Dutch</b>${/^(de|het) /.test(dn(w))?' (with <i>de</i> or <i>het</i>)':''}</p>`
    :`<div class="dt"><b style="font-size:${dn(w).length>16?1.35:dn(w).length>11?1.7:2.1}rem">${esc(dn(w))}</b></div><p><b>What does it mean?</b> Type it in English.</p>`}
  <form class="ans" onsubmit="plType();return false"><input id="in" class="in" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" lang="${nl?'nl':'en'}" aria-label="${nl?'Dutch word':'Meaning in English'}" placeholder="${nl?'Dutch':'meaning'}"><button class="p" id="ck">Next</button></form>
  <p><button class="lk" onclick="plPick(false)">I don’t know</button> <span class="mu">(or Enter on an empty box)</span></p>`;
  document.getElementById('in').focus();
}
function plType(){
  const v=document.getElementById('in').value.trim(),w=PL.items[PL.i];
  plPick(!!v&&(PL.i%2?!!gradeNL(v,w).ok:W.some(x=>(x==w||x[0]==w[0])&&gradeEN(v,x[1]))));
}
function plPick(ok){
  if(PL.done)return;PL.done=1;const w=PL.items[PL.i];
  PL.res[w[3]]=ok;if(ok)PL.ok++;PL.i++;
  if(PL.i<8)return plAsk();
  const passed=PL.ok>=7;PL.pass.push(passed);
  if(passed&&PL.st+1<stages().length){PL.st++;return plStage()}
  plGrammar();
}
function plGrammar(){
  if(PL.gi>=PG.length)return plFin();
  const q=PG[PL.gi];PL.go=sh(q.slice(1,4));PL.done=0;
  $.innerHTML=`${bar('home()',PL.gi,PG.length-PL.gi)}<p class="mu" style="margin-top:14px">Part 2: grammar · ${PL.gi+1} of ${PG.length}</p>
  <h2 style="margin-top:.3em">${q[0]}</h2><p><b>Which is right?</b></p>
  <div class="opts vqs">${PL.go.map((x,i)=>`<button class="opt" onclick="plG(${i})">${esc(x)}</button>`).join('')}<button class="opt dk" onclick="plG(-1)">I don’t know</button></div>`;
  $.focus({preventScroll:true});
}
function plG(i){if(PL.done)return;PL.done=1;const q=PG[PL.gi];PL.g.push(i>=0&&PL.go[i]==q[1]);PL.gi++;plGrammar()}
function plFin(){
  const s=stages(),np=PL.pass.filter(Boolean).length,now=Date.now(),gr=PL.g.filter(Boolean).length;
  // Grammar caps the level: words alone can't place you above what the grammar answers show.
  const li=Math.min(np,Math.round(gr*5/PG.length));
  const lv=['Beginner (around A0–A1)','Around A1','Around A1–A2','Around A2','Around A2–B1','Around B1 or above'][li];
  // Words answered right become Familiar; the untested words of passed stages become Learning and come back within two weeks.
  let n=0;
  W.forEach(w=>{const k=w[3],si=s.indexOf(LS[w[4]].stage),inPassed=si<np;
    if(S.w[k])return;
    if(PL.res[k]===true){S.w[k]={b:2,d:now+(3+Math.random()*7)*DAY};n++}
    else if(inPassed&&PL.res[k]===undefined){S.w[k]={b:1,d:now+(1+Math.random()*13)*DAY};n++}});
  S.pl={level:lv,date:now,stages:np,words:n};save();
  const weak=PG.map((q,i)=>!PL.g[i]?q[4]:-1).filter(i=>i>=0),nx=LS.findIndex(l=>!lDone(l));
  $.innerHTML=`<p class="mu">Your level</p><div class="lvlbig">${esc(lv)}</div>
  <p style="margin-top:10px">${np?`You knew the words of ${np} of ${s.length} stages.`:'The lessons start from the beginning.'}${li<np?' Your grammar answers put you lower, so the lessons won’t move too fast.':''} <b>${n}</b> words are skipped in the lessons; they come back in your reviews over the next two weeks to confirm.</p>
  <p class="mu">This is a rough guide from vocabulary and a few grammar points, not an official test.</p>
  <h2>Grammar</h2><p>${PL.g.filter(Boolean).length} of ${PG.length} right.${weak.length?' Worth reading:':' Nothing urgent to read.'}</p>
  ${weak.map(i=>`<button class="ll" onclick="gPage(${i})"><span>${esc(G[i].t)}</span><span class="mu">read</span></button>`).join('')}
  <div class="btns">${nx>=0?`<button class="p" onclick="wLesson(${nx})">Start with your first new lesson: ${esc(LS[nx].t)}</button>`:''}<button onclick="home()">Back to the start</button></div>`;
}

