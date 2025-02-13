import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ExternalLink } from './external-link';

describe('ExternalLink', () => {
	it('renders a link', () => {
		render(<ExternalLink href="https://example.com">Hello</ExternalLink>);
		const link = screen.getByText('Hello');
		expect(link).toHaveAttribute('href', 'https://example.com');
	});
});
