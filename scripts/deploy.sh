#!/bin/sh
# Builds the site and publishes dist/ to the master branch, which GitHub Pages serves.
# The push is a normal fast-forward, so it fails safely if master has moved.
set -e

npm run build

git fetch origin master
git worktree add _deploy origin/master -B master
trap 'git worktree remove --force _deploy' EXIT

rsync -a --delete --exclude='.git' dist/ _deploy/
git -C _deploy add -A
if git -C _deploy diff --cached --quiet; then
  echo "Nothing to deploy."
  exit 0
fi
git -C _deploy commit -m "Site updated at $(date -u +%Y-%m-%d)"
git -C _deploy push origin master
