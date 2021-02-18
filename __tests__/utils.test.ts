import { ensureNotNull, getJiraKey, getPRDescription } from '../src/utils';

jest.spyOn(console, 'log').mockImplementation(); // avoid actual console.log in test output

test('getJIRAIssueKeys()', () => {
  expect(getJiraKey('ABM-1234-with-dashes', 'ABM')).toEqual('ABM-1234');
  expect(getJiraKey('ABM-1234_with_underscores', 'ABM')).toEqual('ABM-1234');
  expect(getJiraKey('ABM-1234-with-dashes_and-underscores', 'ABM')).toEqual(
    'ABM-1234',
  );

  expect(getJiraKey('fix/JDK-1234-with-dashes', 'JDK')).toEqual('JDK-1234');
  expect(getJiraKey('fix/ABM-1234_with_underscores', 'ABM')).toEqual(
    'ABM-1234',
  );
  expect(getJiraKey('fix/ABM-1234-with-dashes_and-underscores', 'ABM')).toEqual(
    'ABM-1234',
  );

  expect(() => getJiraKey('feature/missingKey', 'JDK')).toThrow(Error);
  expect(() => getJiraKey('ABM_1234-incorrect-naming', 'ABM')).toThrow(Error);
  expect(() => getJiraKey('JDK-2344-incorrect-proj-key', 'ABM')).toThrow(Error);
  expect(() => getJiraKey('', 'XYZ')).toThrow(Error);
  expect(() => getJiraKey('main', 'XYZ')).toThrow(Error);
  expect(() => getJiraKey('master', 'XYZ')).toThrow(Error);
});

test('Should insert issue ref if none present', () => {
  const oldPRBody = 'old PR description body';
  const ticketNum = 'ABM-1234';

  const description = getPRDescription(oldPRBody, ticketNum);

  expect(description).toEqual(`
${ticketNum}

${oldPRBody}`);
});

test('Should work if initial body is null', () => {
  const oldPRBody =  null;
  const ticketNum = 'ABM-1234';

  const description = getPRDescription(oldPRBody, ticketNum);

  expect(description).toEqual(`${ticketNum}`);
});


test('Should leave as is if issue ref is there', () => {
  const oldPRBody = `

old  ABM-1234 PR description body

`;

  const ticketNum = 'ABM-1234';
  const description = getPRDescription(oldPRBody, ticketNum);
  expect(description).toEqual(oldPRBody);
});

test('Should still insert even if another ticket is mentioned', () => {
  const oldPRBody = `

old  ABM-1235 PR description body

`;

  const ticketNum = 'ABM-1234';
  const description = getPRDescription(oldPRBody, ticketNum);
  expect(description).toContain('ABM-1234');
});

test('Ensure not null works when string is null', () => {
  const rv = ensureNotNull(undefined);
  expect(rv).toEqual('');
});

test('Ensure get string if it is not null', () => {
  const rv = ensureNotNull('Hello');
  expect(rv).toEqual('Hello');
});

test('Ensure get string if it is empty', () => {
  const rv = ensureNotNull('');
  expect(rv).toEqual('');
});
