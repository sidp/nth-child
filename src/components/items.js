import React from 'react';
import styled from 'styled-components';

import {
	lightGray,
	selectedElement,
	highlightedSelectedElement,
	darkGray,
} from '../utils/styles';

// Match characters that override the styling of the page itself
const FORBIDDEN_CHARS_REGEX = /[\\[\]]/g;
function cleanPattern(pattern) {
	return pattern.replace(FORBIDDEN_CHARS_REGEX, '');
}

export default function Items({
	numberOfItems = 10,
	pattern = '',
	highlightSelected = false,
}) {
	const items = Array.apply(null, { length: numberOfItems }).map((item, i) => (
		<li key={i} />
	));

	const cleanedPattern = cleanPattern(pattern);
	return (
		<NthChildList
			pattern={cleanedPattern}
			highlightSelected={highlightSelected}
		>
			{items}
		</NthChildList>
	);
}

/**
 * The use of :nth-child and props below generates a new css class each time
 * the prop is changed to something new. This can cause the styles to grow
 * very large.
 */
const NthChildList = styled.ol`
	li {
		border-radius: 2px;
		background-color: ${lightGray};

		@media (prefers-color-scheme: dark) {
			background-color: ${darkGray};
		}
	}

	li + li {
		margin-top: 2px;
	}

	li:nth-child(${(props) => props.pattern}) {
		${(props) =>
			props.highlightSelected ? highlightedSelectedElement : selectedElement};
	}
`;
