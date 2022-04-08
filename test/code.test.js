const transpileMd = require('..');

it.each([
  ['slack', 'hello `world`\n'],
  ['html', '<p>hello <code>world</code></p>'],
])('transpiles inline code for target: %s', (target, expected) => {
  expect(transpileMd('hello `world`', { target })).toBe(expected);
});

it.each([
  ['slack', '```\ncode block\n```\n'],
  ['html', '<pre><code>code block\n</code></pre>'],
])('transpiles a code block for target: %s', (target, expected) => {
  expect(transpileMd('```\ncode block\n```', { target })).toBe(expected);
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