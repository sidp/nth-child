/**
 * Functions to help process strings with numbers in them.
 * See NumberInput components.
 */

/**
 * Quick check if there's a number at a certain position in a string.
 */
export function hasNumberAt(str = '', pos = 0) {
	const sample = str.slice(Math.max(0, pos - 1), pos + 1);
	return sample.match(/[0-9]/) !== null;
}

/**
 * Get the number near a certain position in a string. Returns false if
 * no number is near the position.
 */
function getNumberAt(str, pos) {
	if (!hasNumberAt(str, pos)) {
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
	const number = getNumberAt(str, pos);
	const newValue = Math.max(0, number.value + increment);

	return {
		...number,
		str: replaceNumber(str, number.startIndex, number.value, newValue),
	};
}
