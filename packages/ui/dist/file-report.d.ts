export default class FileReport {
    analysis: any;
    includeBackLink: boolean;
    constructor(analysis: any, includeBackLink?: boolean);
    backLink(): string;
    buildFileSummary(htmlBuilder: any, analysis: any, includeBackLink: any): void;
    toHtml(): any;
}
