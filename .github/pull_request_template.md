## What & why

<!-- Short description of the change and the reason for it. -->

## Type

- [ ] `feature/*` → **develop**
- [ ] `release/*` → **main** (remember to back-merge into develop + tag)
- [ ] `hotfix/*`  → **main** (remember to forward-merge into develop + tag)

## Checklist

- [ ] Branched from the correct base (`develop` for features, `main` for hotfixes)
- [ ] Targeting the correct base branch in this PR
- [ ] `npm test` passes locally and in CI
- [ ] `CHANGELOG.md` / version bumped (release & hotfix only)
- [ ] At least one review approval
