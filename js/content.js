// Everything the site says. Sources: resume/master.html, the Animus repo (CLAUDE.md,
// docs/POSITIONING.md, docs/PLAN.md, docs/PRICING.md), the Shastra repo (research.md,
// 01-PROJECT.md, 04-SESSION-GROWTH.md) and the case decks. Nothing here is invented.
// Copy rules: no em dashes, plain words, the concrete thing first, and nothing that
// is only there to sound good.

export const EMAIL = 'adhokshaj.pande@gmail.com';

/* ------------------------------------------------------------------ career
   Newest first. `hue` tints the role's row, its drawings and the page behind it;
   `tex` is the faint texture the page takes on with it. Each point names the
   drawing that plays while it is open; a role-level `anim` is the fallback. */
export const ROLES = [
  {
    key: 'nexie', tex: 'dots', co: 'Nexie', role: 'Product manager', where: 'Bengaluru',
    dates: 'Sep to Oct 2026', yrs: '2026', span: '2 months', hue: '#FF6FAE', anim: 'redesign',
    line: 'AI that writes retention emails for Shopify brands.',
    points: [
      { t: 'Product redesign', anim: 'redesign', p: 'Redesigned the core screens: first the route inventory, then the information architecture, then ten working screens.' },
      { t: 'Journeys engine', anim: 'journey', p: 'Built the engine behind the journey builder: a seven-phase prompt chain that turns a merchant’s goal into a multi-step email journey, with the merchant approving each phase. Ran it end to end on live brand data across four entry scenarios.' },
      { t: 'Evals', anim: 'evals', p: 'Wrote the quality checks for the campaign email agent: the grading rubric, the scoring model and the automatic checks that catch broken output before review. Then I cut my own design down before it was built: six weeks of engineering became two, and a test run went from $52 to $7.' },
      { t: 'Sprints and board', anim: 'board', p: 'Set up a sprint structure and a kanban board, and ran delivery on twenty items until each one was designed, in review or with engineering.' },
    ],
  },
  {
    key: 'beacon', tex: 'hatch', co: 'Beacon.li', role: 'Associate product manager', where: 'Bengaluru and Hyderabad',
    dates: 'Oct 2025 to Jun 2026', yrs: '2025–26', span: '9 months', hue: '#FFB454', anim: 'gateway',
    line: 'A platform large companies use to run AI agents.',
    points: [
      { t: 'LLM gateway', anim: 'gateway', p: 'Owned the requirements and vendor strategy for one gateway in front of OpenAI, Anthropic, Gemini and Grok. I defined how errors are classified, when to retry and when to switch provider. More than 85% of requests completed across enterprise workloads.' },
      { t: 'Agent chat', anim: 'chat', p: 'Redesigned the agent chat end to end and prototyped the streaming interface myself. The answer comes first. The reasoning opens from the answer, and the tool calls open from the reasoning.' },
      { t: 'Cost per client', anim: 'cost', p: 'Built a way to trace model spend to each client, agent and workflow. Usage-based pricing and client budgets both depend on it.' },
      { t: 'Architecture reviews', anim: 'arch', p: 'Represented product in architecture reviews for agent orchestration, and made the trade-offs between configurability and reliability that shaped routing, tenant isolation and rollout order.' },
      { t: 'Client feedback', anim: 'feedback', p: 'Ran structured feedback sessions with enterprise clients and turned deployment problems into specs, so what clients expected matched what we released.' },
      { t: '15 sprints, 95% on time', anim: 'sprints', p: 'Set up sprints, cross-team planning and stakeholder reviews where there were none, and reached a release every two months. 95% of major milestones landed on time across 15 sprints.' },
      { t: 'Prototype in a week', anim: 'proto', p: 'Brought Claude, Lovable and ChatGPT into spec writing, design iteration and engineering handoff. Idea to prototype went from several weeks to under one, a cut of more than 60%.' },
    ],
  },
  {
    key: 'galaxeye', tex: 'rings', co: 'GalaxEye Space', short: 'GalaxEye', role: 'Associate product manager', where: 'Bengaluru',
    dates: 'Mar 2024 to Sep 2025', yrs: '2024–25', span: '19 months', hue: '#7EE0B8', anim: 'sar',
    line: 'Radar imaging that sees through cloud, canopy and night.',
    points: [
      { t: 'Drone SAR to trials', anim: 'sar', p: 'Co-owned drone-mounted radar analytics from concept to government trials, and set the requirements for the geospatial insights. It reached trials 20% ahead of plan at defence-grade reliability.' },
      { t: '20+ buyer interviews', anim: 'interviews', p: 'Interviewed more than 20 buyers in government procurement, agri-tech and defence. Both sides asked for change detection. Defence wanted the evidence, commercial buyers wanted the conclusion.' },
      { t: 'Two markets', anim: 'markets', p: 'Owned market strategy across the defence and commercial lines. The interviews and competitive analysis repositioned each product for its own buyer and set what was built and launched first.' },
      { t: 'Product positioning', anim: 'positioning', p: 'Redesigned the demo for defence and commercial buyers. It opens with the decision the buyer has to make and brings in the sensor after. Qualified partnership leads rose 25%.' },
      { t: 'Aero India, HIMTECH', anim: 'events', p: 'Represented product at Aero India 2025 and the Indian Army’s HIMTECH Symposium, and brought what officers asked for back into the roadmap.' },
    ],
  },
  {
    key: 'earthid', tex: 'grid', co: 'EarthID', role: 'Product manager', where: 'London, remote',
    dates: 'Jul 2023 to Feb 2024', yrs: '2023–24', span: '8 months', hue: '#8C9BFF', anim: 'ux',
    line: 'Digital identity. My first product role.',
    points: [
      { t: 'Product and UX', anim: 'ux', p: 'Owned the product lifecycle across product and UX: user research, wireframes and Figma prototypes, and sprint delivery.' },
      { t: 'Private KYC', anim: 'kyc', p: 'Wrote the requirements for verifiable credentials and zero-knowledge proofs, so a KYC check confirms what it needs while the person shares less.' },
    ],
  },
  {
    key: 'lnt', tex: 'rules', co: 'L&T Technology Services', short: 'L&T Technology', role: 'Software engineer', where: 'Bengaluru',
    dates: 'Dec 2021 to Dec 2022', yrs: '2021–22', span: '13 months', hue: '#5BB0FF', anim: 'plant',
    line: 'My first job. Machine learning for power plants, on Azure.',
    points: [
      { t: 'ML for power plants', anim: 'plant', p: 'Built and deployed machine learning models on Azure for L&T’s power plants. They told the teams running each plant when equipment needed maintenance and how to manage load.' },
    ],
  },
];

