import { icon, mock, slide, coverMock } from '../layout.mjs';

/* Every card is generated from this one list, so the grid can never drift out
   of sync with the filter counts — those are derived, not hand-typed. */
const PROJECTS = [
  {
    href: '../projects/animus/', tags: ['product'], live: true,
    badge: 'Live · built solo', title: 'Animus',
    cover: coverMock(mock.animusFeed(), '.5'),
    body: `WhatsApp is the capture surface; a PWA is where the value lives. Claude Haiku parses a raw
      message into structured items, the feed ranks them by what's closest to rotting, and a nudge
      engine brings the right one back. Designed for adults with ADHD — where every mechanic that
      punishes absence is the mechanic that loses the user.`,
    tagList: ['Node + Express', 'React', 'Supabase', 'WhatsApp Cloud API', 'Claude Haiku'],
    cta: 'Case study',
  },
  {
    href: '../projects/shastra/', tags: ['product'], live: true,
    badge: 'Live · built solo', title: 'Shastra',
    cover: coverMock(mock.shastraChart(), '.66'),
    body: `Vedic astrology built on a verifiable ephemeris rather than vibes. Swiss Ephemeris computes;
      the LLM only narrates, and never sees a birth date, place, email or phone. The ethics rules —
      no fear-selling, no remedies, no health predictions — are asserted in the test suite, so a
      prompt that drops them fails the build.`,
    tagList: ['Swiss Ephemeris', 'Node', 'Prompt architecture', 'Programmatic SEO'],
    cta: 'Case study',
  },
  {
    href: '../projects/weekend-conundrum/', tags: ['case'],
    badge: 'Case study · BookMyShow', title: '"The Weekend Conundrum"',
    cover: slide({ kicker: 'Product case study', title: 'The Weekend<br />Conundrum', left: 'BookMyShow', right: 'Discovery' }),
    body: `People want to go out. They just don't know what to do with the weekend — a decision problem,
      not a catalogue problem. A ticketing app is built to solve the second one, which is why browsing
      it doesn't help.`,
    tagList: ['Discovery', 'Consumer', 'UX'],
    cta: 'Read the case study',
  },
  {
    href: '../projects/zomato/', tags: ['case'],
    badge: 'Case study · Zomato', title: 'Ordering experience & revenue',
    cover: slide({ kicker: 'Product case study', title: 'Ordering,<br />and revenue', left: 'Zomato', right: '20M users' }),
    body: `Improving the food-ordering experience for 20 million users. Persona and funnel work, a
      competitive teardown, and a prioritised intervention list scoped against what each change
      would realistically move.`,
    tagList: ['Growth', 'Funnel', 'Monetisation'],
    cta: 'Read the case study',
  },
  {
    href: '../projects/youtube-music/', tags: ['case', 'prd'],
    badge: 'Case study + PRD · YouTube Music', title: 'Increasing weekly active users',
    cover: slide({ kicker: 'Case study + PRD', title: 'Weekly active<br />users', left: 'YouTube Music', right: 'Retention' }),
    body: `Where WAU actually leaks in a streaming product, and which habit loop is worth building for.
      Ships with a written PRD — goals, non-goals, success metrics and acceptance criteria.`,
    tagList: ['Retention', 'Habit loop', 'PRD'],
    cta: 'Read the case study',
  },
  {
    href: '../projects/shopsy/', tags: ['case', 'prd'],
    badge: 'Case study + PRD · Shopsy', title: 'Increasing user growth',
    cover: slide({ kicker: 'Case study + PRD', title: 'User<br />growth', left: 'Shopsy', right: 'Tier 2–3 India' }),
    body: `Growth for value commerce in tier-2 and tier-3 India, where the binding constraint is trust
      and data cost rather than selection. Segment work, acquisition loops, and a PRD for the
      intervention that survived prioritisation.`,
    tagList: ['Growth', 'India', 'PRD'],
    cta: 'Read the case study',
  },
  {
    href: '../projects/galaxeye/', tags: ['company'],
    badge: 'Company · GalaxEye Space', title: 'SAR analytics, concept to trials',
    cover: slide({ kicker: 'Company work', title: 'SAR analytics<br />for defence', left: 'GalaxEye Space', right: '2024 — 2025' }),
    body: `Drone-mounted synthetic-aperture-radar analytics taken from concept through government
      trials as product co-owner, alongside cross-portfolio market strategy across defence and
      commercial lines.`,
    tagList: ['Defence', 'Geospatial', 'Market strategy'],
    cta: 'Read the case study',
  },
  {
    href: '../projects/lila-games/', tags: ['assessment'],
    badge: 'Assessment · LILA Games', title: 'APM take-home',
    cover: slide({ kicker: 'Take-home assessment', title: 'Mobile gaming<br />product review', left: 'LILA Games', right: 'APM' }),
    body: `A mobile gaming product assessment — retention mechanics, monetisation shape, and the
      player-motivation model underneath both. Written under a real deadline and kept as-is.`,
    tagList: ['Gaming', 'Retention', 'Monetisation'],
    cta: 'Read the assessment',
  },
];

