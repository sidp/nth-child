export const green = '#37dc66';
export const blue = '#2383ef';
export const gray = '#929fad';
export const lightGray = '#edf2f7';

export const selectedElement = `
	background-color: var(--color-green-500);
`;

export const highlightedSelectedElement = `
	background-color: var(--color-green-600);
	box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.04);

	@media (prefers-color-scheme: dark) {
	background-color: var(--color-green-400);
		box-shadow: inset 0 0 4px rgba(255, 255, 255, 0.04);
	}
`;
