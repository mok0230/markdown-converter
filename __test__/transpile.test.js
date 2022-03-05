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
  ['telegram', `${zws}*bold text*${zws}\n`],
])('transpiles bold text for target: %s', (target, expected) => {
  expect(transpileMd('**bold text**', { target })).toBe(expected);
});

test('Bold character in word', () => {
  expect(transpileMd('he**l**lo', { target: 'slack' })).toBe(`he${zws}*l*${zws}lo\n`);
});

it.each([
  ['slack', `${zws}_italic text_${zws}\n`],
  ['discord', '*italic text*\n'],
  ['telegram', `${zws}_italic text_${zws}\n`],
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

test('Unordered list', () => {
  const mrkdown = '* list\n* list\n* list';
  const slack = '•   list\n•   list\n•   list\n';
  expect(transpileMd(mrkdown, { target: 'slack' })).toBe(slack);
});

test('Ordered list', () => {
  const mrkdown = '1. list\n2. list\n3. list';
  const slack = '1.  list\n2.  list\n3.  list\n';
  expect(transpileMd(mrkdown, { target: 'slack' })).toBe(slack);
});

test('Link with title', () => {
  const mrkdown = '[](http://atlassian.com "Atlassian")';
  const slack = '<http://atlassian.com|Atlassian>\n';
  expect(transpileMd(mrkdown, { target: 'slack' })).toBe(slack);
});

test('Link with alt', () => {
  const mrkdown = '[test](http://atlassian.com)';
  const slack = '<http://atlassian.com|test>\n';
  expect(transpileMd(mrkdown, { target: 'slack' })).toBe(slack);
});

test('Link with alt and title', () => {
  const mrkdown = '[test](http://atlassian.com "Atlassian")';
  const slack = '<http://atlassian.com|test>\n';
  expect(transpileMd(mrkdown, { target: 'slack' })).toBe(slack);
});

test('Link with angle bracket syntax', () => {
  const mrkdown = '<http://atlassian.com>';
  const slack = '<http://atlassian.com|http://atlassian.com>\n';
  expect(transpileMd(mrkdown, { target: 'slack' })).toBe(slack);
});

test('Link with no alt nor title', () => {
  const mrkdown = '[](http://atlassian.com)';
  const slack = '<http://atlassian.com>\n';
  expect(transpileMd(mrkdown, { target: 'slack' })).toBe(slack);
});

test('Link with invalid URL', () => {
  const mrkdown = '[test](/atlassian)';
  const slack = 'test\n';
  expect(transpileMd(mrkdown, { target: 'slack' })).toBe(slack);
});

test('Link in reference style with alt', () => {
  const mrkdown = '[Atlassian]\n\n[atlassian]: http://atlassian.com';
  const slack = '<http://atlassian.com|Atlassian>\n';
  expect(transpileMd(mrkdown, { target: 'slack' })).toBe(slack);
});

test('Link in reference style with custom label', () => {
  const mrkdown = '[][test]\n\n[test]: http://atlassian.com';
  const slack = '<http://atlassian.com>\n';
  expect(transpileMd(mrkdown, { target: 'slack' })).toBe(slack);
});

test('Link in reference style with alt and custom label', () => {
  const mrkdown = '[Atlassian][test]\n\n[test]: http://atlassian.com';
  const slack = '<http://atlassian.com|Atlassian>\n';
  expect(transpileMd(mrkdown, { target: 'slack' })).toBe(slack);
});

test('Link in reference style with title', () => {
  const mrkdown = '[][test]\n\n[test]: http://atlassian.com "Title"';
  const slack = '<http://atlassian.com|Title>\n';
  expect(transpileMd(mrkdown, { target: 'slack' })).toBe(slack);
});

test('Link in reference style with alt and title', () => {
  const mrkdown = '[Atlassian]\n\n[atlassian]: http://atlassian.com "Title"';
  const slack = '<http://atlassian.com|Atlassian>\n';
  expect(transpileMd(mrkdown, { target: 'slack' })).toBe(slack);
});

test('Link is already encoded', () => {
  const mrkdown = '[Atlassian](https://www.atlassian.com?redirect=https%3A%2F%2Fwww.asana.com): /atlassian';
  const slack = '<https://www.atlassian.com?redirect=https%3A%2F%2Fwww.asana.com|Atlassian>: /atlassian\n';
  expect(transpileMd(mrkdown, { target: 'slack' })).toBe(slack);
});

test('Link in reference style with invalid definition', () => {
  const mrkdown = '[Atlassian][test]\n\n[test]: /atlassian';
  const slack = 'Atlassian\n';
  expect(transpileMd(mrkdown, { target: 'slack' })).toBe(slack);
});

test('Image with title', () => {
  const mrkdown = '![](https://bitbucket.org/repo/123/images/logo.png "test")';
  const slack = '<https://bitbucket.org/repo/123/images/logo.png|test>\n';
  expect(transpileMd(mrkdown, { target: 'slack' })).toBe(slack);
});

test('Image with alt', () => {
  const mrkdown = '![logo.png](https://bitbucket.org/repo/123/images/logo.png)';
  const slack = '<https://bitbucket.org/repo/123/images/logo.png|logo.png>\n';
  expect(transpileMd(mrkdown, { target: 'slack' })).toBe(slack);
});

test('Image with alt and title', () => {
  const mrkdown = "![logo.png](https://bitbucket.org/repo/123/images/logo.png 'test')";
  const slack = '<https://bitbucket.org/repo/123/images/logo.png|logo.png>\n';
  expect(transpileMd(mrkdown, { target: 'slack' })).toBe(slack);
});

test('Image with no alt nor title', () => {
  const mrkdown = '![](https://bitbucket.org/repo/123/images/logo.png)';
  const slack = '<https://bitbucket.org/repo/123/images/logo.png>\n';
  expect(transpileMd(mrkdown, { target: 'slack' })).toBe(slack);
});

test('Image with invalid URL', () => {
  const mrkdown = "![logo.png](/relative-path-logo.png 'test')";
  const slack = 'logo.png\n';
  expect(transpileMd(mrkdown, { target: 'slack' })).toBe(slack);
});

test('Image in reference style with alt', () => {
  const mrkdown = '![Atlassian]\n\n[atlassian]: https://bitbucket.org/repo/123/images/logo.png';
  const slack = '<https://bitbucket.org/repo/123/images/logo.png|Atlassian>\n';
  expect(transpileMd(mrkdown, { target: 'slack' })).toBe(slack);
});

test('Image in reference style with custom label', () => {
  const mrkdown = '![][test]\n\n[test]: https://bitbucket.org/repo/123/images/logo.png';
  const slack = '<https://bitbucket.org/repo/123/images/logo.png>\n';
  expect(transpileMd(mrkdown, { target: 'slack' })).toBe(slack);
});

test('Image in reference style with alt and custom label', () => {
  const mrkdown = '![Atlassian][test]\n\n[test]: https://bitbucket.org/repo/123/images/logo.png';
  const slack = '<https://bitbucket.org/repo/123/images/logo.png|Atlassian>\n';
  expect(transpileMd(mrkdown, { target: 'slack' })).toBe(slack);
});

test('Image in reference style with title', () => {
  const mrkdown = '![][test]\n\n[test]: https://bitbucket.org/repo/123/images/logo.png "Title"';
  const slack = '<https://bitbucket.org/repo/123/images/logo.png|Title>\n';
  expect(transpileMd(mrkdown, { target: 'slack' })).toBe(slack);
});

test('Image in reference style with alt and title', () => {
  const mrkdown = '![Atlassian]\n\n[atlassian]: https://bitbucket.org/repo/123/images/logo.png "Title"';
  const slack = '<https://bitbucket.org/repo/123/images/logo.png|Atlassian>\n';
  expect(transpileMd(mrkdown, { target: 'slack' })).toBe(slack);
});

test('Image in reference style with invalid definition', () => {
  const mrkdown = '![Atlassian][test]\n\n[test]: /relative-path-logo.png';
  const slack = 'Atlassian\n';
  expect(transpileMd(mrkdown, { target: 'slack' })).toBe(slack);
});

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

test('User mention', () => {
  const mrkdown = '<@UPXGB22A2>';
  const slack = '<@UPXGB22A2>\n';

  expect(transpileMd(mrkdown, { target: 'slack' })).toBe(slack);
});
