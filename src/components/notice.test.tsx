import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DelayedNotice, Notice } from './notice';

describe('Notice', () => {
	it('renders text', () => {
		render(<Notice>Hello</Notice>);
		const notice = screen.getByText('Hello');
		expect(notice).toBeInTheDocument();
	});
});

describe('DelayedNotice', () => {
	it('renders text after a delay', async () => {
		render(<DelayedNotice delay={100}>Hello</DelayedNotice>);
		expect(screen.queryByText('Hello')).not.toBeInTheDocument();

		waitFor(() => {
			const notice = screen.getByText('Hello');
			expect(notice).toBeInTheDocument();
		});
	});
});
