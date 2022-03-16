const {
  wrapEntity, replaceUlMarker,
} = require('../utils');

const createTelegramHandlers = (definitions, options) => ({
  heading: wrapEntity('heading', '*', false),
  strong: wrapEntity('strong', '*', false),
  emphasis: wrapEntity('emphasis', '_', false),
  // telegram API can fail in trying to parse content with asterisks
  listItem: replaceUlMarker,
});

module.exports = { createTelegramHandlers };
