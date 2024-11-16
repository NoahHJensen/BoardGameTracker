const express = require("express");
const router = express.Router();

const gameService = require("../services/gameService");
const playService = require("../services/playService");

router.get("/", (req, res) => {
	const games = gameService.getAllGameDetails();

	res.render("games/index", {
		title: "Brætspil overview",
		games: games,
	});
});

router.get("/:gameid", (req, res) => {
	let gameId = req.params.gameid;
	const game = gameService.getGameFromId(gameId);
	const plays = playService.getAllPlayedGameDetailsForGameId(gameId);
	res.render("games/show", { game, plays });
});

module.exports = router;
