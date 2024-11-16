const express = require("express");
const router = express.Router();

// Retrieve our db data
// Use dummy data for now
const db = require("../dummyData");

const gameService = require("../services/gameService");

router.get("/", (req, res) => {
	const games = gameService.getAllGameDetails();

	res.render("games/index", {
		title: "Brætspil overview",
		games: games,
	});
});

router.get("/:gameid", (req, res) => {
	const game = gameService.getGameFromId(req.params.gameid);
	res.render("games/show", { game });
});

module.exports = router;
