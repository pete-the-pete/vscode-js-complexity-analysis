"use strict";

import { round } from "lodash";
import { error_small, warning_small } from "./icons.js";

export function formatMetric(
  value: any,
  warningThreshold: any = 0,
  errorThreshold: any = 0
) {
  const rounded = round(value, 1);

  if (value > errorThreshold) {
    return rounded + " " + error_small;
  } else if (value > warningThreshold) {
    return rounded + " " + warning_small;
  } else {
    return rounded;
  }
}
