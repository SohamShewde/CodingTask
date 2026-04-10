const db = require("../models/db");
const bcrypt = require("bcryptjs");

// Admin Dashboard stats
exports.getDashboard = async (req, res) => {
  const [users] = await db.query("SELECT COUNT(*) as total FROM users");
  const [stores] = await db.query("SELECT COUNT(*) as total FROM stores");
  const [ratings] = await db.query("SELECT COUNT(*) as total FROM ratings");

  res.json({
    users: users[0].total,
    stores: stores[0].total,
    ratings: ratings[0].total
  });
};

// Get users with search and dynamic sorting
exports.getUsers = async (req, res) => {
  const { search = "", sortBy = "name", order = "ASC" } = req.query;

  // Prevent SQL injection by allowing only specific columns
  const validSort = ["id", "name", "email", "address", "role"];
  const validOrder = ["ASC", "DESC"];
  const sortColumn = validSort.includes(sortBy) ? sortBy : "name";
  const sortOrder = validOrder.includes(order.toUpperCase()) ? order.toUpperCase() : "ASC";

  const [rows] = await db.query(
    `SELECT id, name, email, address, role FROM users 
     WHERE name LIKE ? OR email LIKE ? OR address LIKE ? 
     ORDER BY ${sortColumn} ${sortOrder}`,
    [`%${search}%`, `%${search}%`, `%${search}%`]
  );

  res.json(rows);
};

// Add user
exports.addUser = async (req, res) => {
  const { name, email, address, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  await db.query("INSERT INTO users (name,email,address,password,role) VALUES (?,?,?,?,?)", [name,email,address,hashed,role]);
  res.json({ message: "User created successfully" });
};

// Get stores with search and dynamic sorting
exports.getStores = async (req, res) => {
  const { search = "", sortBy = "name", order = "ASC" } = req.query;

  const validSort = ["id", "name", "email", "address", "rating"];
  const validOrder = ["ASC", "DESC"];

  const sortColumn = validSort.includes(sortBy) ? sortBy : "name";
  const sortOrder = validOrder.includes(order.toUpperCase()) ? order.toUpperCase() : "ASC";

  const [rows] = await db.query(
    `
    SELECT 
      s.id,
      s.name,
      s.email,
      s.address,
      IFNULL(AVG(r.rating), 0) AS rating
    FROM stores s
    LEFT JOIN ratings r ON r.storeId = s.id
    WHERE s.name LIKE ? OR s.address LIKE ?
    GROUP BY s.id
    ORDER BY ${sortColumn} ${sortOrder}
    `,
    [`%${search}%`, `%${search}%`]
  );

  res.json(rows);
};

// Add store
exports.addStore = async (req, res) => {
  const { name, email, address, ownerCode } = req.body;

  if (!name || !email || !address || !ownerCode) {
    return res.status(400).json({ message: "All fields required" });
  }

  await db.query(
    "INSERT INTO stores (name, email, address, ownerCode) VALUES (?,?,?,?)",
    [name, email, address, ownerCode]
  );

  res.json({ message: "Store created successfully" });
};