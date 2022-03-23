const transpileMd = require('..');

it.each([
  ['slack', '* list\n* list\n* list', '•   list\n•   list\n•   list\n'],
  ['telegram', '* list\n* list\n* list', '•   list\n•   list\n•   list\n'],
])('transpiles unordered list for target: %s', (target, input, expected) => {
  expect(transpileMd(input, { target })).toBe(expected);
});

test('Ordered list', () => {
  const mrkdown = '1. list\n2. list\n3. list';
  const slack = '1.  list\n2.  list\n3.  list\n';
  expect(transpileMd(mrkdown, { target: 'slack' })).toBe(slack);
});