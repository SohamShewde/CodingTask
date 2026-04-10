const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(403).json({ message: "Invalid token" });
  }
};

const verifyRole = (role) => (req, res, next) => {
  // console.log("TOKEN USER:", req.user);
  if (req.user.role.toLowerCase() !== role.toLowerCase()){
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

module.exports = { verifyToken, verifyRole };