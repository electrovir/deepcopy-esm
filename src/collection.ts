/**
 * This code was copied from
 * https://github.com/sasaplus1/deepcopy.js/tree/38be369541c458ee6b49215f3ca6101321b2f8ba/src and
 * modified to be ESM compatible and fix code health (linting, formatting, etc.).
 *
 * The original code has the following license:
 *
 *     (The MIT LICENSE)
 *
 *     Copyright (c) 2013 sasa+1 <sasaplus1@gmail.com>
 *
 *     Permission is hereby granted, free of charge, to any person obtaining a copy
 *     of this software and associated documentation files (the "Software"), to
 *     deal in the Software without restriction, including without limitation the
 *     rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 *     sell copies of the Software, and to permit persons to whom the Software is
 *     furnished to do so, subject to the following conditions:
 *
 *     The above copyright notice and this permission notice shall be included in
 *     all copies or substantial portions of the Software.
 *
 *     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *     IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *     AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 *     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 *     IN THE SOFTWARE.
 */

import {typeArguments, typeArray, typeMap, typeObject, typeSet} from './detector.js';

/**
 * Any collection of items.
 *
 * @category Internal
 */
export type Collection =
    | IArguments
    | Array<unknown>
    | Map<unknown, unknown>
    | Record<string | number | symbol, unknown>
    | Set<unknown>;

/** Collection types */
const collectionTypeSet = new Set([
    typeArguments,
    typeArray,
    typeMap,
    typeObject,
    typeSet,
]);

/**
 * Is it Collection?
 *
 * @category Internal
 */
export function isCollection(valueType: string): boolean {
    return collectionTypeSet.has(valueType);
}

/**
 * Get keys from Collection.
 *
 * @category Internal
 */
export function getKeys(collection: Collection, collectionType: string): Array<string | symbol> {
    switch (collectionType) {
        case typeArguments:
        case typeArray:
            return Object.keys(collection as string[]);
        case typeObject:
            return ([] as Array<string | symbol>).concat(
                // NOTE: Object.getOwnPropertyNames can get all own keys.
                Object.keys(collection as Record<string, unknown>),
                Object.getOwnPropertySymbols(collection as Record<symbol, unknown>),
            );
        case typeMap:
        case typeSet:
            return Array.from((collection as Set<string | symbol>).keys());
        default:
            return [];
    }
}

/**
 * Get value from Collection.
 *
 * @category Internal
 */
export function getValue(collection: Collection, key: unknown, collectionType: string): unknown {
    switch (collectionType) {
        case typeArguments:
        case typeArray:
        case typeObject:
            return (collection as Record<string, unknown>)[key as string];
        case typeMap:
            return (collection as Map<unknown, unknown>).get(key);
        case typeSet:
            // NOTE: Set.prototype.keys is alias of Set.prototype.values. It means key equals to value.
            return key;
        default:
            return undefined;
    }
}

/**
 * Set value to collection.
 *
 * @category Internal
 */
export function setValue(
    collection: Collection,
    key: unknown,
    value: unknown,
    collectionType: string,
): Collection {
    switch (collectionType) {
        case typeArguments:
        case typeArray:
        case typeObject:
            (collection as Record<string, unknown>)[key as string] = value;
            break;
        case typeMap:
            (collection as Map<unknown, unknown>).set(key, value);
            break;
        case typeSet:
            (collection as Set<unknown>).add(value);
            break;
        default:
    }

    return collection;
}
