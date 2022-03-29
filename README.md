# transpile-md

## write markdown once, transpile many times

<!-- TODO: add this content back once the infrastructure exists!
![Build Status](https://github.com/mok0230/transpile-md/workflows/Build%20CI/badge.svg?branch=master)
[![codecov](https://codecov.io/gh/mok0230/transpile-md/branch/master/graph/badge.svg)](https://codecov.io/gh/mok0230/transpile-md) [![Known Vulnerabilities](https://snyk.io/test/github/mok0230/transpile-md/badge.svg)](https://snyk.io/test/github/mok0230/transpile-md) -->

transpile-md converts [Github-flavored markdown](https://github.github.com/gfm/) to a target output such as HTML, Slack, Discord, or Telegram.

## Install

 ```bash
npm install transpile-md
```

```bash
yarn add transpile-md
```

## Usage

```js
const transpileMd = require('transpile-md');
const markdown = `
**List of items**

* item 1
* item 2
* item 3

[here is an example](https://example.com)
`;

transpileMd(markdown, { target: 'slack' });
/*
 *List of items*

 • item 1
 • item 2
 • item 3

 <https://example.com|here is an example>
/*
```

## API

### `options`

#### `options.target`

Required - valid values include:

* html (standard HTML)
* slack ([Slack-flavored Markdown (mrkdwn)](https://api.slack.com/reference/surfaces/formatting))
* telegram ([Telegram-flavored Markdown](https://core.telegram.org/bots/api#markdown-style))
* discord ([Discord-flavored Markdown](https://support.discord.com/hc/en-us/articles/210298617-Markdown-Text-101-Chat-Formatting-Bold-Italic-Underline-))
* safe-md (input markdown with anchor text links escaped to prevent formatting of untrusted content)

#### `options.highlight`

HTML can be highlighted by assigning valid [rehype-highlight](https://github.com/rehypejs/rehype-highlight#api) options to the `options.highlight` parameter. 

This is only valid with `target: html`. It will be ignored for other targets.

_Credit to [slackify-markdown](https://github.com/jsarafajr/slackify-markdown) for providing the basis for this package._
