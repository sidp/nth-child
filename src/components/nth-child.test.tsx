import {
	fireEvent,
	render,
	renderHook,
	screen,
	waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { NthChild } from './nth-child';
import { useState } from 'react';

describe('NthChild', () => {
	it('renders a text box', () => {
		render(<NthChild />);
		const input = screen.getByRole('textbox');
		expect(input).toBeInTheDocument();
	});

	it('renders a list', () => {
		render(<NthChild />);
		const list = screen.getByRole('list');
		expect(list).toBeInTheDocument();
	});

	it('updates the value of the pattern input', async () => {
		render(<NthChild />);
		const input = screen.getByRole('textbox');

		await userEvent.click(input);
		await userEvent.clear(input);
		await userEvent.keyboard('5n-2');

		expect(input).toHaveValue('5n-2');
	});

	it('adds the pattern to the hash', async () => {
		render(<NthChild />);
		const input = screen.getByRole('textbox');
		const linkButton = screen.getByRole('button', {
			name: /Make a URL for this pattern/i,
		});

		await userEvent.clear(input);
		await userEvent.type(input, '5n-2');

		expect(window.location.hash).toBe('');

		await userEvent.click(linkButton);

		expect(window.location.hash).toBe('#pattern:5n-2');
	});

	it('sets the pattern from the hash', async () => {
		window.location.hash = '#pattern:5n-2';

		render(<NthChild />);
		const input = screen.getByRole('textbox');
		expect(input).toHaveValue('5n-2');
	});

	it('displays a notice for invalid pattern', async () => {
		render(<NthChild />);
		const input = screen.getByRole('textbox');

		await userEvent.type(input, '3n++');

		waitFor(() => {
			const notice = screen.getByText(/pattern is not valid/i);
			expect(notice).toBeInTheDocument();
		});
	});

	it('resets the pattern if the field is left empty', async () => {
		render(<NthChild />);
		const input = screen.getByRole('textbox');

		await userEvent.clear(input);
		await userEvent.type(input, '5n-2');

		expect(input).toHaveValue('5n-2');
		await userEvent.clear(input);
		expect(input).toHaveValue('');

		fireEvent.blur(input);

		expect(input).toHaveValue('3n+1');
	});
});
