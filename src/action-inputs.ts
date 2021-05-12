import * as core from '@actions/core';
import { IActionInputs } from './types';

export const getInputs = (): IActionInputs => {
  const GITHUB_TOKEN: string = core.getInput('github-token', {
    required: true,
  });
  const JIRA_PROJECT_KEY = core
    .getInput('jira-project-key', {
      required: true,
    })
    .split(' ')
    .filter(key => key !== '');

  return {
    GITHUB_TOKEN,
    JIRA_PROJECT_KEY,
  };
};
