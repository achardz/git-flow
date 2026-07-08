# git-flow-sample

A tiny calculator library whose only real job is to demonstrate the **Git Flow**
branching model — `feature`, `release`, `hotfix`, `develop`, `main` — and how
Pull Requests move code between them.

## Quick start

```bash
npm test        # runs test/calculator.test.js (no dependencies needed)
```

## The point of this repo

👉 Read **[GITFLOW.md](./GITFLOW.md)** — it explains the branch model and PR
workflow, and the git history is a real, replayable example of it.

```bash
git log --graph --oneline --all --decorate
```

You'll see:
- **PR #1** `feature/multiply` → `develop`
- **PR #2** `release/1.1.0` → `main` (tagged `v1.1.0`) + back-merge to `develop`
- **PR #3** `hotfix/1.1.1` → `main` (tagged `v1.1.1`) + forward-merge to `develop`
- `feature/divide` — an open, unmerged feature (an in-flight PR)

## Branches

| Branch     | Role                                   |
|------------|----------------------------------------|
| `main`     | production; every commit is a release  |
| `develop`  | integration branch for the next release|
| `feature/*`| new work, branched from `develop`      |
| `release/*`| stabilize + version bump before ship   |
| `hotfix/*` | urgent production fix, branched from `main` |
