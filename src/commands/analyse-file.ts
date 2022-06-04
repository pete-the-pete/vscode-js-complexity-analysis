"use strict";

import { workspace, window } from "vscode";
import Analyzer from "../complexity-analyzer";
import FileAnalysis from "../models/file-analysis.js";
import FileReport from "../report/file-report.js";

function AnalyseFile(this: any, reportFactory: any, navigator: any) {

    function buildReport(document: any) {
        const filePath = workspace.asRelativePath(document.fileName);

        const fileContents = document.getText();
        const rawAnalysis = Analyzer.analyse(fileContents);
        // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
        const analysis = new FileAnalysis(filePath, rawAnalysis);

        // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
        const report = new FileReport(analysis, false);
        reportFactory.addReport(filePath, report);

        navigator.navigate(`/${ filePath }`);
    }

    function runAnalysis(editor: any) {
        try {
            buildReport(editor.document);
        } catch (e) {
            console.log(e);
            window.showErrorMessage("Failed to analyse file. " + e);
        }
    }

    this.execute = runAnalysis;
}

export default AnalyseFile;
