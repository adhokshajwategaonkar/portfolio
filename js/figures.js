// Drawings for the case steps. Line work in currentColor with the world accent, so the
// same file paints lime on black in Animus and kumkum on paper in Shastra. Paths with
// class "dw" draw themselves on when the step opens.

const svg = (body, vb = '0 0 420 300') => `<svg class="fig" viewBox="${vb}" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
const T = (x, y, s, cls = '') => `<text x="${x}" y="${y}" class="${cls}">${s}</text>`;

export const FIG = {
  /* ---------------- Animus */
  gap: svg(`
    <circle class="dw" cx="70" cy="150" r="34"/>${T(70, 154, 'a thought', 'c')}
    <path class="dw" d="M104 150h40"/>
    <g class="steps">
      <rect class="dw" x="150" y="126" width="56" height="48" rx="10"/>${T(178, 154, 'unlock', 'c s')}
      <rect class="dw" x="216" y="126" width="56" height="48" rx="10"/>${T(244, 154, 'find app', 'c s')}
      <rect class="dw" x="282" y="126" width="56" height="48" rx="10"/>${T(310, 154, 'pick list', 'c s')}
    </g>
    <path class="dw" d="M338 150h22"/>
    <circle class="acc-s dw" cx="384" cy="150" r="18" stroke-dasharray="3 5"/>${T(384, 194, 'gone', 'c s acc-f')}
    ${T(244, 222, 'a few seconds, and the thought is gone', 'c s mut')}`),
  audiences: svg(`
    ${[['consultants', 'need to share'], ['writers', 'never notice the loss'], ['households', 'two people, day one'], ['adults with ADHD', 'the problem, every hour']].map(([a, b], i) => {
      const x = 20 + (i % 2) * 200, y = 30 + Math.floor(i / 2) * 130, on = i === 3;
      return `<rect class="dw ${on ? 'acc-s' : ''}" x="${x}" y="${y}" width="180" height="110" rx="14"/>${on ? `<circle class="acc-f0" cx="${x + 160}" cy="${y + 20}" r="5"/>` : ''}${T(x + 18, y + 48, a, on ? 'b acc-f' : 'b')}${T(x + 18, y + 72, b, 's mut')}`;
    }).join('')}`),
  persona: svg(`
    <rect class="dw" x="20" y="24" width="380" height="252" rx="18"/>
    <circle class="dw" cx="74" cy="80" r="26"/><path class="dw" d="M58 76h6M84 76h6M66 92c4 4 12 4 16 0"/>
    ${T(116, 74, 'has quit five capture apps', 'b')}${T(116, 96, 'thinks of things mid-task, lives in whatsapp', 's mut')}
    <path class="dw" d="M40 128h340"/>
    ${[['opening it was the hard part', 'the thought died in the switch'], ['it needed looking after', 'folders, tags, weekly reviews'], ['coming back felt like failing', 'red badges, broken streaks']].map(([a, b], i) => `<path class="dw acc-s" d="M44 ${150 + i * 44}l8 8M52 ${150 + i * 44}l-8 8"/>${T(66, 158 + i * 44, a)}${T(66, 174 + i * 44, b, 's mut')}`).join('')}`),
  promises: svg(`
    ${[['nothing to open', 'a message from anywhere'], ['nothing to file', 'the model sorts it'], ['nothing counts what you missed', 'no streaks, no totals']].map(([a, b], i) => {
      const y = 36 + i * 86;
      return `<rect class="dw" x="20" y="${y}" width="380" height="68" rx="14"/><circle class="acc-f0" cx="50" cy="${y + 34}" r="6"/>${T(72, y + 30, a, 'b')}${T(72, y + 50, b, 's mut')}`;
    }).join('')}`),
  doors: svg(`
    ${['whatsapp', 'the app', 'share sheet', 'iphone shortcut'].map((d, i) => `<rect class="dw" x="16" y="${30 + i * 62}" width="110" height="44" rx="10"/>${T(71, 57 + i * 62, d, 'c s')}<path class="dw" d="M126 ${52 + i * 62} C 170 ${52 + i * 62}, 170 150, 196 150"/>`).join('')}
    <circle class="dw acc-s" cx="226" cy="150" r="30"/>${T(226, 154, 'sorter', 'c s acc-f')}
    <path class="dw" d="M256 150h30"/>
    <rect class="dw" x="290" y="70" width="116" height="160" rx="14"/>${T(348, 96, 'one pile', 'c s')}
    ${[0, 1, 2, 3].map(i => `<rect x="304" y="${110 + i * 26}" width="${88 - i * 10}" height="14" rx="5" class="${i ? 'f-mut' : 'acc-f0'}"/>`).join('')}`),

  /* ---------------- Shastra: technical drawings */
  meter: svg(`
    <circle class="dw" cx="150" cy="160" r="96"/>
    ${Array.from({ length: 13 }, (_, i) => { const a = Math.PI * (1 + i / 12); return `<path d="M${150 + Math.cos(a) * 86} ${160 + Math.sin(a) * 86}L${150 + Math.cos(a) * 96} ${160 + Math.sin(a) * 96}"/>`; }).join('')}
    <path class="dw acc-s needle" d="M150 160 L218 104" stroke-width="2"/><circle cx="150" cy="160" r="5" class="acc-f0"/>
    ${T(150, 210, '₹ per minute', 'c s')}
    <path class="dw dim" d="M270 70h120M270 70v-8M390 70v-8"/>${T(330, 60, 'the call runs on', 'c s mut')}
    <rect class="dw" x="270" y="110" width="120" height="44" rx="4"/>${T(330, 137, 'a remedy for sale', 'c s')}
    <rect class="dw" x="270" y="176" width="120" height="44" rx="4" stroke-dasharray="4 4"/>${T(330, 203, 'nothing to check', 'c s mut')}`),
  asker: svg(`
    <circle class="dw" cx="110" cy="150" r="70"/><circle class="dw" cx="110" cy="150" r="46" stroke-dasharray="2 4"/>
    ${T(110, 155, 'one question', 'c b')}
    ${[['will our charts match?', 90], ['when does this phase end?', 150], ['is this a good time?', 210]].map(([q, y], i) => `<path class="dw dim" d="M184 ${150 + (i - 1) * 20} L236 ${y - 4}"/><rect class="dw ${i === 0 ? 'acc-s' : ''}" x="240" y="${y - 22}" width="164" height="34" rx="4"/>${T(252, y, q, 's')}`).join('')}
    ${T(322, 262, 'one tool for each', 'c s mut')}`),
  search: svg(`
    <rect class="dw" x="30" y="40" width="360" height="46" rx="23"/><circle class="dw" cx="58" cy="63" r="8"/><path class="dw" d="M64 69l6 6"/>
    ${T(84, 68, 'free kundli', 'b')}<path class="caret acc-s" d="M156 54v18" stroke-width="1.6"/>
    ${['kundli matching', 'sade sati dates', 'free kundli with reading'].map((s, i) => `${T(84, 120 + i * 30, s, 's mut')}<path class="dw" d="M58 ${115 + i * 30}h12"/>`).join('')}
    <path class="dw dim" d="M30 230h360"/>${T(30, 252, 'calm tone', 's')}${T(210, 252, 'no name, date or phone to the model', 's acc-f c')}`),
  engine: svg(`
    <rect class="dw" x="20" y="96" width="110" height="108" rx="4"/>${T(75, 140, 'swiss', 'c b')}${T(75, 160, 'ephemeris', 'c b')}${T(75, 184, 'computes', 'c s mut')}
    <path class="dw" d="M130 150h56"/><path d="M180 145l8 5-8 5" class="acc-s"/>
    <rect class="dw" x="190" y="110" width="88" height="80" rx="4" stroke-dasharray="3 3"/>${T(234, 146, 'results', 'c s')}${T(234, 164, 'only', 'c s')}
    <path class="dw" d="M278 150h40"/><path d="M312 145l8 5-8 5" class="acc-s"/>
    <rect class="dw acc-s" x="322" y="96" width="82" height="108" rx="4"/>${T(363, 146, 'model', 'c b acc-f')}${T(363, 166, 'explains', 'c s mut')}
    <path class="dw dim" d="M190 236h88M190 232v8M278 232v8"/>${T(234, 258, 'name, birth date, phone: never sent', 'c s mut')}
    ${T(75, 76, 'the maths', 'c s mut')}${T(363, 76, 'the words', 'c s mut')}`),
  tools: svg(`
    ${[['kundli', 'chart + reading'], ['matching', 'score out of 36'], ['sade sati', 'every phase, dated']].map(([a, b], i) => {
      const x = 20 + i * 132;
      return `<rect class="dw ${i === 0 ? 'acc-s' : ''}" x="${x}" y="60" width="118" height="150" rx="4"/>
      <path class="dw" d="M${x + 24} 86h70v70h-70z M${x + 24} 86l70 70M${x + 94} 86l-70 70"/>
      ${T(x + 59, 182, a, 'c b')}${T(x + 59, 200, b, 'c s mut')}`;
    }).join('')}
    <path class="dw dim" d="M20 236h382"/>${T(211, 260, 'free, no account, one search each', 'c s mut')}`),
};
