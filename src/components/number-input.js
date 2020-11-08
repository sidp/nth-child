import React, { Component } from 'react';
import { hasNumberAt, getNumberAt, changeNumberAt } from '../utils/numbers';

export default class NumberInput extends Component {
	static defaultProps = {
		value: '',
		onChange: (value, callback) => {},
	};

	handleKeyDown = (ev) => {
		// When up or down is pressed
		if ([38, 40].indexOf(ev.keyCode) !== -1) {
			const { value, selectionStart, selectionEnd } = ev.target;

			/**
			 * Always preventDefault on up-down press to make the behaviour
			 * consistent, regardless of if a number is close to the cursor
			 * or not.
			 */
			ev.preventDefault();

			// Return early if there's no number at the cursor
			if (!hasNumberAt(value, selectionStart)) {
				return;
			}

			let increment = 1;

			if (ev.shiftKey) {
				increment = 10;
			}

			if (ev.keyCode === 40) {
				increment = -increment;
			}

			let changed = changeNumberAt(value, selectionStart, increment);
			if (changed) {
				/**
				 * TODO: This relies on the parent component firing the callback
				 * provided back when calling the onChange property function, for
				 * selecting the changed number in the text field. It shouldn't
				 * have to rely on it's parent component for this.
				 */
				ev.persist(); // keep event around for use in callback
				this.props.onChange(changed.str, () => {
					ev.target.setSelectionRange(
						changed.selectionStartIndex,
						changed.selectionEndIndex
					);
				});
			}
		}
	};

	handleOnChange = (ev) => {
		this.props.onChange(ev.target.value);
	};

	render() {
		/**
		 * Don't pass the onChange prop to input, because we’re
		 * overwriting it with our own.
		 */
		const { onChange, ...props } = this.props;
		return (
			<input
				{...props}
				onKeyDown={this.handleKeyDown}
				onChange={this.handleOnChange}
			/>
		);
	}
}
