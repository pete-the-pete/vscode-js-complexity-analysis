/**
 * Analysis data for single file
 */
export default class FileAnalysis {
    path: any;
    dependencies: any;
    maintainability: number;
    sloc: any;
    cyclomatic: {
        avg: any;
        max: unknown;
    };
    difficulty: any;
    bugs: any;
    functions: any;
    classes: any;
    constructor(path: any, analysis: any);
}
