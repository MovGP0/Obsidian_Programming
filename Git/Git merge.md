# Git merge

Merging integrates one branch into another. Use it when you want to preserve the branch relationship or when the target branch can fast-forward.

Inspect the current state first
```bash
git status --short --branch
git branch -vv
git log --oneline --decorate --graph --all -20
```

Fast-forward merge
```bash
git switch main
git merge --ff-only feature/foobar
```

Create an explicit merge commit
```bash
git switch main
git merge --no-ff feature/foobar
```

Abort a merge with conflicts
```bash
git merge --abort
```

Continue after resolving conflicts
```bash
git status --short
git add <resolved-files>
git merge --continue
```

## Merge vs rebase

Use merge when
- the branch topology should remain visible.
- multiple people share the feature branch.
- you want to avoid rewriting commits.

Use [[Git rebase]] when
- you want to replay local commits onto a newer base.
- the commits are still private or coordinated.
- you want to clean up commits before publishing.

## See also

- [[Git branch]]
- [[Git rebase]]
