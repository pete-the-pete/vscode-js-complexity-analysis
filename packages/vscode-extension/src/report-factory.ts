"use strict";

class ReportFactory {
    addReport: any;
    clear: any;
    getReport: any;
    constructor() {
        // Key: report uri as string
        // Value: FileReport
        const reports = new Map();

        function addReport(path: any, report: any) {
            reports.set(path, report);
        }

        function getReport(uri: any) {
            return reports.get(uri);
        }

        function clear() {
            reports.clear();
        }

        this.addReport = addReport;
        this.getReport = getReport;
        this.clear = clear;
    }
}

export default ReportFactory;
