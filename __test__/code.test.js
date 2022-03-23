const transpileMd = require('..');

test('Inline code', () => {
  const mrkdown = 'hello `world`';
  const slack = 'hello `world`\n';
  expect(transpileMd(mrkdown, { target: 'slack' })).toBe(slack);
});

test('Code block', () => {
  const mrkdown = '```\ncode block\n```';
  const slack = '```\ncode block\n```\n';
  expect(transpileMd(mrkdown, { target: 'slack' })).toBe(slack);
});

test('Code block with newlines', () => {
  const mrkdown = '```\ncode\n\n\nblock\n```';
  const slack = '```\ncode\n\n\nblock\n```\n';
  expect(transpileMd(mrkdown, { target: 'slack' })).toBe(slack);
});

test('Code block with language', () => {
  const mrkdown = '```javascript\ncode block\n```';
  const slack = '```\ncode block\n```\n';
  expect(transpileMd(mrkdown, { target: 'slack' })).toBe(slack);
});

test('Code block with deprecated language declaration', () => {
  const mrkdown = '```\n#!javascript\ncode block\n```';
  const slack = '```\ncode block\n```\n';
  expect(transpileMd(mrkdown, { target: 'slack' })).toBe(slack);
});