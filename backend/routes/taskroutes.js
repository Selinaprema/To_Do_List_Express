const express = require("express");
const Task = require("../models/task");
const {
  verifyToken,
  checkTaskLength,
  checkContentType,
} = require("../middleware/usermiddleware");

const router = express.Router();

// Create task (with userId)
router.post(
  "/",
  verifyToken,
  checkTaskLength,
  checkContentType,
  async (req, res) => {
    const { content } = req.body;
    try {
      const newTask = new Task({ content, user: req.userId });
      await newTask.save();
      res.status(201).json(newTask);
    } catch (err) {
      res.status(500).json({ error: "Failed to create task" });
    }
  }
);

// Get tasks for logged-in user
router.get("/", verifyToken, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.userId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// Update task
router.put(
  "/:id",
  verifyToken,
  checkTaskLength,
  checkContentType,
  async (req, res) => {
    const { content, completed } = req.body;
    try {
      const task = await Task.findOneAndUpdate(
        { _id: req.params.id, user: req.userId },
        { content, completed },
        { new: true }
      );

      if (!task) return res.status(404).json({ message: "Task not found" });

      res.json(task);
    } catch (err) {
      res.status(500).json({ error: "Failed to update task" });
    }
  }
);

// Delete task
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: "Failed to delete task" });
  }
});

module.exports = router;
