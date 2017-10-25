import React from 'react';
import styled from 'styled-components';
import NthChild from '../components/nth-child';

export default function Index() {
	return (
		<div>
			<Heading>:nth-child() CSS pseudo-class</Heading>
			<p>
				Enter your selector pattern below. Read more about it on{' '}
				<a
					href="https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child"
					target="_blank"
					rel="noopener"
				>
					MDN
				</a>.
			</p>
			<NthChild />
		</div>
	);
}

const Heading = styled.h1`
	font-size: 1.4em;
	margin: 0.33em 0;
`;
