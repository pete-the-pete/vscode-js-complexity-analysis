"use strict";

import { Event, EventEmitter, TextDocumentContentProvider, Uri } from "vscode";

export default class HtmlReportProvider implements TextDocumentContentProvider {
  scheme: any;
  reportFactory: any;

  eventEmitter: EventEmitter<Uri> = new EventEmitter<Uri>();

  constructor(reportFactory: any, options: any) {
    this.scheme = options.scheme;
    this.reportFactory = reportFactory;
    this.eventEmitter;
  }

  getHtml(path: any) {
    const report = this.reportFactory.getReport(path);
    if (report) {
      const html = report.toHtml();
      return html;
    }

    return `Invalid path ${path}`;
  }

  provideTextDocumentContent(uri: Uri): any {
    // Remove leading slash unless it's alone
    const path = uri.path.replace(/^\//, "") || "/";

    return this.getHtml(path);
  }

  onDidChange: Event<Uri> = this.eventEmitter.event;

  update(uri: Uri) {
    this.eventEmitter.fire(uri);
  }
}