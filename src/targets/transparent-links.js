const {
  isURL, getLinkParams, getImageParams,
} = require('../utils');

const createTransparentLinksHandlers = (definitions, options) => ({
  link: (node, _parent, context) => {
    const { text, url } = getLinkParams(node, context, 'link');

    // mdast parses a link alone as both the text and url, in that case form a transparent link
    if (text === url) {
      return `[${url}](${url})`;
    }

    return text ? `${text} ([${url}](${url}))` : `[${url}](${url})`;
  },

  linkReference: (node, _parent, context) => {
    let { text } = getLinkParams(node, context, 'linkReference');

    const definition = definitions[node.identifier];

    if (!text) {
      text = definition ? definition.title : null;
      if (!definition || !isURL(definition.url)) return `${text}`;
    }

    return text ? `${text} ([${definition.url}](${definition.url}))` : `[${definition.url}](${definition.url})`;
  },

  image: (node, _parent, context) => {
    const { text, url } = getImageParams(node, context, 'image', node.title);

    return text ? `${text} ([${url}](${url}))` : `[${url}](${url})`;
  },

  imageReference: (node, _parent, context) => {
    const definition = definitions[node.identifier];

    const { text } = getImageParams(node, context, 'imageReference', definition ? definition.title : '');

    return text ? `${text} ([${definition.url}](${definition.url}))` : `[${definition.url}](${definition.url})`;
  },
});

module.exports = { createTransparentLinksHandlers };
