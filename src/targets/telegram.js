const {
  wrapEntity, replaceUlMarker, replaceTextCharacters,
} = require('../utils');

const createTelegramHandlers = (definitions, options) => ({
  heading: wrapEntity('heading', '*', false),
  strong: wrapEntity('strong', '*', false),
  emphasis: wrapEntity('emphasis', '_', false),
  // telegram API can fail in trying to parse content with asterisks
  listItem: replaceUlMarker,
  text: replaceTextCharacters([{ searchValue: /([_*`\\[])/g, newValue: '\\$1' }]),
  // text: replaceTextCharacters(/this/g, 'lll'),
});

module.exports = { createTelegramHandlers };
