declare module "markdown-converter" {
  function convertMarkdown(markdown: string, isTelegram?: boolean): string;
  export = convertMarkdown;
}
