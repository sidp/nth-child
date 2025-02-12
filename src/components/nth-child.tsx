import React, { FC, Component, ReactNode } from 'react';

import NumberInput from './number-input';
import Items from './items';
import LinkButton from './link-button';
import favicon from '../utils/favicon';

const DEFAULT_PATTERN = '3n+1';
// Characters that are not useful in a nth-child pattern
const INVALID_CHARS_REGEX = /[()\\/<%€$]/g;

function allowedPattern(pattern: string) {
	const ptrn = pattern.trim();
	return ptrn.match(INVALID_CHARS_REGEX) === null;
}

function cleanPattern(pattern: string) {
	return pattern.replace(INVALID_CHARS_REGEX, '');
}

function patternIncludesOf(pattern: string) {
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

	handleOnChange = (pattern: string, callback = () => {}) => {
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

	setPatternInUrl = (_ev: React.MouseEvent) => {
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

		window.history.replaceState(undefined, '', hash);
	};

	updateFavicon = () => {
		const icoEl = document.querySelector(
			'head link[rel="icon"][type="image/x-icon"]'
		);
		if (icoEl) {
			icoEl.parentElement?.removeChild(icoEl);
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
			<>
				<div className="text-xl font-mono text-gray-500 mb-5">
					<label>
						:nth-child(
						<NumberInput
							className=" border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 focus:border-blue-600 focus-visible:outline-none p-0 inline-block bg-transparent appearance-none text-gray dark:text-gray-100 size-xl text-center w-20 rounded-md"
							name="pattern"
							value={this.state.pattern}
							onChange={this.handleOnChange}
						/>
						)
					</label>
					<span className="hidden sm:inline-block">
						{' {'}
						<span
							className="inline-block w-4 h-4 mx-1 rounded-sm bg-green-500 hover:bg-green-600"
							onMouseEnter={this.handleMouseEnterSelectedBlockExample}
							onMouseLeave={this.handleMouseLeaveSelectedBlockExample}
						/>
						{'}'}
					</span>
					{!this.state.patternInUrl && (
						<LinkButton
							className="float-right mt-1"
							onClick={this.setPatternInUrl}
						>
							Make a URL for this pattern
						</LinkButton>
					)}
				</div>
				{patternIncludesOf(this.state.pattern) && (
					<Notice>
						This thing can unfortunately not show patterns using the{' '}
						<code className="whitespace-pre">{'of <selector>'}</code> syntax.
					</Notice>
				)}
				<Items
					numberOfItems={20}
					pattern={this.state.pattern}
					highlightSelected={this.state.highlightSelected}
				/>
			</>
		);
	}
}

const Notice: FC<{ children: ReactNode }> = ({ children }) => (
	<p className="px-4 py-3 bg-yellow-100">{children}</p>
);
