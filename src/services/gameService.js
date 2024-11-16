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

function addNewGameToDatabase(game) {
	const title = game.title;
	const description = game.description;
	const img_source = game.img_source;
	db.insertNewGame(title, description, img_source);
}

module.exports = {
	getAllGameDetails,
	getGameFromId,
	addNewGameToDatabase,
};