const FILTERS = [
  ['all', 'Everything'],
  ['product', 'Shipped products'],
  ['case', 'Case studies'],
  ['prd', 'PRDs'],
  ['company', 'Company work'],
  ['assessment', 'Assessments'],
];

const count = key => key === 'all' ? PROJECTS.length : PROJECTS.filter(p => p.tags.includes(key)).length;

const chips = FILTERS.map(([key, text]) =>
  `<button class="chip" data-filter="${key}" aria-pressed="${key === 'all'}">${text} <span class="n">${count(key)}</span></button>`
).join('\n      ');

const cards = PROJECTS.map((p, i) => `
      <a class="card proj" data-card data-tags="${p.tags.join(' ')}" href="${p.href}">
        ${p.cover}
        <div class="card-pad proj">
          <div class="proj-top">
            <div>
              <span class="badge${p.live ? ' badge--live' : ''}">${p.live ? '<i></i>' : ''}${p.badge}</span>
              <h3 style="margin-top:12px">${p.title}</h3>
            </div>
          </div>
          <p>${p.body}</p>
          <div class="proj-foot">
            <div class="tags">${p.tagList.map(t => `<span>${t}</span>`).join('')}</div>
            <span class="arrow-link">${p.cta} ${icon.arrow}</span>
          </div>
        </div>
      </a>`).join('\n');

export default {
  dir: 'work',
  nav: 'work',
  title: `Work — Adhokshaj Wategaonkar`,
  ogTitle: `Work — Adhokshaj Wategaonkar`,
  description: `Shipped products and product case studies: Animus, Shastra, BookMyShow, Zomato, YouTube Music, Shopsy, GalaxEye Space and a LILA Games take-home. Every case study lives on this site.`,
  body: `
<section class="hero" style="padding-bottom:0">
  <div class="wrap">
    <span class="label rise">Work · <span data-result-count>${PROJECTS.length}</span> shown</span>
    <h1 class="intro-name rise" style="--i:1; margin-top:20px; font-size:clamp(2.2rem,5.6vw,3.8rem)">
      Everything, in one place.
    </h1>
    <p class="lead rise" style="--i:2; margin-top:22px">
      Two products I designed, built and shipped on my own, and six case studies where I worked the
      problem from scratch. All of them are written up here rather than parked in a doc somewhere —
      the filter is in the URL, so a filtered view is a shareable link.
    </p>
  </div>
</section>

<section class="section section--ruled" style="padding-top:clamp(36px,5vw,64px)">
  <div class="wrap">

    <div class="chips rise" role="group" aria-label="Filter projects">
      ${chips}
    </div>

    <div class="grid grid--2">
${cards}
    </div>

    <div class="rise" style="margin-top:56px; padding-top:26px; border-top:1px solid var(--line-2)">
      <span class="label">Earlier — engineering</span>
      <p class="muted" style="margin-top:12px; font-size:14.4px; max-width:64ch">
        From the ML half of my background, before product. Kept because they're the reason an
        architecture review isn't a room I sit quietly in — not because they're recent.
      </p>
      <div class="kv" style="margin-top:14px">
        <div class="kv-row">
          <span class="label">CNN · Medical imaging</span>
          <span class="v">
            <a class="link" href="https://adhokshaj.notion.site/Brain-Tumor-Classification-Using-Convolutional-Neural-Networks-c2e860101e2a4e518b3dec6e3e81a1a5" target="_blank" rel="noopener">Brain tumour classification from MRI ↗</a><br />
            <span class="faint" style="font-size:13.5px">In a clinical setting a confusion matrix is a product decision, not a metric.</span>
          </span>
        </div>
        <div class="kv-row">
          <span class="label">Optuna · Audio</span>
          <span class="v">
            <a class="link" href="https://adhokshaj.notion.site/Music-Genre-Prediction-Using-ML-Tuned-Using-Optuna-d12e189000e64fb7895c135d9784bf71" target="_blank" rel="noopener">Music genre prediction, tuned with Optuna ↗</a><br />
            <span class="faint" style="font-size:13.5px">Genre is a fuzzy label, which makes the labelling strategy matter more than the model.</span>
          </span>
        </div>
      </div>
    </div>

  </div>
</section>
`,
};
