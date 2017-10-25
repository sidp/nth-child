import React from 'react';
import { injectGlobal } from 'styled-components';

export default function Layout(props) {
	return <div>{props.children()}</div>;
}

injectGlobal`
	body {
		font-size: 1.2rem;
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
		max-width: 40em;
		margin: 0 auto;
		padding: 0.25em 0.5em;

		@media (min-width: 50em) {
			padding: 1em 1.5em;
		}
	}
`;
