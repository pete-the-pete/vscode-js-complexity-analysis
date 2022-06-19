"use strict";

import { commands, workspace } from "vscode";

import config from "./config";
import Navigator from "./navigator";
import ReportFactory from "./report-factory";
import HtmlReportProvider from "./html-report-provider";
import AnalyseFileCommand from "./commands/analyse-file";
import AnalyseProjectCommand from "./commands/analyse-project";

const AnalyseFileCmdName = "complexityAnalysis.analyseFile";
const AnalyseProjectCmdName = "complexityAnalysis.analyseProject";

export default class Controller {
  context: any;
  reportFactory: ReportFactory;
  reportProvider: HtmlReportProvider;
  navigator: Navigator;
  cmdAnalyseFile: AnalyseFileCommand;
  cmdAnalyseProject: AnalyseProjectCommand;

  constructor(context: any) {
    this.context = context;

    this.reportFactory = new ReportFactory();
    this.reportProvider = new HtmlReportProvider(
      this.reportFactory,
      config.options.navigation
    );
    this.navigator = new Navigator(
      config.options.navigation,
      this.reportProvider
    );
    this.cmdAnalyseFile = new AnalyseFileCommand(
      this.reportFactory,
      this.navigator
    );
    this.cmdAnalyseProject = new AnalyseProjectCommand(
      this.reportFactory,
      this.navigator
    );
  }

  activate() {
    this.context.subscriptions.push(
      commands.registerTextEditorCommand(AnalyseFileCmdName, (editor) =>
        this.cmdAnalyseFile.runAnalysis(editor)
      )
    );

    this.context.subscriptions.push(
      commands.registerCommand(AnalyseProjectCmdName, () =>
        this.cmdAnalyseProject.runAnalysis()
      )
    );

    this.context.subscriptions.push(
      workspace.registerTextDocumentContentProvider(
        config.options.navigation.scheme,
        this.reportProvider
      )
    );
  }
}
