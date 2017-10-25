import React from 'react';
import NthChild from '../components/nth-child';

export default function Index() {
	return (
		<div>
			<h1>The :nth-child() CSS pseudo-class</h1>
			<p>
				Enter your selector pattern below. Read all about it on{' '}
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
