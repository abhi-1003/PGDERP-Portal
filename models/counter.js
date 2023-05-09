const mongoose = require("mongoose");

const CounterSchema = mongoose.Schema({
  course: {
    type: String,
    unique: true,
  },
  code: {
    type: String,
  },
  index: { type: Number, default: 0 },
});

const Counter = mongoose.model("counter", CounterSchema, "counter");

module.exports = Counter;