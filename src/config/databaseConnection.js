/**
 * Provides a connection to the database
 */
require("dotenv").config();
const Database = require("better-sqlite3");

const dbName = process.env.DB || "bgtracker.db";
// Get a connection to the database
const db = new Database("src/db/" + dbName);

module.exports = db;
