// Responsible for all player related data.
const db = require("../db/database");

/**
 * Returns all players including gamesPlayed, gamesWon
 */
function getAllPlayerDetails() {
	let playerDetails = db.queryAllPlayerDetails();
	return playerDetails;
}

/**
 * Inserts a new player into the database
 */
function createNewPlayer(name) {
	return db.insertNewPlayer(name).lastInsertRowid;
}

module.exports = { getAllPlayerDetails, createNewPlayer };
