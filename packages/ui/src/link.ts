"use strict";

import { workspace } from "vscode";
import { join } from "path";

const navigation = {
  scheme:    "jsComplexityAnalysis",
  authority: "complexity-analysis"
};

const BASE_URL = `${navigation.scheme}://${navigation.authority}/`;

export function localLink(localUrl: any, name: any) {
  const url = BASE_URL + localUrl;
  const href = encodeURI(`command:vscode.previewHtml?${JSON.stringify(url)}`);

  return `<a href="${href}">${name}</a>`;
}

export function fileLineLink(name: any, file: any, line: any) {
  const rootWorkspace = workspace.workspaceFolders?.[0]; // .rootPath;
  if (rootWorkspace) {
    const href = `file://${join(rootWorkspace.uri.toString(), file)}#L${line}`;

    return `<a href="${href}">${name}</a>`;
  }
}
