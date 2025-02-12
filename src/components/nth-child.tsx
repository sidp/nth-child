import React, { FC, ReactNode, useState, useRef } from 'react';

import NumberInput from './number-input';
import Items from './items';
import LinkButton from './link-button';
import { usePatternInUrl } from '../hooks/use-pattern-in-url';
import { usePatternFavicon } from '../hooks/use-pattern-favicon';

function patternIncludesOf(pattern: string) {
	return pattern.indexOf('of') !== -1;
}

export default function NthChild() {
	const [pattern, setPattern] = usePatternInUrl();
	const [highlightSelected, setHighlightSelected] = useState(false);
	const trackedEvent = useRef(false);

	usePatternFavicon(pattern);

	const handleChange = (pattern: string) => {
		if (
			typeof window.plausible === 'function' &&
			trackedEvent.current === false
		) {
			window.plausible('Changed pattern');
			trackedEvent.current = true;
		}

		setPattern(pattern);
	};

	const handleMouseEnterSelectedBlockExample = () => {
		setHighlightSelected(true);
	};

	const handleMouseLeaveSelectedBlockExample = () => {
		setHighlightSelected(false);
	};

	return (
		<>
			<div className="text-xl font-mono text-gray-500 mb-5">
				<label>
					:nth-child(
					<NumberInput
						className=" border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 focus:border-blue-600 focus-visible:outline-none p-0 inline-block bg-transparent appearance-none text-gray dark:text-gray-100 size-xl text-center w-20 rounded-md"
						name="pattern"
						value={pattern}
						onChange={handleChange}
					/>
					)
				</label>
				<span className="hidden sm:inline-block">
					{' {'}
					<span
						className="inline-block w-4 h-4 mx-1 rounded-sm bg-green-500 hover:bg-green-600"
						onMouseEnter={handleMouseEnterSelectedBlockExample}
						onMouseLeave={handleMouseLeaveSelectedBlockExample}
					/>
					{'}'}
				</span>

				<LinkButton className="float-right mt-1" onClick={() => {}}>
					Make a URL for this pattern
				</LinkButton>
			</div>
			{patternIncludesOf(pattern) && (
				<Notice>
					This thing can unfortunately not show patterns using the{' '}
					<code className="whitespace-pre">{'of <selector>'}</code> syntax.
				</Notice>
			)}
			<Items
				numberOfItems={20}
				pattern={pattern}
				highlightSelected={highlightSelected}
			/>
		</>
	);
}

const Notice: FC<{ children: ReactNode }> = ({ children }) => (
	<p className="px-4 py-3 bg-yellow-100">{children}</p>
);
