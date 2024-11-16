const express = require("express");
const path = require("path");

const app = express();

// Middleware for parsing URL-encoded data (from forms)
app.use(express.urlencoded({ extended: true }));

// Use the EJS view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Import the different routes
const gameRoutes = require("./routes/games");
const playerRoutes = require("./routes/players");

// Use the routes
app.use("/games", gameRoutes);
app.use("/players", playerRoutes);

app.get("/", (req, res) => {
	res.redirect("/games");
});

// Start the server
const PORT = process.env.PORT || 3000; // Default to 3000
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
