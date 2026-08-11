import { SITE, icon, mock, slide, coverMock } from '../layout.mjs';

export default {
  dir: '',
  nav: 'home',
  title: `Adhokshaj Wategaonkar — Product Manager, AI platforms`,
  ogTitle: `Adhokshaj Wategaonkar — Product Manager, AI platforms`,
  description: `Product Manager working on AI platforms — multi-provider LLM gateways, agent orchestration, and interfaces that make non-deterministic systems inspectable. Bengaluru.`,
  head: `<script type="application/ld+json">
{"@context":"https://schema.org","@type":"Person","name":"Adhokshaj Wategaonkar",
"jobTitle":"Product Manager","email":"${SITE.email}",
"address":{"@type":"PostalAddress","addressLocality":"Bengaluru","addressCountry":"IN"},
"alumniOf":"MIT School of Engineering, Pune",
"sameAs":["${SITE.linkedin}","${SITE.twitter}"]}
</script>
`,
  body: `
<!-- ======================================================= hero ======== -->
<section class="hero" style="padding-bottom:clamp(40px,6vw,72px)">
  <div class="wrap">
    <div class="intro-meta rise">
      <span class="label">Product Manager</span>
      <span class="label">Bengaluru, India</span>
      <span class="label" style="display:flex;align-items:center;gap:8px;color:var(--live-ink)">
        <span class="dot-live"></span>Open to roles
      </span>
    </div>

    <h1 class="intro-name rise" style="--i:1">Adhokshaj Wategaonkar</h1>

    <p class="lead rise" style="--i:2; margin-top:24px; max-width:56ch">
      I work on AI platforms — multi-provider LLM gateways, agent orchestration, and the
      interfaces that make non-deterministic systems inspectable enough to trust. Three years
      across enterprise AI, space tech and digital identity, and two products I designed,
      built and shipped on my own.
    </p>

    <div class="intro-links rise" style="--i:3">
      <a class="btn btn--primary" href="work/">Selected work ${icon.arrow}</a>
      <a class="btn btn--ghost" href="${SITE.resume}" target="_blank" rel="noopener">${icon.download} Résumé</a>
      <button class="btn btn--ghost" data-copy="${SITE.email}">${icon.copy} ${SITE.email}</button>
    </div>
  </div>
</section>

<!-- =============================================== selected work ======= -->
<section class="section section--ruled" id="work">
  <div class="wrap">
    <div class="sec-head rise">
      <div>
        <span class="label">Selected work</span>
        <h2 style="margin-top:14px">Four worth your time.</h2>
      </div>
      <a class="arrow-link" href="work/">Everything ${icon.arrow}</a>
    </div>

    <div class="grid grid--2">

      <a class="card proj rise" style="--i:0" href="projects/animus/">
        ${coverMock(mock.animusFeed(), '.56')}
        <div class="card-pad proj">
          <div class="proj-top">
            <div>
              <span class="badge badge--live"><i></i>Live · built solo</span>
              <h3 style="margin-top:12px">Animus</h3>
            </div>
          </div>
          <p>
            Capture to WhatsApp, and a PWA does the organising. Claude Haiku parses a raw message
            into structured items; the feed ranks them by what's closest to rotting. Built for
            adults with ADHD, where what you're actually selling is the absence of a system to
            maintain.
          </p>
          <div class="proj-foot">
            <div class="tags"><span>Node</span><span>React</span><span>Supabase</span><span>WhatsApp API</span><span>Claude Haiku</span></div>
            <span class="arrow-link">Case study ${icon.arrow}</span>
          </div>
        </div>
      </a>

      <a class="card proj rise" style="--i:1" href="projects/shastra/">
        ${coverMock(mock.shastraChart(), '.72')}
        <div class="card-pad proj">
          <div class="proj-top">
            <div>
              <span class="badge badge--live"><i></i>Live · built solo</span>
              <h3 style="margin-top:12px">Shastra</h3>
            </div>
          </div>
          <p>
            Vedic astrology where the maths is verifiable and the ethics are executable. Swiss
            Ephemeris computes every position; the model only narrates, and never sees a birth
            date or a phone number. The restraint rules are asserted in the test suite, so a
            prompt that drops them fails the build.
          </p>
          <div class="proj-foot">
            <div class="tags"><span>Swiss Ephemeris</span><span>Node</span><span>Prompt architecture</span><span>SEO</span></div>
            <span class="arrow-link">Case study ${icon.arrow}</span>
          </div>
        </div>
      </a>

      <a class="card proj rise" style="--i:2" href="projects/weekend-conundrum/">
        ${slide({
          kicker: 'Product case study',
          title: 'The Weekend<br />Conundrum',
          left: 'BookMyShow',
          right: 'Discovery',
        })}
        <div class="card-pad proj">
          <div class="proj-top">
            <div>
              <span class="badge">Case study · BookMyShow</span>
              <h3 style="margin-top:12px">"The Weekend Conundrum"</h3>
            </div>
          </div>
          <p>
            People want to go out. They just don't know what to do with the weekend — which is a
            decision problem, not a catalogue problem, and a ticketing app is built to solve the
            wrong one.
          </p>
          <div class="proj-foot">
            <div class="tags"><span>Discovery</span><span>Consumer</span><span>UX</span></div>
            <span class="arrow-link">Read it here ${icon.arrow}</span>
          </div>
        </div>
      </a>

      <a class="card proj rise" style="--i:3" href="projects/zomato/">
        ${slide({
          kicker: 'Product case study',
          title: 'Ordering,<br />and revenue',
          left: 'Zomato',
          right: '20M users',
        })}
        <div class="card-pad proj">
          <div class="proj-top">
            <div>
              <span class="badge">Case study · Zomato</span>
              <h3 style="margin-top:12px">Ordering experience &amp; revenue</h3>
            </div>
          </div>
          <p>
            Improving the food-ordering experience for 20 million users, with the interventions
            scoped against what each one would realistically move rather than against how good
            it would look on a slide.
          </p>
          <div class="proj-foot">
            <div class="tags"><span>Growth</span><span>Funnel</span><span>Monetisation</span></div>
            <span class="arrow-link">Read it here ${icon.arrow}</span>
          </div>
        </div>
      </a>

    </div>
  </div>
</section>

<!-- ====================================================== stats ======== -->
<section class="section section--tight section--ruled">
  <div class="wrap">
    <div class="stats rise">
      <div class="stat">
        <div class="n"><span data-count="85">85</span><em>%+</em></div>
        <div class="k label">Request completion across a four-provider LLM gateway</div>
      </div>
      <div class="stat">
        <div class="n"><span data-count="95">95</span><em>%</em></div>
        <div class="k label">On-time delivery across 15 sprints</div>
      </div>
      <div class="stat">
        <div class="n"><span data-count="60">60</span><em>%</em></div>
        <div class="k label">Faster concept → prototype with AI tooling</div>
      </div>
      <div class="stat">
        <div class="n"><span data-count="2">2</span></div>
        <div class="k label">Products designed, built and shipped solo</div>
      </div>
    </div>
  </div>
</section>

<!-- ==================================================== career ========= -->
<section class="section section--ruled">
  <div class="wrap">
    <div class="sec-head rise">
      <div>
        <span class="label">Trajectory</span>
        <h2 style="margin-top:14px">Code → product → AI platforms.</h2>
      </div>
      <a class="arrow-link" href="career/">Full timeline ${icon.arrow}</a>
    </div>

    <div class="kv rise">
      <div class="kv-row">
        <span class="label">2025 — 2026 · Beacon.li</span>
        <span class="v"><strong>Associate Product Manager.</strong> Multi-provider LLM gateway, agent chat redesign, agent orchestration architecture, cost attribution, and delivery ops from zero to a stable release cadence.</span>
      </div>
      <div class="kv-row">
        <span class="label">2024 — 2025 · GalaxEye Space</span>
        <span class="v"><strong>Associate Product Manager.</strong> Drone-mounted SAR analytics from concept to government trials, cross-portfolio market strategy, and the demo narrative shown to defence leadership at Aero India.</span>
      </div>
      <div class="kv-row">
        <span class="label">2023 — 2024 · EarthID</span>
        <span class="v"><strong>Product Manager.</strong> Full lifecycle across PM and UX, plus requirements for verifiable credentials and zero-knowledge-proof KYC.</span>
      </div>
      <div class="kv-row">
        <span class="label">2021 — 2022 · L&amp;T Technology Services</span>
        <span class="v"><strong>Software Engineer.</strong> ML models on Azure for power-plant operations. The engineering half of how I read a system.</span>
      </div>
    </div>
  </div>
</section>

<!-- ======================================================= CTA ========= -->
<section class="section section--tight">
  <div class="wrap">
    <div class="big-cta rise">
      <span class="label">Currently</span>
      <h2 style="margin:18px 0 16px; font-size:clamp(1.7rem,4vw,2.6rem)">
        Looking for the next hard product problem.
      </h2>
      <p class="lead" style="margin-inline:auto">
        Ideally AI platform or infrastructure, on a team where a PM is expected to have an opinion
        about the architecture. Bengaluru or remote.
      </p>
      <div style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap; margin-top:28px">
        <a class="btn btn--primary" href="mailto:${SITE.email}">${icon.mail} Get in touch</a>
        <a class="btn btn--ghost" href="${SITE.linkedin}" target="_blank" rel="noopener">LinkedIn ↗</a>
      </div>
    </div>
  </div>
</section>
`,
};
