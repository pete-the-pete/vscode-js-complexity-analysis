"use strict";

import Controller from "./controller";

function activate(context: any) {
  const controller = new Controller(context);

  context.subscriptions.push(controller);
  controller.activate();
}

const _activate = activate;
export { _activate as activate };
