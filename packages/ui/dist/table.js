"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dot_1 = require("dot");
const tableTemplate = (0, dot_1.template)(`
<table>
    <thead>{{= it.header }}</thead>
    <tbody>{{= it.body }}</tbody>
</table>
`);
const rowTemplate = (0, dot_1.template)(`<tr>{{= it.cells }}</tr>`);
const cellTemplate = (0, dot_1.template)(`<td align="{{= it.align }}">{{= it.value }}</td>`);
function getAlign(column) {
    return column.align || "left";
}
function getCell(align, value) {
    return cellTemplate({ align, value });
}
function buildHeader(columns) {
    const buildCells = () => columns.map((col, i) => getCell(getAlign(col), col.title)).join("");
    return rowTemplate({ cells: buildCells() });
}
function buildRows(rows, columns) {
    const buildCells = (cells) => cells.map((cell, i) => getCell(getAlign(columns[i]), cell));
    const buildRow = (row) => rowTemplate({ cells: buildCells(row).join("") });
    return rows.map(buildRow).join("");
}
class HtmlTable {
    columns;
    rows;
    constructor(options) {
        this.columns = options.columns;
        this.rows = options.rows;
    }
    toHtml() {
        return tableTemplate({
            header: buildHeader(this.columns),
            body: buildRows(this.rows, this.columns)
        });
    }
}
exports.default = HtmlTable;
//# sourceMappingURL=table.js.map