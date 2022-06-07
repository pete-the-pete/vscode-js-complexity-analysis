"use strict";

import * as vscode from "vscode";
import { window, ViewColumn, Uri } from "vscode";

export default class Navigator {
  options: any;
  reportProvider: any;

  constructor(options: any, reportProvider: any) {
    this.options = options;
    this.reportProvider = reportProvider;
  }

  getTargetColumn() {
    const numOpenEditors = window.visibleTextEditors.length;

    switch (numOpenEditors) {
      case 0:
        return ViewColumn.One;
      case 1:
        return ViewColumn.Two;
      case 2:
        return ViewColumn.Three;
      case 3:
        return ViewColumn.Three;
      default:
        return ViewColumn.One;
    }
  }

  navigate(path: any) {
    const panel = vscode.window.createWebviewPanel(
      "complexity-analysis", // Identifies the type of the webview. Used internally
      "Complexity Analysis Coding", // Title of the panel displayed to the user
      this.getTargetColumn(), // Editor column to show the new webview panel in.
      {} // Webview options. More on these later.
    );

    const uri = Uri.parse(
      `${this.options.scheme}://${this.options.authority}${path}`
    );
    this.reportProvider.update(uri);
    panel.webview.html = this.reportProvider.provideTextDocumentContent(uri);
  }
}
