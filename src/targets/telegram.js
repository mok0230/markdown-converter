const {
  wrapEntity, replaceUlMarker,
} = require('../utils');

const createTelegramHandlers = (definitions, options) => ({
  heading: wrapEntity('heading', '*', false),
  strong: wrapEntity('strong', '*', false),
  emphasis: wrapEntity('emphasis', '_', false),
  // telegram API can fail in trying to parse content with asterisks
  listItem: replaceUlMarker,
  text: (node, _parent, context) => {
    const exit = context.enter('text');
    // https://core.telegram.org/bots/api#markdown-style

    const text = node.value.replace(/([_*`\\[])/g, '\\$1');
    exit();

    // Do we need more escaping like the default handler uses?
    // https://github.com/syntax-tree/mdast-util-to-markdown/blob/main/lib/handle/text.js
    // https://github.com/syntax-tree/mdast-util-to-markdown/blob/main/lib/unsafe.js
    return text;
  },
});

module.exports = { createTelegramHandlers };
