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

const QUERY_IMG_SOURCE_FROM_GAME_ID = db.prepare(
	`SELECT img_source FROM games WHERE games.id = ?`
);
const QUERY_ALL_PLAYS_FROM_PLAYED_GAME_ID = db.prepare(
	`SELECT 
        plays.*,
        players.name AS player_name
    FROM plays
    JOIN players ON players.id = plays.player_id
    WHERE plays.played_game_id = ?`
);

const INSERT_INTO_GAMES = db.prepare(
	"INSERT INTO games (title, description, img_source) VALUES (?, ?, ?)"
);
/**
 * Utility functions
 */
const timeAgo = require("../utils/timeAgo");

/**
 * All database functions
 */

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

function queryAllPlayerDetails() {
	const playerDetails = QUERY_ALL_PLAYER_DETAILS.all();
	return playerDetails;
}
function getAllPlayedGameDetails() {
	const plays = QUERY_ALL_PLAYED_GAME_DETAILS.all();
	return plays;
}

function insertNewGame(title, desc, url) {
	INSERT_INTO_GAMES.run(title, desc, url);
}

function queryImgSourceFromGameId(id) {
	const imgSource = QUERY_IMG_SOURCE_FROM_GAME_ID.get(id);
	return imgSource;
}

function queryPlaysFromPlayedGameId(id) {
	const plays = QUERY_ALL_PLAYS_FROM_PLAYED_GAME_ID.all(id);
	return plays;
}

// Export the functions for usage
module.exports = {
	queryAllGameDetails,
	queryGameFromId,
	queryAllPlayerDetails,
	getAllPlayedGameDetails,
	insertNewGame,
	queryImgSourceFromGameId,
	queryPlaysFromPlayedGameId,
};
