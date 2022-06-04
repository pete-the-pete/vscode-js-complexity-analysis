"use strict";

import config  from "../config";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'vscode' or its corresponding t... Remove this comment to see the full error message
import { workspace } from "vscode";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'path' or its corresponding typ... Remove this comment to see the full error message
import { join } from "path";

const BASE_URL = `${ config.options.navigation.scheme }://${ config.options.navigation.authority }/`;

function localLink(localUrl: any, name: any) {
    const url = BASE_URL + localUrl;
    const href = encodeURI(`command:vscode.previewHtml?${ JSON.stringify(url) }`);

    return `<a href="${ href }">${ name }</a>`;
}

function fileLineLink(name: any, file: any, line: any) {
    const rootPath = workspace.rootPath;
    const href = `file://${ join(rootPath, file) }#L${ line }`;

    return `<a href="${ href }">${ name }</a>`;
}

export default {
    localLink,
    fileLineLink
};
