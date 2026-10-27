// ---------- Pronunciation ----------
const ex=(nl,en)=>`<div class="ex">${sayB(nl)}<b>${esc(nl)}</b><span class="mu">${en}</span></div>`;
const P=[
{t:'Long and short vowels',h:`<p>Dutch vowels come in short and long pairs, and the spelling shows which is which.</p>
${ex('man','man (short a)')}${ex('maan','moon (long aa)')}${ex('bed','bed (short e)')}${ex('been','leg (long ee)')}${ex('bos','forest (short o)')}${ex('boom','tree (long oo)')}
<p><b>The spelling rule.</b> A long vowel is written double in a closed syllable (ending in a consonant): <b>maan</b>, <b>boom</b>. When a vowel follows, the syllable opens and one letter is enough: <b>ma‑nen</b>, <b>bo‑men</b>. A short vowel stays short by doubling the consonant after it: <b>man → man‑nen</b>, <b>bos → bos‑sen</b>.</p>`,
 q:[['Plural of <b>boom</b> (tree)','bomen','boomen','bommen'],['Plural of <b>man</b>','mannen','manen','maanen']]},
{t:'The Dutch g and ch',h:`<p>Both are the same rough sound at the back of the throat, like the <i>ch</i> in Scottish <i>loch</i>. Never the hard <i>g</i> of English <i>go</i>.</p>
${ex('goed','good')}${ex('gaan','to go')}${ex('lachen','to laugh')}${ex('acht','eight')}
<p><b>sch</b> is s followed by that sound: <b>school</b>, <b>Scheveningen</b>. At the end of a word, <b>‑isch</b> is just “ies”: <b>logisch</b>.</p>`,
 q:[['How is the g in <b>goed</b> pronounced?','like the ch in loch','like the g in go','like the j in jam'],['Which word starts with s + the throat sound?','school','soep','suiker']]},
{t:'ui, ij and ei',h:`<p><b>ui</b> has no English equivalent: start from the <i>ow</i> of <i>house</i> with rounded lips.</p>
${ex('huis','house')}${ex('uit','out')}${ex('buiten','outside')}
<p><b>ij</b> and <b>ei</b> sound the same, roughly like the <i>ay</i> in <i>day</i> but more open. Spelling just has to be learned.</p>
${ex('mijn','my')}${ex('tijd','time')}${ex('klein','small')}${ex('trein','train')}`,
 q:[['The <b>ij</b> in <b>tijd</b> sounds like the <b>ei</b> in…','klein','hier','leuk'],['Which word has the <b>ui</b> sound?','huis','hoes','hij']]},
{t:'oe, ie, eu and uu',h:`<p>Four vowels that English speakers often misread:</p>
${ex('goed','oe = the oo of food')}${ex('boek','book')}${ex('hier','ie = the ee of see')}${ex('niet','not')}${ex('leuk','eu = like French eu, lips rounded')}${ex('deur','door')}${ex('duur','uu = ee said with rounded lips')}${ex('minuut','minute')}`,
 q:[['<b>oe</b> in <b>boek</b> sounds like…','the oo in food','the oe in toe','the o in book… as in English “book”'],['<b>ie</b> in <b>niet</b> sounds like…','the ee in see','the ie in tie','the ie in pie']]},
{t:'ou, au and the w',h:`<p><b>ou</b> and <b>au</b> sound the same, like the <i>ow</i> in <i>how</i>.</p>
${ex('oud','old')}${ex('blauw','blue')}${ex('vrouw','woman')}
<p>The Dutch <b>w</b> sits between English <i>v</i> and <i>w</i>: lips close to the teeth. And <b>v</b> at the start of a word often sounds almost like <b>f</b>.</p>
${ex('water','water')}${ex('wij','we')}${ex('vader','father')}${ex('vier','four')}`,
 q:[['<b>ou</b> in <b>oud</b> sounds like…','the ow in how','the ou in soup','the o in old'],['Which pair sounds the same?','ou and au','oe and eu','ie and ij']]},
{t:'j, r and the ‑en ending',h:`<p><b>j</b> is the English <i>y</i>: <b>ja</b> sounds like “ya”. The <b>r</b> is rolled or made in the throat, depending on the region; either is fine.</p>
${ex('ja','yes')}${ex('jij','you')}${ex('rood','red')}
<p>In everyday speech the <b>n</b> of the <b>‑en</b> ending is usually dropped: <b>lopen</b> sounds like “lope”, <b>eten</b> like “ete”.</p>
${ex('lopen','to walk')}${ex('eten','to eat')}${ex('meisjes','girls')}`,
 q:[['<b>j</b> in <b>ja</b> sounds like…','the y in yes','the j in jam','the h in ha'],['In everyday speech, <b>eten</b> usually sounds like…','“ete”','“eaten”','“eetn” with a clear n']]},
{t:'Words that fool you',h:`<p>Some Dutch words look like English ones but mean something else:</p>
${ex('slim','clever (not thin)')}${ex('dik','fat, thick')}${ex('eventueel','possibly (not eventually)')}${ex('actueel','current (not actual)')}${ex('brutaal','cheeky (not brutal)')}${ex('bellen','to phone (not to ring bells)')}
<p>And stress: most Dutch words are stressed on the first syllable, but words with prefixes like <b>be‑</b>, <b>ver‑</b> and <b>ge‑</b> are not: be<b>grij</b>pen, ver<b>tel</b>len.</p>`,
 q:[['<b>Zij is heel slim.</b>','She is very clever.','She is very thin.','She is very small.'],['<b>Eventueel kom ik morgen.</b>','I might come tomorrow.','I’ll eventually come tomorrow.','I’ll come tomorrow anyway.']]}
];
function uHome(){
  $.innerHTML=`<button class="lk" onclick="home()">All sections</button>${H('voice','Pronunciation','uitspraak')}
  <p class="mu">The sounds English speakers find hardest, with examples to listen to and two quick checks per section.${NLV?'':' Your browser has no Dutch voice, so the Listen buttons are hidden: Chrome and Edge include one.'}</p>
  <div class="btns">${P.map((p,i)=>`<button onclick="uPage(${i})">${S.u[i]?'✓ ':''}${i+1}. ${p.t}</button>`).join('')}</div>`;
}
const uPage=i=>guidePage(P,i,S.u,'uHome','uPage','pronunciation');

