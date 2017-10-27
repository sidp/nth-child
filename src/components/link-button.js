import React, { Component } from 'react';
import styled from 'styled-components';
import SymbolLink from './symbol-link';
import { gray, blue } from '../utils/styles';

export default class LinkButton extends Component {
	state = {
		hover: false,
	};

	startHover = () => {
		this.setState(() => ({ hover: true }));
	};

	endHover = () => {
		this.setState(() => ({ hover: false }));
	};

	render() {
		const { children, ...props } = this.props;
		const symbolColor = this.state.hover ? blue : gray;
		return (
			<PlainButton
				{...props}
				title={children}
				onMouseEnter={this.startHover}
				onMouseLeave={this.endHover}
			>
				<SymbolLink color={symbolColor} />
			</PlainButton>
		);
	}
}

const PlainButton = styled.button`
	cursor: pointer;
	background: transparent;
	border: 0;
	appearance: none;
`;
