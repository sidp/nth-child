import React from 'react';
import styled from 'styled-components';
import NthChild from '../components/nth-child';
import { lightGray } from '../utils/styles';

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
			<Footer>
				<Source>
					Source code on{' '}
					<a
						href="https://github.com/sidp/nth-child"
						target="_blank"
						rel="noopener"
					>
						GitHub
					</a>
				</Source>
				<Byline>
					<a href="https://twitter.com/sidp" target="_blank" rel="noopener">
						@sidp
					</a>
				</Byline>
			</Footer>
		</div>
	);
}

const Heading = styled.h1`
	font-size: 1.4em;
	margin: 0.33em 0;
`;

const Footer = styled.p`
	font-size: 0.8rem;
	border-top: 2px solid ${lightGray};
	margin-top: 2.25rem;
	padding-top: 0.75rem;

	&::after {
		content: '';
		clear: both;
		display: table;
	}
`;

const Source = styled.span`float: left;`;

const Byline = styled.span`float: right;`;
