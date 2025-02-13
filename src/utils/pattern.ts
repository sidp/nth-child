export const isValid = (pattern: string) => {
	pattern = pattern.toLowerCase().trim();

	// Empty is invalid
	if (pattern === '') {
		return false;
	}

	// Odd and even keywords are valid
	if (pattern === 'odd' || pattern === 'even') {
		return true;
	}

	// Numbers are valid
	if (!Number.isNaN(Number(pattern))) {
		return true;
	}

	if (pattern.includes('n')) {
		const [stepSize, offset] = pattern.split('n');

		// Step size and offset are numbers
		if (Number.isNaN(Number(stepSize)) || Number.isNaN(Number(offset))) {
			return false;
		}

		// Step size and offset are integers
		if (
			!Number.isInteger(Number(stepSize)) ||
			!Number.isInteger(Number(offset))
		) {
			return false;
		}

		// Offset is not missing sign
		if (offset.length > 0 && !['+', '-'].includes(offset.charAt(0))) {
			return false;
		}

		// Step size must be positive
		if (Number(stepSize) < 0) {
			return false;
		}

		return true;
	}

	return false;
};

export const isMatched = (pattern: string, i: number) => {
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

	if (pattern.includes('n')) {
		const parts = pattern.split('n');

		if (
			typeof parts[1] === 'string' &&
			parts[1].length > 0 &&
			!['+', '-'].includes(parts[1].charAt(0))
		) {
			return false;
		}

		const offset = parts[1] ? Number(parts[1]) : 0;

		return seq.some((s) => Number(parts[0]) * s + offset === i);
	}

	const no = Number(pattern);
	if (Number.isNaN(no)) return false;
	return no === i;
};

// Match characters that override the styling of the page itself
const FORBIDDEN_CHARS_REGEX = /[\[\]\{\}\.]/g;
export function cleanPattern(pattern: string) {
	return pattern.trim().replace(FORBIDDEN_CHARS_REGEX, '');
}
