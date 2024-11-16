const express = require("express");
const router = express.Router();

// Get all the services needed
const playerService = require("../services/playerService");

// Default /players route
router.get("/", (req, res) => {
	let players = playerService.getAllPlayerDetails();
	res.render("players/index", { players });
});

module.exports = router;
