/**
 * This code was copied from
 * https://github.com/sasaplus1/deepcopy.js/tree/38be369541c458ee6b49215f3ca6101321b2f8ba/test and
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

import {assert} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {getKeys, getValue, isCollection, setValue} from '../src/collection.js';
import {detectType} from '../src/detector.js';

describe(isCollection.name, () => {
    it('should return true if value is a collection', () => {
        assert.isTrue(isCollection('Arguments'));
        assert.isTrue(isCollection('Array'));
        assert.isTrue(isCollection('Map'));
        assert.isTrue(isCollection('Object'));
        assert.isTrue(isCollection('Set'));
    });
    it('should return false if value is not a collection', () => {
        assert.isFalse(isCollection('WeakMap'));
        assert.isFalse(isCollection('WeakSet'));
        assert.isFalse(isCollection('Float32Array'));
        assert.isFalse(isCollection('Float64Array'));
        assert.isFalse(isCollection('Int16Array'));
        assert.isFalse(isCollection('Int32Array'));
        assert.isFalse(isCollection('Int8Array'));
        assert.isFalse(isCollection('Uint16Array'));
        assert.isFalse(isCollection('Uint32Array'));
        assert.isFalse(isCollection('Uint8Array'));
        assert.isFalse(isCollection('Uint8ClampedArray'));
    });
});
describe(getKeys.name, () => {
    it('should get keys from Array', () => {
        const value = [
            1,
            2,
            3,
        ];

        assert.deepEquals(getKeys(value, detectType(value)), [
            '0',
            '1',
            '2',
        ]);
    });
    it('should get keys from Object', () => {
        const value = {'0': 1, '1': 2, '2': 3};

        assert.deepEquals(getKeys(value, detectType(value)), [
            '0',
            '1',
            '2',
        ]);
    });
    it('should get symbols from Object', () => {
        const sym1 = Symbol();
        const sym2 = Symbol();
        const sym3 = Symbol();

        const value = {
            [sym1]: 1,
            [sym2]: 2,
            [sym3]: 3,
        };

        assert.deepEquals(getKeys(value, detectType(value)), [
            sym1,
            sym2,
            sym3,
        ]);
    });
    it('should get keys from Map', () => {
        const value = new Map<number, number>([
            [
                0,
                1,
            ],
            [
                1,
                2,
            ],
            [
                2,
                3,
            ],
        ]);

        assert.deepEquals(
            getKeys(value, detectType(value)) as any[],
            [
                0,
                1,
                2,
            ],
        );
    });
    it('should get keys from Set', () => {
        const value = new Set<number>([
            1,
            2,
            3,
        ]);

        assert.deepEquals(
            getKeys(value, detectType(value)) as any[],
            [
                1,
                2,
                3,
            ],
        );
    });
});
describe(getValue.name, () => {
    it('should get value from Array', () => {
        const value = [
            1,
            2,
            3,
        ];

        assert.strictEquals(getValue(value, 0, detectType(value)), 1);
        assert.strictEquals(getValue(value, 1, detectType(value)), 2);
        assert.strictEquals(getValue(value, 2, detectType(value)), 3);
    });
    it('should get value from Map', () => {
        const value = new Map<number, number>([
            [
                0,
                1,
            ],
            [
                1,
                2,
            ],
            [
                2,
                3,
            ],
        ]);

        assert.strictEquals(getValue(value, 0, detectType(value)), 1);
        assert.strictEquals(getValue(value, 1, detectType(value)), 2);
        assert.strictEquals(getValue(value, 2, detectType(value)), 3);
    });
    it('should get value from Object', () => {
        const value = {'0': 1, '1': 2, '2': 3};

        assert.strictEquals(getValue(value, '0', detectType(value)), 1);
        assert.strictEquals(getValue(value, '1', detectType(value)), 2);
        assert.strictEquals(getValue(value, '2', detectType(value)), 3);
    });
    it('should get value from Set', () => {
        const value = new Set<number>([
            1,
            2,
            3,
        ]);

        assert.strictEquals(getValue(value, 1, detectType(value)), 1);
        assert.strictEquals(getValue(value, 2, detectType(value)), 2);
        assert.strictEquals(getValue(value, 3, detectType(value)), 3);
    });
});
describe(setValue.name, () => {
    it('should set value to Array', () => {
        const value: number[] = [];

        setValue(value, 0, 1, detectType(value));
        setValue(value, 1, 2, detectType(value));
        setValue(value, 2, 3, detectType(value));

        assert.deepEquals(
            value,
            [
                1,
                2,
                3,
            ],
        );
    });
    it('should set value to Map', () => {
        const value = new Map<number, number>();

        setValue(value, 0, 1, detectType(value));
        setValue(value, 1, 2, detectType(value));
        setValue(value, 2, 3, detectType(value));

        assert.strictEquals(value.get(0), 1);
        assert.strictEquals(value.get(1), 2);
        assert.strictEquals(value.get(2), 3);
    });
    it('should set value to Object', () => {
        const value: Record<string, number> = {};

        setValue(value, '0', 1, detectType(value));
        setValue(value, '1', 2, detectType(value));
        setValue(value, '2', 3, detectType(value));

        assert.deepEquals(value, {'0': 1, '1': 2, '2': 3});
    });
    it('should set value to Set', () => {
        const value = new Set<number>();

        // setValue ignores key argument when value type is Set.
        setValue(value, null, 1, detectType(value));
        setValue(value, null, 2, detectType(value));
        setValue(value, null, 3, detectType(value));

        assert.isTrue(value.has(1));
        assert.isTrue(value.has(2));
        assert.isTrue(value.has(3));
    });
});
