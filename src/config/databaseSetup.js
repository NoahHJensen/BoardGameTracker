const db = require("./databaseConnection");

// Function to create tables
function createTables() {
	console.log("Creating tables...");

	// Create Games table if it doesn't exist
	db.prepare(
		`
    CREATE TABLE IF NOT EXISTS games (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      img_source TEXT
    );
  `
	).run();

	// Create Players table if it doesn't exist
	db.prepare(
		`
    CREATE TABLE IF NOT EXISTS players (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    );
  `
	).run();

	// Create played_games table if it doesn't exist
	db.prepare(
		`
    CREATE TABLE IF NOT EXISTS played_games (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      played_date TEXT,
      game_id INTEGER,
      winner_id INTEGER,
      FOREIGN KEY (game_id) REFERENCES games(id),
      FOREIGN KEY (winner_id) REFERENCES players(id)
    );
  `
	).run();

	// Create plays association table if it doesn't exist
	db.prepare(
		`
    CREATE TABLE IF NOT EXISTS plays (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      played_game_id INTEGER,
      player_id INTEGER,
      score INTEGER,
      FOREIGN KEY (played_game_id) REFERENCES played_games(id) ON DELETE CASCADE,
      FOREIGN KEY (player_id) REFERENCES players(id)
    );
  `
	).run();

	console.log("Tables created successfully.");
}

// Create the tables
createTables();

// Close the database connection after the setup is complete
db.close();
