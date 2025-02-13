import { useEffect, useState } from 'react';

const DEFAULT_PATTERN = '3n+1';
// Characters that are not useful in a nth-child pattern
const INVALID_CHARS_REGEX = /[()\\/<%€$]/g;

export function usePatternInUrl() {
	const [pattern, setPattern] = useState(DEFAULT_PATTERN);
	const [hasPatternInUrl, setHasPatternInUrl] = useState(false);

	/**
	 * Set initial pattern from URL
	 */
	useEffect(() => {
		const patternFromUrl = getPatternFromLocation();
		if (patternFromUrl) {
			setPattern(patternFromUrl);
			setHasPatternInUrl(true);
		}
	}, []);

	/**
	 * Update URL when pattern changes
	 */
	useEffect(() => {
		if (!hasPatternInUrl) {
			return;
		}

		const hash =
			pattern && allowedPattern(pattern)
				? `#pattern:${cleanPattern(pattern)}`
				: ' ';

		window.history.replaceState(undefined, '', hash);
	}, [pattern, hasPatternInUrl]);

	const activatePatternInUrl = () => {
		setHasPatternInUrl(true);
	};

	const resetPattern = () => {
		setPattern(DEFAULT_PATTERN);
		setHasPatternInUrl(false);
	};

	return {
		pattern,
		setPattern,
		hasPatternInUrl,
		activatePatternInUrl,
		resetPattern,
	} as const;
}

function allowedPattern(pattern: string) {
	const ptrn = pattern.trim();
	return ptrn.match(INVALID_CHARS_REGEX) === null;
}

function cleanPattern(pattern: string) {
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
