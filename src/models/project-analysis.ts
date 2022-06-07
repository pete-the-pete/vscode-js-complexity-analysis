"use strict";

export interface ProjectSummary {
  totalSloc: number;
  avgSloc: number;
  avgMaintainability: number;
  avgCyclomatic: number;
  fileAnalyses: any[];
}

export interface MetricsAverage {
  sloc: number;
  cyclomatic: number;
  maintainability: number;
};

export default class ProjectAnalysis {
  analyses: any = [];

  add(analysis: any) {
    this.analyses.push(analysis);
  }

  calculateTotalSloc(analyses: any) {
    return analyses.reduce((sum: any, analysis: any) => sum + analysis.sloc, 0);
  }

  calculateAverages(analyses: any) {
    const result: MetricsAverage = {
      sloc: 0,
      cyclomatic: 0,
      maintainability: 0,
    };

    const sum: MetricsAverage = {
      sloc: 0,
      cyclomatic: 0,
      maintainability: 0,
    };
    const metrics = Object.keys(sum);
    const divisor = analyses.length || 1;

    analyses.forEach((analysis: any) => {
      metrics.forEach((metric) => {
        sum[metric as keyof MetricsAverage] += analysis[metric];
      });
    });

    metrics.forEach((metric) => {
      result[metric as keyof MetricsAverage] = sum[metric as keyof MetricsAverage] / divisor;
    });

    return result;
  }

  getSummary(): ProjectSummary {
    const { analyses } = this;
    const totalSloc = this.calculateTotalSloc(analyses);
    const averages = this.calculateAverages(analyses);

    return {
      totalSloc: totalSloc,
      avgSloc: averages.sloc,
      avgMaintainability: averages.maintainability,
      avgCyclomatic: averages.cyclomatic,
      fileAnalyses: analyses,
    };
  }
}
