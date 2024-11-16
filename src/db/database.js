const Database = require("better-sqlite3");
// Responsible for interacting with the actual database

// Get a connection to the database
const db = new Database("src/db/bgtracker.db");
// All functions
function queryAllGames() {
	const stmt = db.prepare("SELECT * FROM games");
	const result = stmt.all();
	return result;
}

// Export the functions for usage
module.exports = { queryAllGames };
