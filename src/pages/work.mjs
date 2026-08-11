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
    cover: slide({ kicker: 'Product case study · 12 slides', title: 'The Weekend<br />Conundrum', left: 'BookMyShow', right: 'Discovery' }),
    body: `People want to go out. They just don't know what to do with the weekend — a decision problem,
      not a catalogue problem. Persona, journey map, weighted prioritisation and a "plan your weekend"
      feature. Full deck on the page.`,
    tagList: ['Discovery', 'Consumer', 'UX', 'Journey mapping'],
    cta: 'Read the case study',
  },
  {
    href: '../projects/zomato/', tags: ['case'],
    badge: 'Case study · Zomato', title: 'Improving the food ordering experience',
    cover: slide({ kicker: 'Product case study · 12 slides', title: 'Ordering,<br />and revenue', left: 'Zomato', right: '80M MAU' }),
    body: `Revenue = frequency × order value × orders — which of the three you pick decides the whole
      solution. Journey mapping, RICE scoring of four problems, and two features designed against the
      two that survived. Full deck on the page.`,
    tagList: ['Growth', 'RICE', 'Funnel', 'Monetisation'],
    cta: 'Read the case study',
  },
  {
    href: '../projects/youtube-music/', tags: ['case', 'prd'],
    badge: 'Growth strategy + PRD · YouTube Music', title: 'Driving engagement in YouTube Music',
    cover: slide({ kicker: 'Growth strategy + PRD', title: 'Driving<br />engagement', left: 'YouTube Music', right: 'vs Spotify' }),
    body: `How do you grow weekly active users against a competitor at catalogue parity? Segmentation,
      engagement loops, social network effects and RICE prioritisation across activation, sharing and
      retention — with a written PRD behind it.`,
    tagList: ['Consumer', 'Growth', 'Product metrics', 'PRD'],
    cta: 'Read the case study',
  },
  {
    href: '../projects/shopsy/', tags: ['case', 'prd'],
    badge: 'Growth strategy + PRD · Shopsy', title: 'Growing the next 200 million e-commerce users',
    cover: slide({ kicker: 'Growth strategy + PRD', title: 'The next<br />200 million', left: 'Shopsy', right: 'Tier 2–3 India' }),
    body: `Growth for India's fastest-growing social commerce platform. Segmentation, behavioural
      analysis and experimentation aimed at acquisition, trust and referral-driven growth among
      Tier-2 and Tier-3 consumers — with a written PRD behind it.`,
    tagList: ['Growth PM', 'User research', 'Experimentation', 'PRD'],
    cta: 'Read the case study',
  },
  {
    href: '../projects/beacon-deel/', tags: ['company', 'assessment'],
    badge: 'Assessment · Beacon.li × Deel', title: 'Agentic AI for an AI-native prospect',
    cover: slide({ kicker: 'Take-home assessment', title: 'Agentic AI for<br />an AI-native buyer', left: 'Beacon.li × Deel', right: 'Sep 2025' }),
    body: `The brief was deliberately awkward — show how an AI orchestration platform adds value to a
      prospect that already ships mature AI. Two gaps found in Deel from public G2 evidence, two
      agentic solutions, each with wireframes, a north-star metric and a rollout plan.`,
    tagList: ['Enterprise AI', 'Agentic', 'Wireframes', 'GTM'],
    cta: 'Read the assessment',
  },
  {
    href: '../projects/galaxeye/', tags: ['company'],
    badge: 'Company · GalaxEye Space', title: 'Building a new market for satellite intelligence',
    cover: slide({ kicker: 'Company work', title: 'A new market for<br />satellite intelligence', left: 'GalaxEye Space', right: '2024 — 2025' }),
    body: `Can a space-tech startup sell satellite data to insurers? A 30-page product strategy on
      multimodal imagery, disaster intelligence and geospatial analytics as a new B2B line — plus the
      drone SAR analytics taken from concept through government trials.`,
    tagList: ['Product strategy', 'Market research', 'B2B SaaS', 'SpaceTech'],
    cta: 'Read the case study',
  },
  {
    href: '../projects/lila-games/', tags: ['assessment'],
    badge: 'Assessment · LILA Games', title: 'Systems thinking for free-to-play games',
    cover: slide({ kicker: 'Take-home assessment', title: 'Systems thinking<br />for free-to-play', left: 'LILA Games', right: 'Game economy' }),
    body: `How do you design progression systems that keep millions of players engaged? Crafting
      economies, staffing models, feature analysis and monetisation mechanics for a mobile
      free-to-play shooter, worked through structured modelling.`,
    tagList: ['Gaming', 'Game economy', 'Monetisation', 'Systems design'],
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
  description: `Shipped products and product case studies: Animus, Shastra, BookMyShow, Zomato, YouTube Music, Shopsy, GalaxEye Space, a Beacon.li × Deel agentic-AI assessment and a LILA Games take-home. Every case study lives on this site.`,
  body: `
<section class="hero" style="padding-bottom:0">
  <div class="wrap">
    <span class="label rise">Work · <span data-result-count>${PROJECTS.length}</span> shown</span>
    <h1 class="intro-name rise" style="--i:1; margin-top:20px; font-size:clamp(2.2rem,5.6vw,3.8rem)">
      Everything, in one place.
    </h1>
    <p class="lead rise" style="--i:2; margin-top:22px">
      Two products I designed, built and shipped on my own, and seven case studies where I worked
      the problem from scratch. All of them are written up here rather than parked in a doc
      somewhere — the filter is in the URL, so a filtered view is a shareable link.
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
            <a class="link" href="https://drive.google.com/file/d/1Stb30stB6GQHtgPKx8a0wDO9sgmiFgcI/view" target="_blank" rel="noopener">Brain tumour classification from MRI — full report (PDF) ↗</a><br />
            <span class="faint" style="font-size:13.5px">In a clinical setting a confusion matrix is a product decision, not a metric.</span>
          </span>
        </div>
        <div class="kv-row">
          <span class="label">Optuna · Audio</span>
          <span class="v">
            <a class="link" href="https://drive.google.com/file/d/11M4Uv_uJGEk9LrsPGVdNbKMHawOgr4WZ/view" target="_blank" rel="noopener">Music genre prediction, tuned with Optuna — full report (PDF) ↗</a><br />
            <span class="faint" style="font-size:13.5px">Genre is a fuzzy label, which makes the labelling strategy matter more than the model.</span>
          </span>
        </div>
      </div>
    </div>

  </div>
</section>
`,
};
