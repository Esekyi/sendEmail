const express = require('express');
const path = require('path');
require('dotenv').config(); // add environment variables here.


const emailRoutes = require('./routes/emailRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// using and setting up Handlebars as the view (html) engine
app.engine('handlebars', require('express-handlebars').engine({ extname: '.hbs' }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));


// any other static file
app.use(express.static(path.join(__dirname, 'public')));

// register email routes to send emails in waitlist
app.use('/api', emailRoutes);


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
{
	console.log(`Server is running on port ${PORT}`);
});
