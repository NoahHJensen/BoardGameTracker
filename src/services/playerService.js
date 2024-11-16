// Responsible for all player related data.
const db = require("../dummyData"); // Use dummy data for now

/**
 * Returns all players including gamesPlayed, gamesWon
 */
function getAllPlayerDetails() {
	let allPlays = db.plays;
	let playerPlayedCount = new Map();
	// Count how many times each player has played a game
	allPlays.forEach((play) => {
		let playPlayerId = play.player_id;
		//Update the played count for the player id
		let currPlayedCount = playerPlayedCount.get(playPlayerId);
		playerPlayedCount.set(playPlayerId, (currPlayedCount || 0) + 1);
	});

	// Count how many times each player has won a game
	let allPlayedGames = db.playedGames;
	let playerWonCount = new Map();
	allPlayedGames.forEach((game) => {
		let winnerId = game.winner_id;
		let currWonCount = playerWonCount.get(winnerId);
		playerWonCount.set(winnerId, (currWonCount || 0) + 1);
	});
	let allPlayers = db.players;
	// Update the player details
	allPlayers.forEach((player) => {
		player.gamesPlayed = playerPlayedCount.get(player.id) || 0;
		player.gamesWon = playerWonCount.get(player.id) || 0;
	});
	return allPlayers;
}

module.exports = { getAllPlayerDetails };
