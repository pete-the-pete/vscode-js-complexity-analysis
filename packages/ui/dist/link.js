"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileLineLink = exports.localLink = void 0;
const vscode_1 = require("vscode");
const path_1 = require("path");
const navigation = {
    scheme: "jsComplexityAnalysis",
    authority: "complexity-analysis"
};
const BASE_URL = `${navigation.scheme}://${navigation.authority}/`;
function localLink(localUrl, name) {
    const url = BASE_URL + localUrl;
    const href = encodeURI(`command:vscode.previewHtml?${JSON.stringify(url)}`);
    return `<a href="${href}">${name}</a>`;
}
exports.localLink = localLink;
function fileLineLink(name, file, line) {
    const rootWorkspace = vscode_1.workspace.workspaceFolders?.[0]; // .rootPath;
    if (rootWorkspace) {
        const href = `file://${(0, path_1.join)(rootWorkspace.uri.toString(), file)}#L${line}`;
        return `<a href="${href}">${name}</a>`;
    }
}
exports.fileLineLink = fileLineLink;
//# sourceMappingURL=link.js.map