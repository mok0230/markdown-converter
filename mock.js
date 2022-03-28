const transpileMd = require('./index');

const markdown = `changed just first line

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

\`code\`

---

![alt text](https://miro.medium.com/max/2400/1*kwEXRR0Dbr3czeVvUPa38Q.jpeg)

	| Syntax | Description |
| ----------- | ----------- |
| Header | Title |
| Paragraph | Text |

	\`\`\`
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
\`\`\`

	Here's a sentence with a footnote. [^1]

[^1]: This is the footnote.

	### My Great Heading {#custom-id}

~~The world is flat.~~

- [x] Write the press release
- [ ] Update the website
- [ ] Contact the media

I need to highlight these ==very important words==.`

const transpiled = transpileMd(markdown, {target: 'telegram'});

console.log('raw transpiled', transpiled);

console.log('encoded transpiled', encodeURIComponent(transpiled));