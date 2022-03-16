const gfm = require('remark-gfm');
const parse = require('remark-parse');
const stringify = require('remark-stringify');
const unified = require('unified');

const { collectDefinitions, removeDefinitions } = require('./definitions');
const createOptions = require('./transpile');

module.exports = (markdown, options) => {
  if (!options || !options.target) {
    console.error('unable to transpile, options.target is required');
    return '';
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
