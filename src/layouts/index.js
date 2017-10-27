import React from 'react';
import { injectGlobal } from 'styled-components';

import { font, fontMono, blue, darkBlue } from '../utils/styles';

export default function Layout(props) {
	return <div>{props.children()}</div>;
}

injectGlobal`
	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}

	body {
		font-size: 1.2rem;
		font-family: ${font};
		line-height: 1.4;
		max-width: 35em;
		margin: 0 auto;
		padding: 0.25em 0.5em;

		@media (min-width: 50em) {
			padding: 1em 1.5em;
		}
	}

	a {
		color: ${blue};
	}

	a:active {
		color: ${darkBlue};
	}

	code {
		font-family: ${fontMono};
	}
`;
