import { caseStudy } from '../case-template.mjs';
import { deckViewer } from '../layout.mjs';

const A = '../../assets/cases/bookmyshow/';

const SLIDES = [
  { t: 'The Weekend Conundrum' },
  { t: 'Company — what BookMyShow is, and what it does for me' },
  { t: 'Problem statement — people want to, but don’t know how to plan their weekend' },
  { t: 'User persona — Anant Shahi, 24, Delhi/Gurgaon' },
  { t: 'Prioritisation — weighting the four causes' },
  { t: 'Current user flow' },
  { t: 'Current user journey — awareness to decision' },
  { t: 'Problems discovered — BookMyShow helps me book, not plan' },
  { t: 'Solution — a one-stop destination to build a weekend plan' },
  { t: 'Solution — add events to a plan, one payment' },
  { t: 'Success metrics — engagement, adoption and experience' },
  { t: 'Fin.' },
];

export default caseStudy({
  dir: 'projects/weekend-conundrum',
  title: 'The Weekend Conundrum — BookMyShow case study | Adhokshaj Wategaonkar',
  ogTitle: 'The Weekend Conundrum — a BookMyShow discovery case study',
  description:
    'People want to go out; they just do not know what to do with the weekend. A discovery-first BookMyShow case study: persona, journey map, weighted prioritisation, a Plan Your Weekend feature and its success metrics.',
  kicker: 'Product case study · BookMyShow',
  heading: 'The Weekend Conundrum',
  lead: `People want to go out. They just don't know <em>what</em> to do, and BookMyShow is built to
    sell a ticket to something you have already chosen. The hardest part of the weekend happens
    before the app becomes useful.`,
  badges: [
    { text: 'Self-directed case study' },
    { text: 'Consumer · discovery' },
    { text: '12-slide deck' },
  ],
  links: [
    { text: 'Read the deck', href: '#deck' },
    { text: 'Download the PDF', href: `${A}BookMyShow-Case-Study.pdf`, external: true },
  ],
  glance: [
    {
      k: 'The problem',
      v: 'BookMyShow sells a ticket to something already chosen, so it becomes useful only after the hard part is over.',
      sub: '95.2M daily visits, ₹302.9 Cr revenue, 49.5% bounce rate (2022).',
    },
    {
      k: 'How I worked it',
      v: 'Company and metric review, problem framing, persona, weighted cause prioritisation, journey map, solution, success metrics.',
      sub: 'Self-directed. The full 12-slide deck is readable on this page.',
    },
    {
      k: 'The call',
      v: 'Weighting the four causes rather than solving all four. Two carry 70% and are fixable inside the existing product. Two need a social network.',
      sub: 'That weighting decided the shape of the solution.',
    },
  ],
  sections: [
    `<h2 style="margin-top:0">Thirty percent of a working life, unplanned</h2>
      <p>
        Friday 6pm to Sunday 9pm is roughly 30% of a working professional's time, and it is the
        portion they actually own. What happens to it is the conundrum. No plan gets made, the hours
        go to scrolling, and the regret arrives on Sunday evening.
      </p>
      <p>
        Asking people why, four causes came up repeatedly. They need four different fixes:
      </p>
      <ul>
        <li><strong>Don't know what to do.</strong> A passive mindset. Hasn't put thought into it, will go with the flow, ends up joining whatever friends planned.</li>
        <li><strong>Don't know how to do it.</strong> Lack of awareness. Doesn't know what's happening nearby, or about the things they'd have liked <em>if they had known</em>.</li>
        <li><strong>Don't know whom to do it with.</strong> Lack of company. Knows what they want and can't find people.</li>
        <li><strong>Don't know if to do it.</strong> No clear go or no-go. No confidence in the plan, doesn't trust the organiser, ends up not acting.</li>
      </ul>

      <figure class="fig fig--pad">
        <div class="fig-frame"><img src="${A}s03.jpg" loading="lazy" alt="Deck slide: problem statement — the four reasons people fail to plan a weekend" data-cap="Slide 3 — the four causes, stated separately because they need different fixes." /></div>
        <figcaption><b>Slide 03</b> Four causes, kept separate. Collapsing them into "discovery is bad" produces a feature that helps nobody.</figcaption>
      </figure>`,

    `<h2>Who this is for</h2>
      <p>
        <strong>Anant Shahi, 24, data scientist, Delhi/Gurgaon.</strong> Earns enough to spend on
        experiences, cares about work-life balance, and has a wide spread of interests: stand-up and
        concerts, photography, fitness, reading, travel, learning an instrument. The spread is the
        mechanism. His weekends fail from too many good options and no way to rank them.
      </p>
      <p>
        I set the persona in a Tier 1 or Tier 2 city on purpose, because that is where events are
        being coordinated and where someone has both the disposable income and the appetite. A
        discovery product for a city with nothing happening in it is a different brief.
      </p>

      <figure class="fig fig--pad">
        <div class="fig-frame"><img src="${A}s04.jpg" loading="lazy" alt="Deck slide: user persona Anant Shahi with interests and context" data-cap="Slide 4 — the persona, with the interest spread that causes the problem." /></div>
        <figcaption><b>Slide 04</b> The interests aren't colour. They're the cause.</figcaption>
      </figure>`,

    `<h2>Weighting the causes instead of solving all four</h2>
      <p>
        Four causes, one product decision. I weighted them rather than treating them as equal: lack of
        awareness 40%, passive mindset 30%, lack of company 10%, no go/no-go 10%.
      </p>
      <p>
        That weighting is the pivotal call. Lack of company is a real problem, and solving it means
        building a social layer, which is a different company. The two causes carrying 70% of the
        weight are the same thing underneath: the platform's discovery is not good enough to turn a
        vague desire into a plan. BookMyShow can fix that inside the product it already has.
      </p>

      <figure class="fig fig--pad">
        <div class="fig-frame"><img src="${A}s05.jpg" loading="lazy" alt="Deck slide: prioritisation of the four causes by percentage weight" data-cap="Slide 5 — weighted prioritisation. Awareness and passivity carry 70%." /></div>
        <figcaption><b>Slide 05</b> The 70% that's addressable in-product, and the 20% that would need a social network.</figcaption>
      </figure>`,

    `<h2>Where the current journey breaks</h2>
      <p>
        Mapping Anant's actual path from awareness through three consideration steps to decision, the
        emotional curve falls apart in the middle. He opens the app wanting to plan <em>the whole
        weekend</em>. He hits paradox of choice straight away, then narrows to a timeframe, then a
        show, then payment.
      </p>
      <p>
        He completes the funnel. He books a ticket. The pain point recorded at the end is the
        interesting one: <em>"doesn't feel satisfied about planning a weekend."</em> The transaction
        converted and the job failed, and no conversion dashboard would have shown it.
      </p>

      <figure class="fig fig--pad">
        <div class="fig-frame"><img src="${A}s07.jpg" loading="lazy" alt="Deck slide: current user journey map from awareness through decision, with emotions and pain points" data-cap="Slide 7 — the journey map. The booking converts; the job doesn't." /></div>
        <figcaption><b>Slide 07</b> Emotion is the row that matters. It drops at "paradox of choice" and never recovers.</figcaption>
      </figure>

      <blockquote>BookMyShow = helps me book. BookMyShow ≠ helps me plan.</blockquote>

      <p>
        Two concrete failures produce that. <strong>No meticulous organisation:</strong> the only
        weekend-shaped surface is a banner reading "Head out this Weekend", and behind it sits
        everything happening in the city, indoor and outdoor and online, under one heading.
        <strong>No advanced filtering:</strong> inside the banner the user meets choice paralysis a
        second time and has to hand-sort every option. Someone who came to plan a weekend books one
        show and leaves.
      </p>`,

    `<h2>The solution: plan first, book once</h2>
      <p>
        Rather than adding a destination, the fix reworks the surface that already exists. The "Head
        out this Weekend" banner becomes a place to <em>build</em> a weekend:
      </p>
      <ul>
        <li><strong>Day selection first.</strong> Fri, Sat, Sun, Mon, because a weekend plan is scoped in days rather than in ticket categories.</li>
        <li><strong>Real filtering inside the banner</strong>, plus event-type categories so browsing is navigable instead of infinite.</li>
        <li><strong>Recommendations from history and popularity</strong>, which answers the 40% cause directly.</li>
        <li><strong>Events in time buckets</strong>, morning, afternoon and evening, so a day gets assembled rather than sampled.</li>
        <li><strong>Add to a plan instead of booking individually</strong>, then one payment for the whole plan.</li>
      </ul>
      <p>
        The time-bucket decision is the one I'd defend hardest. A catalogue sorted by category asks
        "what do you like?", which Anant can't answer. A day sorted into slots asks "what goes in
        Saturday evening?", which has a much smaller answer space. It turns an open-ended preference
        problem into a filling-in problem, and a passive user will do filling-in.
      </p>

      <div class="figs figs--2">
        <figure class="fig">
          <div class="fig-frame"><img src="${A}s09.jpg" loading="lazy" alt="Deck slide: the solution — day selection, filters and event-type categories inside the weekend banner" data-cap="Slide 9 — day selection, filtering and categories inside the existing banner." /></div>
          <figcaption><b>Slide 09</b> Day first, then time slots. The banner becomes a planner.</figcaption>
        </figure>
        <figure class="fig">
          <div class="fig-frame"><img src="${A}s10.jpg" loading="lazy" alt="Deck slide: the assembled Saturday plan with multiple events and a single payment" data-cap="Slide 10 — the assembled plan, with one payment for everything in it." /></div>
          <figcaption><b>Slide 10</b> The plan as an object you can hold, and pay for once.</figcaption>
        </figure>
      </div>

      <p>
        What Anant gets: several things browsed, selected and booked in one pass; an itinerary that
        covers a spread of interests instead of one show; the total cost of the weekend visible before
        committing rather than after four separate checkouts; and the lesser-known events that were
        never on his radar.
      </p>`,

    `<h2>How you'd know it worked</h2>
      <p>The metrics split into adoption and experience. This is a feature where usage can rise while satisfaction falls, so both are needed.</p>
      <table class="spec"><tbody>
        <tr><th>Feature adoption rate</th><td>Users who use "Plan Your Weekend" at least once, over all active users.</td></tr>
        <tr><th>Conversion rate</th><td>Users who start planning and complete planning <em>and</em> payment. The funnel now ends at a plan rather than a ticket.</td></tr>
        <tr><th>Repeat usage rate</th><td>Users who come back to it. The honest one: adoption measures whether the banner got noticed, repeat usage measures whether a weekend built this way beat the one before.</td></tr>
        <tr><th>Satisfaction score</th><td>Feature-specific surveys, weighted by response volume.</td></tr>
        <tr><th>Drop-off points</th><td>Which stage of planning gets abandoned. A diagnostic rather than a scorecard.</td></tr>
      </tbody></table>`,

    `<h2 id="deck">The original deck</h2>
      <p>Twelve slides, as presented. Arrow keys work; click a slide to enlarge.</p>
      ${deckViewer(A, SLIDES, `${A}BookMyShow-Case-Study.pdf`)}`,
  ],
  next: {
    href: '../zomato/',
    badge: 'Case study · Zomato',
    title: 'Improving the food ordering experience',
    body: 'Revenue = frequency × order value × orders. Which of the three you pick decides the whole solution.',
  },
});
