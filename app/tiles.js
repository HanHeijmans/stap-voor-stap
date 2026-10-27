// ---------- Delft tiles ----------
// A painted tile: tin-glaze ground, cobalt corner ornaments (ring, two leaves and a dot in each corner),
// a ringed medallion and a figure. Cobalt is used twice, as dark line (C) and as a lighter wash (WS).
const C='#1f3a93',WS='#5b78c9';
const DM={
  mill:`<g transform="rotate(22 100 98)" stroke="${C}" stroke-width="1.6" fill="${WS}" fill-opacity=".4"><rect x="96.5" y="54" width="7" height="40"/><rect x="96.5" y="102" width="7" height="40"/><rect x="56" y="94.5" width="40" height="7"/><rect x="104" y="94.5" width="40" height="7"/></g>
    <path d="M89 148 L94 104 H106 L111 148 Z" fill="${WS}" fill-opacity=".55" stroke="${C}" stroke-width="2" stroke-linejoin="round"/><path d="M91 105 Q100 93 109 105 Z" fill="${C}"/>
    <path d="M96 134 h8 v14 h-8z" fill="${C}"/><circle cx="100" cy="98" r="3.6" fill="${C}"/><path d="M58 150 Q100 142 142 150" fill="none" stroke="${C}" stroke-width="2"/>`,
  tulip:`<path d="M100 150 C98 132 102 118 100 104" fill="none" stroke="${C}" stroke-width="3" stroke-linecap="round"/>
    <path d="M100 142 C82 136 74 120 76 106 C90 112 98 126 100 142Z" fill="${WS}" fill-opacity=".55" stroke="${C}" stroke-width="1.8"/>
    <path d="M100 136 C116 132 124 118 124 106 C112 110 102 122 100 136Z" fill="${WS}" fill-opacity=".55" stroke="${C}" stroke-width="1.8"/>
    <path d="M100 106 C84 104 78 84 84 66 C92 74 96 82 100 90 C104 82 108 74 116 66 C122 84 116 104 100 106Z" fill="${C}" fill-opacity=".88"/>
    <path d="M100 98 C93 88 94 72 100 60 C106 72 107 88 100 98Z" fill="${WS}" stroke="${C}" stroke-width="1.5"/>`,
  bird:`<path d="M52 138 C78 130 120 134 148 128" fill="none" stroke="${C}" stroke-width="3" stroke-linecap="round"/>
    <path d="M66 116 C66 96 88 86 110 92 C122 95 126 102 132 104 L126 114 C116 128 92 134 66 116Z" fill="${WS}" fill-opacity=".5" stroke="${C}" stroke-width="2"/>
    <circle cx="114" cy="94" r="11" fill="${WS}" fill-opacity=".5" stroke="${C}" stroke-width="2"/><circle cx="117" cy="91" r="2.4" fill="${C}"/>
    <path d="M124 89 L140 84 L125 93Z M125 96 L139 99 L124 99Z" fill="${C}"/>
    <path d="M80 110 C92 98 108 102 112 114 C100 118 90 118 80 110Z" fill="${C}" fill-opacity=".85"/><path d="M66 116 L50 124 L59 108Z" fill="${C}"/>
    <path d="M98 128 l-2 9 M106 127 l2 9" stroke="${C}" stroke-width="2"/>
    <g fill="${C}"><ellipse cx="132" cy="70" rx="4.4" ry="3.4"/><rect x="135.4" y="54" width="1.8" height="16"/><ellipse cx="146" cy="62" rx="3.4" ry="2.7"/><rect x="148.6" y="48" width="1.6" height="14"/></g>`,
  gable:`<path d="M72 148 V104 H78 V96 H84 V88 H90 V80 H96 V72 H104 V80 H110 V88 H116 V96 H122 V104 H128 V148 Z" fill="${WS}" fill-opacity=".5" stroke="${C}" stroke-width="2" stroke-linejoin="round"/>
    <g fill="${C}"><rect x="83" y="110" width="10" height="13"/><rect x="107" y="110" width="10" height="13"/><rect x="96" y="86" width="8" height="10"/></g>
    <path d="M94 148 V134 A6 6 0 0 1 106 134 V148Z" fill="${C}"/><path d="M58 152 q7 -4 14 0 t14 0 t14 0 t14 0 t14 0 t14 0" fill="none" stroke="${C}" stroke-width="2"/>`,
  ship:`<path d="M60 126 H140 L130 140 H70 Z" fill="${C}"/><path d="M100 126 V62" stroke="${C}" stroke-width="2.4"/>
    <path d="M102 68 C122 78 126 100 118 120 H102Z" fill="${WS}" fill-opacity=".5" stroke="${C}" stroke-width="1.8"/>
    <path d="M98 74 C84 84 80 102 84 120 H98Z" fill="${WS}" fill-opacity=".5" stroke="${C}" stroke-width="1.8"/><path d="M100 62 L114 66 L100 70Z" fill="${C}"/>
    <path d="M52 150 q8 -5 16 0 t16 0 t16 0 t16 0 t16 0 t16 0" fill="none" stroke="${C}" stroke-width="2"/>`
};
// Pictures of what each section does, painted in the same two cobalts.
const serif='font-family="IBM Plex Serif,Georgia,serif"';
Object.assign(DM,{
  // Find your level: a staircase of levels with a flag at the top
  steps:`<path d="M58 146 H80 V128 H100 V110 H120 V92 H142 V146 Z" fill="${WS}" fill-opacity=".45" stroke="${C}" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M80 146 V128 M100 146 V110 M120 146 V92" stroke="${C}" stroke-width="1.4" stroke-opacity=".6"/>
    <g ${serif} font-size="10" font-weight="600" fill="${C}" text-anchor="middle"><text x="69" y="142">A1</text><text x="90" y="124">A2</text><text x="110" y="106">B1</text><text x="131" y="88">B2</text></g>
    <path d="M131 80 V52" stroke="${C}" stroke-width="2.4"/><path d="M131 52 L150 58 L131 64Z" fill="${C}"/>`,
  // Pronunciation: a singing bird with sound waves
  voice:`<g transform="translate(-10 0)">${DM.bird.replace(/<g fill="#1f3a93"><ellipse[\s\S]*?<\/g>/,'')}</g>
    <path d="M136 84 a12 12 0 0 1 0 18 M144 76 a22 22 0 0 1 0 34 M152 68 a32 32 0 0 1 0 50" fill="none" stroke="${C}" stroke-width="2.2" stroke-linecap="round"/>`,
  // Words: a painted ribbon, as on old Delft text tiles
  scroll:`<path d="M44 92 L60 86 V122 L44 128 L52 109Z" fill="${WS}" fill-opacity=".6" stroke="${C}" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M156 92 L140 86 V122 L156 128 L148 109Z" fill="${WS}" fill-opacity=".6" stroke="${C}" stroke-width="1.8" stroke-linejoin="round"/>
    <rect x="56" y="80" width="88" height="36" rx="3" fill="#fbfaf5" stroke="${C}" stroke-width="2.2"/>
    <text x="100" y="104" text-anchor="middle" ${serif} font-size="17" font-style="italic" font-weight="600" fill="${C}">woorden</text>
    <text x="100" y="142" text-anchor="middle" ${serif} font-size="12" font-weight="600" fill="${C}">de · het</text>`,
  // Grammar: two pieces that fit together
  puzzle:`<path d="M56 82 H96 V93 a9 9 0 1 1 0 18 V124 H56 Z" fill="${WS}" fill-opacity=".5" stroke="${C}" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M110 82 H146 V124 H110 V112 a9 9 0 1 0 0 -20 Z" fill="${C}" fill-opacity=".88" stroke="${C}" stroke-width="2.2" stroke-linejoin="round"/>
    <g ${serif} font-size="11" font-weight="600" text-anchor="middle"><text x="74" y="107" fill="${C}">ik</text><text x="132" y="107" fill="#fbfaf5">ga</text></g>
    <path d="M60 140 q8 -4 16 0 t16 0 t16 0 t16 0 t16 0" fill="none" stroke="${C}" stroke-width="1.8" stroke-opacity=".7"/>`,
  // Reading: an open book
  book:`<path d="M100 90 C88 82 70 80 56 84 V136 C70 132 88 134 100 142 Z" fill="#fbfaf5" stroke="${C}" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M100 90 C112 82 130 80 144 84 V136 C130 132 112 134 100 142 Z" fill="${WS}" fill-opacity=".3" stroke="${C}" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M64 98 C74 96 84 97 92 101 M64 108 C74 106 84 107 92 111 M64 118 C74 116 84 117 92 121 M108 101 C116 97 126 96 136 98 M108 111 C116 107 126 106 136 108 M108 121 C116 117 126 116 136 118" fill="none" stroke="${C}" stroke-width="1.6" stroke-linecap="round"/>
    <path d="M100 90 V142" stroke="${C}" stroke-width="2"/><path d="M118 80 V96 L122 92 L126 96 V80" fill="${C}"/>`,
  // Writing: a quill on a written sheet, with an inkpot
  quill:`<rect x="56" y="80" width="46" height="62" rx="2" fill="#fbfaf5" stroke="${C}" stroke-width="2" transform="rotate(-6 79 111)"/>
    <path d="M62 94 h30 M62 104 h34 M62 114 h26 M62 124 h18" stroke="${WS}" stroke-width="2" stroke-linecap="round" transform="rotate(-6 79 111)"/>
    <path d="M140 56 C112 64 92 90 84 126 C98 108 112 100 124 98 C118 96 112 96 106 98 C120 88 132 76 140 56Z" fill="${WS}" fill-opacity=".55" stroke="${C}" stroke-width="2" stroke-linejoin="round"/>
    <path d="M140 56 C120 76 100 100 84 130" fill="none" stroke="${C}" stroke-width="1.8"/><path d="M84 126 L80 138 L88 130Z" fill="${C}"/>
    <path d="M118 120 h24 v4 h-2 l3 20 h-26 l3 -20 h-2z" fill="${C}" fill-opacity=".88" stroke="${C}" stroke-width="1.6" stroke-linejoin="round"/>`
});
// A section tile: corner ornaments, the medallion with its picture in the upper part, glaze below for text.
function delftSec(m){
  return delft(m).replace(/(<\/g>)?(<circle cx="100" cy="102" r="60"[\s\S]*)<\/svg>$/,(s,g,rest)=>`${g||''}<g transform="translate(100 60) scale(.58) translate(-100 -102)">${rest}</g></svg>`);
}
function delft(m){
  const one=`<path d="M0 0H36A36 36 0 0 1 0 36Z" fill="${C}"/><path d="M0 0H25A25 25 0 0 1 0 25Z" fill="#fbfaf5"/><path d="M0 0H15A15 15 0 0 1 0 15Z" fill="${WS}"/>
    <path d="M44 10c11 1 18 8 20 20c-11-1-18-8-20-20z" fill="${C}" fill-opacity=".85"/><path d="M10 44c1 11 8 18 20 20c-1-11-8-18-20-20z" fill="${C}" fill-opacity=".85"/><circle cx="47" cy="47" r="4.2" fill="${C}"/>`;
  const corners=['','translate(200 0) scale(-1 1)','translate(0 200) scale(1 -1)','translate(200 200) scale(-1 -1)'].map(t=>`<g transform="${t}">${one}</g>`).join('');
  const med=m?`<circle cx="100" cy="102" r="60" fill="none" stroke="${C}" stroke-width="2.5"/><circle cx="100" cy="102" r="54" fill="none" stroke="${WS}" stroke-width="1.3" stroke-dasharray="2 4"/>`:'';
  return `<svg class="dsvg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><radialGradient id="glz" cx="42%" cy="38%" r="80%"><stop offset="0" stop-color="#fefdf9"/><stop offset="1" stop-color="#ece8db"/></radialGradient></defs><rect width="200" height="200" fill="url(#glz)"/>${corners}${med}${m?DM[m]:''}</svg>`;
}
// The plain tile (corners only) is the background of word tiles.
document.documentElement.style.setProperty('--tileimg',`url("data:image/svg+xml,${encodeURIComponent(delft(''))}")`);
// Section headings: a painted tile, the English name and the Dutch one.
const H=(m,en,nl)=>`<div class="frieze" aria-hidden="true">${Array.from({length:12},(_,i)=>i%2?delft(''):delft(m)).join('')}</div><div class="sec"><span class="h1t">${delft(m)}</span><h1>${en} <span class="nl">${nl}</span></h1></div>`;
const bar=(back,done,left)=>`<div class="top"><button class="lk" onclick="${back}">Quit</button><div class="bar"><i style="width:${Math.round(100*done/Math.max(1,done+left))}%"></i></div></div>`;

