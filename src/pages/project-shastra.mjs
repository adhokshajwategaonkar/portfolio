import { glance, decisions, more, icon } from '../layout.mjs';

export default {
  dir: 'projects/shastra',
  nav: 'work',
  title: `Shastra — case study | Adhokshaj Wategaonkar`,
  ogTitle: `Shastra — case study`,
  description: `Vedic astrology built on a verifiable ephemeris. Swiss Ephemeris computes, the LLM only narrates, and the ethics rules are asserted in the test suite. Designed, built and shipped solo.`,
  body: `
<section class="hero" style="padding-bottom:0">
  <div class="wrap">
    <a class="arrow-link rise" href="../../work/" style="margin-bottom:22px">
      <span style="display:inline-flex;transform:rotate(180deg)">${icon.arrow}</span> All work
    </a>

    <div class="rise" style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">
      <span class="badge badge--live"><i></i>Live</span>
      <span class="badge">Solo build · product, design &amp; engineering</span>
      <span class="badge">2026</span>
    </div>

    <h1 class="display rise" style="--i:1; margin:24px 0 0; font-size:clamp(2.4rem,7.5vw,5.4rem)">
      Shastra
    </h1>
    <p class="lead rise" style="--i:2; margin-top:22px; font-size:clamp(1.1rem,1.8vw,1.35rem)">
      Vedic astrology in a category that runs on per-minute meters and sells relief from fears it
      manufactured a paragraph earlier. I picked trust as the wedge, then built the product so that
      claim is checkable by a stranger rather than asserted in the copy.
    </p>

    <div class="rise" style="--i:3; display:flex; gap:10px; flex-wrap:wrap; margin-top:30px">
      <a class="btn btn--primary" href="https://adhokshajwategaonkar.github.io/shastra-site/" target="_blank" rel="noopener">
        Open the live site ${icon.arrowOut}
      </a>
      <a class="btn btn--ghost" href="#calls">The four calls</a>
    </div>
  </div>
</section>

<!-- ================================================== at a glance ====== -->
<section class="section section--tight">
  <div class="wrap">
    ${glance([
      {
        k: 'The problem',
        v: 'A buyer has no way to check whether the astronomy under a reading is real, so the only thing left to judge is how confident the copy sounds.',
        sub: 'The category monetises that gap with a call meter and a remedy.',
      },
      {
        k: 'What I owned',
        v: 'All of it. Positioning, ephemeris engine, prompt architecture, ethics enforcement, pricing structure, SEO, site, deploy.',
        sub: 'Node, Swiss Ephemeris, React 19, Postgres, Claude Haiku, GitHub Pages.',
      },
      {
        k: 'Where it is',
        v: 'Site and API both live. Three free calculators, each verified by hand against the local engine.',
        sub: '161 tests, about 300ms, and they run with no database and no API key.',
      },
    ])}
  </div>
</section>

<!-- ======================================================= the bet ===== -->
<section class="section section--tight section--ruled">
  <div class="wrap">
    <article class="prose rise">
      <h2 style="margin-top:0">Why trust is the only wedge worth taking</h2>
      <p>
        Online astrology in India is large and well monetised, and it has a consistent shape: a
        per-minute call meter, urgency manufactured to keep the meter running, and a remedy sold to
        fix the problem the reading just described. It works commercially. It also means the buyer's
        dominant emotion at the point of payment is anxiety.
      </p>
      <p>
        Competing on better predictions is unwinnable, because nobody can adjudicate a prediction. So
        the bet is that a slice of this market would rather have something calm and checkable, and
        that trust is the one differentiator the incumbents cannot follow me on. Their revenue depends
        on the meter and the remedy. Dropping either is a cut they have no reason to take, which
        leaves the position defended by their own P&amp;L rather than by my execution.
      </p>
      <p>
        That framing made the technical decisions obvious. If trust is the product, a stranger with no
        account has to be able to verify it.
      </p>
    </article>
  </div>
</section>

<!-- ============================================== the product ========= -->
<section class="section section--tight">
  <div class="wrap">
    <div class="sec-head rise">
      <div>
        <span class="label">The product</span>
        <h2 style="margin-top:14px">The engine computes.<br />The model only narrates.</h2>
      </div>
    </div>

    <div class="grid grid--2" style="align-items:center; gap:28px">
      <div class="card rise" style="padding:30px 22px; display:grid; place-items:center; background:var(--bg-3)">
        <div class="mock win" style="width:100%;max-width:360px" aria-hidden="true">
          <div class="win-bar"><i></i><i></i><i></i><span>shastra — free kundli</span></div>
          <div class="win-body">
            <svg class="kundli" viewBox="0 0 100 100" role="img" aria-label="North Indian birth chart">
              <rect x="1" y="1" width="98" height="98"/>
              <line x1="1" y1="1" x2="99" y2="99"/><line x1="99" y1="1" x2="1" y2="99"/>
              <line x1="50" y1="1" x2="1" y2="50"/><line x1="50" y1="1" x2="99" y2="50"/>
              <line x1="1" y1="50" x2="50" y2="99"/><line x1="99" y1="50" x2="50" y2="99"/>
              <text class="p" x="45" y="17">Su</text><text class="p" x="70" y="30">Me</text>
              <text class="p" x="15" y="56">Ma</text><text class="p" x="78" y="56">Ju</text>
              <text class="p" x="43" y="88">Mo</text><text class="p" x="26" y="30">Ve</text>
              <text x="47" y="45">1</text><text x="47" y="61">7</text>
            </svg>
            <div class="skel"><i class="m"></i><i></i><i class="s"></i></div>
          </div>
        </div>
      </div>

      <div class="rise" style="--i:1; display:grid; gap:18px">
        <div class="card card-pad" style="background:var(--bg-3)">
          <span class="label">Everything the model receives</span>
          <pre style="margin-top:12px;font-family:var(--font-mono);font-size:11.5px;line-height:1.7;color:var(--ink-2);white-space:pre-wrap">{
  "moon":   { "sign": "Rohini", "pada": 2 },
  "lagna":  { "sign": "Kanya" },
  "dasha":  { "maha": "Shukra", "ends": "2029-04" },
  "transit":{ "saturn": "sade-sati, phase 2" }
}</pre>
        </div>
        <p class="muted" style="font-size:14.6px">
          No birth date. No place, email or phone. The digest is PII-free by construction and a test
          asserts that for all four generation types, so a change leaking personal data into a prompt
          fails the build. One decision buys the privacy guarantee and the hallucination firewall.
        </p>
      </div>
    </div>

    <p class="faint rise" style="margin-top:22px; font-size:13px">
      Chart rendered with the same geometry the product uses. Try it on the
      <a class="link" href="https://adhokshajwategaonkar.github.io/shastra-site/" target="_blank" rel="noopener">live site ↗</a>.
    </p>
  </div>
</section>

<section class="section section--tight">
  <div class="wrap">
    <div class="frame rise" data-preview="https://adhokshajwategaonkar.github.io/shastra-site/" data-preview-title="Shastra live site">
      <div class="frame-bar">
        <span class="dots"><i></i><i></i><i></i></span>
        <span class="url">adhokshajwategaonkar.github.io/shastra-site</span>
        <span style="width:44px"></span>
      </div>
      <div class="frame-body">
        <div class="frame-cta">
          <span class="label">Live preview</span>
          <p class="muted" style="font-size:14px; max-width:44ch">
            The landing page and three free calculators, all backed by the deployed engine. Kundli,
            kundli matching and sade sati each compute for real.
          </p>
          <button class="btn btn--ghost" data-preview-load>Load the site</button>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ================================================== decisions ======== -->
<section class="section section--ruled" id="calls">
  <div class="wrap">
    <div class="sec-head rise">
      <div>
        <span class="label">Decisions</span>
        <h2 style="margin-top:14px">The four that shaped it.</h2>
      </div>
    </div>

    ${decisions([
      {
        call: 'The ephemeris computes every number. The model is only allowed to narrate.',
        instead: 'Letting the LLM do the astrology, which is how most of the new wave of AI astrology apps work.',
        why: `A model asked to compute a nakshatra produces a wrong one with total confidence. A model
          handed the nakshatra can get the framing wrong but never the fact. The same choice turns
          "the maths is real" from a marketing line into something a skeptic can check against any
          other ephemeris in about a minute.`,
      },
      {
        call: 'No remedies. Ever.',
        instead: 'Selling remedies, which is where the category makes much of its money and the obvious second revenue line here.',
        why: `Selling relief from a problem the reading just created is the mechanic this product
          exists to reject, so keeping it would have made the positioning a lie. Cutting it removes a
          revenue line on purpose and leaves free daily readings plus paid one-time reports, with no
          meter and no auto-renew.`,
      },
      {
        call: 'Restraint on selling lives in code, not in the prompt',
        instead: 'Instructing the model to be tasteful about when it mentions a paid report.',
        why: `A model asked to be tasteful about upselling drifts toward upselling, and the drift stays
          invisible until a user complains. So the rule sits outside the prompt: at most two paid
          mentions per user per week, only when a real upcoming transit justifies one, and never a
          product that isn't live. A caller can explicitly ask for a non-live product and the code
          refuses.`,
      },
      {
        call: 'Three free calculators shipped before anything paid',
        instead: 'Launching the reading first and marketing the accuracy, which is the faster route to revenue.',
        why: `A stranger can compute a kundli, a match score or a sade sati window and check it against
          any other source, with no account and no payment. That is the cheapest demonstration that the
          engine is real, and it doubles as the SEO surface I need given no acquisition budget.`,
      },
    ])}
  </div>
</section>

<!-- =================================================== the gate ======== -->
<section class="section">
  <div class="wrap">
    <article class="prose rise">
      <h2 style="margin-top:0">Making the ethics rules executable</h2>
      <p>
        No death, illness, pregnancy or accident predictions. No medical, legal or financial
        directives. No fear-selling and no promised outcomes.
      </p>
      <p>
        Those rules live in a shared prompt module that every system prompt includes, and a test
        asserts their presence in all four generation types. A prompt that ships without them fails
        the build. I did it that way because a guideline in a document degrades the first time someone
        is in a hurry, and the same guideline written as a failing test survives that. It is the
        pattern I reach for anywhere a rule matters more than it is convenient.
      </p>

      ${more('Detail', 'The verification gate, and two engineering calls', `
        <h4>Four assertions doing real work</h4>
        <ul>
          <li><strong>Spica sits at exactly 180°00′.</strong> That is the definition of the Lahiri
          ayanamsa. If it fails, the ayanamsa isn't Lahiri and every chart in the database is
          wrong.</li>
          <li><strong>Sun and Moon conjoin at the 2017 solar eclipse and oppose at the 2018 lunar
          eclipse</strong>, at NASA's published times. Ayanamsa-independent, so it tests the raw
          ephemeris rather than the configuration.</li>
          <li><strong>Three published reference charts</strong> (Gandhi, Einstein, Modi) match on sign,
          nakshatra and dignity. The fixtures assert published values and never values this engine
          produced, so a regression cannot quietly rewrite its own answer key.</li>
          <li><strong>Never weaken a tolerance to make a test pass.</strong> Written into the repo
          instructions, because that is the shortcut a tired future self takes.</li>
        </ul>

        <h4>Moshier instead of the Swiss data files</h4>
        <p>
          The full ephemeris ships as about 100 MB of data files. The analytic fallback is accurate to
          roughly 0.1 arcseconds, and a nakshatra pada is 3°20′ wide, so the error sits four orders of
          magnitude below anything that could change a reading. Taking the fallback buys deployment to
          a free instance with no data download and no path-configuration failure mode. Most good
          infrastructure calls look like this one: find where the precision you are paying for is far
          below the precision that matters, then stop paying.
        </p>

        <h4>Sade sati is not 7.5 years</h4>
        <p>
          Every consumer astrology product states it as a constant. Saturn's eccentricity puts real
          episodes between 6.3 and 8.9 years, and Saturn can cross a sign boundary up to three times on
          a retrograde loop, so a coarse scan reports one clean ingress and a wrong start date. The
          scanner steps at 8 days to catch the roughly 57-day clip in the middle. A rounded constant is
          the sort of place a claim about real numbers quietly fails.
        </p>
      `)}
    </article>
  </div>
</section>

<!-- ================================================ distribution ======= -->
<section class="section section--tight section--ruled">
  <div class="wrap">
    <div class="sec-head rise">
      <div>
        <span class="label">Distribution</span>
        <h2 style="margin-top:14px">Getting found without a budget.</h2>
      </div>
    </div>
    <div class="kv rise">
      <div class="kv-row">
        <span class="label">Site separate from API</span>
        <span class="v">A free Render instance sleeps and cold-starts in about 50 seconds, which an app
        someone chose to open can absorb and a landing page cannot. The static site sits on GitHub
        Pages and pre-warms the API with a health fetch on load, so the instance is awake before anyone
        clicks.</span>
      </div>
      <div class="kv-row">
        <span class="label">The calculators are the marketing</span>
        <span class="v">Kundli, kundli matching and sade sati are the SEO surface and the proof of the
        engine in one build. Nobody has to believe the copy when they can compute a chart and compare
        it against what they already use.</span>
      </div>
      <div class="kv-row">
        <span class="label">Policy pages are generated</span>
        <span class="v">Privacy, terms and refunds build from markdown rather than hand-written HTML,
        because hand-editing the output works right until the next deploy reverts it.
        <code>npm run site:check</code> drives the calculators against the real engine in jsdom, and it
        earned its keep by catching Rahu and Ketu rendering their dignity as the literal string
        <code>null</code>.</span>
      </div>
    </div>
  </div>
</section>

<section class="section section--tight">
  <div class="wrap">
    <div class="sec-head rise"><div><span class="label">Next</span></div></div>
    <a class="card proj rise" href="../animus/">
      <div class="card-pad proj">
        <div class="proj-top">
          <div>
            <span class="badge badge--live"><i></i>Live · solo build</span>
            <h3 style="margin-top:12px">Animus</h3>
          </div>
          <span style="color:var(--accent-ink);flex:none;width:18px">${icon.arrow}</span>
        </div>
        <p>Capture to WhatsApp, parsed by Haiku, ranked by what is closest to rotting. Built for ADHD brains.</p>
      </div>
    </a>
  </div>
</section>
`,
};
