const express = require("express");
const router = express.Router();

// Get the services
const playService = require("../services/playService");
const playerService = require("../services/playerService");
const gameService = require("../services/gameService");

// Default route for /played-games
router.get("/", (req, res) => {
	const playedGames = playService.getAllPlayedGameDetails();
	//Sort them by date
	playedGames.sort(function (a, b) {
		// Turn your strings into dates, and then subtract them
		// to get a value that is either negative, positive, or zero.
		return new Date(b.played_date) - new Date(a.played_date);
	});
	res.render("playedGames/index", { playedGames });
});

// Route for viewing an individual played game
router.get("/info/:playid", (req, res) => {
	const play_id = req.params.playid;
	const play = playService.getAllDetailsForPlayedGameId(play_id);
	res.render("playedGames/show", { play });
});

// Route for creating a new played game
router.get("/new", (req, res) => {
	const players = playerService.getAllPlayerDetails();
	const games = gameService.getAllGameDetails();
	res.render("playedGames/create", { players, games });
});

// POST request route for creating a played game
router.post("/new", (req, res) => {
	playService.createNewPlayedGame(req.body);
	res.redirect("/played-games/new");
});
module.exports = router;
