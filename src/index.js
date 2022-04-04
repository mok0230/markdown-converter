const gfm = require('remark-gfm');
const parse = require('remark-parse');
const stringify = require('remark-stringify');
const unified = require('unified');
const remarkRehype = require('remark-rehype');
const rehypeHighlight = require('rehype-highlight');
const rehypeSanitize = require('rehype-sanitize');
const rehypeStringify = require('rehype-stringify');

const { collectDefinitions, removeDefinitions } = require('./definitions');
const createOptions = require('./transpile');

const transpileMdToHtml = (markdown, options) => {
  const vFile = options && options.highlight
    ? unified()
      .use(parse)
      .use(gfm)
      .use(remarkRehype)
      .use(rehypeHighlight, options.highlight)
      .use(rehypeSanitize)
      .use(rehypeStringify)
      .processSync(markdown)
    : unified()
      .use(parse)
      .use(gfm)
      .use(remarkRehype)
      .use(rehypeSanitize)
      .use(rehypeStringify)
      .processSync(markdown);

  return String(vFile);
};

const transpileMdExcludeHtml = (markdown, options) => {
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

const transpileMd = (markdown, options) => {
  if (!options || !options.target) {
    console.error('unable to transpile, options.target is required');
    return '';
  }

  if (options.target === 'html') {
    return transpileMdToHtml(markdown, options);
  }

  return transpileMdExcludeHtml(markdown, options);
};

module.exports = { transpileMd, transpileMdToHtml, transpileMdExcludeHtml };
