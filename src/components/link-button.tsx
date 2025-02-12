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
	render() {
		const { children, ...props } = this.props;
		return (
			<button className="group" {...props}>
				<span className="sr-only">{children}</span>
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
				>
					<g
						className="stroke-gray-500 group-hover:stroke-blue-600"
						strokeWidth="2"
					>
						<path d="M11.5 6.82l2.5-2.5c1.5-1.5 4-2 6 0s1.5 4.5 0 6l-4 4c-1.5 1.5-4.517 1.482-6 0-.667-.668-1-1.334-1-2" />
						<path d="M12.82 17.619c-.668.666-1.5 1.5-2.5 2.5-1.5 1.5-4 2-6 0s-1.5-4.5 0-6l4-4c1.5-1.5 4.516-1.483 6 0 .666.666 1 1.333 1 2" />
					</g>
				</svg>
			</button>
		);
	}
}
