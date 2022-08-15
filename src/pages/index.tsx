import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import NthChild from '../components/nth-child';
import ExternalLink from '../components/external-link';

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
			<div className="max-w-2xl mx-auto p-5 md:p-9">
				<h1 className="text-3xl mb-3 font-bold">
					:nth-child() CSS pseudo-class
				</h1>
				<p className="mb-6 text-lg">
					The patterns of :nth-child() can sometimes be tricky to understand.
					Edit the selector pattern below to see how the selected elements
					change. Read about how it works on{' '}
					<ExternalLink
						href="https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child"
						target="_blank"
						rel="noopener"
					>
						MDN
					</ExternalLink>
					.
				</p>
				<NthChild />
				<footer className="text-sm mt-8 pt-3 border-t-2 border-slate-200 dark:border-slate-700 flex justify-between">
					<div>
						Source code on{' '}
						<ExternalLink
							href="https://github.com/sidp/nth-child"
							target="_blank"
							rel="noopener"
						>
							GitHub
						</ExternalLink>
					</div>
					<div>
						<ExternalLink
							href="https://twitter.com/sidp"
							target="_blank"
							rel="noopener"
						>
							@sidp
						</ExternalLink>
					</div>
				</footer>
			</div>
		</>
	);
}
