import { caseStudy } from '../case-template.mjs';

export default caseStudy({
  dir: 'projects/lila-games',
  title: 'Systems thinking for free-to-play games — LILA Games | Adhokshaj Wategaonkar',
  ogTitle: 'Systems thinking for free-to-play games — a LILA Games assessment',
  description:
    'How do you design progression systems that keep millions of players engaged? A product case study on crafting economies, staffing models, feature analysis and monetisation for a mobile free-to-play shooter.',
  kicker: 'Take-home assessment · LILA Games',
  heading: 'Systems thinking for free-to-play games',
  lead: `Crafting economies, progression, staffing models and monetisation for a mobile free-to-play
    shooter, modelled as one system rather than four features.`,
  badges: [
    { text: 'Take-home assessment' },
    { text: 'Mobile gaming' },
    { text: 'Unedited' },
  ],
  links: [
    { text: 'Read the original submission', href: 'https://adhokshaj.notion.site/LILA-Games-Assessment-APM-730201e40636499aa57cd463e1617ebc', external: true },
  ],
  glance: [
    {
      k: 'The problem',
      v: 'A free-to-play game earns nothing at the moment a player is enjoying it most.',
      sub: 'Progression, crafting and monetisation behave as one system rather than three levers.',
    },
    {
      k: 'Format',
      v: 'Timed take-home for an Associate Product Manager role, kept as submitted.',
      sub: 'Game economy, progression, staffing model, monetisation.',
    },
    {
      k: 'Why it is here',
      v: 'A take-home is a reasonable sample of how someone thinks under a deadline, and tidying one up afterwards turns it into something else.',
      sub: 'Linked above in its original form.',
    },
  ],
  sections: [
    `<h2 style="margin-top:0">Retention and monetisation are one system</h2>
      <p>
        In most products you can improve retention without touching pricing. In mobile gaming you
        cannot, because the loop that keeps a player coming back is the same loop that creates the
        moments where spending feels reasonable. Design them separately and you get a game that either
        cannot pay for itself or extracts hard enough to lose the player.
      </p>
      <p>
        So the assessment starts from what the player is there for and works outward to mechanics and
        monetisation, rather than treating the three as independent levers.
      </p>`,
  ],
  next: {
    href: '../animus/',
    badge: 'Live · built solo',
    title: 'Animus',
    body: 'Capture to WhatsApp, parsed by Haiku, ranked by what is closest to rotting. Built for ADHD brains.',
  },
});
