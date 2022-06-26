"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatMetric = void 0;
const lodash_1 = require("lodash");
const icons_js_1 = require("./icons.js");
function formatMetric(value, warningThreshold = 0, errorThreshold = 0) {
    const rounded = (0, lodash_1.round)(value, 1);
    if (value > errorThreshold) {
        return rounded + " " + icons_js_1.error_small;
    }
    else if (value > warningThreshold) {
        return rounded + " " + icons_js_1.warning_small;
    }
    else {
        return rounded;
    }
}
exports.formatMetric = formatMetric;
//# sourceMappingURL=metric-formatter.js.map