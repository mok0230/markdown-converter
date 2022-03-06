# transpile-md

**write messages once, transpile many times**

<!-- TODO: add this content back once the infrastructure exists!
![Build Status](https://github.com/jsarafajr/slackify-markdown/workflows/Build%20CI/badge.svg?branch=master)
[![codecov](https://codecov.io/gh/jsarafajr/slackify-markdown/branch/master/graph/badge.svg)](https://codecov.io/gh/jsarafajr/slackify-markdown) [![Known Vulnerabilities](https://snyk.io/test/github/jsarafajr/slackify-markdown/badge.svg)](https://snyk.io/test/github/jsarafajr/slackify-markdown) -->

transpile-md converts [Github-flavored markdown](https://github.github.com/gfm/) to a target output such as:

- HTML
- Slack
- Telegram
- Discord

This package is opinionated in transpiling features with mixed support across platforms. For instance, a title (`# My Title`) is supported in HTML (`<h1>My Title<h1>`) but not in various messaging platforms and may be converted, for instance, to bold (`*My Title*`).

## Install

This package is not yet published on npm, so it must be installed directly from GitHub:

```bash
npm install git+https://github.com/mok0230/transpile-md.git
```

<!--TODO: add this back when package is on npm
 ```bash
npm install slackify-markdown
``` -->

## Usage

```js
const transpileMd = require('transpile-md');
const markdown = `
# List of items

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

### Targets

| Target   | Description                                                                                                                                   |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| html     | Standard HTML                                                                                                                                 |
| slack    | [Slack-flavored Markdown (mrkdwn)](https://api.slack.com/reference/surfaces/formatting)                                                       |
| telegram | [Telegram-flavored Markdown (MarkdownV2)](https://core.telegram.org/bots/api#markdownv2-style)                                                |
| discord  | [Discord-flavored Markdown](https://support.discord.com/hc/en-us/articles/210298617-Markdown-Text-101-Chat-Formatting-Bold-Italic-Underline-) |
| safe-gfm | Github-flavored markdown stripped of links with anchor text                                                                                   |

_Credit to [slackify-markdown](https://github.com/jsarafajr/slackify-markdown) for providing the basis for this package._
