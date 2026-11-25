#!/usr/bin/env bash
# Commit and push the portfolio. GitHub Pages redeploys automatically.
#   bash deploy.sh "what changed"
set -euo pipefail

cd "$(dirname "$0")"
MSG="${1:-update portfolio}"

if [ ! -d .git ]; then
  echo "No git repo here yet. First-time setup:"
  echo
  echo "  git init"
  echo "  git add -A && git commit -m 'portfolio site'"
  echo "  git branch -M main"
  echo "  gh repo create portfolio --public --source=. --remote=origin"
  echo "  git push -u origin main"
  echo
  echo "Then turn Pages on: Settings -> Pages -> main -> / (root)"
  exit 1
fi

# Sanity check: Pages will silently mangle the site without this file.
[ -f .nojekyll ] || { echo "!! .nojekyll is missing — recreate it before deploying."; exit 1; }

# The site is plain static files: no build step. Check the basics before pushing.
[ -f index.html ] || { echo "!! index.html is missing."; exit 1; }
[ -f Adhokshaj-Wategaonkar-Resume.pdf ] || { echo "!! the résumé PDF is missing; the site links to it."; exit 1; }
for d in next v2 desk resume; do
  if git ls-files --error-unmatch "$d" >/dev/null 2>&1; then echo "!! $d/ is tracked; it would go public. Remove it from git first."; exit 1; fi
done

if [ -z "$(git status --porcelain)" ]; then
  echo "Nothing to commit."
  exit 0
fi

git add -A
git commit -m "$MSG"

BRANCH="$(git rev-parse --abbrev-ref HEAD)"
if ! git push origin "$BRANCH" 2>/tmp/portfolio-push.err; then
  if grep -qiE "invalid username|authentication failed|could not read Username" /tmp/portfolio-push.err; then
    echo
    echo "GitHub stopped accepting account passwords over HTTPS. Your password is fine,"
    echo "it just isn't accepted. Fix once per machine:"
    echo
    echo "  brew install gh && gh auth login --web --git-protocol https"
    echo
  else
    cat /tmp/portfolio-push.err
  fi
  exit 1
fi

echo
echo "Pushed. Pages usually redeploys within a minute."
echo "  https://adhokshajwategaonkar.github.io/portfolio/"
