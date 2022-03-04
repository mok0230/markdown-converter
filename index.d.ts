declare module "transpile-md" {
  function convertMarkdown(markdown: string, isTelegram?: boolean): string;
  export = convertMarkdown;
}
