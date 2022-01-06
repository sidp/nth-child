import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import NthChild from '../components/nth-child';
import { darkGray, lightGray } from '../utils/styles';

export default function Index() {
	const router = useRouter();
	const title = 'How to use the :nth-child() CSS pseudo-class';
	const description =
		'The patterns of :nth-child() can sometimes be tricky to understand. Edit the selector to see how the selected elements change.';

	const absoluteUrl = (path: string) =>
		process.env.domain + router.basePath + path;

	return (
		<>
			<Head>
				<title>How to use nth-child</title>
				<link
					rel="icon"
					type="image/svg+xml"
					href={'/assets/images/favicon.svg'}
				/>
				<meta name="description" content={description} />
				<meta property="og:title" content={title} />
				<meta
					property="og:image"
					content={absoluteUrl('assets/images/og-image.png')}
				/>
				<meta name="twitter:card" content="summary" />
				<meta name="twitter:title" content={title} />
				<meta name="twitter:description" content={description} />
				<meta
					name="twitter:image"
					content={absoluteUrl('assets/images/twitter-card.png')}
				/>
				<meta name="twitter:creator" content="@sidp" />
			</Head>
			<Heading>:nth-child() CSS pseudo-class</Heading>
			<p>
				The patterns of :nth-child() can sometimes be tricky to understand. Edit
				the selector pattern below to see how the selected elements change. Read
				about how it works on{' '}
				<a
					href="https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child"
					target="_blank"
					rel="noopener"
				>
					MDN
				</a>
				.
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
		</>
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

	@media (prefers-color-scheme: dark) {
		border-color: ${darkGray};
	}

	&::after {
		content: '';
		clear: both;
		display: table;
	}
`;

const Source = styled.span`
	float: left;
`;

const Byline = styled.span`
	float: right;
`;
