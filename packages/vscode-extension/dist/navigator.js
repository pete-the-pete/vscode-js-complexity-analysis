"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = __importStar(require("vscode"));
const vscode_1 = require("vscode");
class Navigator {
    navigate;
    constructor(options, reportProvider) {
        function getTargetColumn() {
            const numOpenEditors = vscode_1.window.visibleTextEditors.length;
            switch (numOpenEditors) {
                case 0:
                    return vscode_1.ViewColumn.One;
                case 1:
                    return vscode_1.ViewColumn.Two;
                case 2:
                    return vscode_1.ViewColumn.Three;
                case 3:
                    return vscode_1.ViewColumn.Three;
                default:
                    return vscode_1.ViewColumn.One;
            }
        }
        function navigate(path) {
            const panel = vscode.window.createWebviewPanel("complexity-analysis", // Identifies the type of the webview. Used internally
            "Complexity Analysis Coding", // Title of the panel displayed to the user
            getTargetColumn(), // Editor column to show the new webview panel in.
            {} // Webview options. More on these later.
            );
            const uri = vscode_1.Uri.parse(`${options.scheme}://${options.authority}${path}`);
            reportProvider.update(uri);
            panel.webview.html = reportProvider.provideTextDocumentContent(uri);
        }
        this.navigate = navigate;
    }
}
exports.default = Navigator;
//# sourceMappingURL=navigator.js.map