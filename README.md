# Lumen

A small lighting shop, used to show [Statute](https://github.com/miracle352/statute) guarding a real repository.

```
npm start    # http://localhost:3000
```

Every pull request here runs Statute: it reads the diff, and when a change touches tracking, prices or subscriptions, Kane CLI checks the shop in a real browser against consumer law. On a violation Claude Code fixes it, and the fix is pushed to the pull request only after Kane passes. Set up with `npx statute init --fix`.
