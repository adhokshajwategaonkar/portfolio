import { caseStudy } from '../case-template.mjs';

export default caseStudy({
  dir: 'projects/youtube-music',
  title: 'Driving engagement in YouTube Music | Adhokshaj Wategaonkar',
  ogTitle: 'Driving engagement in YouTube Music — a growth case study',
  description:
    'How do you increase Weekly Active Users for a music streaming platform competing with Spotify? User segmentation, engagement loops, social network effects, RICE prioritisation and feature design across activation, sharing and retention.',
  kicker: 'Growth strategy + PRD · YouTube Music',
  heading: 'Driving engagement in YouTube Music',
  lead: `WAU is the metric. The question underneath it is which habit is worth building, because a
    streaming product loses users who never found a reason to open it on a Tuesday.`,
  badges: [
    { text: 'Self-directed case study' },
    { text: 'Retention' },
    { text: 'Ships with a PRD' },
  ],
  links: [
    { text: 'Read the full PRD', href: 'https://docs.google.com/document/d/1yzYFfawX-Nni-IV1lwWabs-fjil03Ef7kHzJcyGlPig/edit?usp=sharing', external: true },
  ],
  glance: [
    {
      k: 'The problem',
      v: 'Two music apps with the same catalogue give a listener no reason to open one rather than the other.',
      sub: 'Recommendations alone do not build a weekly habit.',
    },
    {
      k: 'What I produced',
      v: 'Segmentation, engagement loops, social network effects and RICE across activation, sharing and retention.',
      sub: 'The PRD is the deliverable, linked above and unedited.',
    },
    {
      k: 'The call',
      v: 'Choosing one loop rather than shipping several weak ones, since a habit that competes with itself is no habit.',
      sub: 'Non-goals written explicitly.',
    },
  ],
  sections: [
    `<h2 style="margin-top:0">Weekly active is a habit metric wearing a usage metric's clothes</h2>
      <p>
        At catalogue parity nobody churns because the music is missing. They churn because the product
        never earned a recurring slot in the week. That reframes the work. The lever is a repeatable
        reason to return that survives the user forgetting to return, which is a different design brief
        from adding features.
      </p>
      <p>
        So I split the WAU decline into its parts first: new users who never formed a habit, and
        returning users whose trigger disappeared. The two need different fixes, and averaging them
        produces a plan that helps neither. Writing the surviving idea as a PRD with explicit non-goals
        was the fastest way to find out whether it was actually scoped, since an idea with no
        acceptance criteria is still a wish.
      </p>`,
  ],
  next: {
    href: '../shopsy/',
    badge: 'Case study + PRD · Shopsy',
    title: 'Growing the next 200 million e-commerce users',
    body: 'Value commerce in tier-2 and tier-3 India, where the constraint is trust and data cost.',
  },
});
