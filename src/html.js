import React from 'react';

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

	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>How to use nth-child</title>
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
