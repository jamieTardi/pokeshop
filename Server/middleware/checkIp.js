export const checkIp = async (req, res, next) => {
	const { ip } = req.body;

	try {
		// req.ip ||
		// 	req.headers['x-forwarded-for'] ||
		// 	req.connection.remoteAddress ||
		// 	req.socket.remoteAddress ||
		// 	req.connection.socket.remoteAddress;

		if (ip === '86.19.118.180') {
			res.status(200).json('correct');
		} else {
			res.status(404).json('wrong');
		}
	} catch {
		res.status(404).json('error');
	}
};
