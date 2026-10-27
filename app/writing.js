// ---------- Writing ----------
// Write the reading sentences yourself: English in, Dutch out. A sentence opens once all its words are
// learned, and each one has its own review schedule (S.wr), due ones first.
const xWords=s=>deacc(norm(s)).split(' ').filter(Boolean);
// One word: strict about de and het (and about any other word), forgiving about accents and capitals; one
// slip in a longer word counts as a typo.
function xTok(g,t){
  if(!g)return {ok:0};if(g==t)return {ok:1};
  if((g=='de'&&t=='het')||(g=='het'&&t=='de'))return {ok:0,note:`Mind <b>de</b> and <b>het</b>: here it is <b>${t}</b>.`};
  if(t.length>=6&&lev(g,t)==1)return {ok:1,note:`Watch the spelling: <b>${esc(t)}</b>.`};
  return {ok:0};
}
// Words that belong to the next word and can't start a moved part on their own or be left behind by one:
// articles, possessives, prepositions, geen, niet. Weak pronouns don't go first unless they were first already.
const XGLUE=new Set(['de','het','een','mijn','jouw','je','uw','zijn','haar','ons','onze','hun','dit','deze','die','dat','geen','in','op','naar','met','van','voor','bij','uit','aan','om','over','na','tot','zonder','achter','onder','tegen','door','te']);
const XWEAK=new Set(['je','me','ze','we','het','u','er']);
// A verb by its key, or by its spelling (the key "zijn" is the possessive; the verb has the same spelling).
const xVerb=k=>{const w=WB[k];return !!w&&W.some(x=>x[0]==w[0]&&/^to /.test(x[1]))};
// Verb second: in a statement, any one part may come first, as long as the finite verb stays second and the
// subject moves to just after it (Morgen gaan wij naar huis). Returns true if `got` (indexes into our
// sentence, in the learner's order) is such an order.
function xV2(map,l,want){
  if(/[?,]/.test(l.nl))return false;
  const v=l.ks.findIndex(xVerb);if(v<1)return false;
  const at=map.indexOf(v),x=map.slice(0,at);if(!x.length)return false;
  const a=x[0],b=x[x.length-1];
  if(!x.every((wi,j)=>wi==a+j))return false;
  if(XGLUE.has(want[b])||(a>0&&XGLUE.has(want[a-1])&&a!=v+1)||want[a]=='niet'||(x.length==1&&XWEAK.has(want[a])))return false;
  const rest=want.map((_,i)=>i).filter(i=>i!=v&&(i<a||i>b));
  return map.slice(at+1).every((wi,j)=>wi==rest[j]);
}
// Word-by-word check, then: the same words in another order count if the verb is still second.
function xGrade(ans,l){
  const got=xWords(ans),want=xWords(l.nl);
  const marks=want.map((t,i)=>{const r=xTok(got[i],t);return {t,g:got[i]||'',ok:!!r.ok,note:r.note||''}});
  if(marks.every(m=>m.ok)&&got.length==want.length)return {ok:1,marks};
  if(got.length==want.length){
    const left=want.map((t,i)=>i),map=[];
    const all=got.every((g,gi)=>{const j=left.findIndex(wi=>xTok(g,want[wi]).ok);if(j<0)return false;map[gi]=left.splice(j,1)[0];return true});
    if(all)return xV2(map,l,want)?{ok:1,order:1,marks}:{ok:0,marks,words:1};
  }
  return {ok:0,marks,extra:got.length-want.length};
}
let XQ,xc,xs;
function xHome(){
  const ids=RS.map((_,i)=>String(i)),open=ids.filter(i=>rOpen(RS[i])),due=gDue(S.wr,open).length;
  $.innerHTML=`<button class="lk" onclick="home()">All sections</button>${H('quill','Writing','schrijven')}
  <p class="mu">Put words and grammar together: you see an English sentence and write it in Dutch. The sentences are the reading ones, and each opens once you know all its words.</p>
  <div class="stats"><div><b>${open.length}/${RS.length}</b>sentences open</div><div><b>${due}</b>due now</div></div>
  <div class="btns">${open.length?`<button class="p" onclick="xStart()">Write ${Math.min(6,open.length)} sentences${due?` · <b>${due} due</b>`:''}</button>`:''}</div>
  ${open.length?'':'<div class="fb">The first sentences open after a few lessons in Words, once you know words like <b>ik</b>, <b>drinken</b> and <b>de koffie</b>.</div>'}
  ${forecast(Object.entries(S.wr).filter(([i])=>RS[i]).map(([,c])=>c))}
  <details><summary>How this works</summary><ul>
  <li>Type the whole sentence. Capitals, punctuation and accents don’t matter, and one slip in a longer word counts as a typo. <b>De</b> and <b>het</b> must be right.</li>
  <li>Another order counts too if the verb stays second: <i>Morgen gaan wij naar huis</i> is as good as <i>Wij gaan morgen naar huis</i>. If you are sure your order is good Dutch and the checker doesn’t know it, press “My order is right too”.</li>
  <li><b>Show the words</b> gives you the words shuffled. Using it means the sentence won’t move up this time, and it comes back tomorrow.</li>
  <li>Each sentence comes back on a schedule, like words: soon after a miss, later and later as you get it right.</li></ul></details>`;
}
function xStart(){
  const open=RS.map((_,i)=>String(i)).filter(i=>rOpen(RS[i]));
  XQ=sh(gPick(S.wr,open,6)).map(Number);xs={ok:0,n:0,pro:new Set(),miss:new Set()};xAsk();
}
function xAsk(){
  if(!XQ.length)return xFin();
  const i=XQ[0],l=RS[i];xc={i,l,hint:0,done:0,res:{}};
  $.innerHTML=`${bar('xHome()',xs.n,XQ.length)}<p class="mu" style="margin-top:14px">Write this in Dutch</p>
  <h2 style="font-size:1.7rem;margin:.2em 0">${esc(l.en)}</h2>
  <form class="ans" onsubmit="xSubmit();return false"><input id="xin" class="in" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" lang="nl" aria-label="Your sentence in Dutch" placeholder="e.g. Ik drink koffie"><button class="p" id="xck">Check</button></form>
  <p><button class="lk" id="xh" onclick="xHint()">Show the words</button></p><div id="xhint"></div><div id="fb"></div>`;
  document.getElementById('xin').focus();
}
function xHint(){
  if(!xc||xc.done)return;xc.hint=1;document.getElementById('xh').remove();
  document.getElementById('xhint').innerHTML=`<p class="mu" lang="nl">${sh(norm(xc.l.nl).split(' ')).map(t=>`<b style="margin-right:10px">${esc(t)}</b>`).join('')}</p>`;
  document.getElementById('xin').focus();
}
function xSubmit(){
  if(!xc||xc.done)return;const inp=document.getElementById('xin');
  xc.res=xGrade(inp.value,xc.l);xc.res.typed=inp.value.trim();
  inp.disabled=true;document.getElementById('xck').disabled=true;const h=document.getElementById('xh');if(h)h.remove();
  xDone();
}
function xDone(){
  xc.done=1;const {i,l,res}=xc,k=String(i),ok=!!res.ok;
  if(!xc.over){xc.b0=(S.wr[k]||{b:0}).b;xc.snap=S.wr[k]?{...S.wr[k]}:null;xc.missBefore=xs.miss.has(k);xs.n++;if(ok)xs.ok++;XQ.shift();if(!ok)XQ.splice(Math.min(2,XQ.length),0,i);gMark(S.wr,k,ok,xs,xc.hint||xs.miss.has(k))}
  const mk=res.marks.map(m=>`<span class="${m.ok?'pk':'px'}" title="${m.ok?'right':'expected '+esc(m.t)}"><b>${esc(m.g||'·')}</b></span>`).join(' ');
  const notes=[...new Set(res.marks.filter(m=>m.note&&(!m.ok||ok)).map(m=>m.note))];
  const why=ok?(xc.over?' Counted as right.':res.order?' Your word order differs from ours, which is fine here: the verb is still second.':'')+(notes.length?' '+notes.join(' '):'')
    :res.words?' All the words are right, but the order is not one this checker knows. Remember: the verb comes second. If you are sure it is good Dutch, count it.'
    :res.extra?` You wrote ${Math.abs(res.extra)} word${Math.abs(res.extra)>1?'s':''} ${res.extra>0?'too many':'too few'}.`
    :notes.length?' '+notes.join(' '):'';
  document.getElementById('fb').innerHTML=`<div class="fb ${ok?'g':'b'}"><b>${ok?'Correct.':'Not quite.'}</b>${why}
  ${ok&&!res.order?'':`<p style="margin-top:6px" lang="nl">Yours: ${mk}</p>`}
  <p style="margin-top:8px"><b lang="nl" style="font-family:var(--disp);font-size:1.25rem">${esc(l.nl)}</b> ${sayB(l.nl)}<br><span class="mu">${esc(l.en)}</span></p>
  ${schTxt(S.wr[k],xc.b0,ok,false)}${res.words&&!ok?'<p style="margin-top:8px"><button class="lk" onclick="xOverrule()">My order is right too: count it as right</button></p>':''}</div><button class="nx p" id="nx" onclick="xAsk()">${XQ.length?'Next':'Finish'}</button>`;
  if(S.au!==0)say(l.nl);
  document.getElementById('nx').focus();
}
// The learner overrules the order check: undo the miss and count the sentence as right.
function xOverrule(){
  if(!xc||!xc.res.words||xc.res.ok)return;const k=String(xc.i);
  if(xc.snap)S.wr[k]=xc.snap;else delete S.wr[k];
  if(!xc.missBefore)xs.miss.delete(k);
  const j=XQ.indexOf(xc.i);if(j>=0)XQ.splice(j,1);
  xs.ok++;xc.res.ok=1;xc.res.order=1;xc.over=1;
  const c=S.wr[k]=S.wr[k]||{b:0,d:Date.now()};if(xc.hint||xs.miss.has(k))c.d=Math.max(c.d,Date.now()+DAY);else if(!xs.pro.has(k)){xs.pro.add(k);srsUp(c)}save();xDone();
}
function xFin(){
  xc=null;$.innerHTML=`<h1>${xs.ok} / ${xs.n}</h1><p>${xs.ok==xs.n?'Every sentence right first time.':'Sentences you missed came back for another try, and come back soon in your reviews.'}</p>
  <div class="btns"><button class="p" onclick="xStart()">Write more</button><button onclick="xHome()">Done</button></div>`;
}
