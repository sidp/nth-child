import React, { FC } from 'react';
import styled from 'styled-components';

import {
	lightGray,
	selectedElement,
	highlightedSelectedElement,
	darkGray,
} from '../utils/styles';

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

const Items: FC<ItemsProps> = ({
	numberOfItems = 10,
	pattern = '',
	highlightSelected = false,
}) => {
	const items = Array(numberOfItems)
		.fill('')
		.map((item, i) => <li key={i} />);

	const cleanedPattern = cleanPattern(pattern);
	return (
		<NthChildList
			pattern={cleanedPattern}
			highlightSelected={highlightSelected}
		>
			{items}
		</NthChildList>
	);
};

/**
 * The use of :nth-child and props below generates a new css class each time
 * the prop is changed to something new. This can cause the styles to grow
 * very large.
 */
const NthChildList = styled.ol<{ pattern: string; highlightSelected: boolean }>`
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

export default Items;
