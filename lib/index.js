"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var App = function App() {
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "app"
  }, "I am app");
};

var wrapper = document.getElementById('container');
wrapper ? _reactDom["default"].render( /*#__PURE__*/_react["default"].createElement(App, null), wrapper) : false;