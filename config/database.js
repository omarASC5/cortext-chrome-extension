const Sequelize = require('sequelize');

const { Client } = require('pg');

// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: true,
// });

// client.connect();


// client
// 	.query("SELECT table_name FROM information_schema.tables WHERE table_schema='public'", (err, res) => {
// 		if (err) throw err;
// 		for (let row of res.rows) {
// 			console.log(JSON.stringify(row));
// 		}
// 		module.exports = res;
// 		// client.end();
// 		});

// Option 1: Passing parameters separately
