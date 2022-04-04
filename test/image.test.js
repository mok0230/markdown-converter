const { transpileMd } = require('..');

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