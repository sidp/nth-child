import React, { Component } from 'react';
import styled from 'styled-components';
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
				:nth-child (
				<Input
					type="text"
					value={this.state.pattern}
					onChange={this.setInput}
				/>
				)
				<Items numberOfItems={20} pattern={this.state.pattern} />
			</div>
		);
	}
}

const Input = styled.input`
	font-size: 1em;
	border: 0;
	padding: 0;
	display: inline-block;
	background-color: transparent;
	appearance: none;
`;
