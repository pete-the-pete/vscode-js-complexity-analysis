"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
class HtmlReportProvider {
    scheme;
    reportFactory;
    eventEmitter = new vscode_1.EventEmitter();
    constructor(reportFactory, options) {
        this.scheme = options.scheme;
        this.reportFactory = reportFactory;
        this.eventEmitter;
    }
    getHtml(path) {
        const report = this.reportFactory.getReport(path);
        if (report) {
            const html = report.toHtml();
            return html;
        }
        return `Invalid path ${path}`;
    }
    provideTextDocumentContent(uri) {
        // Remove leading slash unless it's alone
        const path = uri.path.replace(/^\//, "") || "/";
        return this.getHtml(path);
    }
    onDidChange = this.eventEmitter.event;
    update(uri) {
        this.eventEmitter.fire(uri);
    }
}
exports.default = HtmlReportProvider;
//# sourceMappingURL=html-report-provider.js.map