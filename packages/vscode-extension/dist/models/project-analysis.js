"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProjectAnalysis {
    analyses = [];
    add(analysis) {
        this.analyses.push(analysis);
    }
    calculateTotalSloc(analyses) {
        return analyses.reduce((sum, analysis) => sum + analysis.sloc, 0);
    }
    calculateAverages(analyses) {
        const result = {};
        const sum = {
            sloc: 0,
            cyclomatic: 0,
            maintainability: 0,
        };
        const metrics = Object.keys(sum);
        const divisor = analyses.length || 1;
        analyses.forEach((analysis) => {
            metrics.forEach((metric) => {
                // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                sum[metric] += analysis[metric];
            });
        });
        metrics.forEach((metric) => {
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            result[metric] = sum[metric] / divisor;
        });
        return result;
    }
    getSummary() {
        const { analyses } = this;
        const totalSloc = this.calculateTotalSloc(analyses);
        const averages = this.calculateAverages(analyses);
        return {
            totalSloc: totalSloc,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'sloc' does not exist on type '{}'.
            avgSloc: averages.sloc,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'maintainability' does not exist on type ... Remove this comment to see the full error message
            avgMaintainability: averages.maintainability,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'cyclomatic' does not exist on type '{}'.
            avgCyclomatic: averages.cyclomatic,
            fileAnalyses: analyses,
        };
    }
}
exports.default = ProjectAnalysis;
//# sourceMappingURL=project-analysis.js.map