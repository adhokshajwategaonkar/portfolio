import { caseStudy } from '../case-template.mjs';

export default caseStudy({
  "dir": "projects/youtube-music",
  "title": "Driving engagement in YouTube Music | Adhokshaj Wategaonkar",
  "ogTitle": "Driving engagement in YouTube Music — a growth case study",
  "description": "How do you increase Weekly Active Users for a music streaming platform competing with Spotify? User segmentation, engagement loops, social network effects, RICE prioritisation and feature design across activation, sharing and retention.",
  "kicker": "Growth strategy + PRD · YouTube Music",
  "heading": "Driving engagement in YouTube Music",
  "lead": "WAU is the metric. The real question underneath it is which habit is worth building — because\n    a streaming product does not lose users who dislike it, it loses users who never formed a reason\n    to open it on a Tuesday.",
  "badges": [
    {
      "text": "Self-directed case study"
    },
    {
      "text": "Retention"
    },
    {
      "text": "Ships with a PRD"
    }
  ],
  "links": [
    {
      "text": "Read the full PRD",
      "href": "https://docs.google.com/document/d/1yzYFfawX-Nni-IV1lwWabs-fjil03Ef7kHzJcyGlPig/edit?usp=sharing",
      "external": true
    }
  ],
  "spec": [
    [
      "Problem",
      "<strong>Two music apps with the same catalogue give a listener no reason to open one rather than the other.</strong> Recommendations alone do not build a weekly habit, so the reason to come back has to come from somewhere other than the library."
    ],
    [
      "Format",
      "Case study plus a written PRD — problem statement, goals and non-goals, user stories, success metrics and acceptance criteria."
    ],
    [
      "Surface",
      "YouTube Music — streaming, competing with Spotify at catalogue parity, where the differentiator has to be behavioural rather than editorial."
    ],
    [
      "The question",
      "<strong>Which engagement loop actually produces a weekly open — and can social network effects do work that a recommendation algorithm can’t?</strong>"
    ],
    [
      "Artifact",
      "The PRD is the deliverable. It is linked above, unedited."
    ]
  ],
  "sections": [
    "<h2 style=\"margin-top:0\">Weekly active is a habit metric wearing a usage metric’s clothes</h2>\n      <p>\n        When catalogue is at parity, nobody churns because the music is missing. They churn because\n        the product never earned a recurring slot in the week. That reframes the work: the lever is\n        not features, it is a repeatable reason to return that does not depend on the user\n        remembering to.\n      </p>",
    "<h2>How I worked it</h2>\n      <ul>\n        <li><strong>Separated the WAU decline into its parts</strong> — new users who never formed a habit, and returning users whose trigger disappeared. They need different fixes.</li>\n        <li><strong>Chose one loop</strong> rather than shipping several weak ones, since a habit that competes with itself is not a habit.</li>\n        <li><strong>Wrote it as a PRD</strong>, including explicit non-goals — the fastest way to find out whether an idea is actually scoped is to try to write acceptance criteria for it.</li>\n      </ul>"
  ],
  "next": {
    "href": "../shopsy/",
    "badge": "Case study + PRD · Shopsy",
    "title": "Increasing user growth",
    "body": "Value commerce in tier-2 and tier-3 India, where the constraint is trust and data cost."
  }
});
