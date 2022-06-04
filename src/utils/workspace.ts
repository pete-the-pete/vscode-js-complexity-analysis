"use strict";

import config from "../config";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'vscode' or its corresponding t... Remove this comment to see the full error message
import { workspace } from "vscode";

/**
 * Returns files in the workspace by taking include and
 * exclude pattern into consideration
 *
 * @returns {Uri}
 */
function getWorkspaceFiles() {
    return config.getIncludeExclude()
        .then(({
        include,
        exclude
    }: any) => {
            const includePattern = _createGlob(include);
            const excludePattern = _createGlob(exclude);

            return workspace.findFiles(includePattern, excludePattern);
        })
        .then((files: any) => files.map((fileUri: any) => ({
        fsPath: fileUri.fsPath,
        relativePath: workspace.asRelativePath(fileUri)
    })));
}

function _createGlob(patterns: any) {
  switch (patterns.length) {
    case 0:
      return "";
    case 1:
      return patterns[0];
    default:
      return `{${ patterns.join(",") }}`;
  }
};

export default {
    getWorkspaceFiles
}