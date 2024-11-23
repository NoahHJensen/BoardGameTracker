// Responsible for all player related data.
const playerModel = require("../models/playerModel");

/**
 * Returns all players including gamesPlayed, gamesWon
 */
function getAllPlayerDetails() {
	let playerDetails = playerModel.queryAllPlayerDetails();
	return playerDetails;
}

/**
 * Inserts a new player into the database
 */
function createNewPlayer(name) {
	return playerModel.insertNewPlayer(name).lastInsertRowid;
}

module.exports = {
	getAllPlayerDetails,
	createNewPlayer,
};
