const express = require('express');
const router = express.Router();
const transporter = require('../config/mailer');

router.post('/send-email', (req, res) =>
{
	const { emailaddress, subject, fullname, message } = req.body;

	// Set up email options
	const options = {
		from: process.env.EMAIL_USER,
		to: emailaddress,
		subject: subject,
		template: 'email',  // Name of the template file without extension (email.hbs)
		context: {
			fullname: fullname,
			message: message,
		}
	};

	// Send email
	transporter.sendMail(options, (error, info) =>
	{
		if (error)
		{
			return res.status(500).send(error.toString());
		}
		res.status(200).send('Email sent: ' + info.response);
	});
});

module.exports = router;
