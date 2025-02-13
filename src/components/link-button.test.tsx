import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { LinkButton } from './link-button';

describe('LinkButton', () => {
	it('renders a button', () => {
		render(<LinkButton>Hello</LinkButton>);
		const button = screen.getByRole('button', { name: 'Hello' });
		expect(button).toBeInTheDocument();
	});

	it('fires a callback when clicked', () => {
		const callback = vi.fn();
		render(<LinkButton onClick={callback}>Hello</LinkButton>);
		fireEvent.click(screen.getByRole('button', { name: 'Hello' }));
		expect(callback).toHaveBeenCalledOnce();
	});
});
