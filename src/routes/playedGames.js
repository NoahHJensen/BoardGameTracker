const express = require("express");
const router = express.Router();

// Get the services
const playService = require("../services/playService");

// Default route for /played-games
router.get("/", (req, res) => {
	const playedGames = playService.getAllPlayedGameDetails();
	//Sort them by date
	playedGames.sort(function (a, b) {
		// Turn your strings into dates, and then subtract them
		// to get a value that is either negative, positive, or zero.
		return new Date(b.played_date) - new Date(a.played_date);
	});
	res.render("../views/playedGames/index", { playedGames });
});
module.exports = router;
