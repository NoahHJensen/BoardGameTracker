const Database = require("better-sqlite3");
// Responsible for interacting with the actual database

// Get a connection to the database
const db = new Database("src/db/bgtracker.db");

// Prepare statements

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
/**
 * let latestGamesMap = new Map();
	let gamePlayedCountMap = new Map();
	db.playedGames.forEach((playedGame) => {
		let gameId = playedGame.game_id;
		gamePlayedCountMap.set(gameId, (gamePlayedCountMap.get(gameId) || 0) + 1);
		if (
			!latestGamesMap.has(gameId) ||
			new Date(playedGame.play_date) >
				new Date(latestGamesMap.get(gameId).play_date)
		) {
			latestGamesMap.set(gameId, playedGame);
		}
	});
	games.forEach((game) => {
		// Ensure the game actually has been played
		let lastPlayedGame = latestGamesMap.get(game.id);
		if (lastPlayedGame) {
			game.lastPlayedGame = lastPlayedGame;
			game.lastPlayedAgo = timeAgo(game.lastPlayedGame.play_date);
		} else {
			game.lastPlayedGame = null;
			game.lastPlayedAgo = "Ikke spillet endnu";
		}

		game.playedCount = gamePlayedCountMap.get(game.id) || 0;
	});
	return games;
 */
// Export the functions for usage
module.exports = { queryAllGameDetails };
