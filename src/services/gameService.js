// Responsible for handling data directly from the database and convert to usable stuff.
const dbFake = require("../dummyData"); // Dummy database for now... shhh
const db = require("../db/database");

/**
 * Retrieves the game details
 */
function getAllGameDetails() {
	const games = db.queryAllGameDetails();
	return games;
}

function getGameFromId(id) {
	let games = dbFake.games;
	return games.find((game) => game.id == id);
}

module.exports = {
	getAllGameDetails,
	getGameFromId,
};
