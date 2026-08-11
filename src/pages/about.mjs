export default {
  dir: 'about',
  nav: 'about',
  title: `About — Adhokshaj Wategaonkar`,
  ogTitle: `About — Adhokshaj Wategaonkar`,
  description: `Product Manager in Bengaluru. Engineering background, three years across identity, space tech and enterprise AI, and two products shipped solo. How I work and what I use.`,
  body: `
<section class="hero" style="padding-bottom:0">
  <div class="wrap">
    <span class="label rise">About</span>
    <h1 class="intro-name rise" style="--i:1; margin-top:20px; font-size:clamp(2.2rem,5.6vw,3.8rem)">
      I like problems<br />where nobody has<br />written the spec yet.
    </h1>
  </div>
</section>

<section class="section">
  <div class="wrap" style="display:grid; gap:56px; grid-template-columns:1fr">
    <div class="prose rise">
      <p>
        I'm a Product Manager in Bengaluru, three-plus years in, currently focused on
        enterprise AI platforms. I started as an engineer — a CS degree specialised in machine
        learning, then a year building and deploying models on Azure for power-plant operations
        at L&amp;T. That half hasn't gone anywhere. It's the reason I can sit in an architecture
        review and have an opinion about tenant isolation rather than a question about it.
      </p>
      <p>
        What I've gravitated to since is a specific kind of problem: systems where the
        requirement isn't discoverable by asking users, because nobody — including the team
        building it — knows yet what the thing should do when it goes wrong. What should a
        multi-provider LLM gateway do when the primary model returns a malformed tool call?
        How much of an agent's reasoning should a user be allowed to see, and when does more
        transparency start reading as noise? What's a fair way to attribute inference spend to a
        tenant when the same workflow costs different amounts on different days?
      </p>
      <p>
        None of those have a reference implementation. You write the requirement by deciding what
        failure is acceptable, and then you defend that decision to engineering, to a client, and
        to yourself six weeks later when it turns out to have been slightly wrong.
      </p>

      <blockquote>
        The polish is not decoration on top of the product. Very often it <em>is</em> the product.
      </blockquote>

      <h2>Why I build things myself</h2>
      <p>
        Animus and Shastra are mine end to end — schema, prompts, spend caps, design language,
        landing page, deploy pipeline. Not because a PM should be an engineer, but because owning
        the whole thing forces you to make the trade-offs you'd otherwise be handing to someone else
        with a shrug.
      </p>
      <p>
        Concretely: I've had to decide whether a failed LLM parse should drop a user's capture or
        save it degraded, and live with the consequence. I've had to price a feature against a real
        token bill and discover the number I'd been quoting was 71% too low. I've had to design a
        streak mechanic, realise it would punish exactly the users the product exists for, and
        <strong>delete it after building it</strong>. Those are product decisions. Having made them
        with my own hands makes me faster and more specific when I'm making them with a team.
      </p>

      <h2>How I work</h2>
      <ul>
        <li>
          <strong>Write the decision down, with the reasoning.</strong> "We use one service" is
          nearly useless. "One service, because two domains make the session cookie third-party and
          Safari blocks those in an installed PWA, which breaks sign-in for exactly the users who
          liked it enough to install it" tells the next person whether it's safe to change.
        </li>
        <li>
          <strong>Enforce the important rules in code, not in a document.</strong> If a constraint
          only lives in a doc, it degrades. In Shastra the ethics rules are asserted in the test
          suite, so a prompt that ships without them fails the build. In Animus the schema simply
          doesn't collect the data you'd need to shame a user with.
        </li>
        <li>
          <strong>Design the failure mode before the happy path.</strong> Most of what's interesting
          in an AI product is what happens when the model is wrong, slow, or expensive.
        </li>
        <li>
          <strong>Use AI tooling seriously.</strong> Embedding Claude, Cursor and ChatGPT into PRD
          drafting, UX iteration and engineering handoff cut concept-to-prototype from multiple weeks
          to under one, per feature. This site is a product of that workflow too.
        </li>
      </ul>
    </div>
  </div>
</section>

<!-- ======================================================= skills ====== -->
<section class="section section--tight">
  <div class="wrap">
    <div class="sec-head rise">
      <div>
        <span class="label">Toolkit</span>
        <h2 style="margin-top:14px">What I actually use.</h2>
      </div>
    </div>

    <div class="grid grid--3">
      <div class="card card-pad rise" style="--i:0">
        <span class="label">Product</span>
        <div class="tags" style="margin-top:14px">
          <span>Requirements &amp; PRDs</span><span>Discovery</span><span>User stories</span>
          <span>Prototyping</span><span>Roadmapping</span><span>Sprint delivery</span>
          <span>Stakeholder management</span><span>Pricing &amp; packaging</span>
        </div>
      </div>
      <div class="card card-pad rise" style="--i:1">
        <span class="label">Strategy &amp; GTM</span>
        <div class="tags" style="margin-top:14px">
          <span>Positioning</span><span>Competitive analysis</span><span>Buyer interviews</span>
          <span>Segmentation</span><span>Launch sequencing</span><span>Demo narrative</span>
        </div>
      </div>
      <div class="card card-pad rise" style="--i:2">
        <span class="label">Technical</span>
        <div class="tags" style="margin-top:14px">
          <span>Python</span><span>SQL</span><span>C++</span><span>ML / data science</span>
          <span>LLM orchestration</span><span>Prompt architecture</span><span>Node</span><span>React</span>
        </div>
      </div>
      <div class="card card-pad rise" style="--i:3">
        <span class="label">AI tooling</span>
        <div class="tags" style="margin-top:14px">
          <span>Claude / Cowork</span><span>Cursor</span><span>ChatGPT</span><span>Anthropic API</span>
        </div>
      </div>
      <div class="card card-pad rise" style="--i:4">
        <span class="label">Design</span>
        <div class="tags" style="margin-top:14px">
          <span>Figma</span><span>Framer</span><span>Canva</span><span>Design systems</span>
        </div>
      </div>
      <div class="card card-pad rise" style="--i:5">
        <span class="label">Delivery &amp; analytics</span>
        <div class="tags" style="margin-top:14px">
          <span>Jira</span><span>ClickUp</span><span>Metabase</span><span>Mixpanel</span><span>Sheets / Excel</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ========================================================= now ======= -->
<section class="section section--tight">
  <div class="wrap">
    <div class="sec-head rise">
      <div>
        <span class="label">Now</span>
        <h2 style="margin-top:14px">Currently.</h2>
      </div>
    </div>
    <div class="kv rise">
      <div class="kv-row">
        <span class="label">Looking for</span>
        <span class="v">A Product Manager role on an <strong>AI platform or infrastructure</strong> team. Bengaluru or remote.</span>
      </div>
      <div class="kv-row">
        <span class="label">Building</span>
        <span class="v"><strong>Animus</strong> — the nudge engine and channel-agnostic capture. <strong>Shastra</strong> — the API deploy and the WhatsApp daily ritual.</span>
      </div>
      <div class="kv-row">
        <span class="label">Thinking about</span>
        <span class="v">How you price a product whose unit cost is dominated by a fixed system prompt, and what usage-based pricing does to trust.</span>
      </div>
      <div class="kv-row">
        <span class="label">Based in</span>
        <span class="v">Bengaluru, India. Previously worked with teams in London and Hyderabad.</span>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="big-cta rise">
      <h2 style="margin-bottom:16px; font-size:clamp(1.8rem,4.4vw,2.9rem)">Want the short version?</h2>
      <p class="lead" style="margin-inline:auto">One page, no scrolling, every number attributable.</p>
      <div style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap; margin-top:30px">
        <a class="btn btn--primary" href="../Adhokshaj-Wategaonkar-Resume.pdf" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12m0 0 4-4m-4 4-4-4"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>
          Résumé (PDF)
        </a>
        <a class="btn btn--ghost" href="../work/">See the work</a>
      </div>
    </div>
  </div>
</section>
`,
};
