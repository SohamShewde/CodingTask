const pool = require("../models/db.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// SIGNUP (NOW SUPPORTS ROLE)
const signup = async (req, res) => {
  const { name, email, password, address, role } = req.body;

  if (!name || !email || !password || !address)
    return res.status(400).json({ message: "All fields required" });

  // check duplicate email (important fix)
  const [existing] = await pool.query(
    "SELECT id FROM users WHERE email = ?",
    [email]
  );

  if (existing.length > 0) {
    return res.status(409).json({ message: "Email already exists" });
  }

  const hashed = await bcrypt.hash(password, 10);

  await pool.query(
    "INSERT INTO users (name,email,address,password,role) VALUES (?,?,?,?,?)",
    [
      name,
      email,
      address,
      hashed,
      role ? role.toUpperCase() : "USER"
    ]
  );

  res.json({ message: "User created successfully" });
};


// LOGIN
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "All fields required" });

  const [rows] = await pool.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );

  if (rows.length === 0)
    return res.status(404).json({ message: "User not found" });

  const user = rows[0];

  const valid = await bcrypt.compare(password, user.password);

  if (!valid)
    return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role.toUpperCase(),
    },
  });
};


// UPDATE PASSWORD
const updatePassword = async (req, res) => {
  const userId = req.user.id;
  const { newPassword } = req.body;

  if (!newPassword)
    return res.status(400).json({ message: "Password required" });

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await pool.query(
    "UPDATE users SET password = ? WHERE id = ?",
    [hashedPassword, userId]
  );

  res.json({ message: "Password updated successfully" });
};

module.exports = { signup, login, updatePassword };