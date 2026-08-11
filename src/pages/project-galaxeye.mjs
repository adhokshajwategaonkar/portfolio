import { caseStudy } from '../case-template.mjs';

export default caseStudy({
  dir: 'projects/galaxeye',
  title: 'GalaxEye Space — SAR analytics case study | Adhokshaj Wategaonkar',
  ogTitle: 'GalaxEye Space — SAR analytics, concept to government trials',
  description:
    'Product co-owner for drone-mounted synthetic-aperture-radar analytics at GalaxEye Space — from concept through government trials, plus cross-portfolio market strategy across defence and commercial lines.',
  kicker: 'Company work · GalaxEye Space · 2024 — 2025',
  heading: 'SAR analytics, from concept to government trials',
  lead: `Synthetic aperture radar sees through cloud and at night, which is exactly why defence and
    agriculture want it. The product problem is everything after that: raw radar returns are useless
    to the person who actually has to make the decision.`,
  badges: [
    { text: 'Associate Product Manager' },
    { text: 'Defence &amp; commercial' },
    { text: '2024 — 2025' },
  ],
  spec: [
    ['Role', '<strong>Associate Product Manager, product co-owner.</strong> Requirements for the analytics layer, cross-portfolio market strategy, and the demo experience shown to buyers.'],
    ['Domain', 'Drone-mounted synthetic aperture radar. Two distinct portfolios — defence, and commercial including agri-tech.'],
    ['What I owned', 'Geospatial insight and data analytics requirements · competitive analysis and 20+ buyer interviews · repositioning across two product lines · information architecture and narrative of the buyer demo.'],
    ['Results', '<strong>20% under</strong> the project timeline while holding defence-grade reliability. <strong>25% lift</strong> in qualified partnership leads after the demo redesign.'],
    ['Shown at', 'Aero India 2025 · the Indian Army’s HIMTECH Symposium'],
  ],
  sections: [
    `<h2 style="margin-top:0">The actual product problem</h2>
      <p>
        A SAR payload produces a radar return, not a picture. Turning that into something a buyer
        can act on — is this field stressed, has this structure changed, is there something here
        that wasn't here last week — is a chain of processing decisions, and every link in it is a
        product decision disguised as a technical one. How much interpretation does the software
        do, and how much does it leave to the analyst?
      </p>
      <p>
        That question has a different answer for each of our two markets, which is what made the
        portfolio work necessary rather than optional.
      </p>`,

    `<h2>Two markets that look like one</h2>
      <p>
        On paper, defence and agri-tech both wanted "change detection from SAR". In interviews they
        wanted almost opposite products. I ran structured competitive analysis and
        <strong>20+ buyer and user interviews</strong> across government procurement, agri-tech
        enterprises and defence agencies, and the split was consistent:
      </p>
      <ul>
        <li>
          <strong>Defence buyers wanted the evidence, not the conclusion.</strong> An automated
          verdict they can't audit is a liability in a chain of command. What they'll pay for is
          fidelity, traceability and the ability to defend an assessment to someone senior.
        </li>
        <li>
          <strong>Commercial buyers wanted the conclusion and nothing else.</strong> An agronomist
          managing thousands of hectares has no interest in a radar return. The product has to
          absorb the ambiguity and output an action.
        </li>
      </ul>
      <p>
        Same engine, two products. That finding fed directly into repositioning both lines and into
        how features were sequenced — the interpretation layer that made the commercial product
        viable would have made the defence product harder to sell.
      </p>`,

    `<h2>The demo was the product</h2>
      <p>
        For a deep-tech product with a long procurement cycle, most buyers never touch the software
        before deciding. The demo <em>is</em> the product surface. I owned the end-to-end demo
        experience for defence and commercial stakeholders — the information architecture and the
        narrative flow of how a complex SAR capability gets presented, and in what order.
      </p>
      <p>
        The change that mattered was ordering: lead with the decision the buyer is trying to make,
        and introduce the capability as the thing that resolves it, rather than opening with the
        sensor and hoping the relevance lands. That reframing drove a
        <strong>25% lift in qualified partnership leads</strong> and fed the commercial pipeline
        directly.
      </p>
      <blockquote>
        In deep tech, the demo isn't marketing collateral. It's the only version of the product most
        of your buyers will ever use.
      </blockquote>`,

    `<h2>Shipping 20% early without lowering the bar</h2>
      <p>
        The analytics software went from concept through government trials under a compressed
        timeline — <strong>20% under plan</strong> — while holding defence-grade reliability
        requirements. The time didn't come from cutting scope on the parts under test; it came from
        deciding early which parts <em>weren't</em> going to be evaluated in the trial and refusing
        to gold-plate them.
      </p>
      <p>
        The generalisable version: a trial has an evaluation rubric, explicit or otherwise. Work
        that doesn't map to it isn't ambition, it's schedule risk.
      </p>`,

    `<h2>Field feedback as product intelligence</h2>
      <p>
        I represented the product team at <strong>Aero India 2025</strong> and the Indian Army's
        <strong>HIMTECH Symposium</strong>, engaging defence leadership and Army officials to
        validate capability requirements and surface operational use cases. The value of those
        rooms isn't the leads — it's hearing an operator describe the conditions the product will
        actually run in, which is never what the spec assumed.
      </p>
      <p>
        Several roadmap positioning calls across the defence verticals came straight out of
        conversations at those two events rather than out of a planning cycle.
      </p>
      <hr />
      <h2>What I'd take into a team</h2>
      <ul>
        <li>
          <strong>"Both segments want X" is almost always wrong.</strong> They want the same words
          and different products. The interviews are how you find out before the roadmap commits.
        </li>
        <li>
          <strong>Decide how much interpretation the software does.</strong> In any ML- or
          sensor-backed product that's the central product decision, and it's usually made by
          default rather than deliberately.
        </li>
        <li>
          <strong>If buyers won't touch the product before deciding, the demo is the product.</strong>
          Give it the same design attention you'd give a first-run experience.
        </li>
      </ul>`,
  ],
  next: {
    href: '../lila-games/',
    badge: 'Assessment · LILA Games',
    title: 'APM take-home',
    body: 'Retention mechanics, monetisation shape, and the player-motivation model underneath both.',
  },
});
