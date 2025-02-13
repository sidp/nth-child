import { describe, it, expect } from 'vitest';
import { Items } from './items';
import { render, screen } from '@testing-library/react';

describe('Items', () => {
	it('renders a list', () => {
		render(<Items pattern="3n+1" highlightSelected numberOfItems={10} />);
		const list = screen.getByRole('list');
		expect(list).toBeInTheDocument();
	});

	it('renders a list with items', () => {
		render(<Items pattern="3n+1" highlightSelected numberOfItems={10} />);
		const items = screen.getAllByRole('listitem');
		expect(items.length).toBe(10);
	});
});
