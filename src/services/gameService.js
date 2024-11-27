// Responsible for handling data directly from the database and convert to usable stuff.
const gameModel = require("../models/gameModel");

/**
 * Retrieves the game details
 */
function getAllGameDetails() {
	const games = gameModel.queryAllGameDetails();
	return games;
}

function getGameFromId(id) {
	let game = gameModel.queryGameFromId(id);
	return game;
}

function addNewGameToDatabase(game) {
	const title = game.title;
	const description = game.description;
	const img_source = game.img_source;
	gameModel.insertNewGame(title, description, img_source);
}

function editGame(id, title, imgSource, description) {
	gameModel.updateGameOnId(id, title, imgSource, description);
}

module.exports = {
	getAllGameDetails,
	getGameFromId,
	addNewGameToDatabase,
	editGame,
};
