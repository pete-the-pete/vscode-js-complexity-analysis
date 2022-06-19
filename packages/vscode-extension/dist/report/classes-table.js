"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = __importDefault(require("./table"));
const metric_formatter_js_1 = require("./metric-formatter.js");
const link_js_1 = require("./link.js");
const columns = [
    { title: "Function", align: "left" },
    { title: "SLOC", align: "right" },
    { title: "# params", align: "right" },
    { title: "Complexity", align: "right" },
    { title: "Difficulty", align: "right" },
    { title: "Est # bugs", align: "right" }
];
function formatName(filePath, name, line) {
    const encodedName = name
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    return (0, link_js_1.fileLineLink)(encodedName, filePath, line);
}
function ClassesTable(analysis) {
    const filePath = analysis.path;
    const classes = analysis.classes.map((c) => {
        const rows = c.methods.map((f) => [
            formatName(filePath, f.name, f.line),
            f.sloc,
            f.params,
            (0, metric_formatter_js_1.formatMetric)(f.cyclomatic, 6, 10),
            (0, metric_formatter_js_1.formatMetric)(f.difficulty),
            (0, metric_formatter_js_1.formatMetric)(f.bugs)
        ]);
        const functionsTable = new table_1.default({
            columns: columns,
            rows: rows
        });
        return c.name + "<br/><br/>" + functionsTable.toHtml();
    });
    return classes.join("<br/><br/>");
}
exports.default = ClassesTable;
//# sourceMappingURL=classes-table.js.map