"use strict";

import { template } from "dot";

const tableTemplate = template(`
<table>
    <thead>{{= it.header }}</thead>
    <tbody>{{= it.body }}</tbody>
</table>
`);

const rowTemplate = template(`<tr>{{= it.cells }}</tr>`);

const cellTemplate = template(`<td align="{{= it.align }}">{{= it.value }}</td>`);

function getAlign(column: any) {
    return column.align || "left";
}

function getCell(align: any, value: any) {
    return cellTemplate({ align, value });
}

function buildHeader(columns: any) {
    const buildCells = () =>
        columns.map((col: any, i: any) => getCell(getAlign(col), col.title)).join("");

    return rowTemplate({ cells: buildCells() });
}

function buildRows(rows: any, columns: any) {
    const buildCells = (cells: any) => cells.map((cell: any, i: any) => getCell(getAlign(columns[i]), cell));
    const buildRow = (row: any) => rowTemplate({ cells: buildCells(row).join("") });

    return rows.map(buildRow).join("");
}

class HtmlTable {
    columns: any;
    rows: any;
    constructor(options: any) {
        this.columns = options.columns;
        this.rows    = options.rows;
    }

    toHtml() {
        return tableTemplate({
            header: buildHeader(this.columns),
            body:   buildRows(this.rows, this.columns)
        });
    }
}

export default HtmlTable;
