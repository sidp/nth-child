/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	env: {
		domain: 'https://nth-child.simonsson.com',
	},
	async rewrites() {
		return [
			{
				source: '/js/script.js',
				destination: 'https://plausible.io/js/script.js',
			},
		];
	},
};
