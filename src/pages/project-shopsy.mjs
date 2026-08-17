import { caseStudy } from '../case-template.mjs';

export default caseStudy({
  dir: 'projects/shopsy',
  title: 'Growing the next 200 million e-commerce users — Shopsy | Adhokshaj Wategaonkar',
  ogTitle: 'Growing the next 200 million e-commerce users — a Shopsy growth strategy',
  description:
    'How do you increase user growth for India\'s fastest-growing social commerce platform? A Shopsy growth strategy combining user segmentation, behavioural analysis and experimentation to improve acquisition, trust and referral-driven growth in Tier-2 and Tier-3 India.',
  kicker: 'Growth strategy + PRD · Shopsy',
  heading: 'Growing the next 200 million e-commerce users',
  lead: `Value commerce in tier-2 and tier-3 India. The binding constraint turned out to be trust and
    data cost rather than selection or price.`,
  badges: [
    { text: 'Self-directed case study' },
    { text: 'Growth · India' },
    { text: 'Ships with a PRD' },
  ],
  links: [
    { text: 'Read the full PRD', href: 'https://docs.google.com/document/d/1L2IAbcfiXCuxV1xO-L9sAaSMSvqisGx9q4iXT4ajMyc/edit?usp=sharing', external: true },
  ],
  glance: [
    {
      k: 'The problem',
      v: 'A first-time shopper in a tier-2 or tier-3 city abandons the order before paying.',
      sub: 'Will the parcel arrive, what does the browsing cost in data, and has anyone they know done this before.',
    },
    {
      k: 'What I produced',
      v: 'Segmentation, behavioural analysis and experiments aimed at acquisition, trust and referral-driven growth.',
      sub: 'The PRD is the deliverable, linked above and unedited.',
    },
    {
      k: 'The call',
      v: 'Tracing the acquisition loop to the first completed order rather than to install, because that is where trust gets created or lost.',
      sub: 'Interventions that only worked under a price framing got dropped.',
    },
  ],
  sections: [
    `<h2 style="margin-top:0">The constraint is trust, and price is the decoy</h2>
      <p>
        Treating value commerce as a pricing problem is tempting, because price is the visible
        difference between platforms. A first-time online buyer in a tier-3 city is not comparing two
        prices though. They are deciding whether to hand money to an app at all. Selection and
        discounting do not answer that, and a growth plan built on them buys installs that never
        convert.
      </p>
      <p>
        Data cost compounds it. Every heavy screen between install and first order is a metered cost to
        the user, spent before they have any evidence the product works. So I segmented by what the
        user is risking rather than by what they are buying, then wrote the surviving intervention as a
        PRD with its non-goals stated.
      </p>`,
  ],
  next: {
    href: '../beacon-deel/',
    badge: 'Assessment · Beacon.li × Deel',
    title: 'Selling agentic AI to a company that already has AI',
    body: 'Two gaps found from public G2 evidence, two agentic solutions, with wireframes and north-star metrics.',
  },
});
