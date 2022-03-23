const gfm = require('remark-gfm');
const parse = require('remark-parse');
const stringify = require('remark-stringify');
const unified = require('unified');
const remark2rehype = require('remark-rehype');
const highlight = require('rehype-highlight');
const rehypeSanitize = require('rehype-sanitize');
const html = require('rehype-stringify');

const { collectDefinitions, removeDefinitions } = require('./definitions');
const createOptions = require('./transpile');

module.exports = (markdown, options) => {
  if (!options || !options.target) {
    console.error('unable to transpile, options.target is required');
    return '';
  }

  if (options.target === 'html') {
    const vFile = options.highlight
    ? unified()
        .use(parse)
        .use(remark2rehype)
        .use(highlight, options?.highlight)
        .use(rehypeSanitize)
        .use(html)
        .process(md)
    : unified().use(parse).use(remark2rehype).use(rehypeSanitize).use(html).process(md);

    return String(vFile);
  }

  const definitions = {};

  const stringifyOptions = createOptions(definitions, options);

  return unified()
    .use(parse)
    .use(gfm)
    .use(collectDefinitions, definitions)
    .use(removeDefinitions)
    .use(stringify, stringifyOptions)
    .processSync(markdown)
    .toString();
};
