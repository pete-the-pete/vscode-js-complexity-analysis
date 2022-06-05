"use strict";

import { workspace, window } from "vscode";
import Analyzer from "../complexity-analyzer";
import FileAnalysis from "../models/file-analysis.js";
import FileReport from "../report/file-report.js";

export default class AnalyseFile {
    reportFactory: any;
    navigator: any;

    constructor(reportFactory: any, navigator: any) {
      this.reportFactory = reportFactory;
      this.navigator = navigator;
    }

    buildReport(document: any) {
        const filePath = workspace.asRelativePath(document.fileName);

        const fileContents = document.getText();
        const rawAnalysis = Analyzer.analyse(fileContents);
        const analysis = new FileAnalysis(filePath, rawAnalysis);

        const report = new FileReport(analysis, false);
        this.reportFactory.addReport(filePath, report);

        this.navigator.navigate(`/${ filePath }`);
    }

    runAnalysis(editor: any) {
        try {
            this.buildReport(editor.document);
        } catch (e) {
            console.log(e);
            window.showErrorMessage("Failed to analyse file. " + e);
        }
    }
}
