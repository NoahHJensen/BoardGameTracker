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

function createNewPlayedGame(data) {
	if (!data.played_date) {
		console.error("No date found");
		return;
	}
	if (!data.winner) {
		console.error("No winner specified");
		return;
	}
	if (!data.game_id) {
		console.error("No valid game id specified");
		return;
	}

	const played_date = data.played_date;
	const winner_id = data.winner.id;
	const game_id = data.game_id;
	// Insert the played game
	const played_game_id = db.insertNewPlayedGame(
		played_date,
		game_id,
		winner_id
	);
	// Check if it was created:
	const newlyCreatedPlayedGame = db.queryPlayedGameFromId(played_game_id);
	if (!newlyCreatedPlayedGame) {
		console.error("No game found");
		return;
	}
	//Create all the plays:
	//First add winner to players:
	data.players.push(data.winner);
	//loop through each player and add as a play:
	data.players.forEach((player) => {
		db.insertNewPlay(
			played_game_id,
			player.id,
			player.score ? player.score : 0
		);
	});
	return played_game_id;
}

module.exports = {
	getAllPlayedGameDetails,
	getAllPlayedGameDetailsForGameId,
	getAllDetailsForPlayedGameId,
	createNewPlayedGame,
};
