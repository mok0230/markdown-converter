const transpileMd = require('..');

const zws = String.fromCharCode(0x200B); // zero-width-space

it.each([
  ['slack', 'hello world\n'],
  ['discord', 'hello world\n'],
])('transpiles simple text for target: %s', (target, expected) => {
  expect(transpileMd('hello world', { target })).toBe(expected);
});

test('Escaped text', () => {
  expect(transpileMd('*h&ello>world<', { target: 'slack' })).toBe('*h&amp;ello&gt;world&lt;\n');
});

test('Definitions', () => {
  const mrkdown = 'hello\n\n[1]: http://atlassian.com\n\nworld\n\n[2]: http://atlassian.com';
  const slack = 'hello\n\nworld\n';
  expect(transpileMd(mrkdown, { target: 'slack' })).toBe(slack);
});

it.each([
  ['slack', '*heading 1*\n\n*heading 2*\n\n*heading 3*\n'],
  ['discord', '**heading 1**\n\n**heading 2**\n\n**heading 3**\n'],
  ['telegram', '*heading 1*\n\n*heading 2*\n\n*heading 3*\n'],
])('transpiles headings for target: %s', (target, expected) => {
  expect(transpileMd('# heading 1\n## heading 2\n### heading 3', { target })).toBe(expected);
});

it.each([
  ['slack', `${zws}*bold text*${zws}\n`],
  ['discord', '**bold text**\n'],
  ['telegram', '*bold text*\n'],
])('transpiles bold text for target: %s', (target, expected) => {
  expect(transpileMd('**bold text**', { target })).toBe(expected);
});

test('Bold character in word', () => {
  expect(transpileMd('he**l**lo', { target: 'slack' })).toBe(`he${zws}*l*${zws}lo\n`);
});

it.each([
  ['slack', `${zws}_italic text_${zws}\n`],
  ['discord', '*italic text*\n'],
  ['telegram', '_italic text_\n'],
])('transpiles italic text for target: %s', (target, expected) => {
  expect(transpileMd('*italic text*', { target })).toBe(expected);
});

test('Bold+Italic', () => {
  const mrkdown = '***bold+italic***';
  const slack = `${zws}_${zws}*bold+italic*${zws}_${zws}\n`;
  expect(transpileMd(mrkdown, { target: 'slack' })).toBe(slack);
});

test('Strike', () => {
  const mrkdown = '~~strike text~~';
  const slack = `${zws}~strike text~${zws}\n`;
  expect(transpileMd(mrkdown, { target: 'slack' })).toBe(slack);
});