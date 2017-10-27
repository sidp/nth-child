import React from 'react';
import styled from 'styled-components';

import { green, lightGray } from '../utils/styles';

// Match characters that override the styling of the page itself
const FORBIDDEN_CHARS_REGEX = /[\\\[\]]/g;
function cleanPattern(pattern) {
	return pattern.replace(FORBIDDEN_CHARS_REGEX, '');
}

export default function Items({ numberOfItems = 10, pattern = '' }) {
	const items = Array.apply(null, { length: numberOfItems }).map((item, i) => (
		<li key={i} />
	));

	const cleanedPattern = cleanPattern(pattern);
	return (
		<StyledOrderedList pattern={cleanedPattern}>{items}</StyledOrderedList>
	);
}

const StyledOrderedList = styled.ol`
	li {
		background-color: ${lightGray};
	}

	li + li {
		margin-top: 2px;
	}

	li:nth-child(${props => props.pattern}) {
		background-color: ${green};
	}
`;
