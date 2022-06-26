"use strict";

import { readFile } from "fs/promises";
import { window } from "vscode";
import { analyse } from "@js-complexity/analyzer";
import { getWorkspaceFiles } from "../utils/workspace";

import FileAnalysis from "../models/file-analysis.js";
import ProjectAnalysis from "../models/project-analysis.js";
import { FileReport, ProjectReport } from "@js-complexity/ui";

export default class AnalyseProject {
  reportFactory: any;
  navigator: any;
  constructor(reportFactory: any, navigator: any) {
    this.reportFactory = reportFactory;
    this.navigator = navigator;
  }

  runAnalysis() {
    try {
      this.buildReport().then(null, this.handleError);
    } catch (error) {
      this.handleError(error);
    }
  }

  buildReport() {
    return getWorkspaceFiles()
      .then((files: any) => {
        const analysePromises = files.map((file: any) =>
          this.analyseSingleFile(file)
        );

        return Promise.all(analysePromises);
      })
      .then((analyses: any) => this.createAggregateReport(analyses));
  }

  analyseSingleFile({ fsPath, relativePath }: any) {
    return readFile(fsPath, "utf8").then((fileContents: any) => {
      try {
        const rawAnalysis = analyse(fileContents);
        const analysis = new FileAnalysis(relativePath, rawAnalysis);

        const report = new FileReport(analysis);
        this.reportFactory.addReport(relativePath, report);

        return analysis;
      } catch (e) {
        const errorMsg = `File ${relativePath} analysis failed: ${e}`;
        console.error(errorMsg);
        return errorMsg;
      }
    });
  }

  createAggregateReport(analyses: any) {
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

    const report = new ProjectReport(aggregate, errors);
    this.reportFactory.addReport("/", report);

    this.navigator.navigate("/");
  }

  handleError(error: any) {
    window.showErrorMessage("Failed to analyse file. " + error);
    console.log(error);
  }
}
