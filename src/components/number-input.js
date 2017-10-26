import React, { Component } from 'react';
import { numberAt, getNumberAt, changeNumberAt } from '../utils/numbers';

/**
 * TODO: The text field value is a duplicate of the state of the
 * parent component. This needs cleaning up.
 */

export default class NumberInput extends Component {
	static defaultProps = { onChange: () => {} };

	handleKeyDown = ev => {
		// Return early if it's not a up or down keypress
		if ([38, 40].indexOf(ev.keyCode) === -1) {
			return;
		}

		const { value, selectionStart, selectionEnd } = ev.target;

		// Return early if there's no number at the cursor
		if (!numberAt(value, selectionStart)) {
			return;
		}

		ev.preventDefault();

		let increment = 1;

		if (ev.shiftKey) {
			increment = 10;
		}

		if (ev.keyCode === 40) {
			increment = -increment;
		}

		let changed = changeNumberAt(value, selectionStart, increment);

		this.props.onChange(changed.str);

		ev.target.value = changed.str;
		ev.target.setSelectionRange(changed.startIndex, changed.endIndex);
	};

	handleOnChange = ev => {
		this.props.onChange(ev.target.value);
	};

	render() {
		return (
			<input
				{...this.props}
				onKeyDown={this.handleKeyDown}
				onChange={this.handleOnChange}
			/>
		);
	}
}
