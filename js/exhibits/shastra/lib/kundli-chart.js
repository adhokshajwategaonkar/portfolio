// North Indian kundli, ported from Shastra/site/assets/kundli-chart.js.
// Houses are fixed on the page and the signs move: house 1 is the top-centre
// diamond and the numbering runs anticlockwise. Each graha label is tagged
// with data-graha so the exhibit can tie it to its paragraph both ways.
import { s } from './dom.js';

const SEATS = [
  { x: 160, y: 82 }, { x: 90, y: 48 }, { x: 48, y: 90 }, { x: 82, y: 160 },
  { x: 48, y: 230 }, { x: 90, y: 272 }, { x: 160, y: 238 }, { x: 230, y: 272 },
  { x: 272, y: 230 }, { x: 238, y: 160 }, { x: 272, y: 90 }, { x: 230, y: 48 },
];
export const ABBR = { sun: 'Su', moon: 'Mo', mars: 'Ma', mercury: 'Me', jupiter: 'Ju', venus: 'Ve', saturn: 'Sa', rahu: 'Ra', ketu: 'Ke' };

export function renderKundli(svg, chart, { navamsa = false } = {}) {
  svg.textContent = '';
  let lagnaSign = chart.lagna.signIndex;
  const placements = {};
  for (const k of Object.keys(chart.grahas)) {
    const g = chart.grahas[k];
    const hse = navamsa ? ((g.navamsaSignIndex - chart.lagna.navamsaSignIndex) + 12) % 12 + 1 : g.house;
    (placements[hse] = placements[hse] || []).push(k);
  }
  if (navamsa) lagnaSign = chart.lagna.navamsaSignIndex;

  svg.appendChild(s('g', { class: 'kc-frame' },
    s('rect', { x: 10, y: 10, width: 300, height: 300 }),
    s('path', { d: 'M10 10 L310 310 M310 10 L10 310' }),
    s('path', { d: 'M160 10 L310 160 L160 310 L10 160 Z' })));

  for (let house = 1; house <= 12; house += 1) {
    const seat = SEATS[house - 1];
    const signIndex = (lagnaSign + house - 1) % 12;
    const g = s('g', { class: 'kc-house', 'data-house': house });
    g.appendChild(s('text', { x: seat.x, y: seat.y - 13, 'text-anchor': 'middle', class: 'kc-sign' }, String(signIndex + 1)));
    const here = placements[house] || [];
    here.forEach((key, i) => {
      const row = Math.floor(i / 2), col = i % 2, wide = here.length === 1;
      const x = seat.x + (wide ? 0 : col === 0 ? -14 : 14), y = seat.y + 3 + row * 14;
      const grp = s('g', { class: 'kc-graha' + (navamsa ? ' is-d9' : ''), 'data-graha': key, tabindex: '0', role: 'button', 'aria-label': key });
      grp.appendChild(s('rect', { x: x - 13, y: y - 11, width: 26, height: 14, class: 'kc-hit' }));
      const t = s('text', { x, y, 'text-anchor': 'middle', class: 'kc-name' }, ABBR[key] || key);
      if (!navamsa && chart.grahas[key].retrograde) t.appendChild(s('tspan', { class: 'kc-r', dy: '-3' }, 'R'));
      grp.appendChild(t);
      g.appendChild(grp);
    });
    svg.appendChild(g);
  }
  const asc = s('g', { class: 'kc-graha kc-asc', 'data-graha': 'lagna', tabindex: '0', role: 'button', 'aria-label': 'rising sign' },
    s('rect', { x: 144, y: 50, width: 32, height: 12, class: 'kc-hit' }),
    s('text', { x: 160, y: 58, 'text-anchor': 'middle', class: 'kc-asc-t' }, navamsa ? 'D9' : 'ASC'));
  svg.appendChild(asc);
}
