import { GithubConnector } from '../src/github-connector';
import { getInputs } from '../src/action-inputs';
import { IActionInputs } from '../src/types';
import { getJiraKey } from '../src/utils';
import { getOctokit } from '@actions/github';

const MOCK_INPUT: Partial<IActionInputs> = {
  GITHUB_TOKEN: 'GITHUB_TOKEN',
  JIRA_PROJECT_KEY: 'ABM',
};

jest.mock('@actions/github', () => {
  const MOCK_CONTEXT = {
    eventName: 'pull_request',
    payload: {
      organization: {
        login: 'test-org',
      },
      repository: {
        name: 'test-repo',
      },
      pull_request: {
        body: 'MsgBody',
        number: 5,
        head: { ref: 'ABM-1239-test-branch-name' },
        title: 'prTitle',
      },
    },
  };

  return {
    GitHub: jest.fn(),
    context: MOCK_CONTEXT,
    getOctokit: jest.fn(),
  };
});

jest.mock('../src/action-inputs');

test('initializes correctly', () => {
  (getInputs as any).mockImplementation(() => MOCK_INPUT);
  new GithubConnector();
  expect(getOctokit).toHaveBeenCalledWith(MOCK_INPUT.GITHUB_TOKEN, {});
});

test('Gets correct issue key from branch name', () => {
  (getInputs as any).mockImplementation(() => MOCK_INPUT);
  const connector = new GithubConnector();
  expect(connector.getIssueKeyFromTitle()).toEqual('ABM-1239');
});

test('Fields are correct', () => {
  (getInputs as any).mockImplementation(() => MOCK_INPUT);
  const connector = new GithubConnector();
  expect(connector.githubData.owner).toEqual('test-org');
  expect(connector.githubData.repository?.name).toEqual('test-repo');

  expect(connector.githubData.pullRequest.number).toEqual(5);
  expect(connector.githubData.pullRequest.body).toEqual('MsgBody');
});

test('Event type checks out for normal events', () => {
  (getInputs as any).mockImplementation(() => MOCK_INPUT);
  const connector = new GithubConnector();
  connector.checkAction();
});
