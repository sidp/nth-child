import React from 'react';
import { injectGlobal } from 'styled-components';

import { blue, darkBlue } from '../utils/styles';

export default function Layout(props) {
	return <div>{props.children()}</div>;
}

injectGlobal`
	body {
		font-size: 1.2rem;
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
		line-height: 1.4;
		max-width: 40em;
		margin: 0 auto;
		padding: 0.25em 0.5em;

		@media (min-width: 50em) {
			padding: 1em 1.5em;
		}
	}

	p {
		margin-top: 0.75em;
		margin-bottom: 0.75em;
	}

	a {
		color: ${blue};
	}

	a:active {
		color: ${darkBlue};
	}
`;
