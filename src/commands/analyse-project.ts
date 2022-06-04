"use strict";

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'fs' or its corresponding type ... Remove this comment to see the full error message
import { readFileAsync } from "fs";
import { window } from "vscode";
// @ts-expect-error ts-migrate(2614) FIXME: Module '"../complexity-analyzer"' has no exported ... Remove this comment to see the full error message
import { analyse } from "../complexity-analyzer";
// @ts-expect-error ts-migrate(2614) FIXME: Module '"../utils/workspace"' has no exported memb... Remove this comment to see the full error message
import { getWorkspaceFiles } from "../utils/workspace";

import FileAnalysis from "../models/file-analysis.js";
import ProjectAnalysis from "../models/project-analysis.js";
import FileReport from "../report/file-report.js";
import ProjectReport from "../report/project-report.js";

function AnalyseProject(this: any, reportFactory: any, navigator: any) {
    function runAnalysis() {
        try {
            buildReport()
                .then(null, handleError);
        } catch (error) {
            handleError(error);
        }
    }

    function buildReport() {
        return getWorkspaceFiles()
            .then((files: any) => {
                const analysePromises = files.map(analyseSingleFile);

                return Promise.all(analysePromises);
            })
            .then(createAggregateReport);
    }

    function analyseSingleFile({
        fsPath,
        relativePath
    }: any) {
        return readFileAsync(fsPath, "utf8")
            .then((fileContents: any) => {
                try {
                    const rawAnalysis = analyse(fileContents);
                    // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
                    const analysis = new FileAnalysis(relativePath, rawAnalysis);

                    // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
                    const report = new FileReport(analysis);
                    reportFactory.addReport(relativePath, report);

                    return analysis;
                } catch (e) {
                    const errorMsg = `File ${ relativePath } analysis failed: ${ e }`;
                    console.error(errorMsg);
                    return errorMsg;
                }
            });
    }

    function createAggregateReport(analyses: any, channel: any, metrics: any) {
        // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
        const projectAnalysis = new ProjectAnalysis();
        const errors: any = [];

        analyses.forEach((analysis: any) => {
            if (typeof analysis !== "string") {
                projectAnalysis.add(analysis);
            } else {
                errors.push(analysis);
            }
        });

        const aggregate = projectAnalysis.getSummary();

        // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
        const report = new ProjectReport(aggregate, errors);
        reportFactory.addReport("/", report);

        navigator.navigate("/");
    }

    function handleError(error: any) {
        window.showErrorMessage("Failed to analyse file. " + error);
        console.log(error);
    }

    this.execute = runAnalysis;
}

export default AnalyseProject;
