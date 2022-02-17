/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	target: 'serverless',
	images: {
		domains: ['pokedecks.s3.us-west-2.amazonaws.com', 'images.ctfassets.net'],
	},
	typescript: {
		// !! WARN !!
		// Dangerously allow production builds to successfully complete even if
		// your project has type errors.
		// !! WARN !!
		ignoreBuildErrors: true,
	},
};
