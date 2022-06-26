"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const html_builder_1 = __importDefault(require("./html-builder"));
const metric_row_1 = __importDefault(require("./metric-row"));
const report_style_1 = __importDefault(require("./report-style"));
const header_1 = __importDefault(require("./header"));
const functions_table_1 = __importDefault(require("./functions-table"));
const link_1 = require("./link");
const overviewMetrics = {
    maintainability: {
        title: "Maintainability",
        description: "Value between 0 and 100. Represents the relative ease of maintaining the code. A high value means better maintainability.",
        errorRange: [0, 10],
        warningRange: [10, 20],
        infoUrl: "https://blogs.msdn.microsoft.com/zainnab/2011/05/26/code-metrics-maintainability-index/",
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
class FileReport {
    analysis;
    includeBackLink;
    constructor(analysis, includeBackLink = true) {
        this.analysis = analysis;
        this.includeBackLink = includeBackLink;
    }
    backLink() {
        return `${(0, link_1.localLink)("", "&#9664; back")}`;
    }
    buildFileSummary(htmlBuilder, analysis, includeBackLink) {
        const metrics = [
            {
                metric: overviewMetrics.maintainability,
                value: analysis.maintainability,
            },
            { metric: overviewMetrics.loc, value: analysis.sloc },
            { metric: overviewMetrics.difficulty, value: analysis.difficulty },
            { metric: overviewMetrics.bugs, value: analysis.bugs },
        ];
        htmlBuilder.appendBody((0, header_1.default)("Summary")).appendBody((0, metric_row_1.default)(metrics));
        if (analysis.functions.length > 0) {
            htmlBuilder
                .appendBody((0, header_1.default)("Functions"))
                .appendBody((0, functions_table_1.default)(analysis.path, analysis.functions));
        }
        analysis.classes.forEach((classAnalysis) => {
            htmlBuilder
                .appendBody((0, header_1.default)(`class ${classAnalysis.name}`))
                .appendBody((0, functions_table_1.default)(analysis.path, classAnalysis.methods))
                .appendBody("<br><br>");
        });
        if (includeBackLink) {
            htmlBuilder.appendBody(this.backLink());
        }
    }
    toHtml() {
        const htmlBuilder = new html_builder_1.default();
        htmlBuilder.appendStyle(report_style_1.default);
        this.buildFileSummary(htmlBuilder, this.analysis, this.includeBackLink);
        return htmlBuilder.toHtml();
    }
}
exports.default = FileReport;
//# sourceMappingURL=file-report.js.map