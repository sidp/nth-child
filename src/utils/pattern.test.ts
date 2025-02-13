import { describe, it, expect } from 'vitest';
import { cleanPattern, isMatched, isValid } from './pattern';

describe('isValid', () => {
	it('should return false if the pattern is empty', () => {
		expect(isValid('')).toBe(false);
	});

	it('should return true if the pattern is odd', () => {
		expect(isValid('odd')).toBe(true);
	});

	it('should return true if the pattern is even', () => {
		expect(isValid('even')).toBe(true);
	});

	it('should return true for numbers', () => {
		expect(isValid('3')).toBe(true);
		expect(isValid('23')).toBe(true);
		expect(isValid('123')).toBe(true);
	});

	it('should return false if the pattern is invalid', () => {
		expect(isValid('hello')).toBe(false);
	});

	it('should return true for patterns with n', () => {
		expect(isValid('3n')).toBe(true);
	});

	it('should return false if the offset is missing', () => {
		expect(isValid('3n+')).toBe(false);
		expect(isValid('3n-')).toBe(false);
	});

	it('should return false if offset is missing sign', () => {
		expect(isValid('3n1')).toBe(false);
	});

	it('should return true for patterns with step size and offset', () => {
		expect(isValid('2n+1')).toBe(true);
		expect(isValid('2n-1')).toBe(true);
	});

	it('should return false if step size is not an integer', () => {
		expect(isValid('2.5n')).toBe(false);
	});

	it('should return false if offset is not an integer', () => {
		expect(isValid('2n+1.5')).toBe(false);
	});

	it('should return false for patterns with negative step size', () => {
		expect(isValid('-2n')).toBe(false);
	});

	it('should return false for patterns with multiple variables', () => {
		expect(isValid('2n+3m')).toBe(false);
	});

	it('should return true for patterns with zero coefficient', () => {
		expect(isValid('0n')).toBe(true);
	});

	it('should return true for patterns with leading zeros', () => {
		expect(isValid('03n')).toBe(true);
	});
});

describe('isMatched', () => {
	it('should handle even pattern', () => {
		expect(isMatched('even', 1)).toBe(false);
		expect(isMatched('even', 2)).toBe(true);
		expect(isMatched('even', 3)).toBe(false);
	});

	it('should handle odd pattern', () => {
		expect(isMatched('odd', 1)).toBe(true);
		expect(isMatched('odd', 2)).toBe(false);
		expect(isMatched('odd', 3)).toBe(true);
	});

	it('should handle single number pattern', () => {
		expect(isMatched('1', 1)).toBe(true);
		expect(isMatched('1', 2)).toBe(false);
		expect(isMatched('1', 3)).toBe(false);
	});

	it('should handle missing offset (1n)', () => {
		expect(isMatched('1n', 1)).toBe(true);
		expect(isMatched('1n', 2)).toBe(true);
		expect(isMatched('1n', 3)).toBe(true);
	});

	it('should handle missing offset (2n)', () => {
		expect(isMatched('2n', 1)).toBe(false);
		expect(isMatched('2n', 2)).toBe(true);
		expect(isMatched('2n', 3)).toBe(false);
	});

	it('should handle missing offset (3n)', () => {
		expect(isMatched('3n', 1)).toBe(false);
		expect(isMatched('3n', 2)).toBe(false);
		expect(isMatched('3n', 3)).toBe(true);
	});

	it('should handle step size and offset', () => {
		expect(isMatched('2n+1', 1)).toBe(true);
		expect(isMatched('2n+1', 2)).toBe(false);
		expect(isMatched('2n+1', 3)).toBe(true);
	});

	it('should handle step size with negative offset', () => {
		expect(isMatched('2n-1', 1)).toBe(true);
		expect(isMatched('2n-1', 2)).toBe(false);
		expect(isMatched('2n-1', 3)).toBe(true);
	});

	it('should return false on invalid pattern', () => {
		expect(isMatched('hello', 1)).toBe(false);
	});

	it('should return false on missing sign in offset', () => {
		expect(isMatched('2n1', 1)).toBe(false);
	});
});

describe('cleanPattern', () => {
	it('should remove spaces', () => {
		expect(cleanPattern('  3n+1  ')).toBe('3n+1');
	});

	it('should remove square brackets', () => {
		expect(cleanPattern('[3n+1]')).toBe('3n+1');
		expect(cleanPattern('3n+1[]')).toBe('3n+1');
	});

	it('should remove curly braces', () => {
		expect(cleanPattern('{3n+1}')).toBe('3n+1');
		expect(cleanPattern('3n+1{}')).toBe('3n+1');
	});

	it('should handle empty string', () => {
		expect(cleanPattern('')).toBe('');
	});
});
