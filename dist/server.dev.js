"use strict";

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _cors = _interopRequireDefault(require("cors"));

var _hostRoutes = _interopRequireDefault(require("./routes/hostRoutes.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import hostLoginRoutes from './routes/hostLoginRoutes.js';
_dotenv["default"].config();

var app = (0, _express["default"])(); // Middleware

app.use((0, _cors["default"])({
  origin: '*'
}));
app.use(_express["default"].json()); // MongoDB connection

_mongoose["default"].connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  return console.log('MongoDB connected');
})["catch"](function (err) {
  return console.error('MongoDB connection error:', err);
}); // Routes


app.use('/api/hosts', _hostRoutes["default"]);
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  return console.log("Server running on port ".concat(PORT));
});