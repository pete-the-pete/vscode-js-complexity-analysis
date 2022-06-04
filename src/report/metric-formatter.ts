"use strict";

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'loda... Remove this comment to see the full error message
import { round } from "lodash";
import { error_small, warning_small } from "./icons.js";

function formatMetric(value: any, warningThreshold: any, errorThreshold: any) {
    const rounded = round(value, 1);

    if (value > errorThreshold) {
        return rounded + " " + error_small;
    } else if (value > warningThreshold) {
        return rounded + " " + warning_small;
    } else {
        return rounded;
    }
}

export default {
    formatMetric
};
