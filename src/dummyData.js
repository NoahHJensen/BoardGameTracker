// Dummy games db
/*
let games = [
	{
		id: 1,
		gameTitle: "Ark Nova",
		playedNumber: 5,
		description: "Zoo game about animals",
		dateLastPlayed: "2024-11-10",
		rating: "4.83",
		imgSource:
			"https://cf.geekdo-images.com/SoU8p28Sk1s8MSvoM4N8pQ__itemrep/img/IRqrT7kOqPQilogauyQkOnLx-HU=/fit-in/246x300/filters:strip_icc()/pic6293412.jpg",
	},
	{
		id: 2,
		gameTitle: "Catan",
		playedNumber: 12,
		description: "Classic game of resource trading and building settlements",
		dateLastPlayed: "2024-10-30",
		rating: "4.83",
		imgSource:
			"https://cf.geekdo-images.com/W3Bsga_uLP9kO91gZ7H8yw__itemrep/img/IzYEUm_gWFuRFOL8gQYqGm5gU6A=/fit-in/246x300/filters:strip_icc()/pic2419375.jpg",
	},
	{
		id: 3,
		gameTitle: "Ticket to Ride",
		playedNumber: 8,
		description: "Train-themed board game about connecting cities",
		dateLastPlayed: "2024-11-05",
		rating: "4.83",
		imgSource:
			"https://cf.geekdo-images.com/ZWJg0dCdrWHxVnc0eFXK8w__itemrep/img/iiTIuTtuneM3tbDCjALecsgyizA=/fit-in/246x300/filters:strip_icc()/pic38668.jpg",
	},
	{
		id: 4,
		gameTitle: "Wingspan",
		playedNumber: 3,
		description: "Bird-themed engine-building game",
		dateLastPlayed: "2024-11-01",
		rating: "4.83",
		imgSource:
			"https://cf.geekdo-images.com/yLZJCVLlIx4c7eJEWUNJ7w__itemrep/img/DR7181wU4sHT6gn6Q1XccpPxNHg=/fit-in/246x300/filters:strip_icc()/pic4458123.jpg",
	},
	{
		id: 5,
		gameTitle: "Terraforming Mars",
		playedNumber: 7,
		description: "Strategy game about colonizing and terraforming Mars",
		dateLastPlayed: "2024-11-12",
		rating: "4.83",
		imgSource:
			"https://cf.geekdo-images.com/wg9oOLcsKvDesSUdZQ4rxw__itemrep/img/IwUOQfhP5c0KcRJBY4X_hi3LpsY=/fit-in/246x300/filters:strip_icc()/pic3536616.jpg",
	},
]; */

let games = [
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

let players = [
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

let playedGames = [
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

let plays = [
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

module.exports = { games, players, playedGames, plays };
