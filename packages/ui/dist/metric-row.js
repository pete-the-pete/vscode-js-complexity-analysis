"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dot_1 = require("dot");
const metric_box_1 = __importDefault(require("./metric-box"));
const template = (0, dot_1.template)(`
<div class="metric-row">{{= it.metrics }}</div>
`);
function MetricRow(metrics) {
    const renderedMetrics = metrics.map((m) => (0, metric_box_1.default)(m)).join("");
    return template({
        metrics: renderedMetrics
    });
}
exports.default = MetricRow;
//# sourceMappingURL=metric-row.js.map