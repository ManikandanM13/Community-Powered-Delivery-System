"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

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
          console.log(req.body);
          newHost = new _Host["default"](req.body);
          _context.next = 5;
          return regeneratorRuntime.awrap(newHost.save());

        case 5:
          res.status(201).json({
            message: 'Host registered successfully',
            host: newHost
          });
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            message: 'Error registering host',
            error: _context.t0
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
router.post('/login', function _callee2(req, res) {
  var _req$body, name, password, host, isMatch;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, password = _req$body.password;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(_Host["default"].findOne({
            name: name
          }));

        case 4:
          host = _context2.sent;

          if (host) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: 'Invalid name or password'
          }));

        case 7:
          _context2.next = 9;
          return regeneratorRuntime.awrap(_bcryptjs["default"].compare(password, host.password));

        case 9:
          isMatch = _context2.sent;

          if (isMatch) {
            _context2.next = 12;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: 'Invalid name or password'
          }));

        case 12:
          // If credentials are correct, you can return a token or success message
          res.status(200).json({
            message: 'Login successful',
            host: host
          });
          _context2.next = 18;
          break;

        case 15:
          _context2.prev = 15;
          _context2.t0 = _context2["catch"](1);
          res.status(500).json({
            message: 'Server error',
            error: _context2.t0.message
          });

        case 18:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 15]]);
});
var _default = router;
exports["default"] = _default;