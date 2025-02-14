import { ChangeEvent, HTMLAttributes, KeyboardEvent } from 'react';
import { flushSync } from 'react-dom';
import { changeNumberAt, hasNumberAt } from '../utils/numbers';

type NumberInputAttributes = Omit<HTMLAttributes<HTMLInputElement>, 'onChange'>;

type NumberInputProps = NumberInputAttributes & {
	name: string;
	value: string;
	onChange: (value: string, callback?: () => void) => void;
};

export function NumberInput({
	value = '',
	onChange,
	...props
}: NumberInputProps) {
	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (!(event.target instanceof HTMLInputElement)) return;

		// When up or down is pressed
		if (['ArrowUp', 'ArrowDown'].includes(event.key)) {
			const { value, selectionStart } = event.target;

			if (selectionStart === null) return;

			/**
			 * Always preventDefault on up-down press to make the behaviour
			 * consistent, regardless of if a number is close to the cursor
			 * or not.
			 */
			event.preventDefault();

			// Return early if there's no number at the cursor
			if (!hasNumberAt(value, selectionStart)) {
				return;
			}

			let increment = 1;

			if (event.shiftKey) {
				increment = 10;
			}

			if (event.key === 'ArrowDown') {
				increment = -increment;
			}

			let changed = changeNumberAt(value, selectionStart, increment);

			if (changed) {
				if (!(event.target instanceof HTMLInputElement)) {
					return;
				}

				flushSync(() => {
					onChange(changed.string);
				});

				event.target.setSelectionRange(
					changed.selectionStartIndex,
					changed.selectionEndIndex
				);
			}
		}
	};

	const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
		if (!(ev.target instanceof HTMLInputElement)) return;
		onChange(ev.target.value);
	};

	return (
		<input
			value={value}
			{...props}
			type="text"
			onKeyDown={handleKeyDown}
			onChange={handleChange}
		/>
	);
}
