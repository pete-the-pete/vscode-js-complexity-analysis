"use strict";

import HtmlBuilder from "./html-builder";
import metricRow from "./metric-row";
import reportStyle from "./report-style";
import header from "./header";
import filesTable from "./files-table";

const overviewMetrics = {
  maintainability: {
    title: "Average Maintainability",
    description:
      "Value between 0 and 100. Represents the relative ease of maintaining the code. A high value means better maintainability.",
    errorRange: [0, 10],
    warningRange: [10, 20],
    infoUrl:
      "https://blogs.msdn.microsoft.com/zainnab/2011/05/26/code-metrics-maintainability-index/",
  },
  loc: {
    title: "Lines of code",
    description: "Logical number of source lines of code.",
    infoUrl: "https://en.wikipedia.org/wiki/Source_lines_of_code",
  },
};

export default class ProjectReport {
  analysis: any;
  errors: any;
  constructor(analysis: any, errors: any) {
    this.analysis = analysis;
    this.errors = errors;
  }

  getErrors(errors: any) {
    return errors.join("<br/>");
  }

  buildProjectSummary(htmlBuilder: any, analysis: any, errors: any) {
    const metrics = [
      {
        metric: overviewMetrics.maintainability,
        value: analysis.avgMaintainability,
      },
      { metric: overviewMetrics.loc, value: analysis.totalSloc },
    ];

    htmlBuilder
      .appendBody(header("Summary"))
      .appendBody(metricRow(metrics))
      .appendBody(header("Files"))
      .appendBody(filesTable(analysis));

    if (errors.length > 0) {
      htmlBuilder
        .appendBody(header("Errors"))
        .appendBody(this.getErrors(errors));
    }
  }

  toHtml() {
    const htmlBuilder = new HtmlBuilder();

    htmlBuilder.appendStyle(reportStyle);

    this.buildProjectSummary(htmlBuilder, this.analysis, this.errors);

    return htmlBuilder.toHtml();
  }
}
