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
    'People want to go out; they just do not know what to do with the weekend. A discovery-first BookMyShow case study — persona, journey map, weighted prioritisation, a Plan Your Weekend feature and its success metrics.',
  kicker: 'Product case study · BookMyShow',
  heading: 'The Weekend Conundrum',
  lead: `People want to go out. They just don't know <em>what</em> to do — and BookMyShow is built to
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
  spec: [
    ['Surface', 'BookMyShow — India’s leading out-of-home entertainment platform. <strong>95.2M daily visits, ₹302.9 Cr revenue (2022), 5:07 average visit, 49.48% bounce rate.</strong>'],
    ['The question', '<strong>What should a ticketing app do for a user who hasn’t decided anything yet?</strong>'],
    ['Method', 'Company and metric review → problem framing → persona → weighted cause prioritisation → current-state journey map → problem synthesis → solution → success metrics.'],
    ['Focus', 'Discovery · decision architecture · consumer UX'],
  ],
  sections: [
    `<h2 style="margin-top:0">The weekend is 30% of a working life, and it goes unplanned</h2>
      <p>
        Friday 6pm to Sunday 9pm is roughly <strong>30% of a working professional's time</strong> —
        and it's the portion they actually own. The conundrum is what happens to it: no plan gets
        made, the time goes to scrolling or something unrewarding, and the regret arrives on Sunday
        evening when it's clear a goldmine of time, energy and fun has been spent on nothing.
      </p>
      <p>
        Talking to people about why, four causes came up repeatedly — and they are not the same
        problem wearing different clothes:
      </p>
      <ul>
        <li><strong>Don't know what to do</strong> — a passive mindset. Hasn't put thought into it, will go with the flow, ends up involuntarily joining whatever friends planned.</li>
        <li><strong>Don't know how to do it</strong> — lack of awareness. Doesn't know what's happening around them, and doesn't know about the things they'd like <em>if they had known</em>.</li>
        <li><strong>Don't know whom to do it with</strong> — lack of company. Knows what they want; can't find people.</li>
        <li><strong>Don't know if to do it</strong> — no clear go/no-go. No confidence in the plan, doesn't trust the organiser, ends up not acting.</li>
      </ul>

      <figure class="fig fig--pad">
        <div class="fig-frame"><img src="${A}s03.jpg" loading="lazy" alt="Deck slide: problem statement — the four reasons people fail to plan a weekend" data-cap="Slide 3 — the four causes, stated separately because they need different fixes." /></div>
        <figcaption><b>Slide 03</b> Four causes, kept separate on purpose. Collapsing them into "discovery is bad" is what produces a feature that helps nobody.</figcaption>
      </figure>`,

    `<h2>Who this is actually for</h2>
      <p>
        <strong>Anant Shahi — 24, data scientist, Delhi/Gurgaon.</strong> Earns enough to spend on
        experiences, cares about work-life balance, and has a wide spread of interests: stand-up and
        concerts, photography, fitness, reading, travel, learning an instrument. That spread is
        exactly the problem. His weekends fail not from lack of options but from a
        <em>delightful dilemma of choices</em> he never resolves.
      </p>
      <p>
        The persona is deliberately Tier 1/Tier 2, because that's where events are actually being
        coordinated and where someone has both the disposable income and the appetite to attend.
        A discovery product for a city with nothing happening is a different product.
      </p>

      <figure class="fig fig--pad">
        <div class="fig-frame"><img src="${A}s04.jpg" loading="lazy" alt="Deck slide: user persona Anant Shahi with interests and context" data-cap="Slide 4 — the persona, with the interest spread that causes the problem." /></div>
        <figcaption><b>Slide 04</b> The interests aren't colour. They're the mechanism — too many good options and no ranking.</figcaption>
      </figure>`,

    `<h2>Weighting the causes instead of solving all four</h2>
      <p>
        Four causes, one product decision. I weighted them rather than treating them as equal:
        <strong>lack of awareness 40%, passive mindset 30%, lack of company 10%, no go/no-go
        10%.</strong>
      </p>
      <p>
        That weighting is the pivotal call in the whole case. "Lack of company" is a real problem —
        and solving it means building a social layer, which is a different company. The two causes
        that carry <strong>70%</strong> of the weight are both, underneath, the same thing:
        <strong>the platform's discovery is not good enough to convert a vague desire into a
        plan</strong>. That is a problem BookMyShow can fix inside its existing product.
      </p>

      <figure class="fig fig--pad">
        <div class="fig-frame"><img src="${A}s05.jpg" loading="lazy" alt="Deck slide: prioritisation of the four causes by percentage weight" data-cap="Slide 5 — weighted prioritisation. Awareness and passivity carry 70%." /></div>
        <figcaption><b>Slide 05</b> The 70% that's addressable in-product, and the 20% that would need a social network.</figcaption>
      </figure>`,

    `<h2>Where the current journey breaks</h2>
      <p>
        Mapping Anant's actual path — awareness, discovery, three consideration steps, decision —
        the emotional curve falls apart in the middle. He opens the app wanting to plan
        <em>the whole weekend</em>. He hits <strong>paradox of choice</strong> immediately, then
        narrows to a timeframe, then a show, then payment.
      </p>
      <p>
        He completes the funnel. He books a ticket. And the pain point recorded at the end is the
        interesting one: <em>"doesn't feel satisfied about planning a weekend."</em>
        <strong>The transaction succeeded and the job failed.</strong> That gap is the entire
        opportunity, and it's invisible to a conversion metric.
      </p>

      <figure class="fig fig--pad">
        <div class="fig-frame"><img src="${A}s07.jpg" loading="lazy" alt="Deck slide: current user journey map from awareness through decision, with emotions and pain points" data-cap="Slide 7 — the journey map. The booking converts; the job doesn't." /></div>
        <figcaption><b>Slide 07</b> Emotion is the row that matters. It drops at "paradox of choice" and never recovers.</figcaption>
      </figure>

      <blockquote>BookMyShow = helps me book. BookMyShow ≠ helps me plan.</blockquote>

      <p>
        Two concrete failures produce that. <strong>No meticulous organisation:</strong> the only
        weekend-shaped surface is a banner — "Head out this Weekend", "Plan for Today" — and behind
        it sits everything happening in the entire city, indoor and outdoor and online, under one
        heading. <strong>No advanced filtering:</strong> inside the banner the user meets choice
        paralysis a second time and has to hand-sort every option to find a fit. A user who came to
        plan a weekend books one show and drops off.
      </p>`,

    `<h2>The solution — plan, then book once</h2>
      <p>
        Rather than a new destination, the fix reworks the surface that already exists. The "Head
        out this Weekend" banner becomes a place to <em>build</em> a weekend:
      </p>
      <ul>
        <li><strong>Day selection first.</strong> Fri / Sat / Sun / Mon — because a weekend plan is scoped in days, not in ticket categories.</li>
        <li><strong>Real filtering inside the banner</strong>, plus event-type categories (music, adventure, museums, theme parks, tours) so browsing is navigable rather than infinite.</li>
        <li><strong>Recommendations from history and popularity</strong> — the answer to "doesn't know what he'd be interested in if he had known".</li>
        <li><strong>Events in time buckets</strong> — morning, afternoon, evening — so a day is assembled rather than sampled.</li>
        <li><strong>Add to a plan instead of booking individually</strong>, then <strong>one payment for the whole plan</strong>.</li>
      </ul>
      <p>
        The time-bucket decision is the one I'd defend hardest. A catalogue sorted by category asks
        "what do you like?", which Anant can't answer. A day sorted into slots asks "what goes in
        Saturday evening?" — a question with a much smaller answer space. <strong>It converts an
        open-ended preference problem into a filling-in problem</strong>, and filling in is something
        a passive user will actually do.
      </p>

      <div class="figs figs--2">
        <figure class="fig">
          <div class="fig-frame"><img src="${A}s09.jpg" loading="lazy" alt="Deck slide: the solution — day selection, filters and event-type categories inside the weekend banner" data-cap="Slide 9 — day selection, filtering and categories inside the existing banner." /></div>
          <figcaption><b>Slide 09</b> Day first, then time slots. The banner becomes a planner.</figcaption>
        </figure>
        <figure class="fig">
          <div class="fig-frame"><img src="${A}s10.jpg" loading="lazy" alt="Deck slide: the assembled Saturday plan with multiple events and a single payment" data-cap="Slide 10 — the assembled plan, with one payment for everything in it." /></div>
          <figcaption><b>Slide 10</b> The plan as an object you can hold — and pay for once.</figcaption>
        </figure>
      </div>

      <p>
        What Anant gets: <strong>time efficiency</strong> (browse, select and book several things in
        one pass), <strong>comprehensive planning</strong> (an itinerary that covers a spread of
        interests instead of one), <strong>optimised budgeting</strong> (the total cost of the
        weekend visible before committing, not after four separate checkouts), and
        <strong>hidden gems</strong> — surfacing the lesser-known events that were never on his radar,
        which is the direct answer to the 40% cause.
      </p>`,

    `<h2>How you'd know it worked</h2>
      <p>The metrics split into adoption and experience, and both are needed — this is a feature where usage can rise while satisfaction falls.</p>
      <table class="spec"><tbody>
        <tr><th>Feature adoption rate</th><td>Users who use "Plan Your Weekend" at least once, over all active users.</td></tr>
        <tr><th>Conversion rate</th><td>Users who start planning and complete planning <em>and</em> payment. The funnel now ends at a plan, not a ticket.</td></tr>
        <tr><th>Repeat usage rate</th><td>Users who use it more than once. The real test — weekend planning is a habit or it's nothing.</td></tr>
        <tr><th>Satisfaction score</th><td>Feature-specific surveys, weighted by response volume.</td></tr>
        <tr><th>Drop-off points</th><td>Which stage of planning gets abandoned. Diagnostic, not a scorecard.</td></tr>
      </tbody></table>
      <p>
        <strong>Repeat usage is the honest one.</strong> Adoption measures whether the banner got
        noticed; repeat usage measures whether a weekend built this way was actually better than the
        one before it.
      </p>
      <hr />
      <h2>What I'd take into a team</h2>
      <ul>
        <li><strong>A converted funnel can still be a failed job.</strong> The booking completed and the user was unsatisfied — no dashboard would have shown that.</li>
        <li><strong>Weight the causes, don't solve all of them.</strong> Two of these four needed a social product; naming that early is what kept the scope honest.</li>
        <li><strong>Change the shape of the question.</strong> "What do you want to do?" is unanswerable for this user. "What goes in Saturday evening?" isn't.</li>
        <li><strong>Fix the surface that exists.</strong> The banner was already there and already failing. A new tab would have been a bigger build with a smaller chance of being found.</li>
      </ul>`,

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
