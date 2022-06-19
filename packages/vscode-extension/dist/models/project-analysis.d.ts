export default class ProjectAnalysis {
    analyses: any;
    add(analysis: any): void;
    calculateTotalSloc(analyses: any): any;
    calculateAverages(analyses: any): {};
    getSummary(): {
        totalSloc: any;
        avgSloc: any;
        avgMaintainability: any;
        avgCyclomatic: any;
        fileAnalyses: any;
    };
}
