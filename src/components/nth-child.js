import React, { Component } from 'react';
import styled from 'styled-components';

import NumberInput from './number-input';
import Items from './items';

import { blue, gray, lightGray, lightGrayShade } from '../utils/styles';

const DEFAULT_PATTERN = '2n+1';
// Characters that are not useful in a nth-child pattern
const INVALID_CHARS_REGEX = /[\(\)\\\/\<\%\€\$]/g;

function allowedPattern(pattern) {
	const ptrn = pattern.trim();
	return ptrn.match(INVALID_CHARS_REGEX) === null;
}

function cleanPattern(pattern) {
	return pattern.replace(INVALID_CHARS_REGEX, '');
}

function getPatternFromLocation() {
	if (
		typeof window !== 'undefined' &&
		window.location.hash &&
		window.location.hash.slice(0, 9) === '#pattern:'
	) {
		const pattern = window.location.hash.slice(9);
		if (!allowedPattern(pattern)) {
			return false;
		}

		return cleanPattern(pattern);
	}

	return false;
}

export default class NthChild extends Component {
	state = {
		pattern: DEFAULT_PATTERN,
		patternInUrl: false,
	};

	static defaultProps = {};

	componentDidMount() {
		const patternFromLocation = getPatternFromLocation();
		if (patternFromLocation) {
			this.setState(() => ({
				pattern: patternFromLocation,
				patternInUrl: true,
			}));
		}
	}

	handleOnChange = (pattern, callback = () => {}) => {
		this.setState(
			() => ({ pattern: cleanPattern(pattern) }),
			() => {
				callback();
				if (this.state.patternInUrl) {
					this.updatePatternInUrl();
				}
			}
		);
	};

	setPatternInUrl = () => {
		this.setState(
			() => ({
				patternInUrl: true,
			}),
			this.updatePatternInUrl
		);
	};

	updatePatternInUrl = () => {
		if (!history.replaceState) {
			return; // return early if there's no support for history.replaceState()
		}

		const { pattern, patternInUrl } = this.state;
		let hash;

		if (patternInUrl && allowedPattern(pattern)) {
			hash = pattern ? `#pattern:${cleanPattern(pattern)}` : ' ';
		} else {
			hash = ' ';
		}

		history.replaceState(undefined, undefined, hash);
	};

	render() {
		return (
			<div>
				<Control>
					:nth-child(
					<StyledNumberInput
						type="text"
						value={this.state.pattern}
						onChange={this.handleOnChange}
						tabIndex="1"
					/>
					) {'{'}
					<Ellipsis>…</Ellipsis>
					{'}'}
					{!this.state.patternInUrl && (
						<button onClick={this.setPatternInUrl}>
							make url for this pattern
						</button>
					)}
				</Control>
				<Items numberOfItems={20} pattern={this.state.pattern} />
			</div>
		);
	}
}

const Control = styled.p`
	font-size: 1.3em;
	font-family: monospace;
	color: ${gray};
`;

const StyledNumberInput = styled(NumberInput)`
	border: 0;
	padding: 0;
	display: inline-block;
	background-color: transparent;
	appearance: none;
	color: #000;
	font-size: 1em;
	font-family: inherit;
	text-align: center;
	width: 4.5em;
	line-height: 1.6;
	border-radius: 3px;
	box-shadow: inset 0 0 0 2px ${lightGray};

	&:hover {
		box-shadow: inset 0 0 0 2px ${lightGrayShade};
	}

	&:focus {
		outline: 0;
		box-shadow: inset 0 0 0 2px ${blue};
	}
`;

const Ellipsis = styled.span`color: #e1e7ed;`;
