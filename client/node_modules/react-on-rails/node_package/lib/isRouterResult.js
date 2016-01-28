"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isRouterResult;
function isRouterResult(reactElementOrRouterResult) {
  return !!(reactElementOrRouterResult.redirectLocation || reactElementOrRouterResult.error);
}