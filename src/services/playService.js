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

function getAllDetailsForPlayedGameId(playedGameId) {
	// Get all the details for this played game's id
	const allPlayedGames = getAllPlayedGameDetails();
	const onePlayedGame = allPlayedGames.find((game) => game.id == playedGameId);
	onePlayedGame.img_source = db.queryImgSourceFromGameId(
		onePlayedGame.game_id
	).img_source;
	onePlayedGame.allPlays = db.queryPlaysFromPlayedGameId(playedGameId);
	console.log(onePlayedGame);
	return onePlayedGame;
}

function createNewPlayedGame() {}

module.exports = {
	getAllPlayedGameDetails,
	getAllPlayedGameDetailsForGameId,
	getAllDetailsForPlayedGameId,
	createNewPlayedGame,
};
