"use strict";

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'vscode' or its corresponding t... Remove this comment to see the full error message
import { EventEmitter } from "vscode";

/**
 *
 */
function HtmlReportProvider(this: any, reportFactory: any, options: any) {
    const eventEmitter = new EventEmitter();
    this.scheme = options.scheme;

    function getHtml(path: any) {
        const report = reportFactory.getReport(path);
        if (report) {
            const html = report.toHtml();
            return html;
        }

        return `Invalid path ${ path }`;
    }

    this.provideTextDocumentContent = function(uri: any) {
        // Remove leading slash unless it's alone
        const path = uri.path.replace(/^\//, "") || "/";

        return getHtml(path);
    };

    this.onDidChange = function() {
        return eventEmitter.event;
    };

    this.update = function(uri: any) {
        eventEmitter.fire(uri);
    };
}

export default HtmlReportProvider;
