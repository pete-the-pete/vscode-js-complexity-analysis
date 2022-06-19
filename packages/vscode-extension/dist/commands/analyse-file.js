"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const analyzer_1 = require("@js-complexity/analyzer");
const file_analysis_js_1 = __importDefault(require("../models/file-analysis.js"));
const file_report_js_1 = __importDefault(require("../report/file-report.js"));
class AnalyseFile {
    reportFactory;
    navigator;
    constructor(reportFactory, navigator) {
        this.reportFactory = reportFactory;
        this.navigator = navigator;
    }
    buildReport(document) {
        const filePath = vscode_1.workspace.asRelativePath(document.fileName);
        const fileContents = document.getText();
        const rawAnalysis = (0, analyzer_1.analyse)(fileContents);
        const analysis = new file_analysis_js_1.default(filePath, rawAnalysis);
        const report = new file_report_js_1.default(analysis, false);
        this.reportFactory.addReport(filePath, report);
        this.navigator.navigate(`/${filePath}`);
    }
    runAnalysis(editor) {
        try {
            this.buildReport(editor.document);
        }
        catch (e) {
            console.log(e);
            vscode_1.window.showErrorMessage("Failed to analyse file. " + e);
        }
    }
}
exports.default = AnalyseFile;
//# sourceMappingURL=analyse-file.js.map