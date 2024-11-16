// Responsible for all player related data.
const db = require("../db/database");

/**
 * Returns all players including gamesPlayed, gamesWon
 */
function getAllPlayerDetails() {
	let playerDetails = db.queryAllPlayerDetails();
	return playerDetails;
}

module.exports = { getAllPlayerDetails };
