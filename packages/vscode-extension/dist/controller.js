"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const config_1 = __importDefault(require("./config"));
const navigator_1 = __importDefault(require("./navigator"));
const report_factory_1 = __importDefault(require("./report-factory"));
const html_report_provider_1 = __importDefault(require("./html-report-provider"));
const analyse_file_1 = __importDefault(require("./commands/analyse-file"));
const analyse_project_1 = __importDefault(require("./commands/analyse-project"));
const AnalyseFileCmdName = "complexityAnalysis.analyseFile";
const AnalyseProjectCmdName = "complexityAnalysis.analyseProject";
class Controller {
    context;
    reportFactory;
    reportProvider;
    navigator;
    cmdAnalyseFile;
    cmdAnalyseProject;
    constructor(context) {
        this.context = context;
        this.reportFactory = new report_factory_1.default();
        this.reportProvider = new html_report_provider_1.default(this.reportFactory, config_1.default.options.navigation);
        this.navigator = new navigator_1.default(config_1.default.options.navigation, this.reportProvider);
        this.cmdAnalyseFile = new analyse_file_1.default(this.reportFactory, this.navigator);
        this.cmdAnalyseProject = new analyse_project_1.default(this.reportFactory, this.navigator);
    }
    activate() {
        this.context.subscriptions.push(vscode_1.commands.registerTextEditorCommand(AnalyseFileCmdName, (editor) => this.cmdAnalyseFile.runAnalysis(editor)));
        this.context.subscriptions.push(vscode_1.commands.registerCommand(AnalyseProjectCmdName, () => this.cmdAnalyseProject.runAnalysis()));
        this.context.subscriptions.push(vscode_1.workspace.registerTextDocumentContentProvider(config_1.default.options.navigation.scheme, this.reportProvider));
    }
}
exports.default = Controller;
//# sourceMappingURL=controller.js.map