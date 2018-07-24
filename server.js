// Require plugins
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

// Set up express app
var app = express();
app.set('view engine', 'hbs');

//Middleware - logger
app.use((request, response, next) => {
	var now = new Date().toString();
	var log = `${now}: ${request.method} ${request.url}`;

	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) console.log('Unable to append to server.log');
	});

	next();
});

// //Middleware - maintenance mode
// app.use((request, response, next) => {
// 	response.render('maintenance.hbs', {
// 		pageTitle  : 'Maintenance Mode',
// 		welcomeMsg : 'We are currently down for maintenance. Please check back shortly.'
// 	});
// });

// Express static public directory
app.use(express.static(__dirname + '/public'));

// HBS register
hbs.registerPartials(__dirname + '/views/_partials');
hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

// Routes
app.get('/', (request, response) => {
	response.render('home.hbs', {
		pageTitle	: 'Home Page',
		welcomeMsg	: 'Welcome to my NodeJS web server.'
	});
});

app.get('/about', (request, response) => {
	response.render('about.hbs', {
		pageTitle	: 'About Page',
		welcomeMsg	: 'Welcome to the About page.'
	});
});

app.get('/bad', (request, response) => {
	response.send(request.query.error);
});

// List for Routes
app.listen(3000, () => {
	console.log("Server is up on port 3000.");
});