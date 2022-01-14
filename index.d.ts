declare module "slackify-markdown" {
  function slackify(markdown: string, isTelegram?: boolean): string;
  export = slackify;
}
