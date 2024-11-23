// Get a connection to the database
const db = require("../config/databaseConnection");

/**
 * Prepare all SQL queries
 */
const QUERY_ALL_PLAYS_FROM_PLAYED_GAME_ID = db.prepare(
	`SELECT 
        plays.*,
        players.name AS player_name
    FROM plays
    JOIN players ON players.id = plays.player_id
    WHERE plays.played_game_id = ?`
);
const INSERT_INTO_PLAYS = db.prepare(
	"INSERT INTO plays (played_game_id, player_id, score) VALUES (?, ?, ?)"
);
/**
 * Queries all plays from a players ID.
 * @param {number} id
 * @returns All the plays if the player ID exists. Otherwise null.
 */
function queryPlaysFromPlayedGameId(id) {
	const plays = QUERY_ALL_PLAYS_FROM_PLAYED_GAME_ID.all(id);
	return plays;
}

function insertNewPlay(played_game_id, player_id, score) {
	// TODO: check if played game exists, and player id.
	const result = INSERT_INTO_PLAYS.run(played_game_id, player_id, score);
	return result.lastInsertRowid;
}

module.exports = {
	queryPlaysFromPlayedGameId,
	insertNewPlay,
};
