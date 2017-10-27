import React from 'react';
import styled from 'styled-components';
import NthChild from '../components/nth-child';

export default function Index() {
	return (
		<div>
			<Heading>:nth-child() CSS pseudo-class</Heading>
			<p>
				The patterns of :nth-child() can sometimes be tricky to understand. Edit
				the selector pattern below to see how the selected elements change. Read
				about how it works on{' '}
				<a
					href="https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child"
					target="_blank"
					rel="noopener"
					tabIndex="10"
				>
					MDN
				</a>.
			</p>
			<NthChild />
			<Byline>
				<a
					href="https://twitter.com/sidp"
					target="_blank"
					rel="noopener"
					tabIndex="11"
				>
					@sidp
				</a>
			</Byline>
		</div>
	);
}

const Heading = styled.h1`
	font-size: 1.4em;
	margin: 0.33em 0;
`;

const Byline = styled.p`
	font-size: 0.8rem;
	text-align: right;
`;
