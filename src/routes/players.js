const express = require("express");
const router = express.Router();

// Get all the services needed
const playerService = require("../services/playerService");

// Default /players route
router.get("/", (req, res) => {
	let players = playerService.getAllPlayerDetails();
	res.render("players/index", { players });
});

// Route for creating a new player
router.get("/new", (req, res) => {
	res.render("players/create");
});

// POST Request for adding a new player
router.post("/new", (req, res) => {
	playerService.createNewPlayer(req.body.name);
	res.redirect("/players");
});

module.exports = router;
