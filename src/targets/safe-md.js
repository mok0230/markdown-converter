const {
  isURL, getLinkParams, getImageParams
} = require('../utils');

const createsafeMdHandlers = (definitions, options) => ({
  link: (node, _parent, context) => {
    const { text, url } = getLinkParams(node, context, 'link');

    return text ? `[${text}]\\(${url})` : `\\(${url})`;
  },

  linkReference: (node, _parent, context) => {
    let { text } = getLinkParams(node, context, 'linkReference');

    const definition = definitions[node.identifier];

    if (!text) {
      text = definition ? definition.title : null;
      if (!definition || !isURL(definition.url)) return `\\${text}`;
    }

    return text ? `[${text}]\\(${definition.url})` : `\\(${definition.url})`;
  },

  image: (node, _parent, context) => {
    const { text, url } = getImageParams(node, context, 'image', node.title);

    return text ? `[${text}]\\(${url})` : `\\(${url})`;
  },

  imageReference: (node, _parent, context) => {
    const definition = definitions[node.identifier];

    const { text } = getImageParams(node, context, 'imageReference', definition ? definition.title : '');

    return text ? `[${text}]\\(${definition.url})` : `\\(${definition.url})`;
  },
});

module.exports = { createsafeMdHandlers };
