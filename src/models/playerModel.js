// Get a connection to the database
const db = require("../config/databaseConnection");

/**
 * Prepare SQL statements
 */
const QUERY_ALL_PLAYER_DETAILS = db.prepare(`
    SELECT 
        players.id,
        players.name,
        COALESCE(games_played.gamesPlayed, 0) AS games_played,
        COALESCE(games_won.gamesWon, 0) AS games_won
    FROM players
        LEFT JOIN (
                    SELECT player_id, COUNT(DISTINCT id) AS gamesPlayed
                    FROM plays
                    GROUP BY player_id
                    ) AS games_played ON games_played.player_id = players.id
        LEFT JOIN (
                    SELECT winner_id, COUNT(DISTINCT id) AS gamesWon
                    FROM played_games
                    GROUP BY winner_id
                    ) AS games_won ON games_won.winner_id = players.id;`);

const INSERT_INTO_PLAYERS = db.prepare("INSERT INTO players (name) VALUES (?)");
/**
 * All functions
 */

function queryAllPlayerDetails() {
	const playerDetails = QUERY_ALL_PLAYER_DETAILS.all();
	return playerDetails;
}

function insertNewPlayer(name) {
	//TODO: Check if name already exists
	const result = INSERT_INTO_PLAYERS.run(name);
	return result;
}

module.exports = {
	queryAllPlayerDetails,
	insertNewPlayer,
};
