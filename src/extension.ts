import * as vscode from 'vscode';
// If you created a local type shim, keep using the ESM import:
import { minify } from 'html-minifier-terser';
// Clean-CSS for CSS minification
import CleanCSS from 'clean-css';

function protectLiquid(input: string) {
  const tokens: string[] = [];
  // Matches {{ ... }} and {% ... %} (with optional - trimming)
  const re = /{{[\s\S]*?}}|{%-?[\s\S]*?-?%}/g;

  const shielded = input.replace(re, (m) => {
    const id = `__LIQUID_TOKEN_${tokens.length}__`;
    tokens.push(m);
    return id;
  });

  return {
    shielded,
    restore: (text: string) =>
      tokens.reduce((acc, tok, i) => acc.replace(new RegExp(`__LIQUID_TOKEN_${i}__`, 'g'), tok), text),
  };
}

const cleanCss = new CleanCSS({
  level: 2,           // aggressive but safe
  rebase: false,      // don't rewrite urls
});

// make it async so it returns a Promise<string>
async function minifyCssPreservingLiquid(css: string, _type?: string): Promise<string> {
  const { shielded, restore } = protectLiquid(css);
  const out = cleanCss.minify(shielded);

  if (out.errors && out.errors.length) {
    console.warn('clean-css errors:', out.errors);
    // return original CSS if minification fails
    return css;
  }
  return restore(out.styles || shielded);
}


export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand('liquid-html-minifier.minify', async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const document = editor.document;
    const text = document.getText();

    try {
      const result = await minify(text, {
        collapseWhitespace: true,
        removeComments: true,
        // Minify CSS in <style> tags and style="" attributes – Liquid-safe
        minifyCSS: minifyCssPreservingLiquid,
        // Keep JS off by default to avoid interfering with Liquid in scripts
        minifyJS: false,
        // Preserve Liquid in HTML
        ignoreCustomFragments: [
          /{{[\s\S]*?}}/g,     // {{ ... }}
          /{%-?[\s\S]*?-?%}/g, // {% ... %}
        ],
      });

      const fullRange = new vscode.Range(
        document.positionAt(0),
        document.positionAt(text.length),
      );

      await editor.edit((eb) => eb.replace(fullRange, result));
      vscode.window.showInformationMessage('Minified HTML + CSS (Liquid-safe).');
    } catch (err: any) {
      vscode.window.showErrorMessage(`Minification error: ${err?.message ?? err}`);
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
