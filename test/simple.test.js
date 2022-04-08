const transpileMd = require('..');

const zws = String.fromCharCode(0x200B); // zero-width-space

it.each([
  ['slack', 'hello world\n'],
  ['discord', 'hello world\n'],
  ['html', '<p>hello world</p>'],
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
  ['html', '<h1>heading 1</h1>\n<h2>heading 2</h2>\n<h3>heading 3</h3>'],
])('transpiles headings for target: %s', (target, expected) => {
  expect(transpileMd('# heading 1\n## heading 2\n### heading 3', { target })).toBe(expected);
});

it.each([
  ['slack', `${zws}*bold text*${zws}\n`],
  ['discord', '**bold text**\n'],
  ['telegram', '*bold text*\n'],
  ['html', '<p><strong>bold text</strong></p>'],
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
  ['html', '<p><em>italic text</em></p>'],
])('transpiles italic text for target: %s', (target, expected) => {
  expect(transpileMd('*italic text*', { target })).toBe(expected);
});

it.each([
  ['slack', `${zws}_${zws}*bold+italic*${zws}_${zws}\n`],
  ['html', '<p><em><strong>bold+italic</strong></em></p>'],
])('transpiles bold+italic text for target: %s', (target, expected) => {
  expect(transpileMd('***bold+italic***', { target })).toBe(expected);
});

it.each([
  ['ampersand and gt/lt', 'slack', 'this should be replaced & and this < and this >.', 'this should be replaced &amp; and this &lt; and this &gt;.\n'],
  ['backtick and asterisk', 'telegram', 'this should be escaped ` and this *.', 'this should be escaped \\` and this \\*.\n'],
  ['open code block', 'telegram', 'this should be escaped ```.', 'this should be escaped \\`\\`\\`.\n'],
  ['closed code block', 'telegram', 'this should be converted to newline\n```\nand\n```.', 'this should be converted to newline\n\nand\n\n.\n'],
])('escapes %s text as expected for target: %s', (description, target, input, expected) => {
  expect(transpileMd(input, { target })).toBe(expected);
});

test('Strike', () => {
  const mrkdown = '~~strike text~~';
  const slack = `${zws}~strike text~${zws}\n`;
  expect(transpileMd(mrkdown, { target: 'slack' })).toBe(slack);
});
