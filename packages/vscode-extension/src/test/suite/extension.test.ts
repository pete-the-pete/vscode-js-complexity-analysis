import assert from 'assert';
import { after } from 'mocha';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import vscode from 'vscode';
// import myExtension from '../extension';

suite('Extension Test Suite', () => {
  after(() => {
    vscode.window.showInformationMessage('All tests done!');
  });

  test('Run the file analysis', function(done) {
    assert.strictEqual(vscode.window.tabGroups.all.length, 1, 'only the text file is open');
    vscode.commands.executeCommand('complexityAnalysis.analyseFile').then(() => {
      assert.strictEqual(vscode.window.tabGroups.all.length, 2, 'the analysis tab is now open too');
      done();
    });
  }).timeout(10000);
});
