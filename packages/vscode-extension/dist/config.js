"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("fs/promises");
const path_1 = require("path");
const vscode_1 = require("vscode");
const lodash_1 = require("lodash");
const workspace = vscode_1.workspace;
const CONFIG_BLOCK_NAME = "complexityAnalysis";
const DEFAULT_INCLUDE = "**/*.js";
const navigation = {
    scheme: "jsComplexityAnalysis",
    authority: "complexity-analysis"
};
/**
 * Returns configured include and exclude patterns
 */
function getIncludeExclude() {
    const extensionConfig = workspace.getConfiguration(CONFIG_BLOCK_NAME);
    const workspaceConfig = _getWorkspaceConfig(extensionConfig);
    if (workspaceConfig) {
        return Promise.resolve(workspaceConfig);
    }
    return _getJsConfigConfig(workspace.rootPath)
        .then((jsconfig) => {
        if (jsconfig) {
            return jsconfig;
        }
        return {
            include: [],
            exclude: []
        };
    });
}
function _getWorkspaceConfig(extensionConfig) {
    const hasConfig = extensionConfig.has("include") || extensionConfig.has("exclude");
    if (!hasConfig) {
        return null;
    }
    const include = extensionConfig.get("include");
    const exclude = extensionConfig.get("exclude");
    if (!Array.isArray(include)) {
        throw new Error("complexityAnalysis.include needs to be an array");
    }
    if (!Array.isArray(exclude)) {
        throw new Error("complexityAnalysis.exclude needs to be an array");
    }
    return {
        include: (0, lodash_1.isEmpty)(include) ? [DEFAULT_INCLUDE] : include,
        exclude
    };
}
function _getJsConfigConfig(rootPath) {
    const jsconfigFilename = (0, path_1.join)(rootPath, "jsconfig.json");
    return (0, promises_1.readFile)(jsconfigFilename, "utf8")
        .then((fileContents) => {
        const jsconfig = JSON.parse(fileContents);
        if (!jsconfig.include && !jsconfig.exclude) {
            return null;
        }
        return {
            include: jsconfig.include || DEFAULT_INCLUDE,
            exclude: jsconfig.exclude || []
        };
    })
        .catch(() => undefined);
}
exports.default = {
    getIncludeExclude,
    options: {
        navigation
    }
};
//# sourceMappingURL=config.js.map