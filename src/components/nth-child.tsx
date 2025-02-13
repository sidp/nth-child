import { FC, FocusEventHandler, ReactNode, useRef, useState } from 'react';
import { usePatternInUrl } from '../hooks/use-pattern-in-url';
import { setFavicon } from '../utils/favicon';
import { Items } from './items';
import { LinkButton } from './link-button';
import { NumberInput } from './number-input';

function patternIncludesOf(pattern: string) {
	return pattern.indexOf('of') !== -1;
}

export function NthChild() {
	const {
		pattern,
		setPattern,
		hasPatternInUrl,
		activatePatternInUrl,
		resetPattern,
	} = usePatternInUrl();
	const [highlightSelected, setHighlightSelected] = useState(false);
	const trackedEvent = useRef(false);

	const handleChange = (newPattern: string) => {
		if (
			typeof window.plausible === 'function' &&
			trackedEvent.current === false
		) {
			window.plausible('Changed pattern');
			trackedEvent.current = true;
		}

		setPattern(newPattern);
		setFavicon(newPattern);
	};

	const handleBlur: FocusEventHandler = (event) => {
		if (
			event.target instanceof HTMLInputElement &&
			event.target.value.trim() === ''
		) {
			resetPattern();
		}
	};

	const handleMouseEnterSelectedBlock = () => setHighlightSelected(true);
	const handleMouseLeaveSelectedBlock = () => setHighlightSelected(false);

	return (
		<>
			<div className="text-xl font-mono text-gray-500 dark:text-gray-400 mb-5">
				<label>
					:nth-child(
					<NumberInput
						className="border-2 border-gray-400 dark:border-gray-600 hover:border-gray-500 dark:hover:border-gray-500 focus:border-blue-600 dark:focus:border-blue-500 focus-visible:outline-none p-0 inline-block bg-transparent appearance-none text-gray-800 dark:text-gray-100 size-xl text-center w-20 rounded-md"
						name="pattern"
						value={pattern}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
					)
				</label>
				<span className="hidden sm:inline-block">
					{' {'}
					<span
						className="inline-block w-4 h-4 mx-1 align-[-2px] rounded-sm bg-green-500 hover:bg-green-600 dark:hover:bg-green-400 transition-colors"
						onMouseEnter={handleMouseEnterSelectedBlock}
						onMouseLeave={handleMouseLeaveSelectedBlock}
					/>
					{'}'}
				</span>

				{!hasPatternInUrl && (
					<LinkButton
						className="float-right mt-1"
						onClick={activatePatternInUrl}
					>
						Make a URL for this pattern
					</LinkButton>
				)}
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
