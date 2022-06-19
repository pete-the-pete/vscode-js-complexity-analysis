"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const mocha_1 = require("mocha");
// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
const vscode_1 = __importDefault(require("vscode"));
// import myExtension from '../extension';
suite('Extension Test Suite', () => {
    (0, mocha_1.after)(() => {
        vscode_1.default.window.showInformationMessage('All tests done!');
    });
    test('Run the file analysis', function (done) {
        assert_1.default.strictEqual(vscode_1.default.window.tabGroups.all.length, 1, 'only the text file is open');
        vscode_1.default.commands.executeCommand('complexityAnalysis.analyseFile').then(() => {
            assert_1.default.strictEqual(vscode_1.default.window.tabGroups.all.length, 2, 'the analysis tab is now open too');
            done();
        });
    }).timeout(10000);
});
//# sourceMappingURL=extension.test.js.map