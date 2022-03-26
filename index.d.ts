interface Options {
  target: 'html' | 'slack' | 'telegram' | 'discord' | 'safe-md';
  highlight: object;
}

declare module "transpile-md" {
  function transpileMd(markdown: string, options: Options): string;
  export = transpileMd;
}
