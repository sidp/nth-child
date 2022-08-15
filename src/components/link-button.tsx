import React, { Component } from 'react';
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
			<button
				className=""
				{...props}
				onMouseEnter={this.startHover}
				onMouseLeave={this.endHover}
			>
				<span className="sr-only">{children}</span>
				<SymbolLink color={symbolColor} />
			</button>
		);
	}
}
