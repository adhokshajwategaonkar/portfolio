export default {
  dir: 'career',
  nav: 'career',
  title: `Career — Adhokshaj Wategaonkar`,
  ogTitle: `Career — Adhokshaj Wategaonkar`,
  description: `From ML engineering at L&T, through decentralised identity at EarthID and SAR analytics at GalaxEye Space, to AI platform product at Beacon.li. The trajectory and what each step taught.`,
  body: `
<section class="hero" style="padding-bottom:0">
  <div class="wrap">
    <span class="label rise">Trajectory · 2021 — present</span>
    <h1 class="display rise" style="--i:1; margin:22px 0 0; font-size:clamp(2.4rem,7vw,5rem)">
      Code, then product,<br />then <span class="serif accent">AI platforms</span>.
    </h1>
    <p class="lead rise" style="--i:2; margin-top:24px">
      Four stops that look unrelated from outside. Every move traded a domain I understood for a
      harder problem and kept the same underlying job: decide what a system should do when nobody
      has decided yet.
    </p>
  </div>
</section>

<!-- ================================================ arc summary ======== -->
<section class="section section--tight">
  <div class="wrap">
    <div class="grid grid--3">
      <div class="card card-pad rise" style="--i:0">
        <span class="label">The engineering half</span>
        <p class="muted" style="margin-top:12px; font-size:14.4px">
          A CS degree specialised in ML and data science, then a year building and deploying
          models on Azure for plants that were already running.
        </p>
      </div>
      <div class="card card-pad rise" style="--i:1">
        <span class="label">The product half</span>
        <p class="muted" style="margin-top:12px; font-size:14.4px">
          Three roles in a row where I owned the whole lifecycle: research, requirements,
          UX, delivery, and the client conversation when it slipped.
        </p>
      </div>
      <div class="card card-pad rise" style="--i:2">
        <span class="label">The through-line</span>
        <p class="muted" style="margin-top:12px; font-size:14.4px">
          Identity, satellites and LLM gateways are all systems where the interesting requirement
          is about failure modes, and where the honest answer to "what should this do?" starts at
          "nobody knows yet".
        </p>
      </div>
    </div>
  </div>
</section>

<!-- ================================================== timeline ========= -->
<section class="section" style="padding-top:clamp(30px,4vw,50px)">
  <div class="wrap">
    <div class="sec-head rise">
      <div>
        <span class="label">The roles</span>
        <h2 style="margin-top:14px">Four stops, in reverse.</h2>
      </div>
      <span class="label">Click a row to expand · ↑↓ to move</span>
    </div>

    <div class="tl rise">

      <!-- Beacon.li -->
      <div class="tl-row" tabindex="0" role="button" aria-expanded="true">
        <span class="tl-chev"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></span>
        <div class="tl-head">
          <span class="co">Beacon.li</span>
          <span class="role">Associate Product Manager</span>
        </div>
        <div class="tl-meta">
          <span class="label">Oct 2025 — Jun 2026</span>
          <span class="label">Bengaluru · Hyderabad</span>
          <span class="label">Enterprise AI platform</span>
        </div>
        <div class="tl-body"><div>
          <ul>
            <li>
              Owned product requirements and vendor integration strategy for a
              <strong>multi-provider LLM gateway</strong> across OpenAI, Anthropic, Gemini and Grok,
              defining fallback logic, error classification and retry behaviour to hold
              <strong>&gt;85% request completion</strong> across enterprise workloads.
            </li>
            <li>
              Owned the end-to-end <strong>redesign of the agent chat experience</strong>. Prototyped the
              streaming interface from scratch to decide what surfaces in real time, and designed a
              progressive-disclosure model that expands from an agent's answer into its reasoning
              rationale and then its raw tool-call traces, giving a user layered control over how
              deeply they inspect agent behaviour.
            </li>
            <li>
              Represented product in <strong>platform architecture reviews</strong> for a scalable agent
              orchestration system, making scoped configurability-vs-reliability trade-off calls that
              shaped routing design, tenant isolation boundaries and rollout sequencing.
            </li>
            <li>
              Built a <strong>cost attribution framework</strong> mapping AI inference spend to tenant,
              agent and workflow level, which is the product foundation for usage-based pricing and
              client-facing budget governance.
            </li>
            <li>
              Ran enterprise client touchpoints: structured feedback sessions, deployment pain points
              translated into specs, and expectations kept aligned with what was actually committed.
            </li>
            <li>
              Took delivery ops from zero to a stable bi-monthly release cadence, hitting
              <strong>95% on-time delivery across 15 sprints</strong>, and cut concept-to-prototype
              turnaround by <strong>60%+</strong> by embedding Claude, Cursor and ChatGPT directly into
              PRD drafting, UX iteration and engineering handoff.
            </li>
          </ul>
        </div></div>
      </div>

      <!-- GalaxEye -->
      <div class="tl-row" tabindex="0" role="button" aria-expanded="false">
        <span class="tl-chev"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></span>
        <div class="tl-head">
          <span class="co">GalaxEye Space</span>
          <span class="role">Associate Product Manager</span>
        </div>
        <div class="tl-meta">
          <span class="label">Mar 2024 — Sep 2025</span>
          <span class="label">Bengaluru</span>
          <span class="label">Space tech · Defence</span>
        </div>
        <div class="tl-body"><div>
          <ul>
            <li>
              Led <strong>drone-mounted SAR analytics software</strong> from concept through government
              trials as product co-owner, defining geospatial insight and data analytics requirements
              and <strong>undercutting the project timeline by 20%</strong> while holding defence-grade
              reliability.
            </li>
            <li>
              Owned <strong>cross-portfolio market strategy</strong> across defence and commercial lines:
              structured competitive analysis and buyer interviews across government, agri-tech and
              defence agencies, repositioning products for distinct segments and directly informing
              feature priority and launch sequencing.
            </li>
            <li>
              Designed the <strong>end-to-end demo experience</strong> for defence and commercial
              stakeholders, owning the information architecture and narrative flow of how complex SAR
              capability was presented, which drove a <strong>25% lift in qualified partnership leads</strong>.
            </li>
            <li>
              Ran competitive analysis and <strong>20+ buyer and user interviews</strong> across government
              procurement and defence, turning discovery into repositioning and prioritisation across
              two product lines.
            </li>
            <li>
              Represented product at <strong>Aero India 2025</strong> and the Indian Army's
              <strong>HIMTECH Symposium</strong>, engaging defence leadership and Army officials to
              validate capability requirements and surface operational use cases.
            </li>
          </ul>
        </div></div>
      </div>

      <!-- EarthID -->
      <div class="tl-row" tabindex="0" role="button" aria-expanded="false">
        <span class="tl-chev"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></span>
        <div class="tl-head">
          <span class="co">EarthID</span>
          <span class="role">Product Manager</span>
        </div>
        <div class="tl-meta">
          <span class="label">Jul 2023 — Feb 2024</span>
          <span class="label">London · Remote</span>
          <span class="label">Decentralised identity</span>
        </div>
        <div class="tl-body"><div>
          <ul>
            <li>
              Owned the <strong>full product lifecycle across PM and UX</strong>: user research,
              wireframing and prototyping in Figma, alongside sprint delivery and faster feature
              iteration cycles.
            </li>
            <li>
              Defined product requirements for <strong>verifiable credentials and zero-knowledge proof
              integration</strong>, enabling privacy-preserving digital KYC that reduced onboarding
              friction for regulated identity verification.
            </li>
            <li>
              The first role where the hard part was translation. A compliance officer cannot approve
              a cryptographic guarantee until somebody redraws it as a flow they recognise.
            </li>
          </ul>
        </div></div>
      </div>

      <!-- L&T -->
      <div class="tl-row" tabindex="0" role="button" aria-expanded="false">
        <span class="tl-chev"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></span>
        <div class="tl-head">
          <span class="co">L&amp;T Technology Services</span>
          <span class="role">Software Development Engineer</span>
        </div>
        <div class="tl-meta">
          <span class="label">Dec 2021 — Dec 2022</span>
          <span class="label">Bengaluru</span>
          <span class="label">Industrial ML</span>
        </div>
        <div class="tl-body"><div>
          <ul>
            <li>
              Built and deployed <strong>ML models on Azure</strong> to improve operational efficiency
              across L&amp;T power plants: predictive pipelines surfacing maintenance and
              load-management insight for plant operations teams.
            </li>
            <li>
              Operators ignored a model they could not interrogate, whatever its F1 score said. That
              is the year I stopped treating deployment as the last step.
            </li>
          </ul>
        </div></div>
      </div>

    </div>
  </div>
</section>

<!-- ================================================= education ======== -->
<section class="section section--tight">
  <div class="wrap">
    <div class="sec-head rise">
      <div>
        <span class="label">Before all that</span>
        <h2 style="margin-top:14px">Education</h2>
      </div>
    </div>
    <div class="kv rise">
      <div class="kv-row">
        <span class="label">2017 — 2021</span>
        <span class="v">
          <strong>MIT School of Engineering, Pune</strong> — B.Tech, Computer Science &amp; Engineering.
          Core CSE with a specialisation in Machine Learning and Data Science.
        </span>
      </div>
    </div>
  </div>
</section>

<!-- ======================================================= CTA ========= -->
<section class="section">
  <div class="wrap">
    <div class="big-cta rise">
      <span class="label">Next</span>
      <h2 style="margin:18px 0 16px; font-size:clamp(1.8rem,4.4vw,2.9rem)">
        What I'm looking for
      </h2>
      <p class="lead" style="margin-inline:auto">
        A product role where AI and LLMs are the material I work in, on a team that expects a PM to
        have an opinion about the architecture. B2B or B2C. The résumé has the full version.
      </p>
      <div style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap; margin-top:30px">
        <a class="btn btn--primary" href="../Adhokshaj-Wategaonkar-Resume.pdf" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12m0 0 4-4m-4 4-4-4"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>
          Download résumé
        </a>
        <a class="btn btn--ghost" href="../contact/">Get in touch</a>
      </div>
    </div>
  </div>
</section>
`,
};
