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
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="transform:rotate(180deg)"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      All work
    </a>

    <div class="rise" style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">
      <span class="badge badge--live"><i></i>Site live</span>
      <span class="badge">Solo build · product, design &amp; engineering</span>
      <span class="badge">2026</span>
    </div>

    <h1 class="intro-name rise" style="--i:1; margin-top:20px; font-size:clamp(2.4rem,6vw,4.2rem)">
      Shastra
    </h1>
    <p class="lead rise" style="--i:2; margin-top:22px; font-size:clamp(1.1rem,1.8vw,1.35rem)">
      Vedic astrology in a category defined by per-minute meters and fear-selling. The wedge isn't
      better predictions — it's trust: no meters, no manufactured urgency, no remedies sold against
      a problem the app just described.
    </p>

    <div class="rise" style="--i:3; display:flex; gap:10px; flex-wrap:wrap; margin-top:30px">
      <a class="btn btn--primary" href="https://adhokshajwategaonkar.github.io/shastra-site/" target="_blank" rel="noopener">
        Open the live site
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6M20 4 10 14"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>
      </a>
      <a class="btn btn--ghost" href="#trust">Jump to the trust architecture</a>
    </div>
  </div>
</section>

<section class="section section--tight">
  <div class="wrap">
    <table class="spec rise">
      <tbody>
        <tr><th>Role</th><td><strong>Everything.</strong> Positioning, ephemeris engine, prompt architecture, ethics enforcement, pricing structure, SEO strategy, site, deploy.</td></tr>
        <tr><th>The wedge</th><td><strong>Trust.</strong> Free daily reading over a WhatsApp ritual the user starts; paid one-time reports over UPI. No per-minute meters, no auto-renew.</td></tr>
        <tr><th>Stack</th><td>Node + Express · Swiss Ephemeris (Moshier mode) · React 19 + Vite + Tailwind v4 · Postgres · Claude Haiku · Static site on GitHub Pages</td></tr>
        <tr><th>Shipped</th><td>Ephemeris engine, guna milan (ashtakoota 36), sade sati scanner, the verification gate, prompt layer with cost caps, and a public site with three free calculators — <strong>161 tests, ~300 ms</strong>.</td></tr>
        <tr><th>Live</th><td><a class="link" href="https://adhokshajwategaonkar.github.io/shastra-site/" target="_blank" rel="noopener">adhokshajwategaonkar.github.io/shastra-site ↗</a> — the site is deployed; the API deploy is the next step.</td></tr>
      </tbody>
    </table>
  </div>
</section>

