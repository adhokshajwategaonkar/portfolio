export default {
  dir: 'projects/animus',
  nav: 'work',
  title: `Animus — case study | Adhokshaj Wategaonkar`,
  ogTitle: `Animus — case study`,
  description: `Capture to WhatsApp, sorted by Claude Haiku, ranked by what's closest to rotting. A zero-maintenance capture tool for adults with ADHD — designed, built and shipped solo.`,
  body: `
<!-- ======================================================= hero ======== -->
<section class="hero" style="padding-bottom:0">
  <div class="wrap">
    <a class="arrow-link rise" href="../../work/" style="margin-bottom:22px">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="transform:rotate(180deg)"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      All work
    </a>

    <div class="rise" style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">
      <span class="badge badge--live"><i></i>Live</span>
      <span class="badge">Solo build · product, design &amp; engineering</span>
      <span class="badge">2026</span>
    </div>

    <h1 class="intro-name rise" style="--i:1; margin-top:20px; font-size:clamp(2.4rem,6vw,4.2rem)">
      Animus
    </h1>
    <p class="lead rise" style="--i:2; margin-top:22px; font-size:clamp(1.1rem,1.8vw,1.35rem)">
      You're going to forget. That's the plan. Send it to WhatsApp the second it appears —
      a link, a half-thought, a task — and it lands in a feed that sorts itself, ranks by
      what's closest to rotting, and brings it back before it does.
    </p>

    <div class="intro-links rise" style="--i:3">
      <a class="btn btn--primary" href="https://adhokshajwategaonkar.github.io/animus-site/" target="_blank" rel="noopener">
        Visit the site
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6M20 4 10 14"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>
      </a>
      <a class="btn btn--ghost" href="https://animus-jwui.onrender.com" target="_blank" rel="noopener">
        Open the app
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6M20 4 10 14"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>
      </a>
      <a class="btn btn--ghost" href="#decisions">The hard calls</a>
    </div>
  </div>
</section>

<!-- ================================================ spec table ========= -->
<section class="section section--tight">
  <div class="wrap">
    <table class="spec rise">
      <tbody>
        <tr><th>Role</th><td><strong>Everything.</strong> Product, positioning, design system, prompt architecture, backend, frontend, pricing model, landing page, deploy.</td></tr>
        <tr><th>Who it's for</th><td><strong>Adults with ADHD and executive-dysfunction traits.</strong> Not "busy professionals". Every copy and product decision resolves against that person.</td></tr>
        <tr><th>Stack</th><td>Node + Express · React + Vite + Tailwind + Framer Motion · Supabase Postgres · Meta WhatsApp Cloud API (direct) · Claude Haiku 4.5 · Render</td></tr>
        <tr><th>Shipped</th><td>Capture → parse → save → confirm → feed with done / snooze / drop. Multi-tenant auth, WhatsApp phone pairing, password reset over WhatsApp, brain-health score, habit loop, audit log, light + dark theme, invite-gated signup, global spend ceiling, full account deletion, nudge engine (free-form path live).</td></tr>
        <tr><th>Live</th><td><a class="link" href="https://adhokshajwategaonkar.github.io/animus-site/" target="_blank" rel="noopener">The site ↗</a> · <a class="link" href="https://animus-jwui.onrender.com" target="_blank" rel="noopener">the app ↗</a> — the app is invite-only, and the free instance sleeps, so a first load takes ~50 seconds.</td></tr>
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
        <h2 style="margin-top:14px">Capture in one place,<br />organise in another.</h2>
      </div>
    </div>

    <div class="grid grid--2" style="align-items:center; gap:28px">
      <div class="card rise" style="padding:34px 20px; display:grid; place-items:center; background:var(--bg-3)">
        <div class="mock phone" style="transform:scale(.92)" aria-hidden="true">
          <div class="bar"><b>animus</b><span style="font-size:10px;color:#6B6B76">◑</span></div>
          <div class="panes"><span class="on">the pile</span><span>progress</span></div>
          <div>
            <div class="hero-n">14</div>
            <div class="hero-k">in the pile · 6 cleared this week</div>
          </div>
          <div class="item"><b><i style="background:#C6FF3D"></i>Book dentist — Friday</b><span>task · due in 2 days</span></div>
          <div class="item"><b><i style="background:#3DA9FC"></i>Attention Is All You Need</b><span>link · arxiv.org</span></div>
          <div class="item"><b><i style="background:#7C5CFC"></i>Pricing should degrade, not block</b><span>idea · 4 days ago</span></div>
          <div class="item"><b><i style="background:#FF8A3D"></i>Ship the nudge templates</b><span>goal · this week</span></div>
        </div>
      </div>

      <div class="rise" style="--i:1; display:grid; gap:20px">
        <div class="card card-pad" style="background:var(--bg-3); display:grid; place-items:center; padding:26px 18px">
          <div class="mock wa" aria-hidden="true">
            <div class="msg out">book dentist friday, read this later https://arxiv.org/abs/1706.03762 — also, pricing should degrade not block<span class="t">09:41 ✓✓</span></div>
            <div class="msg in">got it. three things.<br />· task — book dentist, friday<br />· link — Attention Is All You Need<br />· idea — pricing should degrade<span class="t">09:41</span></div>
          </div>
        </div>
        <p class="muted" style="font-size:14.6px">
          One message in, three structured items out, and a confirmation that names them back so you
          know it landed. The feed is the only place you ever have to look — there is nothing to file,
          which means there is nothing to fall behind on.
        </p>
      </div>
    </div>

    <p class="faint rise" style="margin-top:22px; font-size:13px">
      Interface mockups, drawn to the product's real design tokens. The running app is
      <a class="link" href="https://animus-jwui.onrender.com" target="_blank" rel="noopener">here ↗</a>.
    </p>
  </div>
</section>

<!-- ============================================== live preview ========= -->
<section class="section section--tight">
  <div class="wrap">
    <div class="frame rise" data-preview="https://adhokshajwategaonkar.github.io/animus-site/" data-preview-title="Animus site">
      <div class="frame-bar">
        <span class="dots"><i></i><i></i><i></i></span>
        <span class="url">adhokshajwategaonkar.github.io/animus-site</span>
        <span style="width:44px"></span>
      </div>
      <div class="frame-body">
        <div class="frame-cta">
          <span class="label">Live preview — the marketing site</span>
          <p class="muted" style="font-size:14px; max-width:44ch">
            Loaded on request rather than eagerly. Same reason the app itself isn't embedded here:
            it runs on a free instance that sleeps and cold-starts in about 50 seconds, and showing
            every visitor a spinner is worse than showing them a button.
          </p>
          <button class="btn btn--ghost" data-preview-load>Load the site</button>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ======================================================= body ======== -->
<section class="section" style="padding-top:clamp(30px,4vw,50px)">
  <div class="wrap">
    <article class="prose rise">

      <h2 style="margin-top:0">The problem, stated honestly</h2>
      <p>
        The person Animus is for has already abandoned five productivity tools. Not one of those
        failures was about missing features. Talk to enough of them and it's always the same three
        things, and each one is a design constraint rather than a complaint:
      </p>
      <ul>
        <li><strong>Opening the app <em>was</em> the friction.</strong> The thought died during the app switch.</li>
        <li><strong>It needed upkeep.</strong> Folders, tags, weekly reviews, inbox zero — a second job.</li>
        <li><strong>Going away for three weeks produced a wall of red badges.</strong> Coming back felt like being told off.</li>
      </ul>
      <p>
        So what this user is buying isn't organisation. It's <strong>the absence of a system to
        maintain</strong>. That reframing is the whole product, and it dictated three answers:
        capture is a WhatsApp message so there's no app to remember to open; there's nothing to
        file, so nothing can fall behind; and the feed re-sorts itself, so absence costs nothing.
      </p>

      <div class="callout" style="margin-top:28px">
        <span class="label">The positioning call</span>
        <p>
          ADHD adults won over three other candidate personas — independent consultants, writers
          with an idea backlog, household mental-load managers — on two grounds. The product had
          <strong>already been built for them by accident</strong> (no folders, ranked by rot, never
          loses a capture), so the pivot cost was copy and not architecture. And it's the only one of
          the four where users recruit each other, which is the only distribution available at zero
          budget.
        </p>
      </div>

      <h2 id="decisions">Four decisions I'd defend in a review</h2>

      <h3>1 — The habit loop counts what you did, never what you didn't. The schema enforces it.</h3>
      <p>
        The obvious build was a progressive streak, a chart of rot over time, and a signal telling
        the user they'd slacked. All three are the mechanic that loses this audience: a streak that
        visibly breaks converts a bad week into proof they've failed at another system.
      </p>
      <p>
        What shipped is the same dopamine from the opposite direction. The run
        <strong>forgives one quiet day</strong> and never announces its own end — it just becomes a
        smaller number, and the best-ever run is a record that's never taken away. Crucially, the
        daily stats table records captured, cleared, brain health and open items —
        <strong>and nothing else</strong>. There is deliberately no missed-day flag, no slip counter,
        no rolling deficit. The data you'd need to shame someone with is never collected, which is
        what turns a copy guideline into something the codebase actually enforces.
      </p>
      <p>
        Same reasoning retired the streak from the UI after it was already built, and rewrote the
        bottom brain-health band from "the pile is winning" to "some of these want ten minutes.
        start at the top." A low score is the exact moment this user quits, so a number is never
        allowed to be a verdict.
      </p>

      <h3>2 — A failed parse never loses the capture</h3>
      <p>
        If Haiku errors, times out, or a spend cap trips, the item still saves with a degraded title.
        For a product whose entire premise is "nothing rots forgotten," dropping a message is the one
        unacceptable bug — so the parse function is written so it cannot throw.
      </p>
      <p>
        That single contract then became load-bearing everywhere else. The global spend ceiling
        degrades to an unparsed save rather than refusing. The planned billing boundary does the same:
        hitting a limit produces a <em>worse</em> item, never a blocked one, because for someone
        mid-thought "we couldn't sort that one" is survivable and "upgrade to save this" is not.
      </p>

      <h3>3 — The nudge returns exactly one item, and that function signature is the copy rule</h3>
      <p>
        The engine that brings things back has no code path returning a list. "You have 14 things
        waiting" is therefore <em>unrepresentable</em> rather than merely discouraged. If a future
        change ever makes returning an array feel natural, that's the signal to go re-read the
        design doc, not to change the signature.
      </p>
      <p>
        Four suppressions matter more than the daily cap: an item retires after three lifetime nudges
        (something that's come back three times isn't being forgotten, it's being declined); snoozed
        items are never nudged, because overriding an explicit "not now" is the most nagging thing
        the system could do; recently-viewed items are skipped; and nothing anywhere reads how long
        the user has been away. The engine <em>cannot</em> express "you haven't been here in a
        while" because it never computes it.
      </p>

      <h3>4 — Rebuilding the cost model from the real prompt changed the pricing conclusion</h3>
      <p>
        I'd been quoting ~$0.0012 per capture. Measured properly against the actual system prompt it's
        <strong>$0.00205 — 71% higher</strong>. A link capture turned out to be 1.47× a text capture,
        not 3.3×, which removed an entire axis from the tier design: there's no case for pricing links
        differently. And <strong>99% of a capture's input tokens are the fixed system prompt</strong>,
        so cost per capture is nearly independent of what the user actually sent.
      </p>
      <p>
        That last finding is the useful one. It means "my happiest users cost me the most" is a
        <em>volume</em> problem, not a per-unit one — which is what makes a captures-based pricing
        boundary honest rather than a punishment for enthusiasm.
      </p>
      <p>
        A second correction was larger. The per-user WhatsApp figure I'd been carrying counted nudges
        only — but the rule also bills the confirmation sent back after <em>every single capture</em>,
        one per message rather than one per day. From October 2026, when in-window messages stop being
        free, WhatsApp becomes roughly <strong>42% of an active user's variable cost</strong>, not a
        rounding error. The mitigation, if it's ever needed, is one confirmation per burst instead of
        one per message — several times cheaper, and arguably better for a burst-capture user anyway.
      </p>

      <div class="callout">
        <span class="label">The finding I'd bring to any AI product</span>
        <p>
          A task titled "Book dentist appointment" once arrived carrying an unrelated arXiv link,
          with the user's other three thoughts missing entirely. Nothing in the code was wrong —
          the same message had been sent twice and <strong>the model split it differently each
          time</strong>. A single manual test passes either way, which is what makes this class of
          bug expensive. The fix wasn't a patch, it was a measurement: an eval harness that replays
          fixtures N times and reports a stability percentage. With a non-deterministic component,
          <strong>"I tested it" is not a statement about correctness</strong> — you need a
          distribution, not a pass.
        </p>
      </div>

      <hr />

      <h2>What I'd take into a team</h2>
      <ul>
        <li>
          <strong>Write the reasoning, not the change.</strong> "Uses one service" is nearly useless.
          "One service because two domains make the session cookie third-party and Safari blocks that
          in an installed PWA, which breaks sign-in for exactly the users who liked it enough to
          install it" tells the next person whether it's safe to change.
        </li>
        <li>
          <strong>Encode the constraint where it can't rot.</strong> A copy rule in a document
          degrades. A schema that never collects the data makes the rule enforceable.
        </li>
        <li>
          <strong>Pick your failure direction deliberately, and don't make it consistent for
          neatness.</strong> The LLM spend cap fails <em>open</em> — a telemetry outage must not
          silently degrade every capture in the system. The nudge cap fails <em>closed</em> — losing
          count costs someone a stream of messages to their phone. Those should not be made to match.
        </li>
        <li>
          <strong>Know what's yours and what isn't.</strong> The "5 user limit" everyone assumed was
          a code constraint is a property of Meta's test number. There is no such constant, and there
          never was. Worth checking before anyone goes hunting for a number to raise.
        </li>
      </ul>

    </article>
  </div>
</section>

<!-- ================================================== next proj ======== -->
<section class="section section--tight">
  <div class="wrap">
    <div class="sec-head rise"><div><span class="label">Next</span></div></div>
    <a class="card proj rise" href="../shastra/">
      <div class="card-pad proj">
        <div class="proj-top">
          <div>
            <span class="badge badge--live"><i></i>Live · solo build</span>
            <h3 style="margin-top:12px">Shastra</h3>
          </div>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--accent-ink);flex:none"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </div>
        <p>Vedic astrology where the maths is verifiable and the ethics are asserted in the test suite.</p>
      </div>
    </a>
  </div>
</section>
`,
};
