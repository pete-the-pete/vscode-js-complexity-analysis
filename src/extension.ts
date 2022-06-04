"use strict";

import Controller from "./controller";

function activate(context: any) {
    // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
    const controller = new Controller(context);

    context.subscriptions.push(controller);
    controller.activate();
}

const _activate = activate;
export { _activate as activate };
