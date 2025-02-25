const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const UserRoutes = require("./routes/userroutes");
const TaskRoutes = require("./routes/taskroutes");

dotenv.config();

const app = express();

// Use CORS for handling cross-origin requests
app.use(cors());

// Middleware to parse JSON requests (This should come before routes)
app.use(express.json());

// Middleware to log requests
app.use((req, res, next) => {
  next();
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/users", UserRoutes); // Updated route
app.use("/api/tasks", TaskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
