// The demo's sorter, from the marketing site (site/index.html). It is local and
// honest: the real app sorts with a model (Gemini 3.5 Flash-Lite). The examples are
// hand-authored; free text runs the heuristic below, which under-splits rather than
// inventing a boundary it can't see.

import { hostOf, an } from './util.js';

export const EXAMPLES = [
  {
    b: 'a run-on',
    x: 'that thing about sleep debt i keep meaning to read https://example.com/sleep-debt also call the bank before friday, and maybe we should do a monthly reset thing',
    i: [
      { t: 'the sleep debt piece', y: 'link', m: 'example.com · 9 min read', url: 'https://example.com/sleep-debt' },
      { t: 'call the bank', y: 'reminder', m: 'friday', urg: 3, due: 2 },
      { t: 'a monthly reset thing', y: 'idea', m: 'no date' },
    ],
  },
  {
    b: 'a video + a thought',
    x: 'watch this when i actually have ten minutes https://youtu.be/WhWc3b3KhnY and book the dentist, properly this time',
    i: [
      { t: 'watch this when i have ten minutes', y: 'link', m: 'youtube · 8 min', url: 'https://youtu.be/WhWc3b3KhnY' },
      { t: 'book the dentist', y: 'reminder', m: 'soon', urg: 3, due: 5 },
    ],
  },
  {
    b: 'a brain dump',
    x: 'renew the passport\ndentist, properly this time, before it gets worse\nlearn enough spanish to order food by june\npay the electricity bill on the 20th',
    i: [
      { t: 'renew the passport', y: 'task', m: 'no date' },
      { t: 'book the dentist', y: 'reminder', m: 'soon', urg: 3 },
      { t: 'enough spanish to order food', y: 'goal', m: 'by june' },
      { t: 'pay the electricity bill', y: 'reminder', m: 'the 20th', due: 9 },
    ],
  },
  {
    b: 'one messy thought',
    x: 'ugh the landlord thing about the boiler i keep meaning to actually call him not just think about it this week',
    i: [{ t: 'call the landlord about the boiler', y: 'task', m: 'this week', urg: 3 }],
  },
];

const DATES = /\b(today|tonight|tomorrow|mon|tue|wed|thu|fri|sat|sun|monday|tuesday|wednesday|thursday|friday|saturday|sunday|this (?:week|weekend|month)|next (?:week|month|monday|friday)|by (?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*|before (?:the )?\d{1,2}|on the \d{1,2}(?:st|nd|rd|th)?|the \d{1,2}(?:st|nd|rd|th)|in \d+ days?|eod|asap)\b/i;
const VERBS = /^(?:go |please )?(book|call|email|buy|send|fix|pay|renew|cancel|submit|file|check|collect|pick up|return|order|print|post|reply|text|ring|chase|confirm|register|upload|read|watch|clean|move|ask|sort|find)\b/i;
const GOALS = /\b(learn|master|launch|ship|finish|get fit|save up|write a|build a|read all|get to|run a|enough \w+ to)\b/i;
const IDEAS = /\b(maybe|what if|idea|we should|would be (?:nice|good)|consider|could we|thinking about|wonder if)\b/i;
const URLRE = /https?:\/\/[^\s]+/i;

const tidy = (s) => s.replace(/^\s*(?:and|also|oh|ugh|plus|then|btw)\b[\s,]*/i, '').replace(/\s+/g, ' ').trim();
function mkTitle(s) {
  let t = tidy(s).replace(URLRE, '').replace(/\s+/g, ' ').trim().replace(/^[-–—,:;]+\s*/, '');
  if (t.length > 46) t = t.slice(0, 44).replace(/\s+\S*$/, '') + '…';
  return t || 'untitled';
}
function kindOf(s) {
  if (URLRE.test(s)) return 'link';
  if (IDEAS.test(s)) return 'idea';
  if (GOALS.test(s)) return 'goal';
  if (DATES.test(s)) return 'reminder';
  if (VERBS.test(tidy(s))) return 'task';
  return 'idea';
}

export function parse(text) {
  const out = [];
  text.split(/\n+/).forEach((line) => {
    if (!tidy(line)) return;
    line.split(/\s+(?:—|–)\s+also\s+|\s*;\s*|,?\s+and then\s+|\s+also,?\s+|,\s+and\s+(?=[a-z]+\s)/i).forEach((p) => {
      if (tidy(p).split(/\s+/).length >= 2) out.push(p);
    });
  });
  if (!out.length && tidy(text)) out.push(text);
  return out.slice(0, 6).map((p) => {
    const u = p.match(URLRE);
    return {
      t: mkTitle(p), y: kindOf(p), url: u ? u[0] : null,
      m: u ? hostOf(u[0]) : (p.match(DATES) || ['no date'])[0].toLowerCase(),
    };
  });
}

/** One reply per burst, naming what it found. */
export function replyFor(list) {
  if (!list.length) return 'saved. i couldn’t sort that one, so it’s in the pile as it came.';
  if (list.length === 1) {
    const o = list[0];
    return 'saved ' + an(o.y) + (o.m && o.m !== 'no date' ? ', ' + o.m : '') + '. it’s in the pile.';
  }
  const counts = {};
  list.forEach((o) => { counts[o.y] = (counts[o.y] || 0) + 1; });
  const parts = Object.keys(counts).map((k) => (counts[k] > 1 ? counts[k] + ' ' + k + 's' : an(k)));
  const tail = parts.length > 1 ? parts.slice(0, -1).join(', ') + ' and ' + parts[parts.length - 1] : parts[0];
  return 'sorted into ' + list.length + ': ' + tail + '. nothing for you to file.';
}

export const TYPES = ['task', 'reminder', 'link', 'idea', 'goal'];
