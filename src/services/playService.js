// Responsible for all played game related data
const db = require("../db/database");

//Helper util function
const timeAgo = require("../utils/timeAgo");

function getAllPlayedGameDetails() {
	const plays = db.getAllPlayedGameDetails();
	plays.forEach((play) => {
		play.timeAgo = timeAgo(play.played_date);
	});
	return plays;
}

function getAllPlayedGameDetailsForGameId(gameId) {
	let allPlayedGames = getAllPlayedGameDetails();
	let filteredGames = allPlayedGames.filter((game) => game.game_id == gameId);
	return filteredGames;
}

module.exports = { getAllPlayedGameDetails, getAllPlayedGameDetailsForGameId };
