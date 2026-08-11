/* Shared shell for a case-study page. Keeps every case visually identical so
   the differences a reader notices are in the thinking, not the layout. */
import { icon } from './layout.mjs';

export const caseStudy = ({
  dir, title, ogTitle, description, kicker, heading, lead,
  badges = [], links = [], spec = [], sections = [], next,
}) => ({
  dir, nav: 'work', title, ogTitle: ogTitle || title, description,
  body: `
<section class="hero" style="padding-bottom:0">
  <div class="wrap">
    <a class="arrow-link rise" href="../../work/" style="margin-bottom:22px">
      <span style="display:inline-flex;transform:rotate(180deg)">${icon.arrow}</span> All work
    </a>

    <div class="rise" style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">
      ${badges.map(b => `<span class="badge${b.live ? ' badge--live' : ''}">${b.live ? '<i></i>' : ''}${b.text}</span>`).join('\n      ')}
    </div>

    <span class="label rise" style="--i:1; display:block; margin-top:26px">${kicker}</span>
    <h1 class="intro-name rise" style="--i:1; margin-top:14px; font-size:clamp(2.1rem,5.4vw,3.6rem)">${heading}</h1>
    <p class="lead rise" style="--i:2; margin-top:22px; font-size:clamp(1.05rem,1.7vw,1.25rem)">${lead}</p>

    ${links.length ? `<div class="intro-links rise" style="--i:3">
      ${links.map((l, i) => `<a class="btn ${i === 0 ? 'btn--primary' : 'btn--ghost'}" href="${l.href}"${l.external ? ' target="_blank" rel="noopener"' : ''}>${l.text}${l.external ? ' ' + icon.arrowOut : ''}</a>`).join('\n      ')}
    </div>` : ''}
  </div>
</section>

${spec.length ? `<section class="section section--tight">
  <div class="wrap">
    <table class="spec rise"><tbody>
      ${spec.map(([k, v]) => `<tr><th>${k}</th><td>${v}</td></tr>`).join('\n      ')}
    </tbody></table>
  </div>
</section>` : ''}

<section class="section section--ruled" style="padding-top:clamp(40px,5vw,72px)">
  <div class="wrap">
    <article class="prose rise">
      ${sections.join('\n\n      ')}
    </article>
  </div>
</section>

${next ? `<section class="section section--tight section--ruled">
  <div class="wrap">
    <div class="sec-head rise"><div><span class="label">Next</span></div></div>
    <a class="card proj rise" href="${next.href}">
      <div class="card-pad proj">
        <div class="proj-top">
          <div><span class="badge">${next.badge}</span><h3 style="margin-top:12px">${next.title}</h3></div>
          <span style="color:var(--accent-ink);flex:none;width:18px">${icon.arrow}</span>
        </div>
        <p>${next.body}</p>
      </div>
    </a>
  </div>
</section>` : ''}
`,
});
