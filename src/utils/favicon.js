import { green, lightGray, gray } from './styles';

export default function favicon(pattern) {
	const matches = (i) => isMatched(pattern, i);

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

const isMatched = (pattern, i) => {
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

		return seq.some((s) => parts[0] * s + addition === i);
	}

	const no = Number(pattern);
	if (isNaN(no)) return false;
	return no === i;
};

const svgColor = (color) => encodeURIComponent(color);
