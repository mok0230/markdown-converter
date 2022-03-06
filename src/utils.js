const phrasing = require('mdast-util-to-markdown/lib/util/container-phrasing');

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
  // make headers to be just *strong*

  const exit = context.enter(entityType);
  const value = phrasing(node, context, { before: marker, after: marker });
  exit();

  return injectZeroWidthSpace ? wrap(value, zeroWidthSpace, marker) : wrap(value, marker);
};

module.exports = {
  wrap,
  isURL,
  isEncoded,
  wrapEntity,
};
