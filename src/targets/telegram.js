const {
  wrapEntity, replaceUlMarker, replaceTextCharacters, getLinkParams,
} = require('../utils');

// see https://core.telegram.org/bots/api#markdown-style
const ESCAPE_CHARACTERS_REGEX = /([_*`\\[])/g;

const createTelegramHandlers = (definitions, options) => ({
  heading: wrapEntity('heading', '*', false),
  strong: wrapEntity('strong', '*', false),
  emphasis: wrapEntity('emphasis', '_', false),
  listItem: replaceUlMarker,
  text: replaceTextCharacters([{ searchValue: ESCAPE_CHARACTERS_REGEX, newValue: '\\$1' }]),
  // the mdast conversion can sometimes leave code blocks open (see unit tests)
  // which causes the telegram API call to fail
  // to ensure stability, we do not support code blocks in telegram
  code: replaceTextCharacters([{ searchValue: /```/g, newValue: '\n' }]),

  link: (node, _parent, context) => {
    const { text, url } = getLinkParams(node, context, 'link');

    return text ? `[${text}](${url})` : `[${url}](${url})`;
  },
});

module.exports = { createTelegramHandlers };
