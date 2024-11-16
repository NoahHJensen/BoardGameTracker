// Responsible for all player related data.
const db = require("../db/database");

/**
 * Returns all players including gamesPlayed, gamesWon
 */
function getAllPlayerDetails() {
	let playerDetails = db.queryAllPlayerDetails();
	console.log(playerDetails);
	return playerDetails;
}

module.exports = { getAllPlayerDetails };
