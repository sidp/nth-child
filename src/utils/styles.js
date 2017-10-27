import styled, { css } from 'styled-components';

export const green = '#37dc66';
export const shadedGreen = '#34d562';
export const blue = '#2383ef';
export const darkBlue = '#013a7a';
export const gray = '#929fad';
export const lightGray = '#edf2f7';
export const shadedLightGray = '#e1e7ed';

export const selectedElement = css`background-color: ${green};`;

export const highlightedSelectedElement = css`
	background-color: ${shadedGreen};
	box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.04);
`;
