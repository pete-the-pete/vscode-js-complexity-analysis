import FileAnalysis from "../models/file-analysis.js";
export default class AnalyseProject {
    reportFactory: any;
    navigator: any;
    constructor(reportFactory: any, navigator: any);
    runAnalysis(): void;
    buildReport(): Promise<void>;
    analyseSingleFile({ fsPath, relativePath }: any): Promise<string | FileAnalysis>;
    createAggregateReport(analyses: any): void;
    handleError(error: any): void;
}
