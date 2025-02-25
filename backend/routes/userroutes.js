const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { checkUsername } = require("../middleware/usermiddleware");

const router = express.Router();

// Register Route
router.post("/register", checkUsername, async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Save user
    const user = new User({ username, password });
    try {
      await user.save();
      res.status(201).json({ message: "User registered" });
    } catch (error) {
      res.status(500).json({ message: "Server error saving user" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    // Find user in the database
    const user = await User.findOne({ username });
    console.log("User Found:", user);

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare the password
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send the token in response
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error during login" });
  }
});

module.exports = router;
