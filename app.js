const express      = require("express"),
		app        = express(),
		ejs        = require("ejs"),
		keys       = require("./config/keys.js"),
		request    = require("request"),
		compromise = require("compromise"),
		bodyParser = require("body-parser"),
		Sentiment  = require('sentiment'),
		sentiment  = new Sentiment(),
		html       = require('html-parse-stringify'),
		stringToDom = require('string-to-dom');

		const jsdom = require("jsdom");
		const { JSDOM } = jsdom;

app.set("view engine", "ejs"); // Rendering engine defined as EJS
app.use(express.static(__dirname + '/public')); // Tells express, CSS is in public folder
app.set("views", "views"); // Tells EJS the path to the "views" directory
app.use(bodyParser.urlencoded({extended: true})); // bodyParser config
// const sentiment = new Sentiment(); // Set's up thing for sentiment
// .sequelizerc

// Database
// const db = require('./config/database');
// const Link = require('./models/Links');
// var sequelize = require('sequelize-heroku').connect(require('sequelize'));

// if (sequelize) {
//     sequelize.authenticate().then( function() {
//         var config = sequelize.connectionManager.config;
//         console.log('sequelize-heroku: Connected to '+config.host+' as '+config.username+'.');
        
//         sequelize.query('SELECT 1+1 as test').then( function(res) {
//             console.log('1+1='+res[0][0].test);
//         });
        
//     }).catch( function(err) {
//         var config = sequelize.connectionManager.config;
//         console.log('Sequelize: Error connecting '+config.host+' as '+config.user+': '+err);
//     });
// } else {
//     console.log('No environnement variable found.');
// }

// const Sequelize = require('sequelize');
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect((err) => {
	if (err) {
	  console.error('connection error', err.stack)
	} else {
	  console.log('connected')
	}
  })

// client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
// 	if (err) throw(err)
// 	for (let row of res.rows) {
// 		console.log(JSON.stringify(row));
// 	}
// 	console.log(res)
// 	client.end();
// });

const Link = require('./models/Links');



		// Test DB
// db.authenticate()
// .then(() => console.log('Database Connected...'))
// .catch(err => console.log(`Error: ${err}`));

// Index Route, redirects to display homepage
app.get("/", (req, res, next) => {
	res.redirect("index");
});

// Renders the index page
app.get("/index", (req, res, next) => {
	Link.findAll()
		.then((links) => {
			let url = links.pop().url;
			return url;
		}).then(((url) => {
			res.render("index", {url: url});
		}));
})


// Post route, the forms sends a URL to be exported as an object with article feautures 
app.post("/index", (req, res, next) => {
	// Initializes article-parser, which helps parse articles into object forme
	const {
		extract 
	  } = require('article-parser');
	//   User-entered URL
	let url = req.body.url;
	const data = {
		// Make this url come from the chrome extension
		url: url
	}

	Link.create({
		url: data.url
	})
	// .then((link) => {
	// 	console.log('link')
	// })
	// .catch((err) => console.log(`Error: ${err}`));

	Link.findAll()
		.then((links) => {
			let url = links.pop().url;
			return url;
		}).then(((url) => {
			console.log(url);
			extract(url).then((article) => {
			const articleInHTMLForm = article.content;
			  const articleInTextForm = articleInHTMLForm
				  .replace(/<\/?[^>]+(>|$)/g, " ") //Replaces the Tags and leaves a space.
				  .replace(/  +/g, " ") //Replaces double spaces and leaves a single.
				  .replace(/ \.+/g, "."); //Replaces the space between a word and the period to end a sentence.
	
			  //title, publishedTime, author, source, content, url,
			  //Formatts all of the neccesary inforamtion into one object
			  const articleFormatting = {
				  title: article.title,
				  publishedTime: article.publishedTime,
				  author: article.author,
				  source: article.source,
				  content: articleInTextForm,
				  url: article.url
			  };
	
		  return articleFormatting;
		  }).then((article) => {
			  res.render("new", {article: article, Sentiment: Sentiment, html: html, stringToDom: stringToDom, JSDOM: JSDOM}); //Must be an object
		}).catch((err) => {
		  console.log(err);
		})
	})
	)
		.catch(err => console.log(`Error: ${err}`))
	//   console.log(url);

});


// Server Setup/Initialization
app.listen(process.env.PORT || keys.PORT, () => {
	console.log(`Server running on port ${keys.PORT}!`);
});
