import {
  //  BOT_BRANCH_PATTERNS,
  //  DEFAULT_BRANCH_PATTERNS,
  JIRA_REGEX_MATCHER,
} from './constants';

export const ensureNotNull = (value: string | undefined): string =>
  !value ? '' : value;

export const getJiraKey = (branch: string, projKey: string): string | null => {
  const regExp = new RegExp(JIRA_REGEX_MATCHER);
  const matches = regExp.exec(branch);
  const key = matches ? matches[matches.length - 1] : null;

  if (!key) {
    throw new Error(`Branch ${branch} does not contain JIRA key`);
  }

  if (!key.startsWith(`${projKey}-`)) {
    throw new Error(
      `Branch ${branch} does not start with JIRA proj key ${projKey}`,
    );
  }

  return key ? key.toUpperCase() : null;
};

export const getPRDescription = (
  oldPRBody: string | null,
  ticketNum: string,
): string => {

  if (oldPRBody === null) {
    return `${ticketNum}`;
  }

  return oldPRBody.includes(ticketNum)
    ? oldPRBody
    : `
${ticketNum}

${oldPRBody}`;
};
