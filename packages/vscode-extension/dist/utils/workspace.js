"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWorkspaceFiles = void 0;
const config_1 = __importDefault(require("../config"));
const vscode_1 = require("vscode");
/**
 * Returns files in the workspace by taking include and
 * exclude pattern into consideration
 *
 * @returns {Uri}
 */
function getWorkspaceFiles() {
    return config_1.default.getIncludeExclude()
        .then(({ include, exclude }) => {
        const includePattern = _createGlob(include);
        const excludePattern = _createGlob(exclude);
        return vscode_1.workspace.findFiles(includePattern, excludePattern);
    })
        .then((files) => files.map((fileUri) => ({
        fsPath: fileUri.fsPath,
        relativePath: vscode_1.workspace.asRelativePath(fileUri)
    })));
}
exports.getWorkspaceFiles = getWorkspaceFiles;
function _createGlob(patterns) {
    switch (patterns.length) {
        case 0:
            return "";
        case 1:
            return patterns[0];
        default:
            return `{${patterns.join(",")}}`;
    }
}
;
//# sourceMappingURL=workspace.js.map