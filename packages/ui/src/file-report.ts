"use strict";

import HtmlBuilder from "./html-builder";
import metricRow from "./metric-row";
import reportStyle from "./report-style";
import header from "./header";
import functionsTable from "./functions-table";
import { localLink } from "./link";

const overviewMetrics = {
  maintainability: {
    title: "Maintainability",
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
  difficulty: {
    title: "Difficulty",
    description: "How difficult it is to write or understand the program.",
    errorRange: [60, 9999],
    warningRange: [30, 60],
    infoUrl: "https://en.wikipedia.org/wiki/Halstead_complexity_measures",
  },
  bugs: {
    title: "Estimated # of Bugs",
    description: "Estimate for the number of errors in the implementation.",
    errorRange: [60, 9999],
    warningRange: [30, 60],
    infoUrl: "https://en.wikipedia.org/wiki/Halstead_complexity_measures",
  },
};

export default class FileReport {
  analysis: any;
  includeBackLink: boolean;

  constructor(analysis: any, includeBackLink = true) {
    this.analysis = analysis;
    this.includeBackLink = includeBackLink;
  }

  backLink() {
    return `${localLink("", "&#9664; back")}`;
  }

  buildFileSummary(htmlBuilder: any, analysis: any, includeBackLink: any) {
    const metrics = [
      {
        metric: overviewMetrics.maintainability,
        value: analysis.maintainability,
      },
      { metric: overviewMetrics.loc, value: analysis.sloc },
      { metric: overviewMetrics.difficulty, value: analysis.difficulty },
      { metric: overviewMetrics.bugs, value: analysis.bugs },
    ];

    htmlBuilder.appendBody(header("Summary")).appendBody(metricRow(metrics));

    if (analysis.functions.length > 0) {
      htmlBuilder
        .appendBody(header("Functions"))
        .appendBody(functionsTable(analysis.path, analysis.functions));
    }

    analysis.classes.forEach((classAnalysis: any) => {
      htmlBuilder
        .appendBody(header(`class ${classAnalysis.name}`))
        .appendBody(functionsTable(analysis.path, classAnalysis.methods))
        .appendBody("<br><br>");
    });

    if (includeBackLink) {
      htmlBuilder.appendBody(this.backLink());
    }
  }

  toHtml() {
    const htmlBuilder = new HtmlBuilder();

    htmlBuilder.appendStyle(reportStyle);

    this.buildFileSummary(htmlBuilder, this.analysis, this.includeBackLink);

    return htmlBuilder.toHtml();
  }
}
