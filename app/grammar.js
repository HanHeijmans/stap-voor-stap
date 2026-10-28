// ---------- Grammar ----------
const tbl=(head,rows)=>`<div class="tw"><table class="gt"><tr>${head.map(h=>`<th>${h}</th>`).join('')}</tr>${rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</table></div>`;
const G=[
{t:'The verb comes second',h:`<p>In a Dutch main clause the conjugated verb is always the <b>second</b> element. Whatever comes first, a time, a place, an object, the subject moves behind the verb.</p>
${ex('Ik ga morgen naar huis.','I am going home tomorrow.')}${ex('Morgen ga ik naar huis.','Tomorrow I am going home.')}${ex('In de zomer fiets ik veel.','In summer I cycle a lot.')}
<p>Starting with something other than the subject is very common, so expect the verb before the subject often.</p>`,
 q:[['“Tomorrow I’m going to Amsterdam.”','Morgen ga ik naar Amsterdam.','Morgen ik ga naar Amsterdam.','Ik morgen ga naar Amsterdam.'],['“Today we’re working at home.”','Vandaag werken wij thuis.','Vandaag wij werken thuis.','Werken vandaag wij thuis.']]},
{t:'Asking questions',h:`<p>For a yes/no question the verb comes <b>first</b>. With a question word, the question word comes first and the verb second.</p>
${ex('Kom je morgen?','Are you coming tomorrow?')}${ex('Heb je tijd?','Do you have time?')}${ex('Waar woon je?','Where do you live?')}${ex('Wat doe je vanavond?','What are you doing tonight?')}
<p>When <b>jij</b> or <b>je</b> comes after the verb, the verb loses its ‑t: <b>jij werkt</b> but <b>werk jij?</b></p>`,
 q:[['“Do you work here?”','Werk jij hier?','Werkt jij hier?','Jij hier werkt?'],['“Where do you live?”','Waar woon je?','Waar je woont?','Waar woont je?']]},
{t:'The present tense',h:`<p>Take the infinitive, remove <b>‑en</b> to get the stem. <b>ik</b> uses the stem, <b>jij/u/hij/zij</b> add <b>‑t</b>, and the plural is the infinitive.</p>
${tbl(['','werken','wonen','lopen'],[['ik','werk','woon','loop'],['jij, u','werkt','woont','loopt'],['hij, zij','werkt','woont','loopt'],['wij, jullie, zij','werken','wonen','lopen']])}
<p>Spelling follows the vowel rule: <b>lopen → loop</b> (the long vowel needs two letters in a closed syllable), <b>zitten → zit</b> (no double consonant at the end), and <b>leven → leef</b>, <b>reizen → reis</b> (no v or z at the end of a Dutch word). Irregular: <b>zijn</b> (ben, bent, is), <b>hebben</b> (heb, hebt, heeft), <b>kunnen</b> (kan, kunt, kan).</p>`,
 q:[['hij + <b>wonen</b>','woont','woon','wonent'],['ik + <b>zitten</b>','zit','zitt','zitten']]},
{t:'de and het',h:`<p>Dutch has two words for <i>the</i>. About two thirds of nouns take <b>de</b>; the rest take <b>het</b>. There is no reliable rule, so learn each noun with its article, as the word list does. Some help:</p>
<ul><li>All plurals take <b>de</b>: <b>het huis → de huizen</b>.</li><li>Diminutives (‑je) take <b>het</b>: <b>het meisje</b>, <b>het kopje</b>.</li><li>Words in <b>‑ing</b>, <b>‑heid</b> and most people take <b>de</b>: <b>de vergadering</b>, <b>de vrijheid</b>, <b>de man</b>.</li><li>Infinitives used as nouns take <b>het</b>: <b>het eten</b>.</li></ul>
<p>The article decides other words too: <b>dit/dat</b> for het-words, <b>deze/die</b> for de-words.</p>`,
 q:[['Which is right?','het meisje','de meisje','den meisje'],['Plural of <b>het huis</b>','de huizen','het huizen','het huisen']]},
{t:'Adjectives and the ‑e',h:`<p>An adjective before a noun usually gets <b>‑e</b>: <b>de grote man</b>, <b>het grote huis</b>, <b>een grote man</b>. The one exception: a <b>het-word</b> after <b>een</b>, <b>geen</b> or nothing keeps the plain form.</p>
${ex('een groot huis','a big house')}${ex('het grote huis','the big house')}${ex('een nieuwe fiets','a new bike')}
<p>After the verb there is never an ‑e: <b>het huis is groot</b>.</p>`,
 q:[['“a big house” (het huis)','een groot huis','een grote huis','een groots huis'],['“the new bike” (de fiets)','de nieuwe fiets','de nieuw fiets','het nieuwe fiets']]},
{t:'Plurals',h:`<p>Most nouns add <b>‑en</b>; nouns ending in ‑el, ‑em, ‑en, ‑er, ‑je and many loanwords add <b>‑s</b>.</p>
${tbl(['singular','plural','why'],[['boek','boeken','‑en'],['tafel','tafels','‑s after ‑el'],['man','mannen','short vowel: double the consonant'],['boom','bomen','long vowel: one letter in an open syllable'],['huis','huizen','s becomes z'],['brief','brieven','f becomes v'],['kind','kinderen','irregular']])}`,
 q:[['Plural of <b>boom</b>','bomen','boomen','bommen'],['Plural of <b>tafel</b>','tafels','tafelen','tafeles']]},
{t:'niet and geen',h:`<p><b>geen</b> replaces <b>een</b> or no article before a noun: <b>Ik heb geen auto.</b> <b>Ik heb geen tijd.</b> Everything else takes <b>niet</b>.</p>
${ex('Ik werk niet.','I’m not working.')}${ex('Het is niet duur.','It isn’t expensive.')}${ex('Ik ga niet naar huis.','I’m not going home.')}
<p><b>niet</b> usually goes to the end of the clause, but before adjectives, places and prepositions.</p>`,
 q:[['“I don’t have a car.”','Ik heb geen auto.','Ik heb niet auto.','Ik niet heb auto.'],['“It isn’t expensive.”','Het is niet duur.','Het is geen duur.','Het niet is duur.']]},
{t:'Pronouns',h:`${tbl(['subject','object','possessive'],[['ik','mij / me','mijn'],['jij / je','jou / je','jouw / je'],['u','u','uw'],['hij','hem','zijn'],['zij / ze','haar','haar'],['wij / we','ons','ons / onze'],['jullie','jullie','jullie'],['zij / ze','hen, hun / ze','hun']])}
<p>The short forms (<b>je</b>, <b>ze</b>, <b>we</b>, <b>me</b>) are normal in speech; the long ones add stress. Use <b>u</b> with strangers, older people and in formal settings.</p>`,
 q:[['“He sees me.”','Hij ziet mij.','Hij ziet ik.','Hem ziet mij.'],['“our house” (het huis)','ons huis','onze huis','wij huis']]},
{t:'Modal verbs',h:`<p><b>willen, kunnen, moeten, mogen, zullen</b> take a second verb in the infinitive, which goes to the <b>end</b>.</p>
${ex('Ik wil een fiets kopen.','I want to buy a bike.')}${ex('Ik kan morgen niet komen.','I can’t come tomorrow.')}${ex('Je moet hem bellen.','You must call him.')}${ex('Mag ik hier zitten?','May I sit here?')}`,
 q:[['“I want to buy a bike.”','Ik wil een fiets kopen.','Ik wil kopen een fiets.','Ik kopen wil een fiets.'],['“You must call him.”','Je moet hem bellen.','Je moet bellen hem.','Je bellen moet hem.']]},
{t:'Separable verbs',h:`<p>Many verbs have a prefix that splits off and goes to the <b>end</b> of a main clause: <b>opbellen</b>, <b>opstaan</b>, <b>meenemen</b>.</p>
${ex('Ik bel je morgen op.','I’ll phone you tomorrow.')}${ex('Ik sta om zeven uur op.','I get up at seven.')}
<p>The parts stay together as an infinitive, at the end of a subordinate clause, and in the participle, where <b>ge‑</b> goes in the middle:</p>
${ex('Ik moet je opbellen.','I have to phone you.')}${ex('…omdat ik vroeg opsta.','…because I get up early.')}${ex('Ik heb je opgebeld.','I phoned you.')}`,
 q:[['“I get up at seven.”','Ik sta om zeven uur op.','Ik opsta om zeven uur.','Ik op sta om zeven uur.'],['Participle of <b>opbellen</b>','opgebeld','geopbeld','opbelt']]},
{t:'The perfect tense',h:`<p>The usual past tense in conversation: <b>hebben</b> or <b>zijn</b> + a participle at the end.</p>
<p><b>Regular participles</b>: ge + stem + <b>t</b> or <b>d</b>. Use <b>t</b> if the stem ends in one of the consonants of <b>’t kofschip</b> (t, k, f, s, ch, p): <b>gewerkt</b>, <b>gefietst</b>. Otherwise <b>d</b>: <b>gewoond</b>, <b>gespeeld</b>. <b>Irregular</b> participles end in ‑en: <b>gegeten</b>, <b>gezien</b>, <b>gegaan</b>.</p>
<p><b>zijn</b> is used for a change of place or state: <b>gaan, komen, worden, blijven, gebeuren</b>.</p>
${ex('Ik heb hard gewerkt.','I have worked hard.')}${ex('Wij zijn naar huis gegaan.','We went home.')}${ex('Het is gebeurd.','It happened.')}`,
 q:[['Participle of <b>werken</b>','gewerkt','gewerkd','gewerken'],['“We went home.”','Wij zijn naar huis gegaan.','Wij hebben naar huis gegaan.','Wij zijn gegaan naar huis.']]},
{t:'The simple past',h:`<p>Used for stories and written Dutch. <b>Regular verbs</b>: stem + <b>‑te</b> (’t kofschip) or <b>‑de</b>, plural ‑ten/‑den: <b>werkte, werkten</b>; <b>woonde, woonden</b>.</p>
<p><b>Irregular verbs</b> change their vowel, and are worth learning as you meet them:</p>
${tbl(['infinitive','past','plural'],[['gaan','ging','gingen'],['komen','kwam','kwamen'],['zien','zag','zagen'],['eten','at','aten'],['lezen','las','lazen'],['zijn','was','waren'],['hebben','had','hadden']])}`,
 q:[['ik + <b>wonen</b>, simple past','woonde','woonte','woon'],['ik + <b>zien</b>, simple past','zag','ziede','zie']]},
{t:'Verb to the end',h:`<p>After linking words like <b>dat, omdat, als, wanneer, terwijl, of, hoewel</b>, all verbs go to the <b>end</b> of that clause.</p>
${ex('Ik weet dat hij morgen komt.','I know that he’s coming tomorrow.')}${ex('…omdat ik moe ben.','…because I’m tired.')}
<p>When such a clause comes first, the main clause starts with its verb: <b>Omdat het regent, blijf ik thuis.</b></p>
<p><b>want</b> also means <i>because</i>, but keeps normal word order: <b>…want ik ben moe.</b></p>`,
 q:[['“…because I am tired.”','…omdat ik moe ben.','…omdat ik ben moe.','…omdat ben ik moe.'],['“When it rains, I stay at home.”','Als het regent, blijf ik thuis.','Als het regent, ik blijf thuis.','Als regent het, blijf ik thuis.']]},
{t:'Talking about the future',h:`<p>Dutch usually uses the <b>present tense</b> with a time word, or <b>gaan</b> + infinitive for plans. <b>zullen</b> is for promises and predictions.</p>
${ex('Morgen kom ik.','I’m coming tomorrow.')}${ex('Ik ga vanavond koken.','I’m going to cook tonight.')}${ex('Ik zal het doen.','I’ll do it (I promise).')}`,
 q:[['“I’m going to cook tonight.”','Ik ga vanavond koken.','Ik vanavond ga koken.','Ik ga vanavond kook.'],['“I promise I’ll do it.”','Ik zal het doen.','Ik zal het doe.','Ik zal doen het.']]},
{t:'Comparing',h:`<p>Add <b>‑er</b> and <b>‑st</b>: <b>groot, groter, grootst</b>. “Than” is <b>dan</b>: <b>Tehran is groter dan Amsterdam.</b> Irregular: <b>goed, beter, best</b>; <b>veel, meer, meest</b>; <b>graag, liever, liefst</b>. An adjective ending in ‑r adds ‑der: <b>duur → duurder</b>.</p>`,
 q:[['“bigger than”','groter dan','groter als','meer groot dan'],['good, better, best','goed – beter – best','goed – goeder – goedst','goed – meer goed – meest goed']]},
{t:'Small words with ‑je',h:`<p>Diminutives are everywhere in Dutch, for small things and for friendliness: <b>een biertje</b>, <b>een kopje koffie</b>, <b>even een momentje</b>. They are always <b>het</b>-words.</p>
${tbl(['','diminutive','rule'],[['huis','huisje','‑je'],['kop','kopje','‑je'],['bier','biertje','‑tje after a vowel, l, n, r, w'],['boom','boompje','‑pje after m'],['bal','balletje','‑etje after a short vowel + l, m, n, r, ng']])}`,
 q:[['Diminutive of <b>huis</b>','huisje','huistje','huisetje'],['Article of <b>huisje</b>','het','de','either']]},
{t:'The little word er',h:`<p><b>er</b> has several jobs:</p>
${ex('Er is een probleem.','There is a problem.')}${ex('Ik woon er al jaren.','I’ve lived there for years.')}${ex('Ik heb er twee.','I have two (of them).')}${ex('Ik denk erover na.','I’m thinking about it.')}
<p>With a number you can’t leave it out: <b>Hoeveel kinderen heb je? Ik heb er twee.</b></p>`,
 q:[['“There is a problem.”','Er is een probleem.','Daar is een probleem.','Het is een probleem.'],['“I have two of them.”','Ik heb er twee.','Ik heb het twee.','Ik heb hen twee.']]}
];
// Verbs for the drill: infinitive, English, ik, jij, hij, past singular, past plural, auxiliary, participle.
const VB=[
['zijn','to be','ben','bent','is','was','waren','zijn','geweest'],['hebben','to have','heb','hebt','heeft','had','hadden','hebben','gehad'],
['gaan','to go','ga','gaat','gaat','ging','gingen','zijn','gegaan'],['komen','to come','kom','komt','komt','kwam','kwamen','zijn','gekomen'],
['doen','to do','doe','doet','doet','deed','deden','hebben','gedaan'],['zien','to see','zie','ziet','ziet','zag','zagen','hebben','gezien'],
['eten','to eat','eet','eet','eet','at','aten','hebben','gegeten'],['drinken','to drink','drink','drinkt','drinkt','dronk','dronken','hebben','gedronken'],
['lopen','to walk','loop','loopt','loopt','liep','liepen','hebben/zijn','gelopen'],['schrijven','to write','schrijf','schrijft','schrijft','schreef','schreven','hebben','geschreven'],
['lezen','to read','lees','leest','leest','las','lazen','hebben','gelezen'],['spreken','to speak','spreek','spreekt','spreekt','sprak','spraken','hebben','gesproken'],
['nemen','to take','neem','neemt','neemt','nam','namen','hebben','genomen'],['geven','to give','geef','geeft','geeft','gaf','gaven','hebben','gegeven'],
['krijgen','to get','krijg','krijgt','krijgt','kreeg','kregen','hebben','gekregen'],['denken','to think','denk','denkt','denkt','dacht','dachten','hebben','gedacht'],
['kopen','to buy','koop','koopt','koopt','kocht','kochten','hebben','gekocht'],['zeggen','to say','zeg','zegt','zegt','zei','zeiden','hebben','gezegd'],
['werken','to work','werk','werkt','werkt','werkte','werkten','hebben','gewerkt'],['wonen','to live','woon','woont','woont','woonde','woonden','hebben','gewoond'],
['maken','to make','maak','maakt','maakt','maakte','maakten','hebben','gemaakt'],['spelen','to play','speel','speelt','speelt','speelde','speelden','hebben','gespeeld'],
['fietsen','to cycle','fiets','fietst','fietst','fietste','fietsten','hebben/zijn','gefietst'],['blijven','to stay','blijf','blijft','blijft','bleef','bleven','zijn','gebleven'],
['kunnen','can','kan','kunt/kan','kan','kon','konden','hebben','gekund'],['willen','to want','wil','wilt/wil','wil','wilde/wou','wilden','hebben','gewild']
];
// Separable verbs, the same fields plus the prefix, which goes to the end in the present and the past.
// They join the drill once the "Separable verbs" section is read.
const VS=[
['opstaan','to get up','sta op','staat op','staat op','stond op','stonden op','zijn','opgestaan','op'],['opbellen','to phone','bel op','belt op','belt op','belde op','belden op','hebben','opgebeld','op'],
['weggaan','to leave','ga weg','gaat weg','gaat weg','ging weg','gingen weg','zijn','weggegaan','weg'],['aankomen','to arrive','kom aan','komt aan','komt aan','kwam aan','kwamen aan','zijn','aangekomen','aan'],
['meenemen','to take along','neem mee','neemt mee','neemt mee','nam mee','namen mee','hebben','meegenomen','mee'],['terugbellen','to call back','bel terug','belt terug','belt terug','belde terug','belden terug','hebben','teruggebeld','terug'],
['opschrijven','to write down','schrijf op','schrijft op','schrijft op','schreef op','schreven op','hebben','opgeschreven','op'],['aanzetten','to switch on','zet aan','zet aan','zet aan','zette aan','zetten aan','hebben','aangezet','aan'],
['uitzetten','to switch off','zet uit','zet uit','zet uit','zette uit','zetten uit','hebben','uitgezet','uit'],['klaarmaken','to prepare','maak klaar','maakt klaar','maakt klaar','maakte klaar','maakten klaar','hebben','klaargemaakt','klaar'],
['ophalen','to pick up','haal op','haalt op','haalt op','haalde op','haalden op','hebben','opgehaald','op'],['invullen','to fill in','vul in','vult in','vult in','vulde in','vulden in','hebben','ingevuld','in']
];
const PERS=['ik','jij','hij','wij','jullie','zij (they)'];
const AUX={hebben:['heb','hebt','heeft','hebben','hebben','hebben'],zijn:['ben','bent','is','zijn','zijn','zijn']};
// All accepted answers for one verb form (without the pronoun).
function conjNL(v,tense,p){
  const pl=p>=3;
  if(tense=='present')return pl&&v[9]?[v[0].slice(v[9].length)+' '+v[9]]:(pl?v[0]:v[2+p]).split('/');
  if(tense=='past')return (pl?v[6]:v[5]).split('/');
  return v[7].split('/').map(a=>AUX[a][p]+' '+v[8]);
}
const SB=[
['I am going home tomorrow.','Ik ga morgen naar huis','Morgen ga ik naar huis'],
['Tomorrow I’m going to Amsterdam.','Morgen ga ik naar Amsterdam','Ik ga morgen naar Amsterdam'],
['I know that he is coming.','Ik weet dat hij komt'],
['She doesn’t have time.','Zij heeft geen tijd'],
['We eat bread with cheese.','Wij eten brood met kaas'],
['I don’t understand it.','Ik begrijp het niet'],
['Can you help me?','Kun je mij helpen'],
['I called him yesterday.','Ik heb hem gisteren gebeld','Gisteren heb ik hem gebeld'],
['Because it’s raining, I’m staying at home.','Omdat het regent blijf ik thuis','Ik blijf thuis omdat het regent'],
['We went to Amsterdam.','Wij zijn naar Amsterdam gegaan'],
['She speaks Dutch very well.','Zij spreekt heel goed Nederlands','Zij spreekt Nederlands heel goed'],
['We have bought a new bike.','Wij hebben een nieuwe fiets gekocht'],
['Do you want coffee or tea?','Wil je koffie of thee'],
['The children are playing outside.','De kinderen spelen buiten'],
['When does the train leave?','Wanneer vertrekt de trein'],
['He gets up at seven o’clock.','Hij staat om zeven uur op','Om zeven uur staat hij op'],
['We are going to watch a film tonight.','Wij gaan vanavond een film kijken','Vanavond gaan wij een film kijken'],
['That is a big house.','Dat is een groot huis'],
['The big house is old.','Het grote huis is oud'],
['My sister lives in Utrecht.','Mijn zus woont in Utrecht'],
['I didn’t see him.','Ik heb hem niet gezien'],
['She asked whether I’m coming.','Zij vroeg of ik kom'],
['We have to leave now.','Wij moeten nu weggaan','Nu moeten wij weggaan'],
['It is cosy here.','Het is hier gezellig','Het is gezellig hier'],
['I’ll phone you tomorrow.','Ik bel je morgen op','Morgen bel ik je op'],
['I think that she is ill.','Ik denk dat zij ziek is']
];
function gHome(){
  const vd=gDue(S.gv,cjItems()).length,tn=cjTenses(),sd=gDue(S.gb,SB.map((_,i)=>String(i))).length,rd=gDue(S.gr,grKeys()).length;
  $.innerHTML=`<button class="lk" onclick="home()">All sections</button>${H('puzzle','Grammar','grammatica')}
  <p class="mu">How Dutch sentences work, in ${G.length} short sections with quick checks, and drills on a review schedule.</p>
  <div class="btns">${grKeys().length?`<button class="p" onclick="grStart()">Rule review: the sections you have read${rd?` · <b>${rd} due</b>`:''}</button>`:''}<button class="p" onclick="cjStart()">Verb drill: ${tn.length>1?tn.slice(0,-1).join(', ')+' and '+tn[tn.length-1]:'the present'}${cjVerbs().length>VB.length?', separable verbs too':''}${vd?` · <b>${vd} due</b>`:''}</button><button onclick="cjList()">Your verbs: every form, and how well you know each tense</button><button class="p" onclick="sbStart()">Sentence builder: Dutch word order${sd?` · <b>${sd} due</b>`:''}</button></div>
  <p class="mu" style="font-size:.85rem">Each rule, verb and sentence has its own review schedule, like words: what is due comes first in a round. The verb drill uses the verbs you have learned in Words, keeps a schedule per verb and tense (a person you miss comes back first), and shows hints until you know that tense well.</p>
  ${forecast([...Object.values(S.gr),...Object.values(S.gv),...Object.values(S.gb)])}
  <h2>Sections</h2><div class="btns">${G.map((g,i)=>`<button onclick="gPage(${i})">${S.g[i]?'✓ ':''}${i+1}. ${g.t}</button>`).join('')}</div>`;
}
const gPage=i=>guidePage(G,i,S.g,'gHome','gPage','grammar');
const gDue=(st,keys)=>keys.filter(k=>st[k]&&st[k].d<=Date.now());
function gPick(st,keys,n){const due=gDue(st,keys).sort((a,b)=>st[a].b-st[b].b),fresh=keys.filter(k=>!st[k]),rest=sh(keys.filter(k=>st[k]&&!due.includes(k)));return [...due,...fresh,...rest].slice(0,n)}
// Right after a hint or on a retry: no level up, but back tomorrow rather than straight away.
function gMark(st,k,ok,ses,again,pending){const c=st[k]=st[k]||{b:0,d:Date.now()};if(ok){if(again)c.d=Math.max(c.d,Date.now()+DAY);else if(!pending&&!ses.pro.has(k)&&!ses.miss.has(k)){ses.pro.add(k);srsUp(c)}}else if(!ses.miss.has(k)){ses.miss.add(k);srsDown(c)}tick();save()}
// The verb drill grows with the learner: the present at first, the simple past and the perfect once their
// sections are read, separable verbs once theirs is. Only verbs learned in Words are drilled.
// Each verb has a schedule per tense (S.gv['lopen|past']), so a weak tense comes back sooner than the ones you
// know. A missed person is remembered (wp) and asked first the next time that tense comes up. Below Known, the
// present starts with the ik form (the stem everything is built on), and a hint line shows the stem and the
// helping verb until that tense of the verb reaches Known.
const gRead=t=>!!S.g[G.findIndex(g=>g.t==t)];
const cjTenses=()=>['present',...(gRead('The simple past')?['past']:[]),...(gRead('The perfect tense')?['perfect']:[])];
const cjVerbs=()=>gRead('Separable verbs')?[...VB,...VS]:VB;
const cjLearned=v=>W.some(w=>S.w[w[3]]&&w[0].split('/').includes(v[0])&&/^(to |can)/.test(w[1]));
const cjItems=()=>{const tn=cjTenses();return cjVerbs().filter(cjLearned).flatMap(v=>tn.map(t=>v[0]+'|'+t))};
const cjHint=k=>(S.gv[k]||{b:0}).b<3;
let CJ,cjc,cjs;
function cjStart(){
  const ks=cjItems(),TO=['present','past','perfect'],ti=k=>TO.indexOf(k.split('|')[1]),all=[...VB,...VS];
  if(!ks.length){$.innerHTML=`<button class="lk" onclick="gHome()">All grammar sections</button><h2>No verbs yet</h2><p>The verb drill uses only verbs you have learned in Words. Learn a lesson with verbs (their meaning starts with “to”) and come back.</p><div class="btns"><button class="p" id="nx" onclick="gHome()">Back</button></div>`;return document.getElementById('nx').focus()}
  // Twelve items a round: due ones first (weakest first), then new ones (the present before the other tenses),
  // then the rest. The same verb is not asked twice in a row where that can be avoided.
  const due=gDue(S.gv,ks).sort((a,b)=>S.gv[a].b-S.gv[b].b),fresh=sh(ks.filter(k=>!S.gv[k])).sort((a,b)=>ti(a)-ti(b)),rest=sh(ks.filter(k=>S.gv[k]&&!due.includes(k)));
  const qs=sh([...due,...fresh,...rest].slice(0,12).map(k=>{const [vk,tense]=k.split('|'),c=S.gv[k],wp=c&&c.wp;
    return {k,v:all.find(v=>v[0]==vk),tense,p:wp!=null?wp:tense=='present'&&(!c||c.b<3)?0:Math.floor(Math.random()*6)}}));
  CJ=[];while(qs.length){const last=CJ.length&&CJ[CJ.length-1].v[0],i=Math.max(0,qs.findIndex(q=>q.v[0]!==last));CJ.push(qs.splice(i,1)[0])}
  cjs={ok:0,n:0,pro:new Set(),miss:new Set()};cjAsk();
}
function cjAsk(){
  if(!CJ.length)return cjFin();
  const q=CJ[0],v=q.v,stem=v[9]?v[2].split(' ')[0]:v[2].split('/')[0];cjc={q,ans:conjNL(v,q.tense,q.p),done:0};
  // The hint never gives the answer itself: no stem when the ik form is asked, no participle in the perfect.
  const hint=S.gs===0?'':cjHint(q.k)?[q.tense=='present'&&q.p==0?'':`stem <b>${stem}</b>`,q.tense=='perfect'?`with <b>${v[7].replace('/',' or ')}</b>`:''].filter(Boolean).join(' · '):'';
  $.innerHTML=`${bar('gHome()',cjs.n,CJ.length)}<p style="margin-top:14px"><b style="font-family:var(--disp);font-size:1.5rem">${v[0]}</b> <span class="mu">${v[1]}</span>${v[9]?` <span class="mu">· separable: <b>${v[9]}</b> goes to the end</span>`:''}</p>
  ${hint?`<p class="mu">${hint}</p>`:S.gs!==0&&!cjHint(q.k)?`<p class="mu">No hints: you know this verb in the ${q.tense} well now.</p>`:''}
  <h2 style="font-size:1.6rem;margin:.3em 0">${PERS[q.p]} · ${q.tense}</h2>
  <form class="ans" onsubmit="cjSubmit();return false"><input id="in" class="in" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" lang="nl" aria-label="Verb form" placeholder="${q.tense=='perfect'?'e.g. heb gewerkt':v[9]?'e.g. sta op':'the verb form'}"><button class="p" id="ck">Check</button></form>
  <label class="ck"><input type="checkbox" ${S.gs!==0?'checked':''} onchange="S.gs=this.checked?1:0;save();cjAsk()"> Show hints while a verb is still new</label><div id="fb"></div>`;
  document.getElementById('in').focus();
}
function cjSubmit(){
  const c=cjc;if(!c||c.done)return;c.done=1;
  const inp=document.getElementById('in'),v=norm(inp.value).replace(new RegExp('^('+PERS[c.q.p].split(' ')[0]+') '),'');
  const ok=c.ans.some(a=>norm(a)==v||deacc(norm(a))==deacc(v));
  inp.disabled=true;document.getElementById('ck').disabled=true;
  cjs.n++;if(ok)cjs.ok++;CJ.shift();if(!ok)CJ.splice(Math.min(3,CJ.length),0,{...c.q,w:1});
  const k=c.q.k,b0=(S.gv[k]||{b:0}).b;gMark(S.gv,k,ok,cjs,c.q.w,CJ.some(x=>x.k===k));
  {const g=S.gv[k];if(!ok)g.wp=c.q.p;else if(!c.q.w&&g.wp===c.q.p)delete g.wp;save()}
  const full=PERS[c.q.p].split(' ')[0]+' '+c.ans.join(' / ');
  if(S.au!==0)say(PERS[c.q.p].split(' ')[0]+' '+c.ans[0]);
  document.getElementById('fb').innerHTML=`<div class="fb ${ok?'g':'b'}"><b>${ok?'Correct.':'Not quite.'}</b>${!ok&&inp.value?` You typed <b>${esc(inp.value)}</b>.`:''}<p style="margin-top:6px"><b style="font-family:var(--disp);font-size:1.2rem">${esc(full)}</b></p>${schTxt(S.gv[k],b0,ok,false).replace('<p class="sch">','<p class="sch"><b>'+c.q.v[0]+' · '+c.q.tense+'</b> ')}<p><button class="lk" onclick="cjVerb('${c.q.v[0]}',1)">All forms of ${c.q.v[0]}</button></p></div><button class="nx p" id="nx" onclick="cjAsk()">${CJ.length?'Next':'Finish'}</button>`;
  document.getElementById('nx').focus();
}
function cjFin(){$.innerHTML=`<h1>${cjs.ok} / ${cjs.n}</h1><p>${cjs.ok==cjs.n?'Every form right.':'Missed forms came back for another try.'}</p><div class="btns"><button class="p" onclick="cjStart()">Another round</button><button onclick="gHome()">Done</button></div>`}
// Your verbs: the learned verbs with their strength, and a page per verb with every form.
const cjLv=v=>{const ks=cjItems().filter(k=>k.split('|')[0]==v[0]);return ks.length?Math.floor(ks.reduce((a,k)=>a+(S.gv[k]||{b:0}).b,0)/ks.length):0};
function cjList(){
  const vs=[...VB,...VS].filter(cjLearned).sort((a,b)=>a[0].localeCompare(b[0])),now=Date.now(),its=cjItems();
  $.innerHTML=`<button class="lk" onclick="gHome()">All grammar sections</button>${H('puzzle','Your verbs','werkwoorden')}
  <p class="mu">The ${vs.length} verbs you have learned in Words. The dots show how well you can build their forms (the average over the tenses you drill). Open one for every form.</p>
  ${vs.length?vs.map(v=>{const n=its.filter(k=>k.split('|')[0]==v[0]&&S.gv[k]&&S.gv[k].d<=now).length;
    return `<button class="ll" onclick="cjVerb('${v[0]}')"><span><b>${v[0]}</b> <span class="mu">${v[1]}</span></span><span class="mu">${n?`<b>${n} due</b> `:''}${pips(cjLv(v))}</span></button>`}).join('')
   :'<p>No verbs yet: learn a lesson with verbs in Words first.</p>'}
  <div class="btns"><button class="p" onclick="cjStart()">Verb drill</button></div>`;
  scrollTo(0,0);
}
function cjVerb(vk,fromDrill){
  const v=[...VB,...VS].find(x=>x[0]==vk),on=cjTenses(),its=cjItems(),TO=['present','past','perfect'];
  const lv=t=>{const k=vk+'|'+t,c=S.gv[k];if(!its.includes(k))return on.includes(t)?'':`<span class="mu">joins the drill once you read “${t=='past'?'The simple past':'The perfect tense'}”</span>`;
    return c?`${pips(c.b)} <b>${LVN[c.b]}</b> <span class="mu">· ${c.d<=Date.now()?'due now':'next '+when(c.d)}${c.wp!=null?` · last missed: ${PERS[c.wp]}`:''}</span>`:'<span class="mu">not drilled yet</span>'};
  const rows=PERS.map((p,i)=>[`<b>${p}</b>`,...TO.map(t=>esc(conjNL(v,t,i).join(' / ')))]);
  $.innerHTML=`<button class="lk" onclick="${fromDrill?'cjAsk()':'cjList()'}">${fromDrill?'Back to the drill':'All your verbs'}</button>
  <p style="margin-top:14px"><b style="font-family:var(--disp);font-size:1.8rem">${v[0]}</b> <span class="mu">${v[1]}</span> ${sayB(v[0])}</p>
  <p>Stem <b>${v[9]?v[2].split(' ')[0]:v[2].split('/')[0]}</b> · past <b>${v[5]}</b>, <b>${v[6]}</b> · perfect with <b>${v[7].replace('/',' or ')}</b> + <b>${v[8]}</b>${v[9]?` · separable: <b>${v[9]}</b> goes to the end`:''}</p>
  ${TO.map(t=>`<p class="sl"><span class="mu">${t[0].toUpperCase()+t.slice(1)}:</span> ${lv(t)}</p>`).join('')}
  ${tbl(['','present','past','perfect'],rows)}`;
  scrollTo(0,0);
}
// ---------- Rule review ----------
// Each grammar section you have read becomes a rule with its own review schedule (S.gr, by title), like a word.
// A round takes up to six rules, due ones first, with two questions each: one of the section's own checks and,
// for the verb sections, a fresh one built from the verb list whose wrong options are near misses (another
// tense or person, a regular ending on an irregular verb). A rule moves up only if all its questions in the
// round are right. Right answers in a row build a streak.
const grKeys=()=>G.filter((g,i)=>S.g[i]).map(g=>g.t);
function grGen(t){
  const v=VB[Math.floor(Math.random()*VB.length)],p=Math.floor(Math.random()*6),f=tn=>conjNL(v,tn,p)[0],who=`<b>${PERS[p]}</b> + <b>${v[0]}</b> (${v[1]})`,r=v[8];
  const Q={
    'The present tense':()=>[`${who}, present`,f('present'),f('past'),p<3?v[0]:v[2]],
    'The perfect tense':()=>[`Participle of <b>${v[0]}</b> (${v[1]})`,r,/[td]$/.test(r)?r.slice(0,-1)+(r.endsWith('t')?'d':'t'):'ge'+v[2]+'d',r.endsWith('en')?'ge'+v[2]+'t':'ge'+v[0]],
    'The simple past':()=>{const a=f('past'),reg=v[2]+(p<3?'de':'den');return [`${who}, simple past`,a,reg==a?v[2]+(p<3?'te':'ten'):reg,f('present')]}
  }[t];
  const q=Q&&Q();return q&&new Set(q.slice(1)).size==3?q:null;
}
let GRQ,grc,grs;
function grStart(){
  const ks=gPick(S.gr,grKeys(),6),qs=ks.map(k=>{const st=sh(G.find(g=>g.t==k).q.slice());return [st[0],grGen(k)||st[1]].map(q=>({k,q}))});
  // The first question of every rule, then the second ones, so one rule's questions are spread apart.
  GRQ=[...sh(qs.map(x=>x[0])),...sh(qs.map(x=>x[1]))];
  grs={ok:0,n:0,pro:new Set(),miss:new Set(),run:0,best:0,b0:{}};ks.forEach(k=>grs.b0[k]=(S.gr[k]||{b:0}).b);grAsk();
}
function grAsk(){
  if(!GRQ.length)return grFin();
  const it=GRQ[0];grc={it,o:sh(it.q.slice(1)),done:0};
  $.innerHTML=`${bar('gHome()',grs.n,GRQ.length)}${grs.run>=3?`<p class="combo">${grs.run} in a row</p>`:''}
  <p class="mu" style="margin-top:14px">Rule: <b>${esc(it.k)}</b></p><h2 style="margin-top:.3em">${it.q[0]}</h2><p><b>Which is right?</b></p>
  <div class="opts vqs">${grc.o.map((o,i)=>`<button class="opt" onclick="grPick(${i})">${esc(o)}</button>`).join('')}</div><div id="fb"></div>`;
  $.focus({preventScroll:true});
}
function grPick(i){
  const c=grc;if(!c||c.done)return;c.done=1;const {it,o}=c,ok=o[i]==it.q[1],k=it.k;
  document.querySelectorAll('.opt').forEach((e,j)=>{if(o[j]==it.q[1])e.classList.add('ok');else if(j==i)e.classList.add('no');e.disabled=true});
  grs.n++;if(ok){grs.ok++;grs.run++;grs.best=Math.max(grs.best,grs.run)}else grs.run=0;
  GRQ.shift();if(!ok)GRQ.splice(Math.min(3,GRQ.length),0,{...it,w:1});
  const b0=(S.gr[k]||{b:0}).b;gMark(S.gr,k,ok,grs,it.w,GRQ.some(x=>x.k===k));
  const up=S.gr[k].b>b0;
  document.getElementById('fb').innerHTML=`<div class="fb ${ok?'g':'b'}"><b>${ok?(grs.run>=3?`Correct · ${grs.run} in a row!`:'Correct.'):'Not quite.'}</b>${ok?'':` The answer is <b>${esc(it.q[1])}</b>.`}${schTxt(S.gr[k],b0,ok,false).replace('<p class="sch">',`<p class="sch${up?' lvup':''}">`)}${ok?'':`<p><button class="lk" onclick="gPage(${G.findIndex(g=>g.t==k)})">Read “${esc(k)}” again</button></p>`}</div><button class="nx p" id="nx" onclick="grAsk()">${GRQ.length?'Next':'Finish'}</button>`;
  document.getElementById('nx').focus();
}
function grFin(){
  const ks=Object.keys(grs.b0);grc=null;
  $.innerHTML=`<h1>${grs.ok} / ${grs.n}</h1><p>${grs.ok==grs.n?'Every rule right.':'Missed questions came back for another try.'}${grs.best>=3?` Best streak: <b>${grs.best} in a row</b>.`:''}</p>
  <div class="grl">${ks.map(k=>{const c=S.gr[k];return c?`<div><span>${esc(k)}</span>${pips(c.b)}<span class="mu">${c.b>grs.b0[k]?`<b class="upb">↑ ${LVN[c.b]}</b>`:LVN[c.b]}</span></div>`:''}).join('')}</div>
  <div class="btns"><button class="p" onclick="grStart()">Another round</button><button onclick="gHome()">Done</button></div>`;
}
let SBQ,sbc,sbs;
function sbStart(){SBQ=sh(gPick(S.gb,SB.map((_,i)=>String(i)),8)).map(Number);sbs={ok:0,n:0,pro:new Set(),miss:new Set()};sbAsk()}
function sbAsk(){
  if(!SBQ.length)return sbFin();
  const s=SB[SBQ[0]],keep=w=>/^[A-Z]/.test(w)&&!['Ik','Wij','Zij','Het','De','Morgen','Gisteren','Omdat','Kun','Wil','Wanneer','Om','Vanavond','Dat','Mijn','Nu','Hij'].includes(w);
  const toks=s[1].split(' ').map(w=>keep(w)?w:w.toLowerCase());
  let order=sh(toks.map((_,i)=>i));for(let k=0;k<20&&toks.length>1&&order.every((v,i)=>v==i);k++)order=sh(order);
  sbc={i:SBQ[0],s,toks,order,picked:[],done:0,fb:''};sbRender();
}
function sbRender(){
  const c=sbc,tile=(ti,f)=>`<button class="tile" onclick="${f}" ${c.done?'disabled':''}>${esc(c.toks[ti])}</button>`;
  $.innerHTML=`${bar('gHome()',sbs.n,SBQ.length)}<h2 style="font-size:1.5rem">${esc(c.s[0])}</h2><p><b>Build the sentence in Dutch.</b> Tap the words in order, or press their numbers. Backspace takes the last one back.</p>
  <div class="sbans">${c.picked.map((ti,j)=>tile(ti,`sbUn(${j})`)).join('')}</div>
  <div class="sbpool">${c.order.filter(ti=>!c.picked.includes(ti)).map(ti=>tile(ti,`sbPick(${ti})`)).join('')}</div>
  ${c.done?'':`<button class="nx p" onclick="sbCheck()" ${c.picked.length==c.toks.length?'':'disabled'}>Check</button>`}<div id="fb">${c.fb}</div>`;
}
function sbPick(ti){if(!sbc.done){sbc.picked.push(ti);sbRender()}}
function sbUn(j){if(!sbc.done){sbc.picked.splice(j,1);sbRender()}}
function sbCheck(){
  const c=sbc,ans=norm(c.picked.map(ti=>c.toks[ti]).join(' ')),ok=c.s.slice(1).some(x=>norm(x)==ans);
  c.done=1;sbs.n++;if(ok)sbs.ok++;SBQ.shift();if(!ok)SBQ.splice(Math.min(3,SBQ.length),0,c.i);
  const k=String(c.i),b0=(S.gb[k]||{b:0}).b;gMark(S.gb,k,ok,sbs,sbs.miss.has(k));
  if(S.au!==0)say(c.s[1]);
  c.fb=`<div class="fb ${ok?'g':'b'}"><b>${ok?'Correct.':'Not quite.'}</b><p style="margin-top:6px"><b style="font-family:var(--disp);font-size:1.2rem">${esc(c.s[1])}.</b></p>${c.s[2]?`<p class="mu">Also right: ${c.s.slice(2).map(x=>esc(x)+'.').join(' ')}</p>`:''}${sayB(c.s[1])}${schTxt(S.gb[k],b0,ok,false)}</div><button class="nx p" id="nx" onclick="sbAsk()">${SBQ.length?'Next':'Finish'}</button>`;
  sbRender();document.getElementById('nx').focus();
}
function sbFin(){$.innerHTML=`<h1>${sbs.ok} / ${sbs.n}</h1><p>${sbs.ok==sbs.n?'Every sentence right first time.':'Sentences you got wrong came back once more.'}</p><div class="btns"><button class="p" onclick="sbStart()">More sentences</button><button onclick="gHome()">Done</button></div>`}

