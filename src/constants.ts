export const BOT_BRANCH_PATTERNS: RegExp[] = [/^dependabot/];

export const DEFAULT_BRANCH_PATTERNS: RegExp[] = [
  /^master$/,
  /^main$/,
  /^production$/,
  /^gh-pages$/,
];

export const JIRA_REGEX_MATCHER = /([a-zA-Z0-9]{1,10}-\d+)/g;
