# Git Flow — how this repo works

This repo is a runnable demonstration of the **Git Flow** branching model. The
history was built by actually running the flow, so `git log --graph --all` shows
real feature / release / hotfix branches merged as pull requests.

## Branch model

| Branch          | Lives for        | Branches from | Merges back into      | Tagged? |
|-----------------|------------------|---------------|-----------------------|---------|
| `main`          | forever          | —             | —                     | every release |
| `develop`       | forever          | `main`        | —                     | no      |
| `feature/*`     | until merged     | `develop`     | `develop`             | no      |
| `release/x.y.0` | until shipped    | `develop`     | `main` **and** `develop` | yes  |
| `hotfix/x.y.z`  | until shipped    | `main`        | `main` **and** `develop` | yes  |

- **`main`** = production. Every commit on `main` is a shippable, tagged release.
- **`develop`** = integration branch. The "next release" accumulates here.
- Only **release** and **hotfix** branches are allowed to merge into `main`.

```
main     ●─────────────────────●────────────●        (tags: v1.1.0, v1.1.1)
          \                    / \          /
release    \        release/1.1.0  \       /
            \      /                 \     /
develop  ●───●────●──────────────●────●───●───●       (integration)
          \ /              feature/divide (WIP) ↑
feature    ●  feature/multiply
```

## The PR workflow (applies to every branch type)

You never commit straight to `main` or `develop`. You open a **Pull Request**:

1. Branch off the correct base (see table).
2. Commit small, tested changes.
3. Push and open a PR **into the correct target branch**.
4. CI runs (`.github/workflows/ci.yml`) + at least one review approval.
5. Merge. This repo uses **`--no-ff`** merges so every PR stays a visible
   "merge bubble" in history (GitHub's "Create a merge commit" option).

In this sample, each `Merge PR #N` commit is exactly that step done locally.

---

## 1. Feature — add functionality for the next release

```bash
git checkout develop
git checkout -b feature/multiply       # base = develop

# ...code + tests...
npm test
git commit -am "feat: add multiply()"
git push -u origin feature/multiply
# open PR:  feature/multiply  ->  develop
```

After review + green CI, merge into `develop`:

```bash
git checkout develop
git merge --no-ff feature/multiply
git branch -d feature/multiply
```

➡ See PR #1 in this repo's history.

## 2. Release — freeze develop, stabilize, ship

A release branch is a staging area: **no new features**, only version bump,
changelog, and last-minute bug fixes.

```bash
git checkout develop
git checkout -b release/1.1.0          # base = develop

# bump version in package.json, update CHANGELOG.md, final fixes
git commit -am "chore(release): bump version to 1.1.0 + changelog"

# open PR: release/1.1.0 -> main
git checkout main
git merge --no-ff release/1.1.0        # ship to production
git tag -a v1.1.0 -m "Release 1.1.0"   # tag the release

git checkout develop                    # don't lose the bump/fixes
git merge --no-ff release/1.1.0         # back-merge into develop
git branch -d release/1.1.0
```

➡ Release branches merge into **two** places. Forgetting the back-merge into
`develop` is the classic Git Flow mistake. See PR #2.

## 3. Hotfix — urgent fix to production

Something is broken in `main` and can't wait for the next release.

```bash
git checkout main
git checkout -b hotfix/1.1.1           # base = MAIN, not develop

git commit -am "fix: add() coerces string inputs; bump 1.1.1"

# open PR: hotfix/1.1.1 -> main
git checkout main
git merge --no-ff hotfix/1.1.1
git tag -a v1.1.1 -m "Hotfix 1.1.1"

git checkout develop                    # propagate the fix forward
git merge --no-ff hotfix/1.1.1
git branch -d hotfix/1.1.1
```

➡ Like releases, hotfixes merge into **both** `main` and `develop` so the fix
isn't lost in the next release. See PR #3.

---

## See it yourself

```bash
git log --graph --oneline --all --decorate
git tag                       # v1.1.0, v1.1.1
git branch -a                 # main, develop, feature/divide (WIP)
```

`feature/divide` is intentionally left **unmerged** to show what an open PR
looks like mid-flight.
