import { caseStudy } from '../case-template.mjs';

export default caseStudy({
  "dir": "projects/youtube-music",
  "title": "YouTube Music — increasing weekly active users | Adhokshaj Wategaonkar",
  "ogTitle": "YouTube Music — increasing weekly active users",
  "description": "A product case study and full PRD on increasing weekly active users at YouTube Music — where WAU leaks in a streaming product and which habit loop is worth building for.",
  "kicker": "Product case study + PRD · YouTube Music",
  "heading": "Increasing weekly active users",
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
      "Format",
      "Case study plus a written PRD — problem statement, goals and non-goals, user stories, success metrics and acceptance criteria."
    ],
    [
      "Surface",
      "YouTube Music — streaming, competing with Spotify on catalogue parity."
    ],
    [
      "The question",
      "<strong>Which habit loop actually produces a weekly open, and what would it cost to build?</strong>"
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
