module.exports = {
	siteMetadata: {
		title: 'nth-child',
		hostname: 'https://nth-child.design',
	},
	plugins: [
		'gatsby-plugin-styled-components',
		'gatsby-plugin-react-next',
		{
			resolve: 'gatsby-plugin-google-analytics',
			options: {
				trackingId: 'UA-60527-12',
			},
		},
	],
};
