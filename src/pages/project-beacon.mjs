import { caseStudy } from '../case-template.mjs';

const A = '../../assets/cases/beacon';

export default caseStudy({
  dir: 'projects/beacon-deel',
  title: 'Beacon.li × Deel — APM assessment | Adhokshaj Wategaonkar',
  ogTitle: 'Beacon.li × Deel — designing agentic AI for an AI-native prospect',
  description:
    'An APM assessment for Beacon.li: how an AI orchestration platform adds value to a prospect that already has mature AI. Two gaps found in Deel from G2 evidence, two agentic solutions, with wireframes, north-star metrics and a rollout plan.',
  kicker: 'Take-home assessment · Beacon.li × Deel · Sep 2025',
  heading: 'Selling agentic AI to a company that already has AI',
  lead: `The brief was deliberately awkward: show how Beacon.li's orchestration platform adds value to
    an enterprise prospect that <em>already</em> has mature AI. I picked Deel — 35,000+ businesses,
    high AI adoption, one of the fastest-growing unicorns on record — because if the argument
    survives there, it survives anywhere.`,
  badges: [
    { text: 'Take-home assessment' },
    { text: 'Enterprise AI · agentic' },
    { text: '14 Sep 2025' },
  ],
  links: [
    { text: 'Read the full submission (PDF)', href: `${A}/Beacon-Deel-APM-Assessment.pdf`, external: true },
  ],
  spec: [
    ['The brief', 'Design original, practical agentic AI features that add automation, efficiency or intelligence to an enterprise prospect — <strong>even inside an AI-native product</strong>.'],
    ['Prospect', 'Deel — global payroll, HR and compliance across 140+ countries. Owns its legal and payroll infrastructure. Already ships Deel AI.'],
    ['Method', 'Market and prospect research → gap analysis from public user evidence → two solutions, each with functionality, target roles, business outcomes, a north-star metric, UX flow, wireframes, validation, rollout, risks and mitigations.'],
    ['Deliverable', '16 pages including annexure. Linked above, unedited.'],
  ],
  sections: [
    `<h2 style="margin-top:0">Why "they already have AI" is the wrong objection</h2>
      <p>
        Deel ships Deel AI — an assistant that answers compliance, workflow and reporting questions.
        The tempting read is that the AI slot is filled. It isn't, because the two things solve
        different problems: <strong>an assistant answers questions a user knows how to ask</strong>,
        and the expensive failures happen when they don't.
      </p>
      <p>
        So rather than proposing a better assistant, I went looking for where users are stuck in a
        way a chat box can't reach — which meant starting from evidence rather than from the product
        surface.
      </p>`,

    `<h2>The gaps, from public evidence</h2>
      <p>
        I pulled user reviews from G2 rather than reasoning from the feature list. Two themes were
        consistent enough to build on, and both are the kind of problem an orchestration layer is
        actually suited to — they're about <em>navigating a workflow</em>, not about retrieving a fact.
      </p>

      <h3>Gap 1 — no embedded, real-time guidance</h3>
      <p>
        Users struggle to resolve complex or unfamiliar issues inside the platform, particularly in
        intricate workflows. The available options are static help centres, delayed support, or
        generic AI answers. The result is slower onboarding, more errors, and a higher ticket volume
        — all of which cost Deel money on the support side while costing the user their afternoon.
      </p>

      <figure class="fig fig--pad">
        <div class="fig-frame">
          <img src="${A}/g2-gap1.jpg" loading="lazy" alt="Collage of G2 user reviews describing difficulty navigating Deel's interface and slow support resolution" data-cap="Gap 1 — G2 reviews on navigating complexity and support latency." />
        </div>
        <figcaption><b>Evidence</b> G2 reviews describing complexity, navigation difficulty and support latency. The gap statement is downstream of this, not the other way round.</figcaption>
      </figure>

      <h3>Gap 2 — incomplete mobile parity</h3>
      <p>
        Users run critical HR and payroll tasks from phones, and hit an app that lacks the desktop's
        functionality, speed and usability. Missing features, slow performance, clunky navigation —
        most painful exactly when someone is travelling and the task is urgent.
      </p>

      <figure class="fig fig--pad">
        <div class="fig-frame">
          <img src="${A}/g2-gap2.jpg" loading="lazy" alt="Collage of G2 user reviews describing missing features and poor performance in Deel's mobile app" data-cap="Gap 2 — G2 reviews on mobile feature parity and performance." />
        </div>
        <figcaption><b>Evidence</b> The mobile complaints cluster around <em>parity</em>, not aesthetics — which points at an orchestration answer rather than a redesign.</figcaption>
      </figure>`,

    `<h2 id="solution-1">Solution 1 — a contextual in-platform overlay agent</h2>
      <p>
        An overlay that sits above Deel's UI, detects workflow context, and gives step-by-step
        guidance at the moment someone stalls. The interaction that makes it work is deliberately
        <strong>spatial rather than conversational</strong>: you don't describe your problem, you
        point at it. The agent reads the highlighted region the way you'd hand someone a screenshot.
      </p>
      <p>
        It then returns a structured answer rather than prose — what the problem is, how to solve it,
        whether Deel can do this at all, whether the agent may do it for you, a DIY workaround, and
        the option to file it as a feature request. That last branch matters: <strong>"the product
        cannot do this" is a valid answer</strong>, and a support agent that can't say it wastes the
        user's time to protect the product's feelings.
      </p>

      <div class="figs figs--3">
        <figure class="fig">
          <div class="fig-frame"><img src="${A}/wf-overlay-1.jpg" loading="lazy" alt="Low-fidelity wireframe: the overlay agent appears as a hovering icon over the Deel interface" data-cap="Wireframe 1 — the agent as a persistent, low-commitment hovering icon." /></div>
          <figcaption><b>WF 01</b> The agent as a hovering icon — present, not intrusive.</figcaption>
        </figure>
        <figure class="fig">
          <div class="fig-frame"><img src="${A}/wf-overlay-2.jpg" loading="lazy" alt="Low-fidelity wireframe: the user selects the region of the screen they are stuck on" data-cap="Wireframe 2 — the user highlights the area they're stuck on." /></div>
          <figcaption><b>WF 02</b> Point at the problem instead of describing it.</figcaption>
        </figure>
        <figure class="fig">
          <div class="fig-frame"><img src="${A}/wf-overlay-3.jpg" loading="lazy" alt="Low-fidelity wireframe: the agent returns a structured, guided resolution" data-cap="Wireframe 3 — a structured resolution, including whether Deel can do this at all." /></div>
          <figcaption><b>WF 03</b> A structured resolution, not a paragraph.</figcaption>
        </figure>
      </div>

      <div class="callout">
        <span class="label">North star</span>
        <p>
          <strong>Reduction in user support tickets</strong> — with fewer tickets, faster resolution
          and higher immediate satisfaction as the supporting set. Chosen because it is the one
          number where the user's benefit and Deel's cost saving are the same event, which makes it
          very hard to game.
        </p>
      </div>`,

    `<h2 id="solution-2">Solution 2 — Companion Mode on mobile</h2>
      <p>
        Rather than rebuilding the mobile app to parity — expensive, slow, and someone else's
        roadmap — Companion Mode uses orchestrator agents to close the gap behaviourally. It syncs
        desktop context so a task can be handed off mid-flight, watches recurring work (monthly
        payroll, leave approvals) and turns it into runnable "recipes", and surfaces a prioritised
        feed of what's pending with one-tap execution.
      </p>
      <p>
        The insight is that mobile parity was never really about features. It's about
        <strong>what a user can finish in ninety seconds while standing in an airport</strong>, and
        that's a sequencing problem an agent can solve without shipping every desktop screen.
      </p>

      <div class="figs figs--2 figs--phone">
        <figure class="fig">
          <div class="fig-frame"><img src="${A}/wf-mobile-1.jpg" loading="lazy" alt="Mobile wireframe: the companion suggests turning a repeated task into a saved recurring workflow" data-cap="Companion Mode — the agent notices a repeated task and offers to make it a recipe." /></div>
          <figcaption><b>WF 01</b> Recurring work, detected and offered back as a one-tap recipe.</figcaption>
        </figure>
        <figure class="fig">
          <div class="fig-frame"><img src="${A}/wf-mobile-2.jpg" loading="lazy" alt="Mobile wireframe: a prioritised real-time feed of pending tasks, recent changes and action items" data-cap="Companion Mode — a prioritised feed of pending tasks with one-tap execution." /></div>
          <figcaption><b>WF 02</b> A prioritised feed — what's pending, what changed, what needs you.</figcaption>
        </figure>
      </div>

      <div class="callout">
        <span class="label">North star</span>
        <p>
          <strong>Percentage reduction in manual effort and time spent on repetitive tasks</strong>,
          measured in Mixpanel as time-to-complete for recurring workflows before and after the
          agent. A time delta, not an engagement metric — because on mobile, more time in the app is
          a symptom, not a win.
        </p>
      </div>`,

    `<h2>Validation and rollout</h2>
      <p>
        Both solutions carry the same shape of plan, because the risk is the same shape: an agent
        acting inside someone's payroll system is a trust problem before it is a technical one.
      </p>
      <ul>
        <li><strong>Validate</strong> with user interviews and journey mapping, then interactive prototypes for the core scenarios under targeted usability testing.</li>
        <li><strong>Launch</strong> to a small pilot group first, watching engagement and task completion, with in-app feedback and KPIs — overlay activations, ticket deflections, task resolution time.</li>
        <li><strong>Expand</strong> incrementally rather than by date.</li>
      </ul>
      <p>
        The three risks I named — workflow and data integration, end-user adoption and trust, and
        privacy and security — map to three mitigations: co-build the integration with Deel from day
        one, ship in-app onboarding with transparent opt-in permissions, and comply with enterprise
        security mandates with regular access audits. <strong>Opt-in is the load-bearing one.</strong>
        An agent that can act on your behalf without an explicit grant is not a feature, it's an
        incident waiting to be written up.
      </p>
      <hr />
      <h2>What I'd take into a team</h2>
      <ul>
        <li>
          <strong>Start from evidence you didn't generate.</strong> The gaps came from public
          reviews, so the argument doesn't depend on my taste. That's also what makes it usable in
          a sales conversation.
        </li>
        <li>
          <strong>"They already have AI" describes the surface, not the job.</strong> An assistant
          serves users who know what to ask; the money is in the ones who don't.
        </li>
        <li>
          <strong>Pick a north star where the user's win and the company's win are the same
          event.</strong> Ticket deflection and time-to-complete both pass that test. Engagement
          doesn't.
        </li>
        <li>
          <strong>Let the product say no.</strong> Building "Deel can't currently do this" into the
          answer structure is a small decision that buys a lot of trust.
        </li>
      </ul>`,
  ],
  next: {
    href: '../galaxeye/',
    badge: 'Company · GalaxEye Space',
    title: 'SAR analytics, concept to trials',
    body: 'Two markets that look like one, and a demo that turned out to be the product.',
  },
});
