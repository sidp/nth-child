import React, { Component } from 'react';
import { hasNumberAt, changeNumberAt } from '../utils/numbers';

type NumberInputAttributes = Omit<
	React.HTMLAttributes<HTMLInputElement>,
	'onChange'
>;

type NumberInputProps = NumberInputAttributes & {
	name: string;
	onChange: (value: string, callback?: () => void) => void;
};

export default class NumberInput extends Component<NumberInputProps> {
	static defaultProps = {
		value: '',
		onChange: () => {},
	};

	handleKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
		if (!(ev.target instanceof HTMLInputElement)) return;

		// When up or down is pressed
		if (['ArrowUp', 'ArrowDown'].includes(ev.key)) {
			const { value, selectionStart } = ev.target;

			if (selectionStart === null) return;

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
					if (
						typeof changed === 'boolean' ||
						!(ev.target instanceof HTMLInputElement)
					)
						return;

					ev.target.setSelectionRange(
						changed.selectionStartIndex,
						changed.selectionEndIndex
					);
				});
			}
		}
	};

	handleOnChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
		if (!(ev.target instanceof HTMLInputElement)) return;
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
				type="text"
				onKeyDown={this.handleKeyDown}
				onChange={this.handleOnChange}
			/>
		);
	}
}
