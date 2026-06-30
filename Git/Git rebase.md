# Git rebase

Rebase rewrites commits by replaying them onto another base. Use it for local or coordinated history cleanup. Be careful with commits that other people already use.

Inspect the current state first
```bash
git status --short --branch
git branch -vv
git log --oneline --decorate --graph --all -20
```

Update a feature branch on top of `origin/main`
```bash
git fetch origin
git switch feature/foobar
git rebase origin/main
```

Abort or continue
```bash
git rebase --abort
git add <resolved-files>
git rebase --continue
```

## Interactive rebase

Edit the last `N` commits
```bash
git rebase -i HEAD~N
```

Common actions
```text
pick   keep commit as-is
reword keep changes but edit message
edit   stop at commit for manual changes
squash combine with previous commit and edit message
fixup  combine with previous commit and discard this message
drop   remove commit
```

## Fixup commits

Create a fixup commit for a target commit
```bash
git commit --fixup <COMMITID>
```

Autosquash the fixup commit
```bash
git rebase -i --autosquash <base>
```

For the last 10 commits
```bash
git rebase -i --autosquash HEAD~10
```

## Amend a commit

Amend the latest commit
```bash
git add <files>
git commit --amend
```

Amend without editing the message
```bash
git add <files>
git commit --amend --no-edit
```

Edit an older commit
```bash
git rebase -i <COMMITID>^
```

Change `pick` to `edit`. When Git stops, amend the commit and continue.
```bash
git add <files>
git commit --amend
git rebase --continue
```

## Split a commit

Start an interactive rebase before the commit that should be split
```bash
git rebase -i <base-before-commit>
```

Change `pick` to `edit`. When Git stops, reset the commit while keeping its changes in the worktree.
```bash
git reset HEAD^
```

Create smaller commits
```bash
git add <first-set-of-files>
git commit -m "First focused change"
git add <second-set-of-files>
git commit -m "Second focused change"
git rebase --continue
```

Use patch staging when one file needs to be split across commits
```bash
git add -p
```

## Rebase onto another base

Move a branch range from one base to another
```bash
git rebase --onto <new-base> <old-base> <branch>
```

Example
```bash
git rebase --onto origin/main old-base feature/foobar
```

## Publish rewritten history

After a rebase, amend, autosquash, or split, prefer
```bash
git push --force-with-lease
```

`--force-with-lease` refuses to overwrite remote changes that appeared after the last fetch.

## See also

- [[Git branch]]
- [[Git merge]]
- [[Git commit]]
