"use strict";

/**
 * Analysis data for single file
 */
function FileAnalysis(path, analysis) {
    this.path = path;

    // Scale to between 0 and 100
    this.maintainability = Math.max(0, analysis.maintainability * 100 / 171);
    this.sloc            = analysis.aggregate.sloc.logical;
    this.cyclomatic      = analysis.aggregate.cyclomatic;
    this.difficulty      = analysis.aggregate.halstead.difficulty
    this.bugs            = analysis.aggregate.halstead.bugs;

    this.functions = analysis.functions.map(f => ({
        name:       f.name,
        line:       f.line,
        params:     f.params,
        sloc:       f.sloc.logical,
        cyclomatic: f.cyclomatic,
        difficulty: f.halstead.difficulty,
        bugs:       f.halstead.bugs
    }));

    Object.freeze(this);
}

module.exports = FileAnalysis;
