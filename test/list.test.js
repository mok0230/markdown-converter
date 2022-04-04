const { transpileMd } = require('..');

it.each([
  ['slack', '•   list\n•   list\n•   list\n'],
  ['telegram', '•   list\n•   list\n•   list\n'],
  ['html', '<ul>\n<li>list</li>\n<li>list</li>\n<li>list</li>\n</ul>'],
])('transpiles unordered list for target: %s', (target, expected) => {
  expect(transpileMd('* list\n* list\n* list', { target })).toBe(expected);
});

it.each([
  ['slack', '1.  list\n2.  list\n3.  list\n'],
  // ['telegram', '•   list\n•   list\n•   list\n'],
  ['html', '<ol>\n<li>list</li>\n<li>list</li>\n<li>list</li>\n</ol>'],
])('transpiles ordered list for target: %s', (target, expected) => {
  expect(transpileMd('1. list\n2. list\n3. list', { target })).toBe(expected);
});
