import { css, createGlobalStyle } from 'styled-components';

export const font =
	'-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
export const fontMono =
	'"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace';

export const green = '#37dc66';
export const shadedGreen = '#34d562';
export const blue = '#2383ef';
export const darkBlue = '#013a7a';
export const lightBlue = '#88C0FF';
export const gray = '#929fad';
export const lightGray = '#edf2f7';
export const shadedLightGray = '#e1e7ed';
export const darkGray = '#3A434E';
export const shadedDarkGray = '#4B5560';
export const lightYellow = '#fff7d1';

export const selectedElement = css`
	background-color: ${green};
`;

export const highlightedSelectedElement = css`
	background-color: ${shadedGreen};
	box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.04);

	@media (prefers-color-scheme: dark) {
		box-shadow: inset 0 0 4px rgba(255, 255, 255, 0.04);
		background-color: #3ee86f;
	}
`;

const Global = createGlobalStyle`
	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}

	body {
		font-size: 1.2rem;
		font-family: ${font};
		line-height: 1.4;
		max-width: 35em;
		margin: 0 auto;
		padding: 0.25em 0.5em;

		@media (min-width: 50em) {
			padding: 1em 1.5em;
		}
	}

	a {
		color: ${blue};
	}

	a:active {
		color: ${darkBlue};

		@media (prefers-color-scheme: dark) {
			color: ${lightBlue};
		}
	}

	code {
		font-family: ${fontMono};
	}

	@media (prefers-color-scheme: dark) {
		html {
			background-color: #000;
			color: #fff;
		}
	}
`;

export default Global;
