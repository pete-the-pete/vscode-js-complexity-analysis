"use strict";

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'vscode' or its corresponding t... Remove this comment to see the full error message
import * as vscode from 'vscode';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'vscode' or its corresponding t... Remove this comment to see the full error message
import { window, ViewColumn, Uri } from "vscode";

class Navigator {
  navigate: any;
  constructor(options: any, reportProvider: any) {
    function getTargetColumn() {
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

    function navigate(path: any) {
      const panel = vscode.window.createWebviewPanel(
        "complexity-analysis", // Identifies the type of the webview. Used internally
        "Complexity Analysis Coding", // Title of the panel displayed to the user
        getTargetColumn(), // Editor column to show the new webview panel in.
        {} // Webview options. More on these later.
      );

      const uri = Uri.parse(`${options.scheme}://${options.authority}${path}`);
        reportProvider.update(uri);
        panel.webview.html = reportProvider.provideTextDocumentContent(uri);
    }

    this.navigate = navigate;
  }
}

export default Navigator;
