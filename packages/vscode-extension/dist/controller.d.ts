import Navigator from "./navigator";
import ReportFactory from "./report-factory";
import HtmlReportProvider from "./html-report-provider";
import AnalyseFileCommand from "./commands/analyse-file";
import AnalyseProjectCommand from "./commands/analyse-project";
export default class Controller {
    context: any;
    reportFactory: ReportFactory;
    reportProvider: HtmlReportProvider;
    navigator: Navigator;
    cmdAnalyseFile: AnalyseFileCommand;
    cmdAnalyseProject: AnalyseProjectCommand;
    constructor(context: any);
    activate(): void;
}
