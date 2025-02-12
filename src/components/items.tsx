import Head from 'next/head';

import { highlightedSelectedElement, selectedElement } from '../utils/styles';

// Match characters that override the styling of the page itself
const FORBIDDEN_CHARS_REGEX = /[\\[\]]/g;
function cleanPattern(pattern: string) {
	return pattern.replace(FORBIDDEN_CHARS_REGEX, '');
}

type ItemsProps = {
	numberOfItems: number;
	pattern: string;
	highlightSelected: boolean;
};

export function Items({
	numberOfItems = 10,
	pattern = '',
	highlightSelected = false,
}: ItemsProps) {
	const items = Array(numberOfItems)
		.fill('')
		.map((_, i) => (
			<li
				key={i}
				className="rounded-xs bg-gray-200 dark:bg-gray-700 h-7 list-decimal list-item list-outside ml-8 mb-0.5"
			/>
		));

	const cleanedPattern = cleanPattern(pattern);
	return (
		<>
			<Head>
				<style
					dangerouslySetInnerHTML={{
						__html: `
							.nth-child-list li:nth-child(${cleanedPattern}) {
								${highlightSelected ? highlightedSelectedElement : selectedElement};
							}
						`,
					}}
				/>
			</Head>
			<ul className="nth-child-list">{items}</ul>
		</>
	);
}
