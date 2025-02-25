const jwt = require("jsonwebtoken");

// Middleware ensure the username ends with "@gmail.com".
const checkUsername = (req, res, next) => {
  const { username } = req.body;
  if (!username.endsWith("@gmail.com")) {
    return res
      .status(403)
      .json({ message: "Username must end with @gmail.com" });
  }
  next();
};

// Middleware to verify the JWT token.

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  // Check if token is provided
  if (!token) return res.status(403).json({ message: "No token provided" });

  const cleanedToken = token.split(" ")[1]; // Extract the actual token after 'Bearer'

  // Check if token exists
  if (!cleanedToken) return res.status(403).json({ message: "Token missing" });

  // Verify the token using the secret key
  jwt.verify(cleanedToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("Token verification failed:", err);
      return res.status(403).json({ message: "Invalid token" });
    }

    req.userId = decoded.id; // Attach the decoded user ID to the request object
    next();
  });
};

// Middleware to check the length of the task content.

const checkTaskLength = (req, res, next) => {
  const { content } = req.body;

  if (content && content.length > 140) {
    return res
      .status(400)
      .json({ message: "Task content exceeds 140 characters" });
  }
  next();
};

//Middleware to validate the content type of incoming requests.
const checkContentType = (req, res, next) => {
  if (!req.is("application/json")) {
    return res
      .status(400)
      .json({ message: "Invalid content type. Only JSON is allowed." });
  }
  next();
};

module.exports = {
  checkUsername,
  verifyToken,
  checkTaskLength,
  checkContentType,
};
