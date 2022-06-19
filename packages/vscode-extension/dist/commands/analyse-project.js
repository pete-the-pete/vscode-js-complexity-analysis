"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("fs/promises");
const vscode_1 = require("vscode");
const analyzer_1 = require("@js-complexity/analyzer");
const workspace_1 = require("../utils/workspace");
const file_analysis_js_1 = __importDefault(require("../models/file-analysis.js"));
const project_analysis_js_1 = __importDefault(require("../models/project-analysis.js"));
const file_report_js_1 = __importDefault(require("../report/file-report.js"));
const project_report_js_1 = __importDefault(require("../report/project-report.js"));
class AnalyseProject {
    reportFactory;
    navigator;
    constructor(reportFactory, navigator) {
        this.reportFactory = reportFactory;
        this.navigator = navigator;
    }
    runAnalysis() {
        try {
            this.buildReport().then(null, this.handleError);
        }
        catch (error) {
            this.handleError(error);
        }
    }
    buildReport() {
        return (0, workspace_1.getWorkspaceFiles)()
            .then((files) => {
            const analysePromises = files.map((file) => this.analyseSingleFile(file));
            return Promise.all(analysePromises);
        })
            .then((analyses) => this.createAggregateReport(analyses));
    }
    analyseSingleFile({ fsPath, relativePath }) {
        return (0, promises_1.readFile)(fsPath, "utf8").then((fileContents) => {
            try {
                const rawAnalysis = (0, analyzer_1.analyse)(fileContents);
                const analysis = new file_analysis_js_1.default(relativePath, rawAnalysis);
                const report = new file_report_js_1.default(analysis);
                this.reportFactory.addReport(relativePath, report);
                return analysis;
            }
            catch (e) {
                const errorMsg = `File ${relativePath} analysis failed: ${e}`;
                console.error(errorMsg);
                return errorMsg;
            }
        });
    }
    createAggregateReport(analyses) {
        const projectAnalysis = new project_analysis_js_1.default();
        const errors = [];
        analyses.forEach((analysis) => {
            if (typeof analysis !== "string") {
                projectAnalysis.add(analysis);
            }
            else {
                errors.push(analysis);
            }
        });
        const aggregate = projectAnalysis.getSummary();
        const report = new project_report_js_1.default(aggregate, errors);
        this.reportFactory.addReport("/", report);
        this.navigator.navigate("/");
    }
    handleError(error) {
        vscode_1.window.showErrorMessage("Failed to analyse file. " + error);
        console.log(error);
    }
}
exports.default = AnalyseProject;
//# sourceMappingURL=analyse-project.js.map