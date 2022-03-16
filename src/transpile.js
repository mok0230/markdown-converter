const { createDiscordHandlers } = require('./targets/discord');
const { createSafeGfmHandlers } = require('./targets/safe-gfm');
const { createSlackHandlers } = require('./targets/slack');
const { createTelegramHandlers } = require('./targets/telegram');

/**
 * Create custom `mdast-util-to-markdown` handlers that tailor the output for
 * the specific target.
 */
const createHandlers = (definitions, options) => {
  switch (options.target) {
    case 'slack':
      return createSlackHandlers(definitions, options);
    case 'discord':
      return createDiscordHandlers(definitions, options);
    case 'telegram':
      return createTelegramHandlers(definitions, options);
    case 'safe-gfm':
      return createSafeGfmHandlers(definitions, options);
    default:
      console.error('unknown target!');
      return {};
  }
};

/**
 * Creates options to be passed into a `remark-stringify` processor that tailor
 * the output for the specified target.
*/
const createOptions = (definitions, options) => ({
  bullet: '*',
  handlers: createHandlers(definitions, options),
});

module.exports = createOptions;
