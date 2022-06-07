"use strict";

export default class ReportFactory {
  // Key: report uri as string
  // Value: FileReport
  reports: Map<any, any> = new Map();

  addReport(path: any, report: any) {
    this.reports.set(path, report);
  }

  getReport(uri: any) {
    return this.reports.get(uri);
  }

  clear() {
    this.reports.clear();
  }
}
