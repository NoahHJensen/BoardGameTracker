// Responsible for handling data directly from the database and convert to usable stuff.
const db = require("../dummyData"); // Dummy database for now... shhh
const dbReal = require("../db/database");
/**
 * Helper function for calculating how long ago a date was.
 */
function timeAgo(dateString) {
	const date = new Date(dateString);
	const now = new Date();
	const timeDifference = Math.abs(now - date);
	const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

	if (daysAgo === 0) {
		return "idag";
	} else if (daysAgo === 1) {
		return "1 dag siden";
	} else {
		return `${daysAgo} dage siden`;
	}
}
/**
 * Should add a playedCount, lastPlayed to the initial Game details.
 */
function getAllGameDetails() {
	let games = db.games;
	dbReal
		.queryAllGames()
		.then((gs) => {
			console.log(gs);
		})
		.catch((err) => {
			console.log("Error happended", err);
		});
	let latestGamesMap = new Map();
	let gamePlayedCountMap = new Map();
	db.playedGames.forEach((playedGame) => {
		let gameId = playedGame.game_id;
		gamePlayedCountMap.set(gameId, (gamePlayedCountMap.get(gameId) || 0) + 1);
		if (
			!latestGamesMap.has(gameId) ||
			new Date(playedGame.play_date) >
				new Date(latestGamesMap.get(gameId).play_date)
		) {
			latestGamesMap.set(gameId, playedGame);
		}
	});
	games.forEach((game) => {
		// Ensure the game actually has been played
		let lastPlayedGame = latestGamesMap.get(game.id);
		if (lastPlayedGame) {
			game.lastPlayedGame = lastPlayedGame;
			game.lastPlayedAgo = timeAgo(game.lastPlayedGame.play_date);
		} else {
			game.lastPlayedGame = null;
			game.lastPlayedAgo = "Ikke spillet endnu";
		}

		game.playedCount = gamePlayedCountMap.get(game.id) || 0;
	});
	return games;
}

function getGameFromId(id) {
	let games = db.games;
	return games.find((game) => game.id == id);
}

module.exports = {
	getAllGameDetails,
	getGameFromId,
};
