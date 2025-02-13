import { gray, green, lightGray } from './styles';

export function setFavicon(pattern: string) {
	const icoEl = document.querySelector<HTMLLinkElement>(
		'head link[rel="icon"][type="image/x-icon"]'
	);
	icoEl?.parentElement?.removeChild(icoEl);

	let iconEl = document.querySelector<HTMLLinkElement>(
		'head link[rel="icon"][type="image/svg+xml"]'
	);

	if (!iconEl) {
		iconEl = document.createElement('link');
		iconEl.setAttribute('rel', 'icon');
		iconEl.setAttribute('type', 'image/svg+xml');
		iconEl.setAttribute('href', favicon(pattern));
		document.head.appendChild(iconEl);
	} else {
		iconEl.setAttribute('href', favicon(pattern));
	}
}

export function favicon(pattern: string) {
	const matches = (i: number) => isMatched(pattern, i);

	return `data:image/svg+xml;utf8,<svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
		<style>
			.bar {
				fill: ${svgColor(lightGray)};
			}
			.bar.selected {
				fill: ${svgColor(green)};
			}
			@media (prefers-color-scheme: dark) {
				.bar {
					fill: ${svgColor(gray)};
				}
			}
		</style>
		<rect class="bar ${
			matches(1) ? 'selected' : ''
		}" x="1" y="1" width="14" height="2" rx="1"/>
		<rect class="bar ${
			matches(2) ? 'selected' : ''
		}" x="1" y="4" width="14" height="2" rx="1"/>
		<rect class="bar ${
			matches(3) ? 'selected' : ''
		}" x="1" y="7" width="14" height="2" rx="1"/>
		<rect class="bar ${
			matches(4) ? 'selected' : ''
		}" x="1" y="10" width="14" height="2" rx="1"/>
		<rect class="bar ${
			matches(5) ? 'selected' : ''
		}" x="1" y="13" width="14" height="2" rx="1"/>
	</svg>`;
}

const isMatched = (pattern: string, i: number) => {
	pattern = pattern.trim();
	const seq = Array(50)
		.fill('')
		.map((_, i) => i);

	if (pattern === 'odd') {
		return i % 2 === 1;
	}

	if (pattern === 'even') {
		return i % 2 === 0;
	}

	if (pattern.indexOf('n') !== -1) {
		const parts = pattern.split('n');

		if (
			typeof parts[1] === 'string' &&
			parts[1].length > 0 &&
			!['+', '-'].includes(parts[1].charAt(0))
		) {
			return false;
		}

		const addition = parts[1] ? Number(parts[1]) : 0;

		return seq.some((s) => Number(parts[0]) * s + addition === i);
	}

	const no = Number(pattern);
	if (isNaN(no)) return false;
	return no === i;
};

const svgColor = (color: string) => encodeURIComponent(color);
