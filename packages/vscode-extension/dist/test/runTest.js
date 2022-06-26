"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const test_electron_1 = require("@vscode/test-electron");
async function main() {
    try {
        // The folder containing the Extension Manifest package.json
        // Passed to `--extensionDevelopmentPath`
        const extensionDevelopmentPath = path_1.default.resolve(__dirname, '../../');
        // The path to the extension test runner script
        // Passed to --extensionTestsPath
        const extensionTestsPath = path_1.default.resolve(__dirname, './suite/index');
        const launchArgs = [
            extensionDevelopmentPath,
            'src/controller.ts',
            '--disable-extensions',
            '--user-data-dir',
            `${os_1.default.tmpdir()}`
        ];
        // Download VS Code, unzip it and run the integration test
        await (0, test_electron_1.runTests)({ extensionDevelopmentPath, extensionTestsPath, launchArgs });
    }
    catch (err) {
        console.error(err);
        console.error('Failed to run tests');
        process.exit(1);
    }
}
main();
//# sourceMappingURL=runTest.js.map