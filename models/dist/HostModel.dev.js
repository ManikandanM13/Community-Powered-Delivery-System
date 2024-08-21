"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RegisterModel = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var registerSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: false
  }
});

var RegisterModel = _mongoose["default"].model('registerations', registerSchema);

exports.RegisterModel = RegisterModel;