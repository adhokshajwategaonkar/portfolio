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
  lead: `Zomato has no shortage of users: 80 million monthly, 1.25 million orders a day, 55% of the
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
  glance: [
    {
      k: 'The problem',
      v: 'A customer cannot compare what an order will really cost until the final screen, and ordering from the same restaurant repeatedly earns them nothing.',
      sub: '80M MAU · 1.25M daily orders · 55% market share.',
    },
    {
      k: 'How I worked it',
      v: 'Revenue decomposition, persona, a two-part journey map, RICE across four problems, then two features designed against the two that survived.',
      sub: 'Self-directed. Full 12-slide deck readable below.',
    },
    {
      k: 'The call',
      v: 'Judging every candidate against frequency × order value × orders, and dropping anything that moved neither term.',
      sub: 'Loyalty and cart recovery lost, and stayed on the deck with their scores.',
    },
  ],
  sections: [
    `<h2 style="margin-top:0">Decompose the metric first</h2>
      <p>
        "Improve the food ordering experience to increase revenue" is unactionable as written.
        Decomposed, it becomes testable:
      </p>
      <blockquote>Revenue = order frequency × order value × number of orders</blockquote>
      <p>
        Every candidate then has to answer one question: does this make users order more often, or pay
        more per order? Anything that does neither is a UX improvement, worth doing but not this brief.
        That one line let me throw out most ideas before designing them. Four stakeholders sit in the
        problem, and a solution that lifts revenue by squeezing the delivery partner or the restaurant
        is a transfer rather than a gain.
      </p>`,

    `<h2>RICE, and the two I dropped</h2>
      <table class="spec"><tbody>
        <tr><th>Score 91</th><td><strong>No direct way to compare the final price of an order.</strong> Reach 9, impact 9.</td></tr>
        <tr><th>Score 63</th><td><strong>No reward for crossing a spend threshold.</strong> Reach 6, impact 9.</td></tr>
        <tr><th>Score 35</th><td>Loyalty to a restaurant is unrewarded. Reach 5, impact 7.</td></tr>
        <tr><th>Score 30</th><td>No tested way to recover users who drop in the cart. Reach 6, impact 5.</td></tr>
      </tbody></table>
      <p>
        The bottom two are reasonable ideas that every marketplace builds. They scored low and I
        dropped them, and they stayed on the deck with the numbers that killed them. That is what makes
        a prioritisation defensible six weeks later when somebody asks why loyalty isn't on the
        roadmap.
      </p>

      <figure class="fig fig--pad">
        <div class="fig-frame"><img src="${A}s08.jpg" loading="lazy" alt="Deck slide: RICE prioritisation table scoring four problems" data-cap="Slide 8 — RICE scores. The two that survived, and the two that didn't." /></div>
        <figcaption><b>Slide 08</b> 91 and 63 progress. 35 and 30 are on the page because they didn't.</figcaption>
      </figure>`,

    `<h2>The two features</h2>
      <p>
        <strong>Quick Meals</strong> targets frequency. A map view of dishes from nearby restaurants,
        each showing its final price inclusive of taxes and its delivery time, with instant checkout.
        Final price rather than list price, because the compare problem is caused by prices that change
        at checkout. A map rather than a list, because proximity predicts delivery time and this user is
        buying time back.
      </p>
      <p>
        <strong>Zomato Party</strong> targets order value. Multi-restaurant items in one order, unlocked
        once the cart crosses a threshold set near the average order value. The threshold is the
        mechanism: it costs no margin, it reads as a reward rather than a minimum, and sitting at the
        average pulls the bottom half of the distribution upward. It is also the one I would expect
        pushback on, and the pushback would be operational, since multi-restaurant orders are hard on
        the delivery network.
      </p>`,

    `<h2 id="deck">The original deck</h2>
      <p>Twelve slides, as presented. Arrow keys work; click a slide to enlarge.</p>
      ${deckViewer(A, SLIDES, `${A}Zomato-Case-Study.pdf`)}`,
  ],
  next: {
    href: '../youtube-music/',
    badge: 'Case study · YouTube Music',
    title: 'Driving engagement in YouTube Music',
    body: 'Segmentation, engagement loops and network effects against a competitor at catalogue parity.',
  },
});
