Here’s a cleaned-up and complete `README.md` for your **Liquid Minifier** VS Code extension, based on the template you shared but tailored to your tool:

---

# Liquid Minifier README

**Liquid Minifier** is a Visual Studio Code extension that minifies HTML files while preserving Liquid template syntax (`{{ ... }}` and `{% ... %}`).

It’s designed for developers working with Shopify themes, Jekyll sites, or any project that mixes HTML with Liquid, where a standard HTML minifier would break template tags.

---

## Features

* **HTML Minification** — Collapses whitespace, removes comments, and optimizes markup.
* **Liquid-Safe** — Leaves Liquid tags untouched, so your templates still render correctly.
* **One-Click Command** — Run from the Command Palette (`Cmd+Shift+P` → “Minify HTML with Liquid”).
* **Optional Keybinding** — Quickly minify with a custom shortcut (e.g., `Cmd+Alt+M`).
* **In-Place Editing** — Replaces the current file contents with the minified version.

Example:

**Before**

```html
<div class="product">
  <h1>{{ product.title }}</h1>
  {% if product.available %}
    <p>In stock</p>
  {% endif %}
</div>
```

**After**

```html
<div class="product"><h1>{{ product.title }}</h1>{% if product.available %}<p>In stock</p>{% endif %}</div>
```

---

## Requirements

* **Visual Studio Code** v1.92.0 or later.
* **Node.js** (only required for development/building the extension).
* No runtime dependencies — works out of the box once installed.

---

## Extension Settings

This extension does not currently contribute any custom settings.
Future versions may include configuration for:

* Minification rules
* Ignored file types
* Keybinding customization

---

## Known Issues

* Minification is all-or-nothing — currently processes the entire file, not selections.
* Inline CSS and JavaScript are not minified by default (to avoid breaking Liquid syntax inside scripts).
* No undo confirmation — use VS Code’s Undo (`Cmd+Z`) if the result isn’t what you expect.

---

## Release Notes

### 1.0.0

* Initial release
* Added HTML minification with Liquid syntax preservation
* Command Palette and optional keybinding support

---

## Following Extension Guidelines

This extension follows the official [VS Code Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines).

---

## For more information

* [Visual Studio Code Extension Docs](https://code.visualstudio.com/api)
* [Liquid Templating Language Docs](https://shopify.dev/docs/api/liquid)
* [html-minifier-terser on npm](https://www.npmjs.com/package/html-minifier-terser)

---

**Enjoy faster, cleaner, Liquid-safe HTML!**

---

If you want, I can also write you a **`CHANGELOG.md`** so your VS Code Marketplace listing will automatically display release history. That’s something a lot of extensions skip but makes them look polished.
Do you want me to prepare that?
