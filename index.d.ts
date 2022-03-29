type TranspileTarget = 'html' | 'slack' | 'telegram' | 'discord' | 'safe-md';

interface TranspileOptions {
  target: TranspileTarget;
  highlight?: object;
}

declare module "transpile-md" {
  function transpileMd(markdown: string, options: TranspileOptions): string;
  export = transpileMd;
}
