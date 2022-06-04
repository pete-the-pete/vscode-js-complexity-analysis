"use strict";

import Table from "./table";
import metricFormatter from "./metric-formatter";
import link from "./link.js";

const columns = [
    { title: "Function",   align: "left"  },
    { title: "SLOC",       align: "right" },
    { title: "# params",   align: "right" },
    { title: "Complexity", align: "right" },
    { title: "Difficulty", align: "right" },
    { title: "Est # bugs", align: "right" }
];

function formatName(filePath: any, name: any, line: any) {
    const encodedName = name
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

    return link.fileLineLink(encodedName, filePath, line);
}

function FunctionsTable(filePath: any, functions: any) {
    const rows = functions.map((f: any) => [
        formatName(filePath, f.name, f.line),
        f.sloc,
        f.params,
        metricFormatter.formatMetric(f.cyclomatic, 6, 10),
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        metricFormatter.formatMetric(f.difficulty),
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        metricFormatter.formatMetric(f.bugs)
    ]);

    const functionsTable = new Table({
        columns: columns,
        rows: rows
    });

    return functionsTable.toHtml();
}

export default FunctionsTable;
