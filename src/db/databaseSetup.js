const sqlite3 = require("sqlite3");

// Create and connect to the database
const db = new sqlite3.Database("src/db/bgtracker.db", (err) => {
	if (err) {
		console.error("Error connecting to database: ", err.message);
	} else {
		console.log("Connection to database established");
	}
});

function errorCallbackCreatingTables(err) {
	if (err) {
		console.error("Error creating a table: ", err.message);
	} else {
		console.log("successfully created a table");
	}
}

// Function to create the tables:
function createTables() {
	console.log("Creating tables");
	db.serialize(() => {
		// Games table
		db.run(
			`CREATE TABLE IF NOT EXISTS games (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            img_source TEXT
            );`,
			errorCallbackCreatingTables
		);
		// Players table
		db.run(
			`CREATE TABLE IF NOT EXISTS players (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
            );`,
			errorCallbackCreatingTables
		);
		// played_games table
		db.run(
			`CREATE TABLE IF NOT EXISTS played_games (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            played_date TEXT,
            game_id INTEGER,
            winner_id INTEGER,
            FOREIGN KEY (game_id) REFERENCES games(id),
            FOREIGN KEY (winner_id) REFERENCES players(id)
            );`,
			errorCallbackCreatingTables
		);
		// plays table
		db.run(
			`CREATE TABLE IF NOT EXISTS plays (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            played_game_id INTEGER,
            player_id INTEGER,
            score INTEGER,
            FOREIGN KEY (played_game_id) REFERENCES played_games(id),
            FOREIGN KEY (player_id) REFERENCES players(id)
            );`,
			errorCallbackCreatingTables
		);
	});

	console.log("Created all tables");
}

function insertDummyData() {
	const games = [
		{
			id: 1,
			gameTitle: "Ark Nova",
			description: "Zoo game about animals",
			imgSource:
				"https://cf.geekdo-images.com/SoU8p28Sk1s8MSvoM4N8pQ__itemrep/img/IRqrT7kOqPQilogauyQkOnLx-HU=/fit-in/246x300/filters:strip_icc()/pic6293412.jpg",
		},
		{
			id: 2,
			gameTitle: "Terraforming Mars",
			description: "A game about colonizing Mars",
			imgSource:
				"https://cf.geekdo-images.com/wg9oOLcsKvDesSUdZQ4rxw__itemrep/img/IwUOQfhP5c0KcRJBY4X_hi3LpsY=/fit-in/246x300/filters:strip_icc()/pic3536616.jpg",
		},
		{
			id: 3,
			gameTitle: "Catan",
			description: "A strategy game about settling an island",
			imgSource:
				"https://cf.geekdo-images.com/W3Bsga_uLP9kO91gZ7H8yw__itemrep/img/IzYEUm_gWFuRFOL8gQYqGm5gU6A=/fit-in/246x300/filters:strip_icc()/pic2419375.jpg",
		},
		{
			id: 4,
			gameTitle: "Pandemic",
			description:
				"Cooperative game where players work together to stop a global outbreak",
			imgSource:
				"https://cf.geekdo-images.com/S3ybV1LAp-8SnHIXLLjVqA__itemrep/img/wAMLbgihOl7dJDHnvqt7OXKEV-4=/fit-in/246x300/filters:strip_icc()/pic1534148.jpg",
		},
	];
	const statementGames = db.prepare(
		`INSERT INTO games (title, description, img_source) VALUES (?, ?, ?);`
	);
	games.forEach((game) => {
		statementGames.run(
			game.gameTitle,
			game.description,
			game.imgSource,
			(err) => {
				if (err) {
					console.error("Error inserting game", err.message);
				} else {
					console.log(`Inserted game: ${game.gameTitle}`);
				}
			}
		);
	});
	statementGames.finalize();

	const players = [
		{
			id: 1,
			name: "Noah Jensen",
		},
		{
			id: 2,
			name: "Josefine Jensen",
		},
		{
			id: 3,
			name: "Mikkel Sørensen",
		},
		{
			id: 4,
			name: "Emma Williams",
		},
	];
	const statementPlayers = db.prepare(`INSERT INTO players (name) VALUES (?);`);
	// TODO: error check
	players.forEach((player) => {
		statementPlayers.run(player.name);
	});
	statementPlayers.finalize();

	const playedGames = [
		{
			id: 1,
			game_id: 1,
			play_date: "2024-08-31",
			winner_id: 1,
		},
		{
			id: 2,
			game_id: 1,
			play_date: "2024-09-07",
			winner_id: 3,
		},
		{
			id: 3,
			game_id: 2,
			play_date: "2024-09-21",
			winner_id: 1,
		},
		{
			id: 4,
			game_id: 3,
			play_date: "2024-10-03",
			winner_id: 2,
		},
		{
			id: 5,
			game_id: 1,
			play_date: "2024-11-15",
			winner_id: 1,
		},
	];

	const statementPlayedGames = db.prepare(
		`INSERT INTO played_games (played_date, game_id, winner_id) VALUES (?, ?, ?);`
	);
	// TODO: error check
	playedGames.forEach((playedGame) => {
		statementPlayedGames.run(
			playedGame.play_date,
			playedGame.game_id,
			playedGame.winner_id
		);
	});
	statementPlayedGames.finalize();

	const plays = [
		{
			id: 1,
			played_game_id: 1,
			player_id: 1,
			score: 120,
		},
		{
			id: 2,
			played_game_id: 1,
			player_id: 2,
			score: 95,
		},
		{
			id: 3,
			played_game_id: 2,
			player_id: 1,
			score: 140,
		},
		{
			id: 4,
			played_game_id: 2,
			player_id: 3,
			score: 110,
		},
		{
			id: 5,
			played_game_id: 3,
			player_id: 4,
			score: 80,
		},
		{
			id: 6,
			played_game_id: 3,
			player_id: 1,
			score: 150,
		},
		{
			id: 7,
			played_game_id: 4,
			player_id: 2,
			score: 200,
		},
		{
			id: 8,
			played_game_id: 4,
			player_id: 4,
			score: 185,
		},
		{
			id: 9,
			played_game_id: 5,
			player_id: 1,
			score: 100,
		},
		{
			id: 10,
			played_game_id: 5,
			player_id: 2,
			score: 68,
		},
	];
	const statementPlays = db.prepare(
		`INSERT INTO plays (played_game_id, player_id, score) VALUES (?, ?, ?);`
	);
	// TODO: error check
	plays.forEach((play) => {
		statementPlays.run(play.played_game_id, play.player_id, play.score);
	});
	statementPlays.finalize();

	console.log("Inserted dummy data");
}

createTables();
//insertDummyData(); // should prob separate into insertDummyDB file - TODO
db.close();
