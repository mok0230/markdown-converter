const gfm = require('remark-gfm');
const parse = require('remark-parse');
const stringify = require('remark-stringify');
const unified = require('unified');

const { collectDefinitions, removeDefinitions } = require('./definitions');
const createSlackifyOptions = require('./slackify');

module.exports = (markdown, options) => {
  if (!options || !options.target) {
    console.error('unable to transpile, options.target is required');
    return '';
  }

  const definitions = {};

  const slackifyOptions = createSlackifyOptions(definitions, options);

  return unified()
    .use(parse)
    // Delete node is defined in GFM
    // https://github.com/syntax-tree/mdast/blob/main/readme.md#gfm
    .use(gfm)
    .use(collectDefinitions, definitions)
    .use(removeDefinitions)
    .use(stringify, slackifyOptions)
    .processSync(markdown)
    .toString();
};
