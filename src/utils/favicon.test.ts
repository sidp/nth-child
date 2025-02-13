import { describe, it, expect, beforeEach } from 'vitest';
import { favicon, setFavicon } from './favicon';
import { afterEach } from 'node:test';

describe('favicon', () => {
	it('should match previous snapshot', () => {
		expect(favicon('3n+1')).toMatchSnapshot();
		expect(favicon('6n-2')).toMatchSnapshot();
	});

	it('should return null for invalid pattern', () => {
		expect(favicon('hello')).toBeNull();
	});
});

describe('setFavicon', () => {
	beforeEach(() => {
		const iconElement = document.createElement('link');
		iconElement.rel = 'icon';
		iconElement.type = 'image/svg+xml';
		iconElement.href = '/favicon.svg';
		document.head.appendChild(iconElement);

		const icoEl = document.createElement('link');
		icoEl.rel = 'icon';
		icoEl.type = 'image/x-icon';
		document.head.appendChild(icoEl);
	});

	afterEach(() => {
		const iconElement = document.querySelector<HTMLLinkElement>(
			'head link[rel="icon"][type="image/svg+xml"]'
		);
		iconElement?.remove();
	});

	it('should set the favicon', () => {
		setFavicon('3n+1');
		const iconEl = document.querySelector<HTMLLinkElement>(
			'head link[rel="icon"][type="image/svg+xml"]'
		);
		expect(iconEl?.href).toMatch(/^data:image\/svg\+xml;utf8,<svg /);
	});

	it('should remove ico favicon', () => {
		setFavicon('3n+1');
		const icoElement = document.querySelector<HTMLLinkElement>(
			'head link[rel="icon"][type="image/x-icon"]'
		);
		expect(icoElement).toBeNull();
	});

	it('should create a link element if it does not exist', () => {
		document
			.querySelector<HTMLLinkElement>(
				'head link[rel="icon"][type="image/svg+xml"]'
			)
			?.remove();

		setFavicon('3n+1');

		expect(
			document.querySelector<HTMLLinkElement>(
				'head link[rel="icon"][type="image/svg+xml"]'
			)
		).not.toBeNull();
	});

	it('should not update favicon with invalid pattern', () => {
		const prevHref = document
			.querySelector<HTMLLinkElement>(
				'head link[rel="icon"][type="image/svg+xml"]'
			)
			?.getAttribute('href');

		setFavicon('hello');

		expect(
			document
				.querySelector<HTMLLinkElement>(
					'head link[rel="icon"][type="image/svg+xml"]'
				)
				?.getAttribute('href')
		).toEqual(prevHref);
	});
});
