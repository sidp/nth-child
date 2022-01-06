/**
 * Numbers
 *
 * This file provides a couple of simple exported interfaces for manipulation
 * of numbers in strings. Internally it turns the string into an array of
 * entities – representations of the string – that can more easily be processed
 * in the desired way.
 */

/**
 * Quick check if there's a number at a certain position in a string.
 */
export function hasNumberAt(str = '', pos = 0) {
	const sample = str.slice(Math.max(0, pos - 1), pos + 1);
	return sample.match(/[0-9]/) !== null;
}

/**
 * Change the value of a number near a position in a string.
 */
export function changeNumberAt(str: string, pos: number, increment = 0) {
	if (!hasNumberAt(str, pos)) {
		return false;
	}

	const entities = stringToEntities(str);
	const number = getNumberAt(entities, pos);
	if (!number) {
		return false;
	}

	const updatedNumber = updateNumber(number, (num) => num + increment);

	const updatedEntities = entities.map((entity) => {
		if (entity.startIndex === updatedNumber.startIndex) {
			return updatedNumber;
		}
		return entity;
	});

	return {
		selectionStartIndex: updatedNumber.selectionStartIndex,
		selectionEndIndex: updatedNumber.selectionEndIndex,
		str: entitiesToString(updatedEntities),
	};
}

/**
 * PRIVATE FUNCTIONS
 */

type UnknownEntity = {
	value: string;
	startIndex: number;
	endIndex: number;
};

type EntityType = 'TEXT_ENTITY' | 'NUMBER_ENTITY';

type BaseEntity = {
	type: EntityType;
	value: string;
	startIndex: number;
	endIndex: number;
};

type TextEntity = BaseEntity & {
	type: 'TEXT_ENTITY';
};

type NumberEntity = BaseEntity & {
	type: 'NUMBER_ENTITY';
	number: number;
};

type Entity = TextEntity | NumberEntity;

/**
 * Populates the startIndex and endIndex fields in the creation of
 * an entity. For use as Array.reduce function.
 */
function countEntityPositions(
	entities: UnknownEntity[],
	value: string
): UnknownEntity[] {
	let startIndex = 0;
	if (entities.length > 0) {
		startIndex = entities[entities.length - 1].endIndex;
	}
	return [
		...entities,
		{
			value,
			startIndex,
			endIndex: startIndex + value.length,
		},
	];
}

/**
 * Populates the type and (if applicable) number fields in the creation
 * of an entity.
 */
function classifyEntity(entity: UnknownEntity): Entity {
	const isNumber = entity.value.match(/([+-]?[0-9]+)/) !== null;

	if (isNumber) {
		return {
			...entity,
			...{ type: 'NUMBER_ENTITY', number: Number(entity.value) },
		};
	}

	return { ...entity, ...{ type: 'TEXT_ENTITY' } };
}

/**
 * Parses a string into entities
 */
function stringToEntities(str: string): Entity[] {
	const re = /([+-]?[0-9]+)|([^0-9+-]+)|([+-])/g;
	const parts = str.match(re);

	if (parts === null) {
		return [];
	}

	return parts.reduce(countEntityPositions, []).map(classifyEntity);
}

/**
 * Turns an array of entities back into a string.
 */
function entitiesToString(entities: Entity[]): string {
	return entities.map((entity) => entity.value).join('');
}

/**
 * Check if the provided entity is a number entity.
 */
function isNumberEntity(entity: Entity): entity is NumberEntity {
	return entity.type && entity.type === 'NUMBER_ENTITY';
}

/**
 * Get the number at a certain position in a string. Returns false if
 * no number is at the position.
 */
function getNumberAt(entities: Entity[], pos: number) {
	const numbers = entities.filter(isNumberEntity);
	const numbersAtPos = numbers.filter(
		(entity) => pos >= entity.startIndex && pos <= entity.endIndex
	);

	return numbersAtPos[0] || false;
}

/**
 * Takes a string and checks if it begins with a mathematical symbol.
 */
function startsWithMathSymbol(str: string) {
	return str.match(/^(\+|-)/) !== null;
}

/**
 * Takes a number entity and a function, and applies the function to the
 * value of the entity. While also keeping the index values updated.
 */
type UpdatedNumberEntity = NumberEntity & {
	selectionStartIndex: number;
	selectionEndIndex: number;
};

function updateNumber(
	entity: NumberEntity,
	update: (value: number) => number = (v) => v
): UpdatedNumberEntity {
	const updated: UpdatedNumberEntity = {
		...entity,
		selectionStartIndex: entity.startIndex,
		selectionEndIndex: entity.endIndex,
	};
	updated.number = update(entity.number);

	const hadPlusOrMinus = startsWithMathSymbol(entity.value);
	if (hadPlusOrMinus && updated.number >= 0 && updated.startIndex > 0) {
		updated.value = `+${updated.number}`;
	} else {
		updated.value = String(updated.number);
	}

	if (updated.value.length !== entity.value.length) {
		updated.endIndex += updated.value.length - entity.value.length;
	}

	updated.selectionStartIndex = startsWithMathSymbol(updated.value)
		? entity.startIndex + 1
		: entity.startIndex;
	updated.selectionEndIndex = updated.endIndex;

	return updated;
}
