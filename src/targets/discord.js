const { wrapEntity } = require('../utils');

const createDiscordHandlers = (definitions, options) => ({
  heading: wrapEntity('heading', '**', false),
});

module.exports = { createDiscordHandlers };
