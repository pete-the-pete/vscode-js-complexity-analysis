"use strict";

function getStyleDefinition(css: any) {
    return css ? `<style>${ css }</style>` : "";
}

class HtmlBuilder {
    appendBody: any;
    appendStyle: any;
    toHtml: any;
    constructor() {
        let styles = "";
        let body = "";

        function appendStyle(this: any, css: any) {
            styles += css;

            return this;
        }

        function appendBody(this: any, html: any) {
            body += html;

            return this;
        }

        function toHtml() {
            return `<html>
    <head>
        ${getStyleDefinition(styles)}
    </head>
    <body>
        ${body}
    </body>
</html>`;
        }

        this.appendStyle = appendStyle;
        this.appendBody = appendBody;
        this.toHtml = toHtml;
    }
}

export default HtmlBuilder;
