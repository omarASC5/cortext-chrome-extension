const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
module.exports = new Sequelize('link_to_articles', process.env.USER, process.env.PASS, {
	logging: false,
	host: 'https://pure-brushlands-63188.herokuapp.com',
	dialect: 'postgres',

  pool: {
	  max: 5,
	  min: 0,
	  acquire: 30000,
	  idle: 10000
  }

	
  
});