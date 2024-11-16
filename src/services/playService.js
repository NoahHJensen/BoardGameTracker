// Responsible for all played game related data
const db = require("../dummyData"); // Use dummy data for now

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

function getAllPlayedGameDetails() {
	let plays = db.playedGames;
	plays.forEach((play) => {
		// Find the player in the players array by the player_id
		let player = db.players.find((player) => player.id === play.winner_id);

		// Add the winnerName property with the player's name if found
		play.winnerName = player ? player.name : "Ingen vinder"; // If not found, set to no winner
	});
	return plays;
}

function getAllPlayedGameDetailsForGameId(gameId) {
	let allPlayedGames = getAllPlayedGameDetails();
	let filteredGames = allPlayedGames.filter((game) => game.game_id == gameId);
	return filteredGames;
}

module.exports = { getAllPlayedGameDetails, getAllPlayedGameDetailsForGameId };
