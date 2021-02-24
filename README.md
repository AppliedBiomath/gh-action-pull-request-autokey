
![Test-And-Publish-Dist](https://github.com/AppliedBiomath/gh-action-pull-request-autokey/workflows/Test-And-Publish-Dist/badge.svg)

# GitHub action to add JIRA keys to pull request descriptions

This action checks the description of the pull request to see if it contains a JIRA issue key, that
this pull request is for.  If the issue key is missing it inserts it on the first line of the 
description.

To enable the workflow run the following command in your repository:


```
git fetch git@github.com:AppliedBiomath/gh-action-pull-request-autokey.git  add-workflow-v0  && git cherry-pick FETCH_HEAD
```

This action was heavily influenced by:

https://github.com/cakeinpanic/jira-description-action

