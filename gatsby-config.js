module.exports = {
	siteMetadata: {
		title: 'nth-child',
		hostname: 'https://nth-child.design',
		pathPrefix: '',
	},
	plugins: [
		'gatsby-plugin-styled-components',
		{
			resolve: 'gatsby-plugin-google-analytics',
			options: {
				trackingId: 'UA-60527-12',
			},
		},
	],
};
