const express = require("express");
const router = express.Router();
const { verifyToken, verifyRole } = require("../middlewares/authMiddleware");
const { getStores, submitRating } = require("../controllers/userController");

router.use(verifyToken, verifyRole("USER"));


router.get("/stores", getStores);

router.post("/rate", submitRating);

module.exports = router;