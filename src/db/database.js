const Database = require("better-sqlite3");
// Responsible for interacting with the actual database

// Get a connection to the database
const db = new Database("src/db/bgtracker.db");

/**
 * Prepare SQL statements
 */
// ty chatgpt
const QUERY_ALL_GAME_DETAILS = db.prepare(`
    SELECT
        games.id,
        games.title,
        games.description,
        games.img_source,
        COUNT(played_games.game_id) AS played_count,
        MAX(played_games.played_date) AS last_played_date
    FROM
        games
    LEFT JOIN
        played_games ON games.id = played_games.game_id
    GROUP BY
        games.id
    ORDER BY
        games.id;
  `);
const QUERY_GAME_FROM_ID = db.prepare("SELECT * FROM games WHERE id = ?");

/**
 * Utility functions
 */
const timeAgo = require("../utils/timeAgo");

// All functions

function queryAllGameDetails() {
	const games = QUERY_ALL_GAME_DETAILS.all();
	games.forEach((game) => {
		if (game.last_played_date) {
			game.lastPlayedAgo = timeAgo(game.last_played_date);
		} else {
			game.lastPlayedAgo = "Ikke spillet endnu";
		}
	});
	return games;
}

function queryGameFromId(id) {
	const game = QUERY_GAME_FROM_ID.get(id);
	return game;
}

// Export the functions for usage
module.exports = { queryAllGameDetails, queryGameFromId };
