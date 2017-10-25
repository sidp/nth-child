import React from 'react';
import { injectGlobal } from 'styled-components';

export default function Layout(props) {
	return <div>{props.children()}</div>;
}

injectGlobal`
	body {
		font-family: sans-serif;
	}

	p, ol, ul, table, input, textarea {
		font-size: 1.2rem;
	}
`;
