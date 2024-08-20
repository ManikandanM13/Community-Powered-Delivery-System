"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _Host = _interopRequireDefault(require("../models/Host.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Adjust the path to your model
var router = _express["default"].Router(); // Example route for registering a host


router.post('/register', function _callee(req, res) {
  var newHost;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          newHost = new _Host["default"](req.body);
          _context.next = 4;
          return regeneratorRuntime.awrap(newHost.save());

        case 4:
          res.status(201).json({
            message: 'Host registered successfully',
            host: newHost
          });
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            message: 'Error registering host',
            error: _context.t0
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
var _default = router;
exports["default"] = _default;