/* ------------------------------------------------------------------ products */
export const WORLDS = {
  animus: {
    key: 'animus', name: 'Animus', kicker: 'Solo build · Jul to Nov 2026 · Live',
    dek: 'A capture tool for adults with ADHD.',
    lede: 'Send whatever is on your mind as one message. A model splits it into tasks, reminders, links and ideas and puts them on one pile. No folders, no streaks, nothing to maintain.',
    links: [['Open Animus', 'https://animus-jwui.onrender.com'], ['Product site', 'https://adhokshajwategaonkar.github.io/animus-site/']],
    facts: [['Capture from', 'WhatsApp, app, share sheet, Shortcut'], ['Model', 'Gemini 3.5 Flash-Lite'], ['Cost', 'About ₹0.07 a capture']],
    next: 'shastra',
    sum: 'Why I built it, who it is for, what I cut, and how I will know it is working.',
    steps: [
      {
        k: 'Problem', h: 'Most thoughts are lost between having them and writing them down',
        p: ['You remember the dentist while cooking. By the time you have unlocked the phone, found the app and picked a list, the thought is gone.',
          'For people with ADHD this happens all day, and every dropped thing feels like more proof they can’t keep up.'],
        fig: 'gap',
      },
      {
        k: 'User', h: 'Adults with ADHD who have already quit four or five to-do apps',
        p: ['I had a working tool and four possible audiences. Consultants paid best but needed to share with clients. A household needs two people from day one. Writers never switch apps over an idea they didn’t know they lost. Adults with ADHD had the problem every hour.',
          'They never left an app for lack of features. Every app they quit failed in one of three ways: opening it was the hard part, it needed looking after, or coming back after a break felt like failing.'],
        fig: 'audiences',
      },
      {
        k: 'Solution', h: 'Each way the old apps failed became a promise',
        p: ['<b>Nothing to open.</b> You capture by sending a message from wherever you already are.',
          '<b>Nothing to file.</b> The AI model sorts it for you, and the newest thing is always on top.',
          '<b>Nothing counts what you missed.</b> No streaks and no overdue totals, so a quiet month leaves nothing broken.'],
        fig: 'promises',
      },
      {
        k: 'Priorities', h: 'What was built first, and what was cut',
        list: [
          ['1', 'More ways in', 'WhatsApp is weak in the US, where most ADHD communities are. So the app composer, the Android share sheet and an iPhone Shortcut came next.'],
          ['2', 'Never lose a capture', 'If sorting fails, is busy or is over budget, the message is saved as sent. A future limit will mean less sorting, never a refused save.'],
          ['3', 'Edit in place', 'Title, type, due date and a note, all in one sheet that saves itself.'],
          ['4', 'Reminders on time', 'Built and tested. The scheduler that sends them hasn’t shipped yet.'],
        ],
        cut: ['A streak counter, because it punishes absence', 'Any counter of what is left on a plan', 'Ranking by “closest to going stale”'],
        fig: null,
      },
      {
        k: 'Metrics', h: 'Second-day captures matter more than signups',
        stats: [['2nd day', 'Did someone capture on a second, different day? One-day users mean the pitch worked and the product didn’t.'],
          ['100 / day', 'Does a real user hit the daily cap? A 40-capture evening is normal here, so a limit they trip is a wrong limit.'],
          ['₹0.07', 'What one capture costs to sort. This will set the price. Pricing isn’t built yet.']],
        p: ['<b>What would make me drop this positioning:</b> WhatsApp bouncing people before they sign up, or people capturing happily and never coming back to the pile.',
          'Animus is live and open to anyone. Nothing is charged yet.'],
        fig: null, cta: true,
      },
    ],
    gallery: [
      { id: 'sort', ex: 'animus/sort', title: 'Capture', tag: 'Website', about: 'Type several things as one message. Animus splits it and files each piece as a task, reminder, link or idea, with the newest on top.', try: 'Send one of the examples, or type your own.' },
      { id: 'deck', ex: 'animus/deck', title: 'One at a time', tag: 'App', about: 'You decide on a single card, so there is no list to manage. Right is done, left is drop, down is later, up is skip. Nothing counts what’s left.', try: 'Drag the top card, or use the arrow keys.' },
      { id: 'sky', ex: 'animus/sky', title: 'The sky', tag: 'App', about: 'Everything you captured, as stars coloured by what happened to them. Topics gather on their own and nothing fades, so a quiet month leaves nothing broken.', try: 'Drag a star. The rest answer.' },
      { id: 'back', ex: 'animus/back', title: 'Reminders', tag: 'App', about: 'One item comes back near its time. You mark it done or move it to later from the notification.', try: 'Press later and pick a time.' },
      { id: 'doors', own: 'doors', title: 'Four ways in', tag: 'Capture', about: 'WhatsApp, the app, the Android share sheet and an iPhone Shortcut all reach the same sorter and the same pile.', try: 'Pick a way in and send something.' },
      { id: 'capturing', own: 'capturing', title: 'Instant add', tag: 'App', about: 'The box closes the moment you press add. Your words wait at the top of the pile until the sorted items replace them. If saving fails, the text stays, with a retry.', try: 'Press + and add.' },
      { id: 'hold', own: 'hold', title: 'Hold to delete', tag: 'App', about: 'Delete is the one action that can’t be undone, so it takes a press and hold. Let go early and nothing happens.', try: 'Press and hold. Let go halfway.' },
    ],
  },
  shastra: {
    key: 'shastra', name: 'Shastra', kicker: 'Solo build · Aug to Nov 2026 · Live',
    dek: 'Vedic astrology that shows its working.',
    lede: 'Free tools for a birth chart, kundli matching and sade sati dates, computed by a real astronomy engine. No account, no per-minute calls, no remedies for sale.',
    links: [['Open Shastra', 'https://adhokshajwategaonkar.github.io/shastra-site/']],
    facts: [['Maths', 'Swiss Ephemeris, Lahiri'], ['Readings', 'Written by a model from the computed chart'], ['Price', 'Free, no account']],
    next: 'animus',
    sum: 'Why I built it, who it is for, how the engine and the model split the work, and how I check it.',
    steps: [
      {
        k: 'Problem', h: 'Online astrology charges by the minute, so the most anxious callers pay the most',
        p: ['Most apps put you on a paid call with an astrologer. The longer and more anxious the call, the more they earn.',
          'Many then sell a remedy, a gemstone or a ritual, to fix the problem the reading just raised. You can’t check any of it, so all you can judge is how sure it sounds.'],
        fig: 'meter',
      },
      {
        k: 'User', h: 'Someone with one specific question, at an anxious moment',
        p: ['Will our charts match? When does this hard phase end? They type “free kundli” or “kundli matching” into a search bar, often after a per-minute call that ended with a sales pitch. Each free tool answers exactly one of those questions.',
          'They are worried when they arrive, so the tone has to stay calm. Their birth details are personal, so the AI never sees their name, birth date or phone number.'],
        fig: 'search',
      },
      {
        k: 'Solution', h: 'The engine computes. The model only explains',
        p: ['A standard astronomy library, Swiss Ephemeris, works out where every planet was. The AI never calculates anything, so it can’t invent a planet’s position.',
          'Rules stop it from scaring people: no predictions of death, illness or accidents, no medical, legal or money advice, and nothing sold on fear. They are checked automatically, and a change that breaks one can’t ship.'],
        fig: 'engine',
      },
      {
        k: 'Priorities', h: 'I ranked six consumer AI ideas before building one',
        rank: [
          ['Vedic astrology companion', 'People already pay for it and don’t trust it. About ₹0.1 a reading, and it reuses most of Animus', 'Build'],
          ['Honest photo nutrition tracker', 'Bigger market, but distribution depends on TikTok', 'Runner-up'],
          ['Bank-SMS expense ledger', 'Indians rarely pay for finance apps', 'Park'],
          ['Interview prep credits', 'Crowded, and the honest version leaves nothing to charge for', 'Park'],
          ['Elder-care check-ins', 'Slow trust-building sales', 'Park'],
          ['AI headshots', 'Image generation costs 15 to 150 times more per action', 'Skip'],
        ],
        p: ['Inside the product, the free tools came first. With no ad budget, each tool is a page that answers one search.'],
        fig: null,
      },
      {
        k: 'Metrics', h: 'Accuracy first, and a scorecard set before launch',
        stats: [['Spica 180°', 'Every release must put the star Spica at exactly 180°, the definition of the Lahiri system, and match NASA eclipse times.'],
          ['9 of 9', 'Before launch I checked the live kundli against the engine by hand, planet by planet, and sade sati against published tables.'],
          ['Day 7, day 30', 'The scorecard I set for launch: who computes a chart, who comes back after a week and a month, and who shares a result.']],
        p: ['<b>What says it’s working:</b> people coming back on their own, and sharing a result, with no ad spend behind either.',
          'Anyone can compare a result with the app they already use, which shows the maths is real.'],
        fig: null, cta: true,
      },
    ],
    gallery: [
      { id: 'dial', own: 'dial', title: 'Sky dial', tag: 'Built for this page', about: 'The Sun and Moon, computed in your browser from the date. Every nakshatra clicks as the Moon passes it.', try: 'Drag the band, flick it, or press the day keys.' },
      { id: 'sky', ex: 'shastra/sky', title: 'The sky now', tag: 'Website', about: 'The homepage wheel: where every planet is right now, seen from Ujjain. A saved sky shows first while the free server wakes.', try: 'Point at a planet to see which planets it looks at.' },
      { id: 'kundli', ex: 'shastra/kundli', title: 'Birth chart', tag: 'Free tool', about: 'A birth date, time and place go to the engine, which draws the chart. Each planet links to its paragraph in the reading.', try: 'Compute the sample, then hover a planet.' },
      { id: 'match', ex: 'shastra/match', title: 'Kundli matching', tag: 'Free tool', about: 'Eight factors scored out of 36 from each person’s Moon. You get the score and how it was reached, never a verdict on the couple.', try: 'Compare the two samples.' },
      { id: 'sadesati', ex: 'shastra/sadesati', title: 'Sade sati dates', tag: 'Free tool', about: 'Every stretch when Saturn passes near your Moon sign, with its three phases and their dates. Dates only, no warnings.', try: 'Find the dates, then hover a phase.' },
      { id: 'maths', ex: 'shastra/maths', title: 'Accuracy checks', tag: 'Website', about: 'Four of the checks every release has to pass, run on the live engine. Two use eclipse times NASA published.', try: 'Run the checks.' },
    ],
  },
};

