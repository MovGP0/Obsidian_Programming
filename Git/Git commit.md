Add to stage and commit with commit message
```powershell
git add *
git commit -m "Commit Message"
```

Add all changes automatically
```powershell
git commit -a -m "Commit Message"
```

Add all changes and untrackted files
```powershell
git add -A
git commit -m "Commit Message"
```

Amend the last commit with currently staged changes
```powershell
git add <files>
git commit --amend
```

Amend the last commit without changing the commit message
```powershell
git add <files>
git commit --amend --no-edit
```

Create a fixup commit for later autosquash
```powershell
git commit --fixup <COMMITID>
```

## See also

- [[Git rebase]]
