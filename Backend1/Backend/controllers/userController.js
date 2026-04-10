const db = require("../models/db");

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

exports.submitRating = async (req, res) => {
  const userId = req.user.id;
  const { storeId, rating } = req.body;

  // validation
  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ message: "Invalid rating (1-5 only)" });
  }

  // check existing rating
  const [exists] = await db.query(
    "SELECT * FROM ratings WHERE userId=? AND storeId=?",
    [userId, storeId]
  );

  if (exists.length > 0) {
    await db.query(
      "UPDATE ratings SET rating=? WHERE userId=? AND storeId=?",
      [rating, userId, storeId]
    );
  } else {
    await db.query(
      "INSERT INTO ratings (userId, storeId, rating) VALUES (?,?,?)",
      [userId, storeId, rating]
    );
  }

  res.json({ message: "Rating updated successfully" });
};