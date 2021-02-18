
![Test-And-Publish-Dist](https://github.com/AppliedBiomath/gh-action-pull-request-autokey/workflows/Test-And-Publish-Dist/badge.svg)

# GitHub action to add JIRA keys to pull request descriptions

This action checks the description of the pull request to see if it contains a JIRA issue key, that
this pull request is for.  If the issue key is missing it inserts it on the first line of the 
description.

To enable add the file `jira-ticket-in-pr.yml` to your `.github/workflows` directory of the repository.

The file should have the following contents: 

```
name: 'Check PR description'
on: # rebuild any PRs and main branch changes
  pull_request:
    types: [ opened, reopened, edited, ready_for_review ]

jobs:
  check-pr-description: # make sure the action works on a clean machine without building
    runs-on: ubuntu-latest
    steps:
      - uses: AppliedBiomath/gh-action-pull-request-autokey@v0
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          jira-project-key: ABM
```

This action was heavily influenced by:

https://github.com/cakeinpanic/jira-description-action

