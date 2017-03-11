# Git Command Summary
> helpful git commands for open-source collaboration

## Forking a Repo:
1) go to the original repo
(ex. [https://github.com/thechutrain/quizward](https://github.com/thechutrain/quizward) )
2) click the fork button in the top right corner
3) clone your forked copy of the original repository
4) `$git remote add upstream [reference-to-original]`


## Making a branch:
1) `$ git checkout master`
2) `$ git pull upstream master` :
   -  makes sures you have to most up to date master
   - optional, if your master is already up to date
3) `$ git checkout -b [new-branch-name]`


## Updating your working branch w./ upstream master
* if you're working on a side branch already, make sure 
to commit those changes before you switch branches

1) `$ git checkout master`
2) `$ git pull upstream master` 
3) `$ git checkout [branch-you-were-working-on-name]`
4) `$ git merge master` : merges the up-to-date master into your branch


## Other helpful git commands:
* `$ git status` : tells you what branch you're on, files not commited etc.
* `$ git branch` : lists your local branches
* `$ git branch -a` (lists all your branches locals & remotes)