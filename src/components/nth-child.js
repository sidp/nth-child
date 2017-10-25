import React, { Component } from 'react';
import styled from 'styled-components';

import NumberInput from './number-input';
import Items from './items';

export default class NthChild extends Component {
	state = {
		pattern: '2n+1',
	};

	static defaultProps = {};

	setInput = arg => {
		const pattern =
			typeof arg === 'string'
				? arg
				: typeof arg === 'object' && arg.target ? arg.target.value : null;
		if (typeof pattern === 'string') {
			this.setState(() => ({
				pattern,
			}));
		}
	};

	render() {
		return (
			<div>
				<Control>
					:nth-child(
					<StyledNumberInput
						type="text"
						defaultValue={this.state.pattern}
						onChange={this.setInput}
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
	color: #666;
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
`;
