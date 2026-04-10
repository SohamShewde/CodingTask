const express = require("express");
const router = express.Router();

const { getDashboard } = require("../controllers/ownerController");

router.get("/dashboard/:code", getDashboard);

module.exports = router;