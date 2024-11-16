// Responsible for handling data directly from the database and convert to usable stuff.
const db = require("../db/database");

/**
 * Retrieves the game details
 */
function getAllGameDetails() {
	const games = db.queryAllGameDetails();
	return games;
}

function getGameFromId(id) {
	let game = db.queryGameFromId(id);
	return game;
}

module.exports = {
	getAllGameDetails,
	getGameFromId,
};
