"use strict";

function getStyleDefinition(css: any) {
  return css ? `<style>${css}</style>` : "";
}

export default class HtmlBuilder {
  styles: string = "";
  body: string = "";

  appendStyle(css: string) {
    this.styles += css;

    return this;
  }

  appendBody(html: string) {
    this.body += html;

    return this;
  }

  toHtml() {
    return `
    <html>
      <head>
          ${getStyleDefinition(this.styles)}
      </head>
      <body>
          ${this.body}
      </body>
    </html>`;
  }
}
