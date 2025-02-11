const phrasing = require('mdast-util-to-markdown/lib/util/container-phrasing');
const defaultHandlers = require('mdast-util-to-markdown/lib/handle');

const wrap = (string, ...wrappers) => [
  ...wrappers,
  string,
  ...wrappers.reverse(),
].join('');

const isURL = string => {
  try {
    return Boolean(new URL(string));
  } catch (error) {
    return false;
  }
};

const zeroWidthSpace = String.fromCharCode(0x200B);

const isEncoded = uri => uri !== decodeURIComponent(uri || '');

const wrapEntity = (entityType, marker, injectZeroWidthSpace) => (node, _parent, context) => {
  const exit = context.enter(entityType);
  const value = phrasing(node, context, { before: marker, after: marker });
  exit();

  return injectZeroWidthSpace ? wrap(value, zeroWidthSpace, marker) : wrap(value, marker);
};

const replaceUlMarker = (...args) => defaultHandlers.listItem(...args).replace(/^\*/, '•');

const getLinkParams = (node, context, entityType, before, after) => {
  const exit = context.enter(entityType);
  const text = phrasing(node, context, { before, after })
    || node.title;

  let url;

  if (node.url) {
    url = isEncoded(node.url) ? node.url : encodeURI(node.url);
  }

  exit();

  return { text, url };
};

const getImageParams = (node, context, entityType, fallbackText) => {
  const exit = context.enter(entityType);
  const text = node.alt || fallbackText;
  const url = encodeURI(node.url);
  exit();

  return { text, url };
};

const replaceTextCharacters = replacements => (node, _parent, context) => {
  if (!replacements || !replacements.length) return node.value;

  const exit = context.enter('text');

  const text = replacements.reduce(
    (result, replacement) => result.replace(replacement.searchValue, replacement.newValue),
    node.value,
  );

  exit();

  // Do we need more escaping like the default handler uses?
  // https://github.com/syntax-tree/mdast-util-to-markdown/blob/main/lib/handle/text.js
  // https://github.com/syntax-tree/mdast-util-to-markdown/blob/main/lib/unsafe.js
  return text;
};

module.exports = {
  wrap,
  isURL,
  isEncoded,
  replaceUlMarker,
  wrapEntity,
  getLinkParams,
  getImageParams,
  replaceTextCharacters,
};
