import { caseStudy } from '../case-template.mjs';
import { deckViewer } from '../layout.mjs';

const A = '../../assets/cases/zomato/';

const SLIDES = [
  { t: 'Improving the food ordering experience of users' },
  { t: 'Product overview — description and stats' },
  { t: 'Business model — freemium, users, features, revenue lines' },
  { t: 'User persona — Anuj Khandalikar, 26, Bengaluru' },
  { t: 'Problem identification — revenue = frequency × order value × orders' },
  { t: 'User journey map — discovery to decision' },
  { t: 'User journey map — decision to retention' },
  { t: 'Prioritisation — RICE scoring of four problems' },
  { t: 'Solution 1 — Zomato Quick Meals' },
  { t: 'Solution 2 — Zomato Party' },
  { t: 'Success metrics — user-centric and product-centric' },
  { t: 'Fin.' },
];

export default caseStudy({
  dir: 'projects/zomato',
  title: 'Zomato — improving the food ordering experience | Adhokshaj Wategaonkar',
  ogTitle: 'Zomato — improving the food ordering experience to grow revenue',
  description:
    'A Zomato product case study: decomposing revenue into frequency, order value and orders, mapping the ordering journey, RICE-scoring four problems, and designing Quick Meals and Zomato Party against the two that scored highest.',
  kicker: 'Product case study · Zomato',
  heading: 'Improving the food ordering experience',
  lead: `Zomato is not short of users — 80 million monthly, 1.25 million orders a day, 55% of the
    Indian market. The brief was revenue, which is a different problem from engagement, and the
    difference decides everything downstream.`,
  badges: [
    { text: 'Self-directed case study' },
    { text: 'Growth · monetisation' },
    { text: '12-slide deck' },
  ],
  links: [
    { text: 'Read the deck', href: '#deck' },
    { text: 'Download the PDF', href: `${A}Zomato-Case-Study.pdf`, external: true },
  ],
  spec: [
    ['Problem', '<strong>A customer cannot compare what an order will really cost until the final screen, and ordering from the same restaurant repeatedly earns them nothing.</strong> Both problems cost orders, and both sit in the part of the funnel closest to the money.'],
    ['Surface', 'Zomato — search, discovery and delivery. <strong>80M MAU · 1.25M daily orders · 55% Indian market share · 3,200+ cities.</strong> Competing with Swiggy, Uber Eats, Magicpin.'],
    ['The question', '<strong>How do you improve the ordering experience in a way that moves revenue, not just engagement?</strong>'],
    ['Method', 'Product and business-model review → persona → revenue decomposition → two-part journey map → RICE prioritisation → two solutions with entry points and flows → success metrics.'],
    ['Focus', 'Funnel analysis · RICE · monetisation · marketplace design'],
  ],
  sections: [
    `<h2 style="margin-top:0">Start by decomposing the metric</h2>
      <p>
        The brief — "improve the food ordering experience to increase revenue" — is unactionable as
        written. Decomposed it becomes tractable:
      </p>
      <blockquote>Revenue = order frequency × order value × number of orders</blockquote>
      <p>
        Which means every candidate solution has to answer one question:
        <strong>does this make users order more often, or pay more per order?</strong> Anything that
        does neither is a UX improvement, not a revenue one — worth doing, but not this brief. That
        single line is what let me throw out most ideas before designing them.
      </p>
      <p>
        Four stakeholders sit in the problem — the user, the delivery partner, the restaurant, and
        Zomato as the aggregator — and a solution that lifts revenue by squeezing one of the middle
        two isn't a solution, it's a transfer.
      </p>

      <figure class="fig fig--pad">
        <div class="fig-frame"><img src="${A}s05.jpg" loading="lazy" alt="Deck slide: problem identification, decomposing revenue into frequency, order value and number of orders" data-cap="Slide 5 — the decomposition that makes the brief testable." /></div>
        <figcaption><b>Slide 05</b> Two levers, four stakeholders. Everything after this is judged against the equation.</figcaption>
      </figure>`,

    `<h2>The persona, and why he isn't a foodie</h2>
      <p>
        <strong>Anuj Khandalikar — 26, product manager, Bengaluru.</strong> Health-conscious, busy,
        wants nutritional transparency and reliable delivery, and wants variety without spending
        time on the decision. His concerns are specific: not enough consistently healthy options,
        no transparent ingredient information, and a schedule that makes browsing a cost rather than
        a pleasure.
      </p>
      <p>
        The useful thing about him is that <strong>he is not enjoying the app.</strong> He is trying
        to get lunch and get back to work. For a user like that, time spent in the product is a tax,
        which is why the engagement metrics are the wrong ones to optimise.
      </p>`,

    `<h2>Mapping the journey twice</h2>
      <p>
        The ordering journey is long enough that I split it: awareness → discovery → three
        consideration steps → decision, and then decision → cart → instructions → coupons → payment
        → retention. Mapping the second half separately is what surfaced the late-stage friction
        most teardowns skip.
      </p>
      <p>The pain points cluster, and they repeat:</p>
      <ul>
        <li><strong>"Paradox of choice"</strong> at discovery — endless options, immediate confusion.</li>
        <li><strong>"How to choose the best option?"</strong> at <em>three</em> consecutive consideration steps — restaurant, menu, pricing. The same unanswered question, asked three times.</li>
        <li><strong>"How do I know if the food is healthy?"</strong> carrying all the way through the cart.</li>
        <li><strong>"Minimum offers and discounts"</strong> and <strong>"when will the order arrive?"</strong> at the end.</li>
      </ul>
      <p>
        A pain point that survives three consecutive stages isn't friction in a step. It's a missing
        capability — the user has no way to <em>compare</em>, so they re-ask the same question at
        every screen that could have answered it.
      </p>

      <div class="figs figs--2">
        <figure class="fig">
          <div class="fig-frame"><img src="${A}s06.jpg" loading="lazy" alt="Deck slide: user journey map from awareness through consideration" data-cap="Slide 6 — awareness to consideration. The same question, three times." /></div>
          <figcaption><b>Slide 06</b> Discovery → consideration.</figcaption>
        </figure>
        <figure class="fig">
          <div class="fig-frame"><img src="${A}s07.jpg" loading="lazy" alt="Deck slide: user journey map from decision through retention" data-cap="Slide 7 — decision to retention, where most teardowns stop looking." /></div>
          <figcaption><b>Slide 07</b> Decision → retention, mapped separately on purpose.</figcaption>
        </figure>
      </div>`,

    `<h2>RICE, and being willing to lose an idea</h2>
      <p>Four problems, scored on reach and impact:</p>
      <table class="spec"><tbody>
        <tr><th>Score 91</th><td><strong>No direct way to compare the final price of an order.</strong> Reach 9, impact 9.</td></tr>
        <tr><th>Score 63</th><td><strong>No USP that rewards Anuj for crossing a spend threshold.</strong> Reach 6, impact 9.</td></tr>
        <tr><th>Score 35</th><td>Loyalty to a restaurant is unrewarded. Reach 5, impact 7.</td></tr>
        <tr><th>Score 30</th><td>No tested way to recover users who drop in the cart journey. Reach 6, impact 5.</td></tr>
      </tbody></table>
      <p>
        The bottom two are perfectly reasonable product ideas — loyalty programmes and cart recovery
        are things every marketplace builds. They scored low and they were dropped.
        <strong>Writing down the ideas you didn't pick, with the number that killed them, is what
        makes a prioritisation defensible</strong> six weeks later when someone asks why loyalty
        isn't on the roadmap.
      </p>

      <figure class="fig fig--pad">
        <div class="fig-frame"><img src="${A}s08.jpg" loading="lazy" alt="Deck slide: RICE prioritisation table scoring four problems" data-cap="Slide 8 — RICE scores. The two that survived, and the two that didn't." /></div>
        <figcaption><b>Slide 08</b> 91 and 63 progress. 35 and 30 are on the page precisely because they didn't.</figcaption>
      </figure>`,

    `<h2>Solution 1 — Quick Meals, for order frequency</h2>
      <p>
        A map view of selected dishes from popular restaurants, each showing its
        <strong>final price inclusive of taxes</strong> and its delivery time, with instant checkout.
        Entry is a homepage banner; the flow is home → banner → map → compare → pay.
      </p>
      <p>
        Two decisions carry it. <strong>Final price, not list price</strong> — the compare problem
        that scored 91 isn't caused by missing prices, it's caused by prices that change at checkout,
        so comparing menu prices is a wasted exercise. And <strong>a map instead of a list</strong>,
        because proximity is the strongest predictor of delivery time, and this user is buying time.
      </p>
      <p>
        It targets <em>frequency</em>: if getting lunch takes ninety seconds instead of ten minutes
        of browsing, the busy user orders on days he'd otherwise have skipped.
      </p>

      <figure class="fig fig--pad">
        <div class="fig-frame"><img src="${A}s09.jpg" loading="lazy" alt="Deck slide: Zomato Quick Meals — map view with final order value and delivery time, plus instant checkout" data-cap="Slide 9 — Quick Meals: final price, delivery time, instant checkout." /></div>
        <figcaption><b>Slide 09</b> Entry point, map view and instant checkout — with the flow underneath.</figcaption>
      </figure>`,

    `<h2>Solution 2 — Zomato Party, for order value</h2>
      <p>
        A group wants pizza <em>and</em> biryani. Today that's two orders from two restaurants, or a
        hunt for one place that does both badly. Zomato Party unlocks
        <strong>multi-restaurant items in a single order</strong> once the cart crosses a threshold —
        set at roughly Zomato's average order value.
      </p>
      <p>
        The threshold is the whole mechanism, and it's well chosen. It's not a discount, so it costs
        no margin. It's framed as <em>unlocking</em> rather than as a minimum, so it reads as a
        reward. And because it sits at the average order value, it pulls the bottom half of the
        distribution upward — which is exactly the shape of intervention the revenue equation wants.
      </p>
      <p>
        This is the one I'd expect the most pushback on, and the pushback would be operational:
        multi-restaurant orders are hard on the delivery network. Which is why the four stakeholders
        were listed on slide 5 — the feature is only real if the delivery partner economics survive
        it.
      </p>

      <figure class="fig fig--pad">
        <div class="fig-frame"><img src="${A}s10.jpg" loading="lazy" alt="Deck slide: Zomato Party — unlocking multi-restaurant ordering above a threshold, with the full user flow" data-cap="Slide 10 — Zomato Party: threshold, unlock nudge, and multi-restaurant cart." /></div>
        <figcaption><b>Slide 10</b> The unlock nudge and the flow. A threshold, not a discount.</figcaption>
      </figure>`,

    `<h2>How you'd know it worked</h2>
      <p>
        Split user-centric from product-centric, and note that the user-side wins are <em>decreases</em>:
        <strong>efficient orders</strong> and <strong>less browse time</strong>. On the product side:
        <strong>more orders, higher average order value, increase in clicks-to-pay</strong>.
      </p>
      <p>
        Measuring "less time in the app" as a success is the part I'd defend in a review. For a user
        who is trying to eat and get back to work, session length going up is a symptom of the
        problem, not evidence of a fix — and a team that reports it as engagement will keep shipping
        things that make Anuj's afternoon worse.
      </p>
      <hr />
      <h2>What I'd take into a team</h2>
      <ul>
        <li><strong>Decompose the metric before designing anything.</strong> "Improve the experience to grow revenue" becomes tractable the moment it's frequency × value × orders.</li>
        <li><strong>A pain point that repeats across stages is a missing capability</strong>, not three separate UX bugs.</li>
        <li><strong>Publish what you didn't pick, with its score.</strong> Loyalty and cart recovery are on the deck because they lost.</li>
        <li><strong>Thresholds beat discounts.</strong> One costs margin on every order; the other costs nothing and reframes a minimum as a reward.</li>
        <li><strong>Name every stakeholder early.</strong> It's what stops a revenue idea that's actually a cost transfer to the delivery partner.</li>
      </ul>`,

    `<h2 id="deck">The original deck</h2>
      <p>Twelve slides, as presented. Arrow keys work; click a slide to enlarge.</p>
      ${deckViewer(A, SLIDES, `${A}Zomato-Case-Study.pdf`)}`,
  ],
  next: {
    href: '../youtube-music/',
    badge: 'Case study · YouTube Music',
    title: 'Driving engagement in YouTube Music',
    body: 'Segmentation, engagement loops, network effects and RICE — against a competitor at catalogue parity.',
  },
});
