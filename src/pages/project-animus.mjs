import { glance, decisions, more, icon } from '../layout.mjs';

export default {
  dir: 'projects/animus',
  nav: 'work',
  title: `Animus — case study | Adhokshaj Wategaonkar`,
  ogTitle: `Animus — case study`,
  description: `A zero-maintenance capture tool for adults with ADHD. Capture is a WhatsApp message, Claude Haiku sorts it, the feed ranks by what is closest to rotting. Designed, built and shipped solo.`,
  body: `
<!-- ======================================================= hero ======== -->
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
      Animus
    </h1>
    <p class="lead rise" style="--i:2; margin-top:22px; font-size:clamp(1.1rem,1.8vw,1.35rem)">
      A capture tool for adults with ADHD. Capture is a WhatsApp message, Claude Haiku sorts it
      into structured items, and the feed ranks by what is closest to rotting. I own the whole
      thing: positioning, schema, prompts, design system, pricing model, deploy.
    </p>

    <div class="intro-links rise" style="--i:3">
      <a class="btn btn--primary" href="https://adhokshajwategaonkar.github.io/animus-site/" target="_blank" rel="noopener">
        Visit the site ${icon.arrowOut}
      </a>
      <a class="btn btn--ghost" href="https://animus-jwui.onrender.com" target="_blank" rel="noopener">
        Open the app ${icon.arrowOut}
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
        v: 'The people this is built for have abandoned four or five capture tools already. Those tools lost on upkeep rather than on features.',
        sub: 'Folders, tags, weekly reviews, inbox zero.',
      },
      {
        k: 'What I owned',
        v: 'All of it. Positioning, design system, prompt architecture, backend, frontend, pricing model, landing page, deploy.',
        sub: 'Node, React, Supabase, WhatsApp Cloud API, Claude Haiku 4.5, Render.',
      },
      {
        k: 'Where it is',
        v: 'Live and invite-only. Capture, parse, feed, snooze, archive and the free-form nudge path all ship.',
        sub: 'Free Render instance, so a first load takes about 50 seconds.',
      },
    ])}
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
          One message in, three structured items out, and a confirmation naming them back so you know
          it landed. The feed is the only surface anyone has to look at. There is nothing to file,
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
            Loaded on request. The app runs on a free instance that sleeps and cold-starts in about
            50 seconds, and showing every visitor a spinner is worse than showing them a button.
          </p>
          <button class="btn btn--ghost" data-preview-load>Load the site</button>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- =============================================== the audience ======== -->
<section class="section" style="padding-top:clamp(34px,4.5vw,60px)">
  <div class="wrap">
    <article class="prose rise">
      <h2 style="margin-top:0">Choosing who it is for</h2>
      <p>
        I had a working capture tool and four plausible audiences for it. Picking between them was
        the first real product decision, and on paper the four were close.
      </p>
    </article>

    <table class="spec rise" style="margin-top:24px">
      <tbody>
        <tr>
          <th>Independent consultants</th>
          <td>Best margins of the four and the cleanest wedge: forward a client's WhatsApp message
          rather than retype it as a task. They want shared client context, and everything I had
          built was single-player.</td>
        </tr>
        <tr>
          <th>Writers with an idea backlog</th>
          <td>Strongest amplification story, weakest urgency. Nobody leaves a notes app over an idea
          they never noticed losing.</td>
        </tr>
        <tr>
          <th>Household mental load</th>
          <td>Biggest market by a distance. That load is shared across a family, so the product would
          have needed a second person in it from day one.</td>
        </tr>
        <tr>
          <th><span style="color:var(--accent-ink)">Adults with ADHD</span></th>
          <td><strong>Chosen.</strong> No folders, nothing to file, ranked by what is about to rot,
          and a capture path that never drops a message. I had built the feature set for them without
          meaning to.</td>
        </tr>
      </tbody>
    </table>

    <article class="prose rise" style="margin-top:30px">
      <p>
        Two things decided it. Rewriting the positioning cost me copy and left the architecture
        alone, so the pivot was close to free. And ADHD adults are the one segment of the four where
        users recruit each other, which is the only distribution channel available to me at zero
        budget.
      </p>
      <p>
        The choice comes with a price I can name. This audience captures in bursts, so a
        forty-capture evening is ordinary use rather than abuse. The hundred-per-day cap I set as an
        abuse ceiling now sits close to real behaviour, and anyone who crosses it gets degraded
        captures instead of a refusal. I would rather watch that number against real usage than raise
        it on a guess.
      </p>
    </article>
  </div>
</section>

<!-- ================================================== decisions ======== -->
<section class="section section--ruled" id="calls">
  <div class="wrap">
    <div class="sec-head rise">
      <div>
        <span class="label">Decisions</span>
        <h2 style="margin-top:14px">Four calls, and what each one beat.</h2>
      </div>
    </div>

    ${decisions([
      {
        call: 'Capture happens in WhatsApp, and there is no app to open',
        instead: 'A mobile app with a share extension and push notifications, which is what most of this category ships.',
        why: `The app switch is where the thought dies for this user, so the capture surface has to be
          somewhere they already are. A WhatsApp message needs no install and no permission grant. It
          also walks around the iOS wall: web push on iPhone requires the PWA to be installed to the
          home screen first, which is four steps of setup in a product whose pitch is the absence of
          setup.`,
      },
      {
        call: 'The habit loop counts what you did and never what you missed',
        instead: 'The progressive streak and rot-over-time chart I specced first, built, and then took back out.',
        why: `A streak that visibly breaks turns a bad week into evidence of failing another system,
          and that is the moment this audience quits. The daily stats table records captures, clears,
          brain health and open items. It carries no missed-day flag and no slip counter, so I never
          collect the data I would need to shame someone with. Adding absence tracking now costs a
          migration, which is the point.`,
      },
      {
        call: 'Every limit degrades the output rather than blocking it',
        instead: 'Refusing the capture when the parse fails, the spend cap trips, or a plan boundary is reached.',
        why: `Someone mid-thought can survive "we could not sort that one". They cannot survive
          "upgrade to save this". The parse function is written so it cannot throw, and that one
          contract now covers LLM failures, the global spend ceiling and the billing boundary I have
          specced but not built.`,
      },
      {
        call: '₹349 a month, after carrying ₹149 in my head for weeks',
        instead: '₹149, which felt right and matched what I assumed an Indian consumer pays for a capture tool.',
        why: `I rebuilt the cost model from the real system prompt and a text capture came out at
          $0.00205, 71% above the figure I had been quoting. At ₹149 the margin inverts at 14 captures
          a day, a level I describe elsewhere on this page as ordinary. At ₹349 it inverts at 33 a day
          sustained for a month. ₹349 also sits inside the band Indian consumers already pay in:
          Todoist ₹330, ChatGPT Go ₹399.`,
      },
    ])}
  </div>
</section>

<!-- ======================================================= eval ======== -->
<section class="section">
  <div class="wrap">
    <article class="prose rise">
      <h2 style="margin-top:0">Testing a component that gives two answers to the same question</h2>
      <p>
        A task called "Book dentist appointment" turned up in the feed carrying an arXiv link that
        belonged to something else, and the user's other three thoughts were missing. I went looking
        for the bug and there wasn't one. The same message had been sent twice, five minutes apart.
        The first parse returned one item and put the whole message's URL on it. The second returned
        four and placed the URL correctly.
      </p>
      <p>
        A single manual test passes either way, which is what makes this class of bug expensive to
        find. So I replaced the test with a measurement. An eval harness replays fixtures N times and
        reports a stability percentage per fixture, and anything under 100% means the same message can
        still land two ways. I run it after any edit to the parse prompt.
      </p>

      ${more('Detail', 'Four engineering calls behind those decisions', `
        <h4>The nudge function returns one item or null</h4>
        <p>
          The code that decides what to bring back has no path that returns a list, so "you have 14
          things waiting" is unrepresentable rather than discouraged. Four suppressions do more work
          than the daily cap: an item retires after three lifetime nudges, snoozed items are never
          nudged, recently-viewed items are skipped, and nothing anywhere reads how long the user has
          been away. The engine cannot say "you haven't been here in a while" because it never
          computes it.
        </p>

        <h4>The two caps fail in opposite directions</h4>
        <p>
          If the LLM spend query errors, the capture still goes through. If the nudge-count query
          errors, the user gets skipped. A telemetry outage should not quietly degrade every capture
          in the system, and losing count of nudges costs someone a stream of messages to their phone.
          Making the two consistent would be tidier and wrong.
        </p>

        <h4>Why the API and the app share one Express service</h4>
        <p>
          Two domains make the session cookie third-party. Safari blocks those by default, so sign-in
          breaks inside an installed PWA on iPhone, which is where the users who liked it enough to
          install it are.
        </p>

        <h4>WhatsApp becomes about 42% of variable cost in October 2026</h4>
        <p>
          The per-user figure I carried for months counted nudges only. Meta's rule also bills the
          confirmation sent back after each capture, one per message rather than one per day, and
          in-window messages stop being free on 1 October 2026. Nothing caps Meta spend the way the
          daily ceiling caps Anthropic, and I have left it uncapped on purpose: capping a confirmation
          means choosing between spending money and not replying to someone who is waiting.
        </p>
      `)}
    </article>
  </div>
</section>

<!-- ================================================== still open ======= -->
<section class="section section--tight section--ruled">
  <div class="wrap">
    <div class="sec-head rise">
      <div>
        <span class="label">Still open</span>
        <h2 style="margin-top:14px">What I haven't answered.</h2>
      </div>
    </div>
    <div class="kv rise">
      <div class="kv-row">
        <span class="label">Capture beyond WhatsApp</span>
        <span class="v">The largest ADHD communities are US-dominant, and the US is the weakest
        WhatsApp market. Identity lives in a single phone column today, so a second door means a
        <code>user_identities</code> table and a transport resolved per message rather than imported.
        Not urgent before the first fifty users, blocking after.</span>
      </div>
      <div class="kv-row">
        <span class="label">The daily cap</span>
        <span class="v">A hundred a day was an abuse ceiling I picked before anyone used the product.
        For a burst capturer it may be ordinary. Reading the usage table beats raising the number on
        instinct.</span>
      </div>
      <div class="kv-row">
        <span class="label">A ceiling on WhatsApp spend</span>
        <span class="v">Observable since the pricing telemetry landed, and left unenforced. The cheap
        fix is one confirmation per burst instead of one per message, which is several times cheaper
        and probably better for a burst capturer anyway. I want the copy settled before the
        mechanism.</span>
      </div>
    </div>
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
          <span style="color:var(--accent-ink);flex:none;width:18px">${icon.arrow}</span>
        </div>
        <p>Vedic astrology where the maths is checkable and the ethics rules are asserted in the test suite.</p>
      </div>
    </a>
  </div>
</section>
`,
};
