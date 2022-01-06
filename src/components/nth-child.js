import React, { Component } from 'react';
import styled from 'styled-components';

import NumberInput from './number-input';
import Items from './items';
import LinkButton from './link-button';

import {
	fontMono,
	blue,
	gray,
	lightGray,
	shadedLightGray,
	darkGray,
	shadedDarkGray,
	lightYellow,
	selectedElement,
	highlightedSelectedElement,
} from '../utils/styles';
import favicon from '../utils/favicon';

const DEFAULT_PATTERN = '3n+1';
// Characters that are not useful in a nth-child pattern
const INVALID_CHARS_REGEX = /[()\\/<%€$]/g;

function allowedPattern(pattern) {
	const ptrn = pattern.trim();
	return ptrn.match(INVALID_CHARS_REGEX) === null;
}

function cleanPattern(pattern) {
	return pattern.replace(INVALID_CHARS_REGEX, '');
}

function patternIncludesOf(pattern) {
	return pattern.indexOf('of') !== -1;
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

const PATTERN_FROM_LOCATION = getPatternFromLocation();

export default class NthChild extends Component {
	state = {
		pattern: PATTERN_FROM_LOCATION || DEFAULT_PATTERN,
		patternInUrl: !!PATTERN_FROM_LOCATION,
		highlightSelected: false,
	};

	static defaultProps = {};
	trackedEvent = false;

	componentDidMount() {
		const patternFromLocation = getPatternFromLocation();
		if (patternFromLocation) {
			this.setState(() => ({
				pattern: patternFromLocation,
				patternInUrl: true,
			}));
		}
		this.updateFavicon();
	}

	handleOnChange = (pattern, callback = () => {}) => {
		if (typeof window.plausible === 'function' && this.trackedEvent === false) {
			window.plausible('Changed pattern');
			this.trackedEvent = true;
		}

		this.setState(
			() => ({ pattern: cleanPattern(pattern) }),
			() => {
				callback();
				this.updateFavicon();
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
		if (!('replaceState' in window.history)) {
			return; // return early if there's no support for history.replaceState()
		}

		const { pattern, patternInUrl } = this.state;
		let hash;

		if (patternInUrl && allowedPattern(pattern)) {
			hash = pattern ? `#pattern:${cleanPattern(pattern)}` : ' ';
		} else {
			hash = ' ';
		}

		window.history.replaceState(undefined, undefined, hash);
	};

	updateFavicon = () => {
		const icoEl = document.querySelector(
			'head link[rel="icon"][type="image/x-icon"]'
		);
		if (icoEl) {
			icoEl.parentElement.removeChild(icoEl);
		}

		const iconEl = document.querySelector(
			'head link[rel="icon"][type="image/svg+xml"]'
		);
		if (iconEl) {
			iconEl.setAttribute('href', favicon(this.state.pattern));
		}
	};

	handleMouseEnterSelectedBlockExample = () => {
		this.setState(() => ({
			highlightSelected: true,
		}));
	};

	handleMouseLeaveSelectedBlockExample = () => {
		this.setState(() => ({
			highlightSelected: false,
		}));
	};

	render() {
		return (
			<React.Fragment>
				<Control>
					<label htmlFor="pattern">
						:nth-child(
						<StyledNumberInput
							type="text"
							name="pattern"
							value={this.state.pattern}
							onChange={this.handleOnChange}
						/>
						)
					</label>
					<CssBlock>
						{' {'}
						<SelectedBlockExample
							onMouseEnter={this.handleMouseEnterSelectedBlockExample}
							onMouseLeave={this.handleMouseLeaveSelectedBlockExample}
						/>
						{'}'}
					</CssBlock>
					{!this.state.patternInUrl && (
						<StyledLinkButton onClick={this.setPatternInUrl}>
							Make a URL for this pattern
						</StyledLinkButton>
					)}
				</Control>
				{patternIncludesOf(this.state.pattern) && (
					<Notice>
						<p>
							This thing can unfortunately not show patterns using the{' '}
							<code>{'of <selector>'}</code> syntax.
						</p>
					</Notice>
				)}
				<Items
					numberOfItems={20}
					pattern={this.state.pattern}
					highlightSelected={this.state.highlightSelected}
				/>
			</React.Fragment>
		);
	}
}

const Control = styled.p`
	font-size: 1.05em;
	font-family: ${fontMono};
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
		box-shadow: inset 0 0 0 2px ${shadedLightGray};
	}

	&:focus {
		outline: 0;
		box-shadow: inset 0 0 0 2px ${blue};
	}

	@media (prefers-color-scheme: dark) {
		color: #fff;
		box-shadow: inset 0 0 0 2px ${darkGray};

		&:hover {
			box-shadow: inset 0 0 0 2px ${shadedDarkGray};
		}

		&:focus {
			outline: 0;
			box-shadow: inset 0 0 0 2px ${blue};
		}
	}
`;

const CssBlock = styled.span`
	@media (max-width: 350px) {
		display: none;
	}
`;
const SelectedBlockExample = styled.span`
	display: inline-block;
	width: 0.6em;
	height: 0.6em;
	vertical-align: 0.05em;
	margin-left: 2px;
	margin-right: 2px;
	border-radius: 2px;
	${selectedElement};

	&:hover {
		${highlightedSelectedElement};
	}
`;

const StyledLinkButton = styled(LinkButton)`
	float: right;
	margin-top: 4px;
`;

const Notice = styled.div`
	background-color: ${lightYellow};
	padding: 0.66em 1em 0.75em;

	code {
		white-space: pre;
	}

	p:first-child {
		margin-top: 0;
	}

	p:last-child {
		margin-bottom: 0;
	}
`;
