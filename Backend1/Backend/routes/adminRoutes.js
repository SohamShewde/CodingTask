const express = require("express");
const router = express.Router();

const { verifyToken, verifyRole } = require("../middlewares/authMiddleware");
const {
  getDashboard,
  getUsers,
  addUser,
  getStores,
  addStore
} = require("../controllers/adminController");

router.use(verifyToken, verifyRole("admin"));

router.get("/dashboard", getDashboard);
router.get("/users", getUsers);
router.post("/users", addUser);
router.get("/stores", getStores);
router.post("/stores", addStore);

module.exports = router;