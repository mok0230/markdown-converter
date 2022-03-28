const transpileMd = require('./index');
const fs = require('fs');

const longMessageNoTicks = `changed just first line

**Defender Sentinel {{ sentinel.name }} Triggered**

**Network**

{{ sentinel.network }}

**Block Hash**

{{ blockHash }}

**Transaction Hash**

{{ transaction.transactionHash }}

**Transaction Link** 

[Block Explorer]({{ transaction.link }})

{{ matchReasonsFormatted }}

an update

**Sentinel Name**

{{ sentinel.name }}

**Block Hash**

{{ blockHash }}

**Transaction Hash**

{{ transaction.transactionHash }}

**Transaction Link** 

[Block Explorer]({{ transaction.link }})

{{ matchReasonsFormatted }}

# heading 1

**_italic with star star underscore_**

	> blockquote
	> blockquote

1. First item
2. Second item
3. Third item


- First item
- Second item
- Third item

code

---

![alt text](https://miro.medium.com/max/2400/1*kwEXRR0Dbr3czeVvUPa38Q.jpeg)

	| Syntax | Description |
| ----------- | ----------- |
| Header | Title |
| Paragraph | Text |

	
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}


	Here's a sentence with a footnote. [^1]

[^1]: This is the footnote.

	### My Great Heading {#custom-id}

~~The world is flat.~~

- [x] Write the press release
- [ ] Update the website
- [ ] Contact the media

I need to highlight these ==very important words==.`

const bulletsPlusNumbers = `
* Write the press releaseaa
* Update the website
* Contact the media
and

1. my first item
2. my second item
3. my third item
`;

const oneBullet = '* aaa'

const unfinishedCodeBlock = '```\nhereaa is an unfinished code block\n```';

console.log('*******')

const textFile = fs.readFileSync('/Users/danmckeon/Desktop/sample.txt');

console.log('textFile', textFile);

console.log('encoded textFile', encodeURIComponent(textFile));

// const telegram = transpileMd('simple string', { target: 'telegram' });

const telegram = transpileMd(textFile, { target: 'telegram' });

console.log('telegram', telegram);

console.log('telegramEncoded', encodeURIComponent(telegram));

// const encoded = "%0A%0A*%20%20%20%5C%5Bx%5D%20Write%20the%20press%20release%0A*%20%20%20%5C%5B%20%5D%20Update%20the%20website%0A*%20%20%20%5C%5B%20%5D%20Contact%20the%20media%0A%0AI%20need%20to%20highlight%20these%20%3D%3Dvery%20important%20words%3D%3D.%0A"

// console.log('decodeUriComponent(encoded)', decodeURIComponent(encoded))

const textWithHorizSpace = 'this should be escaped\n```\n and \n\n```.';

console.log(transpileMd(textWithHorizSpace, { target: 'telegram' }));

const ESCAPE_CHARACTERS_REGEX = /\\u0009/g;

const result = textWithHorizSpace.replace(ESCAPE_CHARACTERS_REGEX, 'horiz space!!!');
// const result = encodeURIComponent(textWithHorizSpace);

console.log('result', result);