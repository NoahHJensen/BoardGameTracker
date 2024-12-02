const express = require("express");
const router = express.Router();

// Get all the services needed
const playerService = require("../services/playerService");
const playService = require("../services/playsService");

// Default /players route
router.get("/", (req, res) => {
	let players = playerService.getAllPlayerDetails();
	res.render("players/index", { players });
});

router.get("/player/:id", (req, res) => {
	const player_id = req.params.id;
	const played_games =
		playService.getAllPlayedGameDetailsForPlayerId(player_id);
	played_games.sort(function (a, b) {
		return new Date(b.played_date) - new Date(a.played_date);
	});
	const allPlayerDetails = playerService.getAllPlayerDetails();
	const player = allPlayerDetails.find((player) => player.id == player_id);
	res.render("players/player", { played_games, player });
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
