declare module 'clean-css' {
  interface CleanCSSOptions {
    level?: number | object;
    rebase?: boolean;
    [key: string]: any;
  }

  interface CleanCSSOutput {
    styles: string;
    errors: string[];
    warnings: string[];
  }

  class CleanCSS {
    constructor(options?: CleanCSSOptions);
    minify(source: string | string[]): CleanCSSOutput;
  }

  export = CleanCSS;
}