/* ------------------------------------------------------------------ case studies */
const DECK_BMS = [
  ['The weekend conundrum', 'Friday 6pm to Sunday 9pm is about 30% of a working professional’s week, and the part they own. No plan gets made, the hours go to scrolling, and the regret arrives on Sunday evening.'],
  ['What BookMyShow is', '95.2M daily visits and ₹302.9 Cr revenue in 2022, with a 49.5% bounce rate.'],
  ['The problem, in four causes', 'People do not know what to do, how, with whom, or whether to go. Collapsing the four into “discovery is bad” produces a feature that helps nobody.'],
  ['Anant, 24, Delhi', 'A data scientist with a wide spread of interests. The spread is the cause: his weekends fail from too many good options and no way to rank them.'],
  ['Weighting the causes', 'Awareness 40%, a passive mindset 30%, company 10%, a go or no-go 10%. The 70% is discovery failing to turn a vague wish into a plan, which BookMyShow can fix in the product it has.'],
  ['The current flow', 'Every path ends at a single ticket.'],
  ['Where the journey breaks', 'Anant books a ticket and the funnel converts. His mood drops at the paradox of choice and never recovers, which no conversion dashboard would show.'],
  ['Book, not plan', 'The only weekend-shaped surface is a banner, “Head out this Weekend”, with everything in the city behind it and no filtering. Someone who came to plan a weekend books one show and leaves.'],
  ['Day first, then time slots', 'A catalogue sorted by category asks what you like, which Anant can’t answer. A day split into morning, afternoon and evening asks what goes in Saturday evening, a much smaller question.'],
  ['One plan, one payment', 'Events go into a plan you can hold, with the weekend’s cost visible before committing and one payment instead of four checkouts.'],
  ['How you would know', 'Adoption shows the banner got noticed. Repeat use shows a weekend built this way beat the one before, which is the measure that counts.'],
];
const DECK_ZOM = [
  ['Improving food ordering', '“Improve the food ordering experience to increase revenue” can’t be acted on as written, so the first job was making it testable.'],
  ['The product today', '80 million monthly users, 1.25 million orders a day, 55% of the Indian market.'],
  ['The business model', 'Freemium, with Zomato Gold as the paid layer. Four stakeholders sit in the problem, and lifting revenue by squeezing the rider or the restaurant is a transfer, not a gain.'],
  ['Anuj, 26, Bengaluru', 'Busy, health-conscious, and ordering to buy time back.'],
  ['Decompose the metric first', 'Revenue = order frequency × order value × number of orders. Every idea has to raise one of those or it belongs to another brief.'],
  ['The journey, discovery to decision', 'The final price only appears on the last screen, so comparing two orders means building both carts.'],
  ['The journey, decision to retention', 'Ordering from the same place again earns nothing.'],
  ['RICE across four problems', 'Comparing the final price scored 91 and a spend threshold 63. Loyalty (35) and cart recovery (30) lost, and stayed on the deck with the numbers that ruled them out.'],
  ['Quick Meals', 'For frequency: a map of nearby dishes, each with its final price including taxes and its delivery time. A map, because distance predicts delivery time and this user is buying time.'],
  ['Zomato Party', 'For order value: orders from more than one restaurant, unlocked when the cart passes a threshold near the average order value. It costs no margin.'],
  ['Success metrics', 'A user measure and a product measure for each feature.'],
];
const pad = n => String(n).padStart(2, '0');
export const CASES = [
  {
    key: 'bookmyshow', title: 'BookMyShow', name: 'The weekend conundrum', year: 'Product teardown',
    dek: 'People want to go out and can’t decide what to do. BookMyShow only helps once the choosing is done.',
    world: { bg: '#170b0d', ink: '#f6ece6', mut: '#b89a95', line: '#3a1f22', accent: '#f0364c' },
    facts: [['Method', 'Metrics, persona, weighted causes, journey map'], ['The call', 'Two causes carry 70% and can be fixed in the product']],
    slides: DECK_BMS.map(([t, b], i) => ({ t, b, src: `assets/decks/bookmyshow/s${pad(i + 1)}.jpg` })),
  },
  {
    key: 'zomato', title: 'Zomato', name: 'Improving food ordering', year: 'Product teardown',
    dek: 'You only see what an order really costs on the last screen, and ordering again earns nothing.',
    world: { bg: '#f3ede6', ink: '#1d1513', mut: '#7a6a63', line: '#e2d6cc', accent: '#d8283c' },
    facts: [['Method', 'Revenue decomposition, journey map, RICE'], ['The call', 'Drop anything that moves neither frequency nor order value']],
    slides: DECK_ZOM.map(([t, b], i) => ({ t, b, src: `assets/decks/zomato/s${pad(i + 1)}.jpg` })),
  },
];
