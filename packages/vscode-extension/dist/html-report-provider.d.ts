import { Event, EventEmitter, TextDocumentContentProvider, Uri } from "vscode";
export default class HtmlReportProvider implements TextDocumentContentProvider {
    scheme: any;
    reportFactory: any;
    eventEmitter: EventEmitter<Uri>;
    constructor(reportFactory: any, options: any);
    getHtml(path: any): any;
    provideTextDocumentContent(uri: Uri): any;
    onDidChange: Event<Uri>;
    update(uri: Uri): void;
}
