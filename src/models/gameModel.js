//Get the database connection.
const db = require("../config/databaseConnection");

// import timeAgo utility function
const timeAgo = require("../utils/timeAgo");

/**
 * Queries
 */
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

const QUERY_IMG_SOURCE_FROM_GAME_ID = db.prepare(
	`SELECT img_source FROM games WHERE games.id = ?`
);

const INSERT_INTO_GAMES = db.prepare(
	"INSERT INTO games (title, description, img_source) VALUES (?, ?, ?)"
);

/**
 * Query all game details. Adds lastPlayedAgo to the games.
 * @returns All game details.
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

/**
 * Query the details of a game from its ID.
 * @param {number} id
 * @returns The game details if found, otherwise null.
 */
function queryGameFromId(id) {
	const game = QUERY_GAME_FROM_ID.get(id);
	return game;
}
/**
 * Inserts a new game into the database.
 * @param {string} title - Title of the game
 * @param {string} desc - The games description
 * @param {string} url - The games image URL.
 */
function insertNewGame(title, desc, url) {
	INSERT_INTO_GAMES.run(title, desc, url);
}
/**
 * Queries the image url of a game from its ID.
 * @param {number} id - The game ID.
 * @returns The image url of the game if found. Otherwise null.
 */
function queryImgSourceFromGameId(id) {
	const imgSource = QUERY_IMG_SOURCE_FROM_GAME_ID.get(id);
	return imgSource;
}

module.exports = {
	queryAllGameDetails,
	queryGameFromId,
	insertNewGame,
	queryImgSourceFromGameId,
};
