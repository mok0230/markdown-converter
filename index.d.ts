type TranspileExcludeHtmlTarget = 'slack' | 'telegram' | 'discord' | 'safe-md';

type TranspileTarget = TranspileExcludeHtmlTarget | 'html';

interface TranspileToHtmlOptions {
  highlight?: object;
}

interface TranspileExcludeHtmlOptions {
  target: TranspileExcludeHtmlTarget;
}

interface TranspileOptions {
  target: TranspileTarget;
  highlight?: object;
}

declare module "transpile-md" {
  export function transpileMd(markdown: string, options: TranspileOptions): string;
  export function transpileMdToHtml(markdown: string, options?: TranspileToHtmlOptions): string;
  export function transpileMdExcludeHtml(markdown: string, options: TranspileExcludeHtmlOptions): string;
}
