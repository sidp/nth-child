import { describe, it, expect } from 'vitest';
import { isValid } from './pattern';

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
