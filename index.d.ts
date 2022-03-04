declare module "transpile-md" {
  function transpileMd(markdown: string, isTelegram?: boolean): string;
  export = transpileMd;
}
