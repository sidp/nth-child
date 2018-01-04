import React from 'react';
import absoluteUrl from './utils/absolute-url';

let stylesStr;
if (process.env.NODE_ENV === 'production') {
	try {
		stylesStr = require('!raw-loader!../public/styles.css');
	} catch (e) {
		console.log(e);
	}
}

export default function Html({ headComponents, body, postBodyComponents }) {
	let css;
	if (process.env.NODE_ENV === 'production') {
		css = (
			<style
				id="gatsby-inlined-css"
				dangerouslySetInnerHTML={{ __html: stylesStr }}
			/>
		);
	}

	const title = 'How to use the :nth-child() CSS pseudo-class';
	const description =
		'The patterns of :nth-child() can sometimes be tricky to understand. Edit the selector to see how the selected elements change.';

	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>How to use nth-child</title>
				<link
					rel="icon"
					type="image/x-icon"
					href={require('./assets/images/favicon.ico')}
				/>
				<meta name="description" content={description} />
				<meta property="og:title" content={title} />
				<meta
					property="og:image"
					content={absoluteUrl(require('./assets/images/og-image.png'))}
				/>
				<meta name="twitter:card" content="summary" />
				<meta name="twitter:title" content={title} />
				<meta name="twitter:description" content={description} />
				<meta
					name="twitter:image"
					content={absoluteUrl(require('./assets/images/twitter-card.png'))}
				/>
				<meta name="twitter:creator" content="@sidp" />
				{headComponents}
				{css}
			</head>
			<body>
				<div id="___gatsby" dangerouslySetInnerHTML={{ __html: body }} />
				{postBodyComponents}
			</body>
		</html>
	);
}
