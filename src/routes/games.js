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

router.get("/info/:gameid", (req, res) => {
	let gameId = req.params.gameid;
	const game = gameService.getGameFromId(gameId);
	const plays = playService.getAllPlayedGameDetailsForGameId(gameId);
	res.render("games/show", { game, plays });
});

// Route for adding a new game to the collection
router.get("/create", (req, res) => {
	res.render("games/create", {});
});

// POST req Route for form submit
router.post("/create", (req, res) => {
	const gameData = req.body;
	gameService.addNewGameToDatabase(gameData);
	res.redirect("/");
});

module.exports = router;
