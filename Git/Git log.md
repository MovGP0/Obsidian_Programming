Graphical representation of the git log
```powershell
git log --graph --decorate --oneline
```

Search the log for a given text
```powershell
git log -S "FOOBAR"
```

Search using grep
```sh
git log --grep="FOOBAR" --since="2020-01-01" --until="2025-12-31"
```

Custom log formatting
```powershell
git config --global alias.hs "log --pretty='%C(yellow)%h %C(cyan)%cd %Cblue%aN%C(auto)%d %Creset%s' --graph --date=relative --date-order"
git hs
```

Showing only the changed files:
```sh
git log --name-only --pretty=format:
```

## Examples

List of most changed files by sorting by number of commits where the file has changed:
```bash
git log --name-only --pretty=format: \
| sort | uniq -c | sort -rn
```

Find files with lots of fixes:
```bash
git log --since="1 year ago" --no-merges --name-only --pretty=format: --grep='fix\|bug\|hotfix\|patch\|regression' -i \
| sort | uniq -c | sort -rn
```

## Git log tools

- [GitK](https://github.com/j6t/gitk)
- [Git of Theseus](https://github.com/erikbern/git-of-theseus)
- [Hercules](https://github.com/src-d/hercules)
