// ---------- Placement test ----------
// Twelve words from each stage, easiest stage first, all typed (no choices to guess from): half Dutch → English,
// half English → Dutch. A stage counts as known with 10 of 12 right; the test stops at the first stage below that.
// Then 22 grammar gaps, also typed, from A1 to B1. The grammar score caps the level, so knowing words alone
// can't place you high. Only words typed right are skipped in the lessons (as Familiar, back within 3–10 days);
// every other word is still taught, so the test never hides a word you haven't shown you know.
// Grammar items: [hint, sentence with ___, accepted answers, grammar section].
const PG=[
 ['wonen','Hij ___ in Utrecht.',['woont'],2],
 ['spreken','Jij ___ goed Nederlands.',['spreekt'],2],
 ['de or het','___ huis is groot.',['het'],3],
 ['de or het','___ tafel is nieuw.',['de'],3],
 ['niet or geen','Ik heb ___ auto.',['geen'],6],
 ['niet or geen','Ik ben ___ moe.',['niet'],6],
 ['I go','Morgen ___ naar Amsterdam.',['ga ik'],0],
 ['do you drink (jij)','___ koffie?',['drink je','drink jij'],1],
 ['boek','Ik heb twee ___.',['boeken'],5],
 ['him','Ik zie ___ morgen.',['hem'],7],
 ['groot','Dat is een ___ huis.',['groot'],4],
 ['groot','Dat is de ___ man.',['grote'],4],
 ['to work','Ik moet morgen ___.',['werken'],8],
 ['groot','Amsterdam is ___ dan Utrecht.',['groter'],14],
 ['opbellen: type both words','Ik ___ je morgen ___.',['bel op'],9],
 ['gaan, perfect: type both words','Wij ___ naar huis ___.',['zijn gegaan'],10],
 ['kopen, perfect: type both words','Ik ___ een boek ___.',['heb gekocht'],10],
 ['zijn','Ik blijf thuis, omdat ik ziek ___.',['ben'],12],
 ['lezen, simple past','Gisteren ___ ik een boek.',['las'],11],
 ['wonen, simple past','Vroeger ___ ik in Rotterdam.',['woonde'],11],
 ['there','Is er melk? Nee, ___ is geen melk.',['er'],16],
 ['a small beer: bier','Mag ik een ___?',['biertje'],15]
];
let PL=null;
function plIntro(){
  $.innerHTML=`<button class="lk" onclick="home()">All sections</button>${H('steps','Find your level','niveautest')}
  <p>About ten to fifteen minutes. First words, from the most common upwards, then ${PG.length} short grammar gaps.</p>
  <ul><li>Everything is typed, no choices: sometimes the English meaning, sometimes the Dutch word (with <i>de</i> or <i>het</i> for nouns). Small typos are fine.</li>
  <li>Don’t know it? Press <b>Enter</b> on an empty box. Guessing doesn’t help you: it only puts you where the lessons are too hard.</li>
  <li>Only the words you type right are skipped in the lessons, and they come back in your reviews soon. All other words are still taught.</li>
  <li>You can take the test again at any time.</li></ul>
  ${S.pl?`<p class="mu">Last result: <b>${esc(S.pl.level)}</b> on ${esc(new Date(S.pl.date).toLocaleDateString())}.</p>`:''}
  <div class="btns"><button class="p" onclick="plStart()">Start the test</button></div>`;
}
const PLN=12,PLPASS=10;
function plStart(){PL={st:0,pass:[],res:{},g:[],gi:0};plStage()}
function plStage(){
  const s=stages()[PL.st];PL.items=sh(W.filter(w=>LS[w[4]].stage==s)).slice(0,PLN);PL.i=0;PL.ok=0;plAsk();
}
const plForm=(f,nl,lbl)=>`<form class="ans" onsubmit="${f}();return false"><input id="in" class="in" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" lang="${nl?'nl':'en'}" aria-label="${lbl}" placeholder="${nl?'Dutch':'meaning'}"><button class="p" id="ck">Next</button></form>
  <p><button class="lk" onclick="${f=='plType'?'plPick':'plG'}(false)">I don’t know</button> <span class="mu">(or Enter on an empty box)</span></p>`;
