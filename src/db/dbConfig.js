const sqlite3 = require("sqlite3");
const path = require("path");

const dbPath = path.resolve(__dirname, "database.sqlite");
const db = new sqlite3.Database(dbPath, (err) => {
	if (err) {
		console.error("Error connecting to the SQLite DB: ", err.message);
	} else {
		console.log("Connected to DB");
	}
});

module.exports = db;
