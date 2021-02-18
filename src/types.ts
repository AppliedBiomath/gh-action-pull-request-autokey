import { PayloadRepository } from '@actions/github/lib/interfaces';

export interface PullRequestParams {
  number: number;
  html_url?: string;
  body?: string;
  base: {
    ref: string;
  };
  head: {
    ref: string;
  };
  changed_files?: number;
  additions?: number;
  title?: string;

  [key: string]: unknown;
}

export interface IActionInputs {
  GITHUB_TOKEN: string;
  JIRA_PROJECT_KEY: string;
}

export interface IGithubData {
  eventName: string;
  repository: PayloadRepository | undefined;
  owner: string;
  pullRequest: PullRequestParams;
}
