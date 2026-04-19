#!/usr/bin/env bash
# Build the web export and push it to the gh-pages branch.
# Uses a git worktree to avoid disturbing the current working branch.

set -euo pipefail

WORKTREE=".ghpages"
BRANCH="gh-pages"

echo "→ Building web export…"
rm -rf dist
npx expo export --platform web

touch dist/.nojekyll

echo "→ Preparing $BRANCH worktree…"
git worktree remove --force "$WORKTREE" 2>/dev/null || true

if git show-ref --verify --quiet "refs/heads/$BRANCH"; then
  git worktree add "$WORKTREE" "$BRANCH"
else
  git worktree add --orphan -b "$BRANCH" "$WORKTREE"
fi

echo "→ Replacing contents…"
find "$WORKTREE" -mindepth 1 -maxdepth 1 ! -name ".git" -exec rm -rf {} +
cp -r dist/. "$WORKTREE"/

echo "→ Committing…"
git -C "$WORKTREE" add -A
if git -C "$WORKTREE" diff --cached --quiet; then
  echo "No changes to publish."
else
  MSG="Deploy: $(git rev-parse --short HEAD) $(date -u +%Y-%m-%dT%H:%M:%SZ)"
  git -C "$WORKTREE" commit -m "$MSG"
  git -C "$WORKTREE" push -u origin "$BRANCH"
fi

echo "→ Cleaning up…"
git worktree remove --force "$WORKTREE"

echo "✓ Deployed to gh-pages. Live in ~1 min: https://caskeycreates.github.io/Cas-Playground/"
