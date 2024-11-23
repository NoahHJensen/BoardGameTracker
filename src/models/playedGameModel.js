// Get a connection to the database.
const db = require("../db/databaseConnection");

/**
 * Prepare all the queries.
 */
const QUERY_ALL_PLAYED_GAME_DETAILS = db.prepare(`
    SELECT 
        played_games.id,
        played_games.game_id,
        games.title,
        played_games.played_date,
        played_games.winner_id,
        COALESCE(players.name, 'Ingen vinder') AS winner_name
    FROM played_games
    LEFT JOIN players ON players.id = played_games.winner_id
    LEFT JOIN games ON games.id = played_games.game_id;`);

const QUERY_PLAYED_GAME_FROM_ID = db.prepare(
	"SELECT * FROM played_games WHERE played_games.id = ?"
);
const QUERY_ALL_PLAYED_GAME_DETAILS_FOR_PLAYER_ID = db.prepare(`
    SELECT 
        g.id AS game_id,
        g.title AS game_title,
        g.description AS game_description,
        g.img_source AS game_img_source,
        pg.played_date,
        pg.winner_id,
        p.name AS winner_name,
        pl.score AS player_score
    FROM 
        plays pl
    JOIN 
        played_games pg ON pl.played_game_id = pg.id
    JOIN 
        games g ON pg.game_id = g.id
    LEFT JOIN 
        players p ON pg.winner_id = p.id
    WHERE 
        pl.player_id = ?;`);
const INSERT_INTO_PLAYED_GAMES = db.prepare(
	"INSERT INTO played_games (played_date, game_id, winner_id) VALUES (?, ?, ?)"
);

/**
 * All functions
 */

/**
 * Query the details for all played games.
 * @returns Details for all played games.
 */
function getAllPlayedGameDetails() {
	const plays = QUERY_ALL_PLAYED_GAME_DETAILS.all();
	return plays;
}
function queryPlayedGameFromId(id) {
	const playedGame = QUERY_PLAYED_GAME_FROM_ID.get(id);
	return playedGame;
}
/**
 * Inserts a new played game record into the database.
 * @param {string} played_date - The date when the game was played.
 * @param {number} game_id - The ID of the game that was played.
 * @param {number} winner_id - The ID of the winner player.
 * @returns {number} The ID of the newly inserted played game record.
 */
function insertNewPlayedGame(played_date, game_id, winner_id) {
	// TODO: check if game_id is actually a valid game id.
	// Same for winner_id
	const result = INSERT_INTO_PLAYED_GAMES.run(played_date, game_id, winner_id);
	const playedGameId = result.lastInsertRowid;
	return playedGameId;
}

function queryAllPlayedGameDetailsForPlayerId(player_id) {
	const result = QUERY_ALL_PLAYED_GAME_DETAILS_FOR_PLAYER_ID.all(player_id);
	return result;
}

module.exports = {
	getAllPlayedGameDetails,
	queryPlayedGameFromId,
	insertNewPlayedGame,
	queryAllPlayedGameDetailsForPlayerId,
};
