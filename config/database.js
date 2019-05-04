const Sequelize = require('sequelize');

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();


client
	.query("SELECT table_name FROM information_schema.tables WHERE table_schema='public'", (err, res) => {
		if (err) throw err;
		for (let row of res.rows) {
			console.log(JSON.stringify(row));
		}
		// client.end();
		});

// Option 1: Passing parameters separately
module.exports = new Sequelize('link_to_articles', process.env.USER, process.env.PASS, {
	logging: false,
	host: 'pure-brushlands-63188.herokuapp.com',
	dialect: 'postgres',

  pool: {
	  max: 5,
	  min: 0,
	  acquire: 30000,
	  idle: 10000
  }

  
});