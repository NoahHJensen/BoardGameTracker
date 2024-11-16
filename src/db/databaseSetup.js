const sqlite3 = require("sqlite3");

// Create and connect to the database
const db = new sqlite3.Database("../db/bgtracker.db", (err) => {
	if (err) {
		console.error("Error connecting to database: ", err.message);
	} else {
		console.log("Connection to database established");
	}
});

// Function to create the tables:
function createTables() {
	console.log("Creating tables");
	db.serialize(() => {
		// Games table
		db.run(`CREATE TABLE IF NOT EXISTS games (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            img_source TEXT
            );`);
		// Players table
		db.run(`CREATE TABLE IF NOT EXISTS players (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
            );`);
		// played_games table
		db.run(`CREATE TABLE IF NOT EXISTS played_games (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            played_date TEXT,
            game_id INTEGER,
            winner_id, INTEGER,
            FOREIGN KEY (game_id) REFERENCES games(id),
            FOREIGN KEY (winner_id) REFERENCES players(id)
            );`);
		// plays table
		db.run(`CREATE TABLE IF NOT EXISTS plays (
            id INTEGER PRIMARY KEY,
            played_game_id INTEGER,
            player_id INTEGER,
            score INTEGER,
            FOREIGN KEY (played_game_id) REFERENCES played_games(id),
            FOREIGN KEY (player_id) REFERENCES players(id)
            );`);
	});

	console.log("Created all tables");
}

createTables();
