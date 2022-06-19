"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const html_builder_1 = __importDefault(require("./html-builder"));
const metric_row_1 = __importDefault(require("./metric-row"));
const report_style_1 = __importDefault(require("./report-style"));
const header_1 = __importDefault(require("./header"));
const files_table_1 = __importDefault(require("./files-table"));
const overviewMetrics = {
    maintainability: {
        title: "Average Maintainability",
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
};
class ProjectReport {
    analysis;
    errors;
    constructor(analysis, errors) {
        this.analysis = analysis;
        this.errors = errors;
    }
    getErrors(errors) {
        return errors.join("<br/>");
    }
    buildProjectSummary(htmlBuilder, analysis, errors) {
        const metrics = [
            {
                metric: overviewMetrics.maintainability,
                value: analysis.avgMaintainability,
            },
            { metric: overviewMetrics.loc, value: analysis.totalSloc },
        ];
        htmlBuilder
            .appendBody((0, header_1.default)("Summary"))
            .appendBody((0, metric_row_1.default)(metrics))
            .appendBody((0, header_1.default)("Files"))
            .appendBody((0, files_table_1.default)(analysis));
        if (errors.length > 0) {
            htmlBuilder
                .appendBody((0, header_1.default)("Errors"))
                .appendBody(this.getErrors(errors));
        }
    }
    toHtml() {
        const htmlBuilder = new html_builder_1.default();
        htmlBuilder.appendStyle(report_style_1.default);
        this.buildProjectSummary(htmlBuilder, this.analysis, this.errors);
        return htmlBuilder.toHtml();
    }
}
exports.default = ProjectReport;
//# sourceMappingURL=project-report.js.map