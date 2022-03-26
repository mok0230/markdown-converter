const transpileMd = require('..');

it.each([
  ['slack', '<http://atlassian.com|Atlassian>\n'],
  ['discord', '[](http://atlassian.com "Atlassian")\n'],
  ['safe-md', '[Atlassian]\\(http://atlassian.com)\n'],
  ['html', '<p><a href="http://atlassian.com" title=\"Atlassian\"></a></p>'],
])('transpiles link with title for target: %s', (target, expected) => {
  expect(transpileMd('[](http://atlassian.com "Atlassian")', { target })).toBe(expected);
});

it.each([
  ['slack', '<http://atlassian.com|test>\n'],
  ['discord', '[test](http://atlassian.com)\n'],
  ['safe-md', '[test]\\(http://atlassian.com)\n'],
  ['html', '<p><a href="http://atlassian.com">test</a></p>'],
])('transpiles link with alt for target: %s', (target, expected) => {
  expect(transpileMd('[test](http://atlassian.com)', { target })).toBe(expected);
});

it.each([
  ['slack', '<http://atlassian.com|test>\n'],
  ['discord', '[test](http://atlassian.com "Atlassian")\n'],
  ['safe-md', '[test]\\(http://atlassian.com)\n'],
  ['html', '<p><a href="http://atlassian.com" title=\"Atlassian\">test</a></p>'],
])('transpiles link with alt and title for target: %s', (target, expected) => {
  expect(transpileMd('[test](http://atlassian.com "Atlassian")', { target })).toBe(expected);
});

it.each([
  ['slack', '<http://atlassian.com|http://atlassian.com>\n'],
  ['discord', '<http://atlassian.com>\n'],
  ['safe-md', '[http://atlassian.com]\\(http://atlassian.com)\n'],
  ['html', '<p><a href="http://atlassian.com">http://atlassian.com</a></p>'],
])('transpiles link with angle bracket syntax for target: %s', (target, expected) => {
  expect(transpileMd('<http://atlassian.com>', { target })).toBe(expected);
});

it.each([
  ['slack', '<http://atlassian.com>\n'],
  ['discord', '[](http://atlassian.com)\n'],
  ['safe-md', '\\(http://atlassian.com)\n'],
  ['html', '<p><a href="http://atlassian.com"></a></p>'],
])('transpiles link with no alt nor title for target: %s', (target, expected) => {
  expect(transpileMd('[](http://atlassian.com)', { target })).toBe(expected);
});

// TODO: review if this could cause a link wth anchor text to be rendered and test above
xit.each([
  ['safe-md', 'click me (http://atlassian.com)\n'],
])('transpiles a malicious link with no alt nor title for target: %s', (target, expected) => {
  expect(transpileMd('[click me][](http://maliciouslink.com)', { target })).toBe(expected);
});

it.each([
  ['slack', 'test\n'],
  ['safe-md', '[test]\\(/atlassian)\n'],
  ['html', '<p><a href=\"/atlassian\">test</a></p>'],
])('transpiles invalid link for target: %s', (target, expected) => {
  expect(transpileMd('[test](/atlassian)', { target })).toBe(expected);
});

it.each([
  ['slack', '<http://atlassian.com|Atlassian>\n'],
  ['safe-md', '[Atlassian]\\(http://atlassian.com)\n'],
])('transpiles link in reference style with alt for target: %s', (target, expected) => {
  expect(transpileMd('[Atlassian]\n\n[atlassian]: http://atlassian.com', { target })).toBe(expected);
});

// TODO: review if this could cause a link wth anchor text to be rendered
it.each([
  ['slack', '<http://atlassian.com>\n'],
  ['safe-md', '\\(http://atlassian.com)\n'],
])('transpiles link in reference style with custom label for target: %s', (target, expected) => {
  expect(transpileMd('[][test]\n\n[test]: http://atlassian.com', { target })).toBe(expected);
});

it.each([
  ['slack', '<http://atlassian.com|Atlassian>\n'],
  ['safe-md', '[Atlassian]\\(http://atlassian.com)\n'],
])('transpiles link in reference style with alt and custom label for target: %s', (target, expected) => {
  expect(transpileMd('[Atlassian][test]\n\n[test]: http://atlassian.com', { target })).toBe(expected);
});

it.each([
  ['slack', '<http://atlassian.com|Title>\n'],
  ['safe-md', '[Title]\\(http://atlassian.com)\n'],
])('transpiles link in reference style with title for target: %s', (target, expected) => {
  expect(transpileMd('[][test]\n\n[test]: http://atlassian.com "Title"', { target })).toBe(expected);
});

it.each([
  ['slack', '<http://atlassian.com|Atlassian>\n'],
  ['safe-md', '[Atlassian]\\(http://atlassian.com)\n'],
])('transpiles link in reference style with alt and title for target: %s', (target, expected) => {
  expect(transpileMd('[Atlassian]\n\n[atlassian]: http://atlassian.com "Title"', { target })).toBe(expected);
});

it.each([
  ['slack', '<https://www.atlassian.com?redirect=https%3A%2F%2Fwww.asana.com|Atlassian>: /atlassian\n'],
  ['safe-md', '[Atlassian]\\(https://www.atlassian.com?redirect=https%3A%2F%2Fwww.asana.com): /atlassian\n'],
])('transpiles link that is already encoded for target: %s', (target, expected) => {
  expect(transpileMd('[Atlassian](https://www.atlassian.com?redirect=https%3A%2F%2Fwww.asana.com): /atlassian', { target })).toBe(expected);
});

it.each([
  ['slack', 'Atlassian\n'],
  ['safe-md', '[Atlassian]\\(/atlassian)\n'],
])('transpiles link in reference style with invalid definition for target: %s', (target, expected) => {
  expect(transpileMd('[Atlassian][test]\n\n[test]: /atlassian', { target })).toBe(expected);
});