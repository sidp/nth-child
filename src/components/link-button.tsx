import React, { Component } from 'react';
import styled from 'styled-components';
import SymbolLink from './symbol-link';
import { gray, blue } from '../utils/styles';

type LinkButtonProps = React.HTMLAttributes<HTMLButtonElement>;

type LinkButtonState = {
	hover: boolean;
};

export default class LinkButton extends Component<
	LinkButtonProps,
	LinkButtonState
> {
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
				onMouseEnter={this.startHover}
				onMouseLeave={this.endHover}
			>
				<Label>{children}</Label>
				<SymbolLink color={symbolColor} />
			</PlainButton>
		);
	}
}

const PlainButton = styled.button`
	cursor: pointer;
	background: transparent;
	border: 0;
	padding: 0;
	margin: 0;
	appearance: none;
`;

const Label = styled.span`
	clip: rect(1px, 1px, 1px, 1px);
	clip-path: inset(50%);
	height: 1px;
	width: 1px;
	margin: -1px;
	overflow: hidden;
	padding: 0;
	position: absolute;
`;
