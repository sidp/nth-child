import { render, renderHook, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { NumberInput } from './number-input';
import { useState } from 'react';

describe('NumberInput', () => {
	it('renders a text box', () => {
		render(<NumberInput name="test" value="" onChange={vi.fn()} />);
		const input = screen.getByRole('textbox');
		expect(input).toBeInTheDocument();
	});

	it('calls onChange when changed', async () => {
		const handleChange = vi.fn();
		render(<NumberInput name="test" value="" onChange={handleChange} />);
		const input = screen.getByRole('textbox');

		await userEvent.type(input, '42');

		expect(handleChange).toHaveBeenCalledTimes(2);
	});

	it('updates the number when arrow keys are pressed', async () => {
		const user = userEvent.setup();
		const callback = vi.fn();

		render(<NumberInput name="test" value="No 1" onChange={callback} />);
		const input = screen.getByRole('textbox');

		await user.click(input);
		await user.keyboard('[ArrowLeft>3][ArrowUp]');

		waitFor(() => {
			expect(callback).toHaveBeenCalledWith('No 2');
		});
	});

	it('should increment by 10 when shift is pressed', async () => {
		const user = userEvent.setup();
		const callback = vi.fn();

		render(<NumberInput name="test" value="No 1" onChange={callback} />);
		const input = screen.getByRole('textbox');

		await user.click(input);
		await user.keyboard('[ArrowLeft>3][Shift][ArrowUp]');

		waitFor(() => {
			expect(callback).toHaveBeenCalledWith('No 11');
		});
	});

	it('selects the number that was changed', async () => {
		const user = userEvent.setup();

		const {
			result: {
				current: [state, setState],
			},
		} = renderHook(() => {
			return useState('No 1');
		});

		const { rerender } = render(
			<NumberInput name="test" value={state} onChange={setState} />
		);
		const input = screen.getByRole<HTMLInputElement>('textbox');

		await user.click(input);
		await user.keyboard('[ArrowLeft>3][ArrowUp]');

		rerender(<NumberInput name="test" value={state} onChange={setState} />);

		waitFor(() => {
			expect(input.selectionStart).toBe(3);
			expect(input.selectionEnd).toBe(4);
		});
	});
});
