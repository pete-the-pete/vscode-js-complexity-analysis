"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileLineLink = exports.localLink = void 0;
const config_1 = __importDefault(require("../config"));
const vscode_1 = require("vscode");
const path_1 = require("path");
const BASE_URL = `${config_1.default.options.navigation.scheme}://${config_1.default.options.navigation.authority}/`;
function localLink(localUrl, name) {
    const url = BASE_URL + localUrl;
    const href = encodeURI(`command:vscode.previewHtml?${JSON.stringify(url)}`);
    return `<a href="${href}">${name}</a>`;
}
exports.localLink = localLink;
function fileLineLink(name, file, line) {
    const rootWorkspace = vscode_1.workspace.workspaceFolders?.at(0); // .rootPath;
    if (rootWorkspace) {
        const href = `file://${(0, path_1.join)(rootWorkspace.uri.toString(), file)}#L${line}`;
        return `<a href="${href}">${name}</a>`;
    }
}
exports.fileLineLink = fileLineLink;
//# sourceMappingURL=link.js.map