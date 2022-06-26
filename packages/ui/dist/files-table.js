"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = __importDefault(require("./table"));
const metric_formatter_1 = require("./metric-formatter");
const link_1 = require("./link");
const columns = [
    { title: "Name", align: "left" },
    { title: "SLOC", align: "right" },
    { title: "Avg<br/>Complexity", align: "right" },
    { title: "Max<br/>Complexity", align: "right" },
    { title: "Est errors", align: "right" }
];
function formatFile(filePath) {
    return (0, link_1.localLink)(filePath, filePath);
}
function FilesTable(analysis) {
    const rows = analysis.fileAnalyses.map((f) => [
        formatFile(f.path),
        f.sloc,
        (0, metric_formatter_1.formatMetric)(f.cyclomatic.avg, 6, 10),
        (0, metric_formatter_1.formatMetric)(f.cyclomatic.max, 6, 10),
        (0, metric_formatter_1.formatMetric)(f.bugs)
    ]);
    const filesTable = new table_1.default({
        columns: columns,
        rows: rows
    });
    return filesTable.toHtml();
}
exports.default = FilesTable;
//# sourceMappingURL=files-table.js.map