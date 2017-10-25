/**
 * Functions to help process strings with numbers in them.
 * See NumberInput components.
 */

/**
 * Check if there's a number at or before a certain position in a string.
 */
export function numberAt(str = '', pos = 0) {
	let numberAt = str[pos] || false;
	let numberBefore = pos > 0 ? str[pos - 1] || false : false;

	numberAt = typeof numberAt === 'string' ? numberAt.match(/[0-9]/) : false;
	numberBefore =
		typeof numberBefore === 'string' ? numberBefore.match(/[0-9]/) : false;

	return numberAt || numberBefore;
}

/**
 * Get the number near a certain position in a string. Returns false if
 * no number is near the position.
 */
function getNearNumber(str, pos) {
	if (!numberAt(str, pos)) {
		return false;
	}

	/* TODO … */
	const considerChars = 20;
	const sliceBefore = Math.max(pos - considerChars, 0);
	const sliceAfter = Math.min(pos + considerChars, str.length);
	const strBefore = str.slice(sliceBefore, pos);
	const strAfter = str.slice(pos, sliceAfter);
	let numberBefore = strBefore.match(/[0-9]+$/);
	let numberAfter = strAfter.match(/^[0-9]+/);
	numberBefore = numberBefore !== null ? numberBefore[0] : '';
	numberAfter = numberAfter !== null ? numberAfter[0] : '';

	const number = Number(numberBefore + numberAfter);

	return {
		value: number,
		startIndex: pos - numberBefore.length,
		endIndex: pos + numberAfter.length,
	};
}

/**
 * Replace a number at a place in the string
 */

function replaceNumber(str, pos, oldValue, newValue) {
	const numberLength = String(oldValue).length;
	const strBeforeNumber = str.slice(0, pos);
	const strAfterNumber = str.slice(pos + numberLength, str.length);
	return strBeforeNumber + String(newValue) + strAfterNumber;
}

/**
 * Change the value of a number near a position in a string
 */

export function changeNumberAt(str, pos, increment = 0) {
	const number = getNearNumber(str, pos);
	const newValue = number.value + increment;
	return {
		...number,
		str: replaceNumber(str, number.startIndex, number.value, newValue),
	};
}
