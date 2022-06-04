"use strict";

import Table from "./table";
// @ts-expect-error ts-migrate(2614) FIXME: Module '"./metric-formatter"' has no exported memb... Remove this comment to see the full error message
import { formatMetric } from "./metric-formatter";
// @ts-expect-error ts-migrate(2614) FIXME: Module '"./link"' has no exported member 'localLin... Remove this comment to see the full error message
import { localLink as link } from "./link";

const columns = [
    { title: "Name",               align: "left"  },
    { title: "SLOC",               align: "right" },
    { title: "Avg<br/>Complexity", align: "right" },
    { title: "Max<br/>Complexity", align: "right" },
    { title: "Est errors",         align: "right" }
];

function formatFile(filePath: any) {
    return link(filePath, filePath);
}

function FilesTable(analysis: any) {
    const rows = analysis.fileAnalyses.map((f: any) => [
        formatFile(f.path),
        f.sloc,
        formatMetric(f.cyclomatic.avg, 6, 10),
        formatMetric(f.cyclomatic.max, 6, 10),
        formatMetric(f.bugs)
    ]);

    const filesTable = new Table({
        columns: columns,
        rows: rows
    });

    return filesTable.toHtml();
}

export default FilesTable;
