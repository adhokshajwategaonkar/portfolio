import { caseStudy } from '../case-template.mjs';

const NOTION = 'https://adhokshaj.notion.site/GalaxEye-Adhokshaj-Wategaonkar-2a05eb8d76cc4461b7b19971ae96578f';

export default caseStudy({
  dir: 'projects/galaxeye',
  title: 'Building a new market for satellite intelligence — GalaxEye | Adhokshaj Wategaonkar',
  ogTitle: 'GalaxEye Space — building a new market for satellite intelligence',
  description:
    'How does a space-tech startup sell satellite data to the insurance industry? A 30-page product strategy on multimodal imagery, disaster intelligence and geospatial analytics as a new B2B line, plus the SAR analytics product taken through government trials.',
  kicker: 'Company work · GalaxEye Space · 2024 — 2025',
  heading: 'Building a new market for satellite intelligence',
  lead: `Satellite operators sell to governments because governments already understand the data. I
    spent 30 pages arguing that insurers have the same problem and no idea the answer exists.`,
  badges: [
    { text: 'Associate Product Manager' },
    { text: 'SpaceTech · Insurance · Defence' },
    { text: '2024 — 2025' },
  ],
  links: [
    { text: 'Read the 30-page strategy', href: NOTION, external: true },
  ],
  glance: [
    {
      k: 'The problem',
      v: 'Verifying a claim after a flood means sending an assessor to a site the flood just made hard to reach.',
      sub: 'Slow, costly, and largely guesswork about where damage concentrated.',
    },
    {
      k: 'What I owned',
      v: 'New-market product strategy, requirements for the analytics layer, cross-portfolio positioning, and the demo shown to buyers.',
      sub: 'Associate PM and product co-owner, across defence and commercial lines.',
    },
    {
      k: 'What happened',
      v: 'Drone SAR analytics through government trials 20% under timeline. 25% lift in qualified partnership leads after the demo redesign.',
      sub: '20+ buyer interviews across government, agri-tech and defence.',
    },
  ],
  spec: [
    ['Domain', 'Multimodal satellite imagery (SAR and optical), disaster intelligence, geospatial analytics. Drone-mounted SAR analytics on the defence side.'],
    ['Shown at', 'Aero India 2025 · the Indian Army’s HIMTECH Symposium'],
    ['Artefact', `<a class="link" href="${NOTION}" target="_blank" rel="noopener">The full 30-page product strategy ↗</a>`],
  ],
  sections: [
    `<h2 style="margin-top:0">Why insurance, and why it is hard</h2>
      <p>
        Earth-observation companies sell mostly to governments, because a government already
        understands the data. That market is small, procurement is slow, and every competitor is
        standing in it. The question worth asking is which commercial industry has a problem shaped
        like satellite imagery and does not know it yet.
      </p>
      <p>
        Insurance qualifies on specifics. Claim verification after a flood or a cyclone is manual and
        expensive, because an assessor has to physically reach a site the disaster just made hard to
        reach. Resource allocation during an event is guesswork about where damage concentrated. Both
        questions are about what changed on the ground and when, which a time series of imagery
        answers directly.
      </p>
      <p>
        The hard part is commercial rather than technical. The buyer has no budget line for this and
        nobody internally whose job it is to want it. Selling into a category that does not exist yet
        is a product strategy problem before it is a sales problem, and the 30 pages are about that.
      </p>`,

    `<h2>Multimodal is what makes it viable</h2>
      <p>
        Optical imagery is easy to read and useless at the moment you need it: under cloud, at night,
        during the storm. SAR sees through all three and is much harder to interpret. A defence
        analyst is fine with SAR alone. An insurance claims team is not, because they will never staff
        radar specialists to process claims.
      </p>
      <p>
        So the product had to be the fusion. SAR for reliability of capture, optical for
        interpretability, and an analytics layer that returns a claim-relevant answer instead of an
        image. What an insurer buys is days off claim cycle time. Resolution in metres never comes up
        in the conversation.
      </p>`,

    `<h2>Two markets that look like one</h2>
      <p>
        Across the portfolio, defence and commercial buyers both asked for "change detection". In 20+
        interviews across government procurement, agri-tech enterprises and defence agencies, they
        described close to opposite products.
      </p>
      <ul>
        <li>
          <strong>Defence buyers wanted the evidence and not the conclusion.</strong> An automated
          verdict they cannot audit is a liability inside a chain of command. They pay for fidelity,
          traceability, and the ability to defend an assessment to someone senior.
        </li>
        <li>
          <strong>Commercial buyers wanted the conclusion and nothing else.</strong> An agronomist
          with thousands of hectares, or a claims manager with a queue, has no interest in a radar
          return. The product has to absorb the ambiguity and hand back an action.
        </li>
      </ul>
      <p>
        One engine, two products. That finding drove repositioning on both lines and changed feature
        sequencing, because the interpretation layer that makes the commercial product viable is the
        same layer that makes the defence product harder to sell.
      </p>`,

    `<h2>The demo was doing the selling</h2>
      <p>
        In deep tech with a long procurement cycle, most buyers never touch the software before
        deciding. I owned the demo experience for defence and commercial stakeholders: the information
        architecture, and the order in which a complex capability gets introduced.
      </p>
      <p>
        Sequencing was the change that mattered. Open with the decision the buyer is trying to make
        and introduce the capability as the thing that resolves it, rather than opening with the
        sensor and hoping relevance lands. That drove a 25% lift in qualified partnership leads
        straight into the commercial pipeline.
      </p>`,

    `<h2>Shipping 20% early without lowering the bar</h2>
      <p>
        On the defence side, drone-mounted SAR analytics went from concept through government trials
        20% under the planned timeline while holding defence-grade reliability. The time came from
        deciding early which parts were not going to be evaluated, then refusing to gold-plate them. A
        trial has an evaluation rubric whether or not anyone writes it down, and work that does not
        map to it is schedule risk.
      </p>
      <p>
        I also represented product at Aero India 2025 and the Indian Army's HIMTECH Symposium,
        validating capability requirements with defence leadership and surfacing operational use
        cases. Those rooms are worth more for what an operator tells you about the conditions the
        product runs in than for any lead they generate. The spec had assumed different conditions.
      </p>
      <hr />
      <h2>What I'd take into a team</h2>
      <ul>
        <li><strong>A new market is a product problem before a sales problem.</strong> With no budget
        line and no internal champion, a better pitch changes nothing. The product has to be reshaped
        into something the buyer already knows how to purchase.</li>
        <li><strong>"Both segments want X" is usually wrong.</strong> They want the same words and
        different products, and interviews are how you find that out before the roadmap commits.</li>
        <li><strong>If buyers decide without touching the product, the demo is the product.</strong>
        Give it the design attention a first-run experience would get.</li>
      </ul>`,
  ],
  next: {
    href: '../lila-games/',
    badge: 'Assessment · LILA Games',
    title: 'Systems thinking for free-to-play games',
    body: 'Crafting economies, progression and monetisation for a mobile shooter, modelled as one system.',
  },
});
