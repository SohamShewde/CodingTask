const db = require("../models/db");

exports.getDashboard = async (req, res) => {
  const { code } = req.params;

  // STORES
  const [stores] = await db.query(
    `
    SELECT 
      s.id,
      s.name,
      COALESCE(AVG(r.rating), 0) AS rating,
      COUNT(r.id) AS totalReviews
    FROM stores s
    LEFT JOIN ratings r ON r.storeId = s.id
    WHERE LOWER(s.ownerCode) = LOWER(?)
    GROUP BY s.id, s.name
    `,
    [code]
  );

  // USER REVIEWS
  const [users] = await db.query(
    `
    SELECT 
      u.name,
      r.rating,
      s.name AS storeName
    FROM ratings r
    JOIN users u ON u.id = r.userId
    JOIN stores s ON s.id = r.storeId
    WHERE LOWER(s.ownerCode) = LOWER(?)
    ORDER BY r.created_at DESC
    `,
    [code]
  );

  // AVG RATING
  const [avg] = await db.query(
    `
    SELECT COALESCE(AVG(r.rating), 0) AS rating
    FROM ratings r
    JOIN stores s ON s.id = r.storeId
    WHERE LOWER(s.ownerCode) = LOWER(?)
    `,
    [code]
  );

  res.json({
    stores: stores || [],
    users: users || [],
    avgRating: Number(avg?.[0]?.rating || 0).toFixed(1),
  });
};