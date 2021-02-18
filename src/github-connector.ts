import { context, getOctokit } from '@actions/github';
import { getInputs } from './action-inputs';
import { IGithubData, PullRequestParams } from './types';
import { ensureNotNull, getJiraKey, getPRDescription } from './utils';

export class GithubConnector {
  client;
  githubData: IGithubData = {} as IGithubData;
  projKey: string;

  constructor() {
    const { GITHUB_TOKEN, JIRA_PROJECT_KEY } = getInputs();
    this.client = getOctokit(GITHUB_TOKEN, {});
    this.githubData = this.getGithubData();
    this.projKey = JIRA_PROJECT_KEY;
  }

  get headBranch(): string {
    return this.githubData.pullRequest.head.ref;
  }

  get isPRAction(): boolean {
    return context.eventName === 'pull_request';
  }

  getIssueKeyFromTitle(): string {
    const branchName = this.headBranch;
    if (branchName === null) {
      throw new Error(`Can't get issue key from : ${branchName}`);
    }
    return this.getIssueKeyFromString(branchName) as string;
  }

  private getIssueKeyFromString(stringToParse: string): string | null {
    console.log(`looking in: ${stringToParse}`);
    return getJiraKey(stringToParse, this.projKey);
  }

  async updatePrDetails(): Promise<object> {
    const owner = this.githubData.owner;
    const repo = ensureNotNull(this.githubData.repository?.name);

    console.log('HEAD branch : ', this.headBranch);

    const {
      number: prNumber = 0,
      body: prBody = '',
    } = this.githubData.pullRequest;

    console.log('PR Number', prNumber);
    console.log('Old Body', prBody);

    const issueKey = this.getIssueKeyFromTitle();
    console.log('Issue key', issueKey);

    const newBody = getPRDescription(prBody, issueKey);

    console.log('New Body', newBody);

    const prData = {
      owner,
      repo,
      pull_number: prNumber,
      body: newBody,
    };

    return await this.client.pulls.update(prData);
  }

  private getGithubData(): IGithubData {
    const {
      eventName,
      payload: {
        repository,
        organization: { login: owner },
        pull_request: pullRequest,
      },
    } = context;

    return {
      eventName,
      repository,
      owner,
      pullRequest: pullRequest as PullRequestParams,
    };
  }

  checkAction(): void {
    if (!this.isPRAction) {
      throw new Error(
        `Invalid workflow configuration.  Action triggerd by ${context.eventName}`,
      );
    }
  }
}
