import { describe, expect, it } from 'vitest';
import { changeNumberAt, hasNumberAt } from './numbers';

describe('hasNumberAt', () => {
	it('should return true if there is a number at the given position', () => {
		expect(hasNumberAt('hello 123!', 6)).toBe(true);
		expect(hasNumberAt('hello 123!', 7)).toBe(true);
		expect(hasNumberAt('hello 123!', 8)).toBe(true);
		expect(hasNumberAt('hello 123!', 9)).toBe(true);
	});

	it('should return false if the position is out of bounds', () => {
		expect(hasNumberAt('hello 123!', -1)).toBe(false);
		expect(hasNumberAt('hello 123!', 11)).toBe(false);
	});

	it('should return false if there is no number at the given position', () => {
		expect(hasNumberAt('hello 123!', 2)).toBe(false);
	});
});

describe('changeNumberAt', () => {
	it('should increment the number at the given position', () => {
		const result = changeNumberAt('hello 123!', 6, 1);
		expect(result?.string).toEqual('hello 124!');
	});

	it('should return null if no number is found at the position', () => {
		const result = changeNumberAt('hello world!', 6, 1);
		expect(result).toBeNull();
	});

	it('should decrement the number at the given position', () => {
		const result = changeNumberAt('hello 123!', 6, -1);
		expect(result?.string).toEqual('hello 122!');
	});

	it('should increment with a certain amount at the given position', () => {
		const result = changeNumberAt('hello 123!', 6, 10);
		expect(result?.string).toEqual('hello 133!');
	});

	it('should decrement with a certain amount at the given position', () => {
		const result = changeNumberAt('hello 123!', 6, -10);
		expect(result?.string).toEqual('hello 113!');
	});

	it('should handle increment negative numbers', () => {
		const result = changeNumberAt('hello -123!', 7, 1);
		expect(result?.string).toEqual('hello -122!');
	});

	it('should handle decrement negative numbers', () => {
		const result = changeNumberAt('hello -123!', 7, -1);
		expect(result?.string).toEqual('hello -124!');
	});

	it('should change sign when change goes below 0', () => {
		const result = changeNumberAt('hello 5!', 6, -10);
		expect(result?.string).toEqual('hello -5!');
	});

	it('should change sign when change goes above 0', () => {
		const result = changeNumberAt('hello -5!', 7, 10);
		expect(result?.string).toEqual('hello +5!');
	});

	it('should return null if the position is out of bounds', () => {
		const result = changeNumberAt('hello 123!', -1, 1);
		expect(result).toBeNull();
		const result2 = changeNumberAt('hello 123!', 12, 1);
		expect(result2).toBeNull();
	});

	it('should handle multiple consecutive numbers', () => {
		const result = changeNumberAt('total 40 and 60!', 8, 15);
		expect(result?.string).toEqual('total 55 and 60!');
	});

	it('should handle multiple consecutive numbers with negative increment', () => {
		const result = changeNumberAt('total 40 and 60!', 8, -15);
		expect(result?.string).toEqual('total 25 and 60!');
	});

	it('should handle multiple consecutive numbers with a large positive increment', () => {
		const result = changeNumberAt('total 40 and 60!', 8, 100);
		expect(result?.string).toEqual('total 140 and 60!');
	});

	it('should handle multiple consecutive numbers with a large negative increment', () => {
		const result = changeNumberAt('total 100 and 200!', 8, -150);
		expect(result?.string).toEqual('total -50 and 200!');
	});

	it('should handle multiple consecutive numbers with zero increment', () => {
		const result = changeNumberAt('total 100 and 200!', 8, 0);
		expect(result?.string).toEqual('total 100 and 200!');
	});

	it('should return null if zero increment is applied at a position with no number', () => {
		const result = changeNumberAt('hello world!', 6, 0);
		expect(result).toBeNull();
	});

	it('should return the correct selection of a changed number', () => {
		const result = changeNumberAt('hello 123!', 6, 1);
		expect(result?.selectionStartIndex).toBe(6);
		expect(result?.selectionEndIndex).toBe(9);
	});

	it('should handle selection start and end correctly for negative numbers', () => {
		const result = changeNumberAt('hello -123!', 7, 1);
		expect(result?.selectionStartIndex).toBe(7);
		expect(result?.selectionEndIndex).toBe(10);
	});

	it('should handle selection start and end correctly for positive numbers', () => {
		const result = changeNumberAt('hello +123!', 7, 1);
		expect(result?.selectionStartIndex).toBe(7);
		expect(result?.selectionEndIndex).toBe(10);
	});
});
