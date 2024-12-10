const express = require("express");
const router = express.Router();

const gameService = require("../services/gameService");
const playService = require("../services/playsService");

router.get("/", (req, res) => {
	const games = gameService.getAllGameDetails();
	const totalGames = games.length;
	res.render("games/index", {
		title: "Brætspil overview",
		games: games,
		gamesTotal: totalGames,
	});
});

router.get("/info/:gameid", (req, res) => {
	let gameId = req.params.gameid;
	const game = gameService.getGameFromId(gameId);
	const plays = playService.getAllPlayedGameDetailsForGameId(gameId);

	const highscores = playService.getAllHighscoresForGameId(gameId);
	res.render("games/show", { game, plays, highscores });
});

router.post("/info/:gameid", (req, res) => {
	const gameId = req.params.gameid;
	const newTitle = req.body.title;
	const newImgSource = req.body.img_source;
	const newDescription = req.body.description;
	gameService.editGame(gameId, newTitle, newImgSource, newDescription);
	res.redirect("/games/info/" + gameId);
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
