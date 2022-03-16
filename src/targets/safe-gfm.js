const phrasing = require('mdast-util-to-markdown/lib/util/container-phrasing');
const {
  isURL, isEncoded
} = require('../utils');

const createSafeGfmHandlers = (definitions, options) => ({
  link: (node, _parent, context) => {
    const exit = context.enter('link');
    const text = phrasing(node, context, { before: '|', after: '>' })
      || node.title;
    const url = isEncoded(node.url) ? node.url : encodeURI(node.url);
    exit();

    if (!isURL(url)) return text || url;

    return text ? `${text} (${url})` : `(${url})`;
  },

  linkReference: (node, _parent, context) => {
    const exit = context.enter('linkReference');
    const definition = definitions[node.identifier];
    const text = phrasing(node, context, { before: '|', after: '>' })
      || (definition ? definition.title : null);
    exit();

    if (!definition || !isURL(definition.url)) return text;

    return text ? `${text} (${definition.url})` : `(${definition.url})`;
  },

  image: (node, _parent, context) => {
    const exit = context.enter('image');
    const text = node.alt || node.title;
    const url = encodeURI(node.url);
    exit();

    if (!isURL(url)) return text || url;

    return text ? `${text} (${url})` : `(${url})`;
  },

  imageReference: (node, _parent, context) => {
    const exit = context.enter('imageReference');
    const definition = definitions[node.identifier];
    const text = node.alt
      || (definition ? definition.title : null);
    exit();

    if (!definition || !isURL(definition.url)) return text;

    return text ? `${text} (${definition.url})` : `(${definition.url})`;
  },
});

module.exports = { createSafeGfmHandlers };