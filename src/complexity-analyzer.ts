"use strict";

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'loda... Remove this comment to see the full error message
import { sum } from "lodash";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'typh... Remove this comment to see the full error message
import { analyzeModule, processProject } from "typhonjs-escomplex";

function analyse(js: any) {
    return analyzeModule(js);
}

function process(analyses: any) {
    const summary = processProject(analyses);

    summary.totalLOC = sum(summary.reports.map((report: any) => report.aggregate.sloc.logical));

    return summary;
}

export default {
    analyse,
    process
};
