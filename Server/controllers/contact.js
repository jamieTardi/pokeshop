import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import * as fs from 'fs';

const transporter = nodemailer.createTransport({
	host: 'smtp.zoho.eu',
	port: 465,
	secure: true,
	auth: {
		user: process.env.MAIL_USERNAME,
		pass: process.env.MAIL_PASSWORD,
	},
});

export const sendContact = async (req, res) => {
	if (req.headers.apikey === process.env.API_KEY) {
		const { email, firstName, lastName, message } = req.body;

		try {
			fs.readFile(
				'emails/contact.html',
				{ encoding: 'utf-8' },
				function (err, html) {
					if (err) {
						console.log(err);
					} else {
						let template = handlebars.compile(html);
						let data = {
							email,
							firstName,
							lastName,
							message,
						};
						let mailList = [ email, process.env.MAIL_FROM];
						let htmlToSend = template(data);
						let mailOptions = {
							from: process.env.MAIL_FROM,
							to: mailList,
							subject: 'New contact form from poke decks!',
							html: htmlToSend,
						};
						transporter.sendMail(mailOptions, function (error, info) {
							if (error) {
								console.log(error);
							} else {
								console.log('Email sent: ' + info.response);
							}
						});
					}
				},
			);
			res.status(201).json('Message sent! 💨');
		} catch (err) {
			res
				.status(500)
				.json('Message ddi not send, there was a error, try again!');
		}
	} else {
		res.status(404).json({ message: 'Wrong Key' });
	}
};
