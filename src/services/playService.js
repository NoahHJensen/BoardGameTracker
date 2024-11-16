// Responsible for all played game related data
const db = require("../db/database");

function getAllPlayedGameDetails() {
	const plays = db.getAllPlayedGameDetails();
	return plays;
}

function getAllPlayedGameDetailsForGameId(gameId) {
	let allPlayedGames = getAllPlayedGameDetails();
	let filteredGames = allPlayedGames.filter((game) => game.game_id == gameId);
	return filteredGames;
}

module.exports = { getAllPlayedGameDetails, getAllPlayedGameDetailsForGameId };
