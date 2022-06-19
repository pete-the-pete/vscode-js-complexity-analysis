"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const controller_1 = __importDefault(require("./controller"));
function activate(context) {
    const controller = new controller_1.default(context);
    context.subscriptions.push(controller);
    controller.activate();
}
const _activate = activate;
exports.activate = _activate;
//# sourceMappingURL=extension.js.map