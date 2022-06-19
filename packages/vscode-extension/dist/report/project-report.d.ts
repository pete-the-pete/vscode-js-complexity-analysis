export default class ProjectReport {
    analysis: any;
    errors: any;
    constructor(analysis: any, errors: any);
    getErrors(errors: any): any;
    buildProjectSummary(htmlBuilder: any, analysis: any, errors: any): void;
    toHtml(): any;
}
