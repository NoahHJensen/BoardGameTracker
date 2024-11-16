const express = require("express");
const router = express.Router();

// Default /players route
router.get("/", (req, res) => {
	res.render("players/index");
});

module.exports = router;
