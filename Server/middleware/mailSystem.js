// import nodemailer from 'nodemailer';

// // async..await is not allowed in global scope, must use a wrapper
// export async function mailer() {
// 	// create reusable transporter object using the default SMTP transport

// 	let transporter = nodemailer.createTransport({
// 		service: 'gmail',
// 		auth: {
// 			type: 'OAuth2',
// 			user: process.env.MAIL_USERNAME,
// 			pass: process.env.MAIL_PASSWORD,
// 			clientId: process.env.OAUTH_CLIENTID,
// 			clientSecret: process.env.OAUTH_CLIENT_SECRET,
// 			refreshToken: process.env.OAUTH_REFRESH_TOKEN,
// 		},
// 	});
// 	let mailOptions = {
// 		from: process.env.MAIL_USERNAME,
// 		to: 'jamie.tardi@gmail.com',
// 		subject: 'Your order from Poke Decks!',
// 		text: `Your order number is: 123`,
// 	};
// 	transporter.sendMail(mailOptions, function (err, data) {
// 		if (err) {
// 			console.log('Error ' + err);
// 		} else {
// 			console.log('Email sent successfully');
// 		}
// 	});
// }

// mailer().catch(console.error);
