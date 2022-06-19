"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const dot_1 = require("dot");
const icons_1 = require("./icons");
const template = (0, dot_1.template)(`
<div class="metric">
    <div class="metric-icon">{{= it.icon }}</div>
    <div class="metric-value">{{= it.value }}</div>
    <div class="metric-title">{{= it.title }}</div>
</div>
`);
function getTitle(metric) {
    const url = metric.infoUrl;
    const title = metric.title;
    const description = metric.description || "";
    return url ?
        `<a href="${url}" target="_blank" title="${description}">${title}</a>` :
        `<span title="${description}">${title}</span>`;
}
function isInRange(range, value) {
    if (Array.isArray(range)) {
        return range[0] <= value && value < range[1];
    }
    else {
        return false;
    }
}
function getIcon(metric, value) {
    if (isInRange(metric.errorRange, value)) {
        return icons_1.error;
    }
    else if (isInRange(metric.warningRange, value)) {
        return icons_1.warning;
    }
    else {
        return "";
    }
}
/**
 * @param  {any} options:
 * - metric: Metric to show
 *   - title
 *   - description (optional)
 *   - infoUrl (optional)
 *   - errorRange (optional)
 *   - warningRange (optional)
 * - value: Value of the metric
 */
function MetricBox(options) {
    const metric = options.metric;
    const value = options.value;
    return template({
        icon: getIcon(metric, value),
        value: (0, lodash_1.round)(value, 1),
        title: getTitle(metric)
    });
}
exports.default = MetricBox;
//# sourceMappingURL=metric-box.js.map