<!-- ============================================== the product ========= -->
<section class="section section--tight section--ruled">
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
          <span class="label">What the model receives</span>
          <pre style="margin-top:12px;font-family:var(--font-mono);font-size:11.5px;line-height:1.7;color:var(--ink-2);white-space:pre-wrap">{
  "moon":   { "sign": "Rohini", "pada": 2 },
  "lagna":  { "sign": "Kanya" },
  "dasha":  { "maha": "Shukra", "ends": "2029-04" },
  "transit":{ "saturn": "sade-sati, phase 2" }
}</pre>
        </div>
        <p class="muted" style="font-size:14.6px">
          No birth date. No place, email or phone. The digest is PII-free by construction and a test
          asserts it for all four generation types — so a change that leaks personal data into a
          prompt fails the build instead of shipping quietly. It is the privacy guarantee and the
          hallucination firewall in the same decision.
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
            The landing page and three free calculators. The calculators call an API that isn't
            deployed yet, so they'll render but not compute — that's the honest current state.
          </p>
          <button class="btn btn--ghost" data-preview-load>Load the site</button>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section" style="padding-top:clamp(30px,4vw,50px)">
  <div class="wrap">
    <article class="prose rise">

      <h2 style="margin-top:0">The category problem</h2>
      <p>
        Online astrology in India is a large, well-monetised market with a specific shape: a
        per-minute call meter, urgency manufactured to keep it running, and a remedy sold to fix the
        problem the reading just described. It works. It also means the buyer's dominant emotion at
        the point of payment is anxiety.
      </p>
      <p>
        The bet is that a meaningful slice of that market would rather have something calm and
        checkable — and that <em>trust is the differentiator you can actually build</em>, because
        the incumbents' business model prevents them from copying it.
      </p>

      <h2 id="trust">Trust, as three architectural decisions</h2>

      <h3>1 — The ephemeris computes. The model only narrates.</h3>
      <p>
        Every planetary position, nakshatra, dasha date and compatibility point is computed with
        Swiss Ephemeris. The LLM receives a structured digest and writes prose. This is doing two
        jobs at once, which is why it's the load-bearing decision:
      </p>
      <ul>
        <li>
          <strong>It's the credibility moat.</strong> "The maths is real" stops being a marketing
          line and becomes a claim a skeptical user can go and check against any other ephemeris.
        </li>
        <li>
          <strong>It's the hallucination firewall.</strong> A model asked to <em>compute</em> a
          nakshatra will confidently produce a wrong one. A model handed the nakshatra and asked to
          interpret it cannot get the fact wrong, only the framing.
        </li>
      </ul>
      <p>
        The privacy consequence falls out of the same design: the digest the model sees contains
        <strong>no birth date, no birth place, no email, no phone number</strong>. A test asserts
        this for all four generation types, so a change that leaks PII into a prompt fails the build
        rather than shipping quietly.
      </p>

      <h3>2 — The ethics rules are executable, not aspirational</h3>
      <p>
        No death, illness, pregnancy or accident predictions. No medical, legal or financial
        directives. No fear-selling, no manufactured urgency, no promised outcomes.
        <strong>And no remedies, ever</strong> — Shastra does not sell relief from a problem it just
        described. That last rule is the line between this and a ₹1,182-crore incumbent, and it is
        not negotiable.
      </p>
      <p>
        The interesting part is the enforcement. Those rules live in a shared prompt module that
        every system prompt includes, and a test asserts their presence in all four generation
        types. A prompt that ships without them fails the build. Same idea applied to selling:
        restraint is enforced in <em>code</em> — at most two paid mentions per user per week, only
        when a real upcoming transit justifies it, never a product that isn't live — because
        <strong>an LLM asked to be tasteful about upselling drifts toward upselling</strong>.
      </p>

      <div class="callout" style="margin-top:28px">
        <span class="label">The pattern, generalised</span>
        <p>
          A guideline in a document degrades on contact with a deadline. The same guideline expressed
          as a failing test survives. Anywhere a rule matters more than it's convenient, move it from
          prose into something that breaks.
        </p>
      </div>

      <h3>3 — The verification gate</h3>
      <p>
        161 tests, ~300 ms, and they run with no database and no API key. Four of the assertions are
        doing real work rather than covering lines:
      </p>
      <ul>
        <li>
          <strong>Spica sits at exactly 180°00′.</strong> That <em>is</em> the definition of the
          Lahiri ayanamsa. If it fails, the ayanamsa isn't Lahiri and every chart in the database
          is wrong.
        </li>
        <li>
          <strong>Sun and Moon conjoin at the 2017 solar eclipse and oppose at the 2018 lunar
          eclipse</strong>, at NASA's published times. Ayanamsa-independent, so it tests the raw
          ephemeris itself.
        </li>
        <li>
          <strong>Three published reference charts</strong> — Gandhi, Einstein, Modi — match on sign,
          nakshatra and dignity. The fixtures assert <em>published</em> values, never values this
          engine produced, so a regression can't quietly rewrite its own answer key.
        </li>
        <li>
          <strong>Never weaken a tolerance to make a test pass.</strong> Written into the repo's
          instructions, because that's the shortcut a tired future self would take.
        </li>
      </ul>

      <hr />

      <h2>Two engineering calls with product consequences</h2>

      <h3>Moshier instead of the Swiss data files</h3>
      <p>
        The full ephemeris ships as ~100 MB of data files. The analytic fallback is accurate to about
        0.1 arcseconds — and a nakshatra pada is 3°20′ wide, so the error is four orders of magnitude
        below anything that could change a reading. Taking the fallback buys deployment to a free
        instance with no data download and no path-configuration failure mode.
      </p>
      <p>
        That's the shape of most good infrastructure decisions: find the place where the precision
        you're paying for is far below the precision that matters, and stop paying.
      </p>

      <h3>Sade sati is not 7.5 years</h3>
      <p>
        Every consumer astrology product states it as a constant. Saturn's eccentricity puts real
        episodes between <strong>6.3 and 8.9 years</strong>, and Saturn can cross a sign boundary up
        to three times on a retrograde loop — so a coarse scan reports one clean ingress and a wrong
        start date. The scanner steps at 8 days specifically to catch the ~57-day clip in the middle.
      </p>
      <p>
        It's a small thing that says something larger: the product's whole claim is that the numbers
        are real, and a rounded constant is exactly where that claim would quietly fail. Any test or
        line of copy that assumes 7.5 years is asserting something about itself, not about the sky.
      </p>

      <hr />

      <h2>Distribution, without a budget</h2>
      <p>
        The public site is static, hand-written, no framework, on GitHub Pages — separate from the
        API on purpose. A free Render instance sleeps and cold-starts in ~50 seconds, which is
        tolerable for an app someone chose to open and fatal for a landing page, where a blank tab is
        just a bounce. The page pre-warms the API with a health fetch on load, so the instance is
        awake by the time anyone clicks.
      </p>
      <p>
        Three free calculators — kundli, kundli matching, sade sati — do double duty as SEO surface
        and as proof of the engine. They're the cheapest possible demonstration that the maths is
        real: you don't have to believe the marketing, you can go and compute a chart.
      </p>
      <p>
        The legal pages are <strong>generated from markdown</strong> rather than hand-written HTML,
        because hand-editing the output works right up until the next deploy silently reverts it.
        And <code>npm run site:check</code> drives the calculators against the real engine in jsdom —
        which earned its keep immediately by catching Rahu and Ketu rendering their dignity as the
        literal string <code>null</code>.
      </p>

      <hr />

      <h2>What I'd take into a team</h2>
      <ul>
        <li>
          <strong>Decide what the model is not allowed to do, first.</strong> Choosing which parts of
          the system are deterministic is a product decision with a bigger effect on user trust than
          any prompt tuning.
        </li>
        <li>
          <strong>Make the trust claim checkable.</strong> "Accurate" is a marketing word. Three
          published reference charts in a test suite is a fact.
        </li>
        <li>
          <strong>Constraints that matter belong in the build.</strong> Ethics rules asserted by
          tests, upsell limits enforced in code, PII exclusion covered by a passing assertion.
        </li>
        <li>
          <strong>Ship the credibility artifact before the product.</strong> The free calculators
          exist so a stranger can verify the engine without an account, a payment or a leap of faith.
        </li>
      </ul>

    </article>
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
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--accent-ink);flex:none"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </div>
        <p>Capture to WhatsApp, parsed by Haiku, ranked by what's closest to rotting. Built for ADHD brains.</p>
      </div>
    </a>
  </div>
</section>
`,
};
