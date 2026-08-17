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
  lead: `The brief was awkward on purpose: show how Beacon.li's orchestration platform adds value to
    an enterprise prospect that <em>already</em> has mature AI. I picked Deel, because if the argument
    survives against one of the fastest-growing unicorns on record it survives anywhere.`,
  badges: [
    { text: 'Take-home assessment' },
    { text: 'Enterprise AI · agentic' },
    { text: '14 Sep 2025' },
  ],
  links: [
    { text: 'Read the full submission (PDF)', href: `${A}/Beacon-Deel-APM-Assessment.pdf`, external: true },
  ],
  glance: [
    {
      k: 'The brief',
      v: 'Design original agentic AI features that add automation, efficiency or intelligence to an enterprise prospect, including one that is already AI-native.',
      sub: 'Timed take-home for an APM role.',
    },
    {
      k: 'The prospect',
      v: 'Deel. Global payroll, HR and compliance across 140+ countries, owns its legal infrastructure, and already ships Deel AI.',
      sub: '35,000+ businesses, high internal AI adoption.',
    },
    {
      k: 'What I produced',
      v: 'Two gaps from public user evidence, two agentic solutions, each with wireframes, a north-star metric and a rollout plan.',
      sub: '16 pages including annexure, linked above unedited.',
    },
  ],
  sections: [
    `<h2 style="margin-top:0">Why "they already have AI" is the wrong objection</h2>
      <p>
        Deel ships Deel AI, an assistant that answers compliance, workflow and reporting questions.
        The tempting read is that the AI slot is filled. It isn't, because the two things solve
        different problems: an assistant serves a user who knows what to ask, and in payroll and
        compliance the expensive failures are the ones nobody thought to ask about.
      </p>
      <p>
        So instead of proposing a better assistant, I went looking for places where users get stuck in
        a way a chat box cannot reach. That meant starting from evidence I hadn't generated rather
        than from the feature list.
      </p>`,

    `<h2>The gaps, from public evidence</h2>
      <p>
        I pulled user reviews from G2. Two themes were consistent enough to build on, and both are
        about navigating a workflow rather than retrieving a fact, which is the kind of problem an
        orchestration layer suits.
      </p>

      <h3>Gap 1: no embedded, real-time guidance</h3>
      <p>
        Users struggle to resolve unfamiliar issues inside the platform, particularly in intricate
        workflows. Their options are a static help centre, delayed support, or a generic AI answer.
        Onboarding slows, errors rise and ticket volume climbs, which costs Deel money on the support
        side and costs the user their afternoon.
      </p>

      <figure class="fig fig--pad">
        <div class="fig-frame">
          <img src="${A}/g2-gap1.jpg" loading="lazy" alt="Collage of G2 user reviews describing difficulty navigating Deel's interface and slow support resolution" data-cap="Gap 1 — G2 reviews on navigating complexity and support latency." />
        </div>
        <figcaption><b>Evidence</b> G2 reviews describing complexity, navigation difficulty and support latency. I wrote the gap statement after reading these.</figcaption>
      </figure>

      <h3>Gap 2: incomplete mobile parity</h3>
      <p>
        Users run critical HR and payroll tasks from phones and hit an app that lacks the desktop's
        functionality and speed. Missing features, slow performance and clunky navigation, all most
        painful when someone is travelling and the task is urgent.
      </p>

      <figure class="fig fig--pad">
        <div class="fig-frame">
          <img src="${A}/g2-gap2.jpg" loading="lazy" alt="Collage of G2 user reviews describing missing features and poor performance in Deel's mobile app" data-cap="Gap 2 — G2 reviews on mobile feature parity and performance." />
        </div>
        <figcaption><b>Evidence</b> The mobile complaints cluster around parity rather than aesthetics, which points at an orchestration answer instead of a redesign.</figcaption>
      </figure>`,

    `<h2 id="solution-1">Solution 1: a contextual in-platform overlay agent</h2>
      <p>
        An overlay that sits above Deel's UI, detects workflow context, and gives step-by-step guidance
        at the moment someone stalls. The interaction is spatial rather than conversational: you point
        at the problem instead of describing it, and the agent reads the highlighted region the way
        you'd read a screenshot someone handed you.
      </p>
      <p>
        It returns a structured answer rather than prose. What the problem is, how to solve it, whether
        Deel can do this at all, whether the agent may do it for you, a DIY workaround, and the option
        to file it as a feature request. That third branch is the one I'd argue for hardest. "The
        product cannot do this" is a valid answer, and a support agent unable to say it burns the
        user's afternoon to protect the roadmap.
      </p>

      <div class="figs figs--3">
        <figure class="fig">
          <div class="fig-frame"><img src="${A}/wf-overlay-1.jpg" loading="lazy" alt="Low-fidelity wireframe: the overlay agent appears as a hovering icon over the Deel interface" data-cap="Wireframe 1 — the agent as a persistent, low-commitment hovering icon." /></div>
          <figcaption><b>WF 01</b> The agent as a hovering icon. Present, not intrusive.</figcaption>
        </figure>
        <figure class="fig">
          <div class="fig-frame"><img src="${A}/wf-overlay-2.jpg" loading="lazy" alt="Low-fidelity wireframe: the user selects the region of the screen they are stuck on" data-cap="Wireframe 2 — the user highlights the area they're stuck on." /></div>
          <figcaption><b>WF 02</b> Point at the problem instead of describing it.</figcaption>
        </figure>
        <figure class="fig">
          <div class="fig-frame"><img src="${A}/wf-overlay-3.jpg" loading="lazy" alt="Low-fidelity wireframe: the agent returns a structured, guided resolution" data-cap="Wireframe 3 — a structured resolution, including whether Deel can do this at all." /></div>
          <figcaption><b>WF 03</b> A structured resolution, including "no".</figcaption>
        </figure>
      </div>

      <div class="callout">
        <span class="label">North star</span>
        <p>
          <strong>Reduction in user support tickets</strong>, with faster resolution and higher
          immediate satisfaction as the supporting set. I chose it because the user's benefit and
          Deel's cost saving are the same event, which makes it hard to game.
        </p>
      </div>`,

    `<h2 id="solution-2">Solution 2: Companion Mode on mobile</h2>
      <p>
        Rebuilding the mobile app to parity is expensive, slow and someone else's roadmap. Companion
        Mode closes the gap behaviourally instead, using orchestrator agents. It syncs desktop context
        so a task can be handed off mid-flight, watches recurring work like monthly payroll and leave
        approvals and turns it into runnable recipes, and surfaces a prioritised feed of what's pending
        with one-tap execution.
      </p>
      <p>
        Mobile parity turned out to be a question about sequencing rather than features. What matters
        is what a user can finish in ninety seconds while standing in an airport, and an agent can
        solve that without shipping every desktop screen.
      </p>

      <div class="figs figs--2 figs--phone">
        <figure class="fig">
          <div class="fig-frame"><img src="${A}/wf-mobile-1.jpg" loading="lazy" alt="Mobile wireframe: the companion suggests turning a repeated task into a saved recurring workflow" data-cap="Companion Mode — the agent notices a repeated task and offers to make it a recipe." /></div>
          <figcaption><b>WF 01</b> Recurring work, detected and offered back as a one-tap recipe.</figcaption>
        </figure>
        <figure class="fig">
          <div class="fig-frame"><img src="${A}/wf-mobile-2.jpg" loading="lazy" alt="Mobile wireframe: a prioritised real-time feed of pending tasks, recent changes and action items" data-cap="Companion Mode — a prioritised feed of pending tasks with one-tap execution." /></div>
          <figcaption><b>WF 02</b> A prioritised feed. What's pending, what changed, what needs you.</figcaption>
        </figure>
      </div>

      <div class="callout">
        <span class="label">North star</span>
        <p>
          <strong>Percentage reduction in time spent on repetitive tasks</strong>, measured in Mixpanel
          as time-to-complete for recurring workflows before and after the agent. A time delta rather
          than an engagement metric, because on mobile more time in the app is a symptom.
        </p>
      </div>`,

    `<h2>Validation and rollout</h2>
      <p>
        Both solutions carry the same plan, because an agent acting inside someone's payroll system is
        a trust problem before it is a technical one.
      </p>
      <ul>
        <li><strong>Validate</strong> with user interviews and journey mapping, then interactive
        prototypes for the core scenarios under targeted usability testing.</li>
        <li><strong>Launch</strong> to a small pilot group first, watching engagement and task
        completion, with in-app feedback and KPIs: overlay activations, ticket deflections, task
        resolution time.</li>
        <li><strong>Expand</strong> incrementally rather than by date.</li>
      </ul>
      <p>
        I named three risks. Workflow and data integration, end-user adoption and trust, and privacy
        and security. They map to co-building the integration with Deel from day one, in-app onboarding
        with transparent opt-in permissions, and compliance with enterprise security mandates under
        regular access audits.
      </p>
      <p>
        Opt-in is the load-bearing one. An agent that can act on your behalf without an explicit grant
        stops being a feature the first time it acts wrongly, and in payroll it will act wrongly in
        public.
      </p>`,
  ],
  next: {
    href: '../galaxeye/',
    badge: 'Company · GalaxEye Space',
    title: 'SAR analytics, concept to trials',
    body: 'Two markets that look like one, and a demo that turned out to be doing the selling.',
  },
});
