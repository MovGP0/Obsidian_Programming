Create a branch and checkout the newly created branch
```bash
git branch feature/foobar
git checkout feature/foobar
```

Create a branch during checkout
```bash
git checkout -b feature/foobar
```

Create and switch with the newer command
```bash
git switch -c feature/foobar
git switch feature/foobar
```

List the git branches
```bash
git branch
```

List local and remote branches
```bash
git branch --all
```

List the git branches with information of the last commit
```bash
git branch -vv
git branch -vv --all
```

Rename the current branch
```bash
git branch -m feature/new-name
```

Set upstream for a branch
```bash
git push -u origin feature/foobar
git branch --set-upstream-to=origin/feature/foobar
```

Delete a branch
```bash
git branch -d 'feature/foobar'
```

Delete a remote branch
```bash
git push origin --delete feature/foobar
```

## See also

- [[Git merge]]
- [[Git rebase]]
