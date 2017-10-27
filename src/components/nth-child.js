import React, { Component } from 'react';
import styled from 'styled-components';

import NumberInput from './number-input';
import Items from './items';

import { blue, gray } from '../utils/styles';

export default class NthChild extends Component {
	state = {
		pattern: '2n+1',
	};

	static defaultProps = {};

	handleOnChange = (pattern, callback = () => {}) => {
		this.setState(() => ({ pattern }), callback);
	};

	render() {
		return (
			<div>
				<Control>
					:nth-child(
					<StyledNumberInput
						type="text"
						value={this.state.pattern}
						onChange={this.handleOnChange}
						tabIndex="1"
					/>
					)
				</Control>

				<Items numberOfItems={20} pattern={this.state.pattern} />
			</div>
		);
	}
}

const Control = styled.p`
	font-size: 1.3em;
	font-family: monospace;
	color: ${gray};
`;

const StyledNumberInput = styled(NumberInput)`
	border: 0;
	padding: 0;
	display: inline-block;
	background-color: transparent;
	appearance: none;
	color: #000;
	font-size: 1em;
	font-family: inherit;
	text-align: center;
	width: 4.5em;
	line-height: 1.6;
	border-radius: 3px;
	box-shadow: inset 0 0 0 2px #edf1f5;

	&:hover {
		box-shadow: inset 0 0 0 2px #e1e7ed;
	}

	&:focus {
		outline: 0;
		box-shadow: inset 0 0 0 2px ${blue};
	}
`;
