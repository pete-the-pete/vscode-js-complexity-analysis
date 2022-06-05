"use strict";

import config  from "../config";
import { workspace } from "vscode";
import { join } from "path";

const BASE_URL = `${ config.options.navigation.scheme }://${ config.options.navigation.authority }/`;

function localLink(localUrl: any, name: any) {
    const url = BASE_URL + localUrl;
    const href = encodeURI(`command:vscode.previewHtml?${ JSON.stringify(url) }`);

    return `<a href="${ href }">${ name }</a>`;
}

function fileLineLink(name: any, file: any, line: any) {
    const rootWorkspace = workspace.workspaceFolders?.at(0);// .rootPath;
    if (rootWorkspace) {
        const href = `file://${ join(rootWorkspace.uri.toString(), file) }#L${ line }`;

        return `<a href="${ href }">${ name }</a>`;
    }
}

export default {
    localLink,
    fileLineLink
};
