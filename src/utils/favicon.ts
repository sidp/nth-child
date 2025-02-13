import { isMatched } from './pattern';
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

const svgColor = (color: string) => encodeURIComponent(color);
