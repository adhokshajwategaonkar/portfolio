import { caseStudy } from '../case-template.mjs';

const NOTION = 'https://adhokshaj.notion.site/GalaxEye-Adhokshaj-Wategaonkar-2a05eb8d76cc4461b7b19971ae96578f';

export default caseStudy({
  dir: 'projects/galaxeye',
  title: 'Building a new market for satellite intelligence — GalaxEye | Adhokshaj Wategaonkar',
  ogTitle: 'GalaxEye Space — building a new market for satellite intelligence',
  description:
    'How can a space-tech startup sell satellite data to the insurance industry? A 30-page product strategy on multimodal imagery, disaster intelligence and geospatial analytics as a new B2B line — plus the SAR analytics product taken through government trials.',
  kicker: 'Company work · GalaxEye Space · 2024 — 2025',
  heading: 'Building a new market for satellite intelligence',
  lead: `How does a space-tech startup sell satellite data to the insurance industry? A 30-page product
    strategy on whether multimodal imagery, disaster intelligence and geospatial analytics could cut
    claim verification time, sharpen resource allocation, and open an entirely new B2B line.`,
  badges: [
    { text: 'Associate Product Manager' },
    { text: 'SpaceTech · Insurance · Defence' },
    { text: '2024 — 2025' },
  ],
  links: [
    { text: 'Read the 30-page strategy', href: NOTION, external: true },
  ],
  spec: [
    ['Problem', '<strong>Verifying an insurance claim after a flood or a cyclone means sending an assessor to a site the disaster has just made hard to reach.</strong> It is slow, expensive and largely guesswork. Satellite operators hold data that answers it and sell almost exclusively to governments, so it never reaches the industry with the problem.'],
    ['Role', '<strong>Associate Product Manager, product co-owner.</strong> New-market product strategy, requirements for the analytics layer, cross-portfolio positioning, and the demo experience shown to buyers.'],
    ['The question', '<strong>Can satellite intelligence become a B2B product for insurers</strong> — a market that has never bought raw earth-observation data — rather than another defence contract?'],
    ['Domain', 'Multimodal satellite imagery (SAR + optical), disaster intelligence, geospatial analytics. Drone-mounted SAR analytics on the defence side.'],
    ['Results', '<strong>20% under</strong> the project timeline through government trials while holding defence-grade reliability. <strong>25% lift</strong> in qualified partnership leads after the demo redesign. 20+ buyer interviews across government, agri-tech and defence.'],
    ['Shown at', 'Aero India 2025 · the Indian Army’s HIMTECH Symposium'],
    ['Artefact', `<a class="link" href="${NOTION}" target="_blank" rel="noopener">The full 30-page product strategy ↗</a>`],
  ],
  sections: [
    `<h2 style="margin-top:0">Why insurance, and why it's hard</h2>
      <p>
        Earth-observation companies mostly sell to governments, because governments are the buyer
        that already understands the data. That's a small, slow, relationship-bound market — and
        every competitor is in it. The interesting question is which <em>commercial</em> industry has
        a problem shaped like satellite imagery and doesn't yet know it.
      </p>
      <p>
        Insurance qualifies on the specifics. Claim verification after a flood or a cyclone is
        manual, slow and expensive: an assessor has to physically reach a site that a disaster has
        just made hard to reach. Resource allocation during an event is guesswork about where damage
        actually concentrated. Both are questions about <strong>what changed on the ground, and
        when</strong> — which is precisely what a time series of imagery answers.
      </p>
      <p>
        The hard part isn't capability, it's that <strong>the buyer has no budget line for this and
        no one internally whose job it is to want it</strong>. Selling into a category that doesn't
        exist yet is a product strategy problem before it's a sales problem, which is what the
        30 pages are about.
      </p>`,

    `<h2>Multimodal is the part that makes it viable</h2>
      <p>
        Optical imagery is easy to interpret and useless exactly when you need it — under cloud, at
        night, during the storm. SAR sees through both and is much harder to read. For a defence
        analyst, SAR alone is fine. For an insurance claims team, it is not: they will not staff
        radar specialists to process claims.
      </p>
      <p>
        So the product isn't the sensor, it's the fusion — <strong>SAR for reliability of capture,
        optical for interpretability, and an analytics layer that outputs a claim-relevant
        answer</strong> rather than an image. The value proposition to an insurer is a number of days
        removed from claim cycle time, not a resolution figure.
      </p>
      <blockquote>
        Nobody buys imagery. They buy the decision the imagery lets them make sooner.
      </blockquote>`,

    `<h2>Two markets that look like one</h2>
      <p>
        Across the portfolio, defence and commercial buyers both asked for "change detection". In
        interviews — <strong>20+ across government procurement, agri-tech enterprises and defence
        agencies</strong> — they wanted close to opposite products:
      </p>
      <ul>
        <li>
          <strong>Defence buyers wanted the evidence, not the conclusion.</strong> An automated
          verdict they can't audit is a liability in a chain of command. They pay for fidelity,
          traceability, and the ability to defend an assessment to someone senior.
        </li>
        <li>
          <strong>Commercial buyers wanted the conclusion and nothing else.</strong> An agronomist
          with thousands of hectares, or a claims manager with a queue, has no interest in a radar
          return. The product has to absorb the ambiguity and output an action.
        </li>
      </ul>
      <p>
        Same engine, two products. That finding drove repositioning across both lines and changed
        feature sequencing — the interpretation layer that makes the commercial product viable is
        the same layer that makes the defence product harder to sell.
      </p>`,

    `<h2>The demo was the product</h2>
      <p>
        In deep tech with a long procurement cycle, most buyers never touch the software before
        deciding. I owned the end-to-end demo experience for defence and commercial stakeholders —
        the information architecture and the narrative order in which a complex capability gets
        introduced.
      </p>
      <p>
        The change that mattered was sequencing: open with the decision the buyer is trying to make,
        and introduce the capability as the thing that resolves it — rather than opening with the
        sensor and hoping relevance lands. That drove a <strong>25% lift in qualified partnership
        leads</strong>, straight into the commercial pipeline.
      </p>`,

    `<h2>Shipping 20% early without lowering the bar</h2>
      <p>
        On the defence side, drone-mounted SAR analytics went from concept through government trials
        <strong>20% under the planned timeline</strong>, holding defence-grade reliability. The time
        didn't come from cutting scope on what was under test — it came from deciding early which
        parts <em>weren't</em> going to be evaluated and refusing to gold-plate them.
      </p>
      <p>
        A trial has an evaluation rubric, explicit or otherwise. Work that doesn't map to it isn't
        ambition; it's schedule risk.
      </p>
      <p>
        I also represented product at <strong>Aero India 2025</strong> and the Indian Army's
        <strong>HIMTECH Symposium</strong> — validating capability requirements with defence
        leadership and surfacing operational use cases. The value of those rooms isn't leads. It's
        hearing an operator describe the conditions the product actually runs in, which is never what
        the spec assumed.
      </p>
      <hr />
      <h2>What I'd take into a team</h2>
      <ul>
        <li><strong>New markets are a product problem before a sales problem.</strong> If there's no budget line and no internal champion, a better pitch doesn't help — the product has to be reshaped into something the buyer already knows how to purchase.</li>
        <li><strong>Sell the decision, not the capability.</strong> Days off claim cycle time, not resolution in metres.</li>
        <li><strong>"Both segments want X" is almost always wrong.</strong> They want the same words and different products, and the interviews are how you find out before the roadmap commits.</li>
        <li><strong>If buyers won't touch the product before deciding, the demo <em>is</em> the product.</strong> Give it the design attention you'd give a first-run experience.</li>
      </ul>`,
  ],
  next: {
    href: '../beacon-deel/',
    badge: 'Assessment · Beacon.li × Deel',
    title: 'Selling agentic AI to a company that already has AI',
    body: 'Two gaps found from public G2 evidence, two agentic solutions, with wireframes and north-star metrics.',
  },
});