function plAsk(){
  const w=PL.items[PL.i],s=stages(),nl=PL.i%2,n=PL.items.length;PL.done=0;
  $.innerHTML=`${bar('home()',PL.st*PLN+PL.i,(s.length-PL.st)*PLN-PL.i)}<p class="mu" style="margin-top:14px">Part 1: words · ${esc(s[PL.st])} · ${PL.i+1} of ${n}</p>
  ${nl?`<div class="dt"><b style="font-size:1.6rem">${esc(w[1])}</b></div><p><b>Type it in Dutch</b>${/^(de|het) /.test(dn(w))?' (with <i>de</i> or <i>het</i>)':''}</p>`
    :`<div class="dt"><b style="font-size:${dn(w).length>16?1.35:dn(w).length>11?1.7:2.1}rem">${esc(dn(w))}</b></div><p><b>What does it mean?</b> Type it in English.</p>`}
  ${plForm('plType',nl,nl?'Dutch word':'Meaning in English')}`;
  document.getElementById('in').focus();
}
function plType(){
  const v=document.getElementById('in').value.trim(),w=PL.items[PL.i];
  plPick(!!v&&(PL.i%2?!!gradeNL(v,w).ok:W.some(x=>(x==w||x[0]==w[0])&&gradeEN(v,x[1]))));
}
function plPick(ok){
  if(PL.done)return;PL.done=1;const w=PL.items[PL.i];
  PL.res[w[3]]=ok;if(ok)PL.ok++;PL.i++;
  if(PL.i<PL.items.length)return plAsk();
  const passed=PL.ok>=Math.min(PLPASS,PL.items.length-1);PL.pass.push(passed);
  if(passed&&PL.st+1<stages().length){PL.st++;return plStage()}
  plGrammar();
}
function plGrammar(){
  if(PL.gi>=PG.length)return plFin();
  const q=PG[PL.gi];PL.done=0;
  $.innerHTML=`${bar('home()',PL.gi,PG.length-PL.gi)}<p class="mu" style="margin-top:14px">Part 2: grammar · ${PL.gi+1} of ${PG.length}</p>
  <h2 style="margin-top:.3em">${esc(q[1]).replace('___','<span class="mu">___</span>')}</h2><p><b>Fill the gap</b> <span class="mu">(${esc(q[0])})</span></p>
  ${plForm('plGType',1,'Missing Dutch words')}`;
  document.getElementById('in').focus();
}
function plGType(){const v=deacc(norm(document.getElementById('in').value));plG(!!v&&PG[PL.gi][2].some(a=>deacc(norm(a))==v))}
function plG(ok){if(PL.done)return;PL.done=1;PL.g.push(ok);PL.gi++;plGrammar()}
function plFin(){
  const s=stages(),np=PL.pass.filter(Boolean).length,now=Date.now(),gr=PL.g.filter(Boolean).length;
  // Grammar caps the level: words alone can't place you above what the grammar answers show.
  const li=Math.min(np,Math.floor(gr*5/PG.length+.25));
  const lv=['Beginner (around A0–A1)','Around A1','Around A1–A2','Around A2','Around A2–B1','Around B1 or above'][li];
  // Only words typed right are skipped; everything else is still taught in the lessons.
  let n=0;
  W.forEach(w=>{const k=w[3];if(!S.w[k]&&PL.res[k]===true){S.w[k]={b:2,d:now+(3+Math.random()*7)*DAY};n++}});
  S.pl={level:lv,date:now,stages:np,words:n};save();
  const weak=[...new Set(PG.map((q,i)=>!PL.g[i]?q[3]:-1).filter(i=>i>=0))],nx=LS.findIndex(l=>!lDone(l));
  $.innerHTML=`<p class="mu">Your level</p><div class="lvlbig">${esc(lv)}</div>
  <p style="margin-top:10px">${np?`You knew the words of ${np} of ${s.length} stages.`:'The lessons start from the beginning.'}${li<np?' Your grammar answers put you lower, so the lessons won’t move too fast.':''} The <b>${n}</b> words you typed right are skipped in the lessons and come back in your reviews within ten days. All other words are still taught.</p>
  <p class="mu">This is a rough guide from vocabulary and grammar, not an official test.</p>
  <h2>Grammar</h2><p>${gr} of ${PG.length} right.${weak.length?' Worth reading:':' Nothing urgent to read.'}</p>
  ${weak.map(i=>`<button class="ll" onclick="gPage(${i})"><span>${esc(G[i].t)}</span><span class="mu">read</span></button>`).join('')}
  <div class="btns">${nx>=0?`<button class="p" onclick="wLesson(${nx})">Start with your first new lesson: ${esc(LS[nx].t)}</button>`:''}<button onclick="home()">Back to the start</button></div>`;
}
