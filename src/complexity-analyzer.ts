"use strict";

import { sum } from "lodash";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'typh... Remove this comment to see the full error message
import ESComplex from "typhonjs-escomplex";

export function analyse(js: any) {
  return ESComplex.analyzeModule(js);
}

export function process(analyses: any) {
  const summary = ESComplex.processProject(analyses);

  summary.totalLOC = sum(
    summary.reports.map((report: any) => report.aggregate.sloc.logical)
  );

  return summary;
}
