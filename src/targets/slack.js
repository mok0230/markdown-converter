const phrasing = require('mdast-util-to-markdown/lib/util/container-phrasing');
const {
  wrap, isURL, isEncoded, wrapEntity, replaceUlMarker, replaceTextCharacters,
} = require('../utils');

const createSlackHandlers = (definitions, options) => ({
  heading: wrapEntity('heading', '*', false),

  strong: wrapEntity('strong', '*', true),

  delete: wrapEntity('delete', '~', true),

  emphasis: wrapEntity('emphasis', '_', true),

  listItem: replaceUlMarker,

  code(node, _parent, context) {
    const exit = context.enter('code');
    // delete language prefix for deprecated markdown formatters (old Bitbucket Editor)
    const content = node.value.replace(/^#![a-z]+\n/, ''); // ```\n#!javascript\ncode block\n```
    exit();

    return wrap(content, '```', '\n');
  },

  link: (node, _parent, context) => {
    const exit = context.enter('link');
    const text = phrasing(node, context, { before: '|', after: '>' })
      || node.title;
    const url = isEncoded(node.url) ? node.url : encodeURI(node.url);
    exit();

    if (!isURL(url)) return text || url;

    return text ? `<${url}|${text}>` : `<${url}>`;
  },

  linkReference: (node, _parent, context) => {
    const exit = context.enter('linkReference');
    const definition = definitions[node.identifier];
    const text = phrasing(node, context, { before: '|', after: '>' })
      || (definition ? definition.title : null);
    exit();

    if (!definition || !isURL(definition.url)) return text;

    return text ? `<${definition.url}|${text}>` : `<${definition.url}>`;
  },

  image: (node, _parent, context) => {
    const exit = context.enter('image');
    const text = node.alt || node.title;
    const url = encodeURI(node.url);
    exit();

    if (!isURL(url)) return text || url;

    return text ? `<${url}|${text}>` : `<${url}>`;
  },

  imageReference: (node, _parent, context) => {
    const exit = context.enter('imageReference');
    const definition = definitions[node.identifier];
    const text = node.alt
      || (definition ? definition.title : null);
    exit();

    if (!definition || !isURL(definition.url)) return text;

    return text ? `<${definition.url}|${text}>` : `<${definition.url}>`;
  },

  text: replaceTextCharacters([
    { searchValue: /&/g, newValue: '&amp;' },
    { searchValue: /<(?!@)/g, newValue: '&lt;' },
    { searchValue: /(?<!@[A-Z0-9]+)>/g, newValue: '&gt;' },
  ]),
});

module.exports = { createSlackHandlers };
