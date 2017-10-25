import React from 'react';
import styled from 'styled-components';

import { green, lightGray } from '../utils/styles';

export default function Items({ numberOfItems, pattern }) {
	const items = Array.apply(null, { length: numberOfItems }).map((item, i) => (
		<li key={i} />
	));

	return <StyledOrderedList pattern={pattern}>{items}</StyledOrderedList>;
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
