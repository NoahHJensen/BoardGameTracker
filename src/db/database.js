const sqlite3 = require("sqlite3");
// Responsible for interacting with the actual database

// Get a connection to the database
const db = new sqlite3.Database(
	"src/db/bgtracker.db",
	sqlite3.OPEN_READWRITE,
	(err) => {
		if (err) {
			console.error("Error connecting to database: ", err.message);
		} else {
			console.log("Connection to database established");
		}
	}
);

// Wrapper functions
const fetchAll = async (db, sql, params) => {
	return new Promise((resolve, reject) => {
		db.all(sql, params, (err, rows) => {
			if (err) reject(err);
			resolve(rows);
		});
	});
};
const fetchFirst = async (db, sql, params) => {
	return new Promise((resolve, reject) => {
		db.get(sql, params, (err, row) => {
			if (err) reject(err);
			resolve(row);
		});
	});
};

// Prepare all the sql statements when starting:

// All functions
async function queryAllGames() {
	let sql = "SELECT * FROM games";
	try {
		const games = await fetchAll(db, sql);
		return games;
	} catch (error) {
		console.error("Error: ", error);
	}
}

// Export the functions for usage
module.exports = { queryAllGames };
