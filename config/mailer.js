const nodemailer = require('nodemailer');
const path = require('path');
const hbs = require('nodemailer-express-handlebars');

// Configure Nodemailer package used in sending the email
const transporter = nodemailer.createTransport({
	service: 'gmail',  // You can use other email services - for gmail, you should set up 2FA
	auth: {
		user: process.env.EMAIL_USER, // add logins in env variables - Use environment variables for sensitive data
		pass: process.env.EMAIL_PASS,
	}
});

// Set up Handlebars as the template engine for Nodemailer - the email html files
const handlebarsOptions = {
	viewEngine: {
		extName: '.hbs',
		partialsDir: path.resolve('./views/partials'),
		defaultLayout: false,
	},
	viewPath: path.resolve('./views'),
	extName: '.hbs',
};

transporter.use('compile', hbs(handlebarsOptions));

module.exports = transporter;
