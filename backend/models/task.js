const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true, maxlength: 140 },
  completed: { type: Boolean, default: false },
});

module.exports = mongoose.model("Task", taskSchema);
