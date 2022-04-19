const transpileMd = require('..');

describe('platform-specific', () => {
  test('User mention', () => {
    const mrkdown = '<@UPXGB22A2>';
    const slack = '<@UPXGB22A2>\n';
    expect(transpileMd(mrkdown, { target: 'slack' })).toBe(slack);
  });
});
