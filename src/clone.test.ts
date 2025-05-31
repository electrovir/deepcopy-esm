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
import {clone, copy} from '../src/clone.js';
import {detectType} from '../src/detector.js';
import {doesBufferExist} from './buffer.js';

describe(clone.name, () => {
    describe('should return deep copied value', () => {
        it('ArrayBuffer', () => {
            const data = new ArrayBuffer(3);
            const result = clone(data, detectType(data)) as ArrayBuffer;

            assert.instanceOf(result, ArrayBuffer);
            assert.notStrictEquals(result, data);

            const a = new Uint8Array(data);
            const b = new Uint8Array(result);

            b[0] = 1;
            b[1] = 2;
            b[2] = 3;

            a[0] = 4;
            a[1] = 5;
            a[2] = 6;

            assert.strictEquals(b[0], 1);
            assert.strictEquals(b[1], 2);
            assert.strictEquals(b[2], 3);
        });
        it('Boolean', () => {
            // eslint-disable-next-line sonarjs/no-primitive-wrappers, unicorn/new-for-builtins
            const data = new Boolean(false);
            const result = clone(data, detectType(data)) as boolean;

            assert.instanceOf(result, Boolean);
            assert.notStrictEquals(result, data);
            assert.strictEquals(data.valueOf(), result.valueOf());
        });
        it('Buffer', () => {
            if (!doesBufferExist) {
                return;
            }
            const data = Buffer.from([
                0xe5,
                0xaf,
                0xbf,
                0xe5,
                0x8f,
                0xb8,
            ]);
            const result = clone(data, detectType(data)) as Buffer;

            assert.instanceOf(result, Buffer);
            assert.notStrictEquals(result, data);
            assert.strictEquals(data.toString('utf8'), result.toString('utf8'));

            data[0] = 0xe5;
            data[1] = 0xae;
            data[2] = 0xae;

            assert.notStrictEquals(data.toString('utf8'), result.toString('utf8'));
        });
        it('DataView', () => {
            const data = new DataView(new ArrayBuffer(5));
            const result = clone(data, detectType(data)) as DataView;

            assert.instanceOf(result, DataView);
            assert.notStrictEquals(result, data);
        });
        it('Date', () => {
            const data = new Date();
            const result = clone(data, detectType(data)) as Date;

            assert.instanceOf(result, Date);
            assert.notStrictEquals(result, data);
            assert.strictEquals(data.getTime(), result.getTime());
        });
        it('Number', () => {
            // eslint-disable-next-line sonarjs/no-primitive-wrappers, unicorn/new-for-builtins
            const data = new Number(65_535);
            const result = clone(data, detectType(data)) as number;

            assert.instanceOf(result, Number);
            assert.notStrictEquals(result, data);
            assert.strictEquals(data.valueOf(), result.valueOf());
        });
        it('RegExp', () => {
            // eslint-disable-next-line sonarjs/no-empty-group
            const data = new RegExp('', 'i');
            const result = clone(data, detectType(data)) as RegExp;

            assert.instanceOf(result, RegExp);
            assert.notStrictEquals(result, data);
            assert.strictEquals(result.source, data.source);
            assert.strictEquals(result.flags, data.flags);
        });
        it('String', () => {
            // eslint-disable-next-line sonarjs/no-primitive-wrappers, unicorn/new-for-builtins
            const data = new String('Hello!');
            const result = clone(data, detectType(data)) as string;

            assert.instanceOf(result, String);
            assert.notStrictEquals(result, data);
            assert.strictEquals(data.valueOf(), result.valueOf());
        });
        it('Float32Array', () => {
            const data = new Float32Array([
                1,
                2,
                3,
            ]);
            const result = clone(data, detectType(data)) as Float32Array;

            assert.instanceOf(result, Float32Array);
            assert.notStrictEquals(result, data);

            data[0] = 4;
            data[1] = 5;
            data[2] = 6;

            assert.strictEquals(result[0], 1);
            assert.strictEquals(result[1], 2);
            assert.strictEquals(result[2], 3);
        });
        it('Float64Array', () => {
            const data = new Float64Array([
                1,
                2,
                3,
            ]);
            const result = clone(data, detectType(data)) as Float64Array;

            assert.instanceOf(result, Float64Array);
            assert.notStrictEquals(result, data);

            data[0] = 4;
            data[1] = 5;
            data[2] = 6;

            assert.strictEquals(result[0], 1);
            assert.strictEquals(result[1], 2);
            assert.strictEquals(result[2], 3);
        });
        it('Int16Array', () => {
            const data = new Int16Array([
                1,
                2,
                3,
            ]);
            const result = clone(data, detectType(data)) as Int16Array;

            assert.instanceOf(result, Int16Array);
            assert.notStrictEquals(result, data);

            data[0] = 4;
            data[1] = 5;
            data[2] = 6;

            assert.strictEquals(result[0], 1);
            assert.strictEquals(result[1], 2);
            assert.strictEquals(result[2], 3);
        });

        it('Int32Array', () => {
            const data = new Int32Array([
                1,
                2,
                3,
            ]);
            const result = clone(data, detectType(data)) as Int32Array;

            assert.instanceOf(result, Int32Array);
            assert.notStrictEquals(result, data);

            data[0] = 4;
            data[1] = 5;
            data[2] = 6;

            assert.strictEquals(result[0], 1);
            assert.strictEquals(result[1], 2);
            assert.strictEquals(result[2], 3);
        });
        it('Int8Array', () => {
            const data = new Int8Array([
                1,
                2,
                3,
            ]);
            const result = clone(data, detectType(data)) as Int8Array;

            assert.instanceOf(result, Int8Array);
            assert.notStrictEquals(result, data);

            data[0] = 4;
            data[1] = 5;
            data[2] = 6;

            assert.strictEquals(result[0], 1);
            assert.strictEquals(result[1], 2);
            assert.strictEquals(result[2], 3);
        });
        it('Uint16Array', () => {
            const data = new Uint16Array([
                1,
                2,
                3,
            ]);
            const result = clone(data, detectType(data)) as Uint16Array;

            assert.instanceOf(result, Uint16Array);
            assert.notStrictEquals(result, data);

            data[0] = 4;
            data[1] = 5;
            data[2] = 6;

            assert.strictEquals(result[0], 1);
            assert.strictEquals(result[1], 2);
            assert.strictEquals(result[2], 3);
        });
        it('Uint32Array', () => {
            const data = new Uint32Array([
                1,
                2,
                3,
            ]);
            const result = clone(data, detectType(data)) as Uint32Array;

            assert.instanceOf(result, Uint32Array);
            assert.notStrictEquals(result, data);

            data[0] = 4;
            data[1] = 5;
            data[2] = 6;

            assert.strictEquals(result[0], 1);
            assert.strictEquals(result[1], 2);
            assert.strictEquals(result[2], 3);
        });
        it('Uint8Array', () => {
            const data = new Uint8Array([
                1,
                2,
                3,
            ]);
            const result = clone(data, detectType(data)) as Uint8Array;

            assert.instanceOf(result, Uint8Array);
            assert.notStrictEquals(result, data);

            data[0] = 4;
            data[1] = 5;
            data[2] = 6;

            assert.strictEquals(result[0], 1);
            assert.strictEquals(result[1], 2);
            assert.strictEquals(result[2], 3);
        });
        it('Uint8ClampedArray', () => {
            const data = new Uint8ClampedArray([
                1,
                2,
                3,
            ]);
            const result = clone(data, detectType(data)) as Uint8ClampedArray;

            assert.instanceOf(result, Uint8ClampedArray);
            assert.notStrictEquals(result, data);

            data[0] = 4;
            data[1] = 5;
            data[2] = 6;

            assert.strictEquals(result[0], 1);
            assert.strictEquals(result[1], 2);
            assert.strictEquals(result[2], 3);
        });
    });
    describe('should return shallow copied value', () => {
        it('Array Iterator', () => {
            const data = [
                1,
                2,
                3,
            ][Symbol.iterator]();
            const result = clone(data, detectType(data)) as IterableIterator<number>;

            assert.strictEquals(result, data);
        });
        it('Map Iterator', () => {
            const data = new Map<number, number>([
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
            ])[Symbol.iterator]();
            const result = clone(data, detectType(data)) as IterableIterator<[number, number]>;

            assert.strictEquals(result, data);
        });
        it('Promise', () => {
            const data = new Promise<number>(function (resolve): void {
                return resolve(1);
            });
            const result = clone(data, detectType(data)) as Promise<number>;

            assert.strictEquals(result, data);
        });
        it('Set Iterator', () => {
            const data = new Set<number>([
                1,
                2,
                3,
            ])[Symbol.iterator]();
            const result = clone(data, detectType(data)) as IterableIterator<number>;

            assert.strictEquals(result, data);
        });
        it('String Iterator', () => {
            const data = '寿司'[Symbol.iterator]();
            const result = clone(data, detectType(data)) as IterableIterator<string>;

            assert.strictEquals(result, data);
        });
        it('function', () => {
            const data = function (): void {
                return;
            };
            const result = clone(data, detectType(data)) as () => void;

            assert.strictEquals(result, data);
        });
        it('global', () => {
            if (typeof globalThis !== 'undefined') {
                assert.strictEquals(globalThis, clone(globalThis, detectType(globalThis)) as any);
            } else if (typeof self !== 'undefined') {
                assert.strictEquals(self, clone(self, detectType(self)) as any);
            } else if (typeof global === 'undefined') {
                assert.never();
            } else {
                assert.strictEquals(global, clone(global, detectType(global)) as any);
            }
        });
        it('WeakMap', () => {
            const data = new WeakMap<Record<string, unknown>, unknown>();
            const result = clone(data, detectType(data)) as WeakMap<
                Record<string, unknown>,
                unknown
            >;

            assert.strictEquals(result, data);
        });
        it('WeakSet', () => {
            const data = new WeakSet<Record<string, unknown>>();
            const result = clone(data, detectType(data)) as WeakSet<Record<string, unknown>>;

            assert.strictEquals(result, data);
        });
        it('boolean', () => {
            assert.strictEquals(clone(true, detectType(true)), true);
            assert.strictEquals(clone(false, detectType(false)), false);
        });
        it('null', () => {
            assert.strictEquals(clone(null, detectType(null)), null);
        });
        it('number', () => {
            assert.strictEquals(clone(0, detectType(0)), 0);
            assert.strictEquals(
                clone(Number.MAX_SAFE_INTEGER, detectType(Number.MAX_SAFE_INTEGER)),
                Number.MAX_SAFE_INTEGER,
            );
            assert.strictEquals(
                clone(Number.MIN_SAFE_INTEGER, detectType(Number.MIN_SAFE_INTEGER)),
                Number.MIN_SAFE_INTEGER,
            );
            assert.strictEquals(
                clone(Number.POSITIVE_INFINITY, detectType(Number.POSITIVE_INFINITY)),
                Number.POSITIVE_INFINITY,
            );
            assert.strictEquals(
                clone(Number.NEGATIVE_INFINITY, detectType(Number.NEGATIVE_INFINITY)),
                Number.NEGATIVE_INFINITY,
            );
            assert.isNaN(clone(NaN, detectType(NaN)) as number);
        });
        it('string', () => {
            assert.strictEquals(clone('寿司', detectType('寿司')), '寿司');
        });
        it('symbol', () => {
            const data = Symbol();
            const result = clone(data, detectType(data)) as symbol;

            assert.strictEquals(result, data);
        });
        it('undefined', () => {
            assert.strictEquals(clone(undefined, detectType(undefined)), undefined);
        });
    });
    describe('should return empty collection', () => {
        it('Arguments', () => {
            (function (one: number, two: number, three: number): void {
                const result = clone(
                    // eslint-disable-next-line prefer-rest-params
                    arguments,
                    // eslint-disable-next-line prefer-rest-params
                    detectType(arguments),
                ) as Array<number>;

                assert.isArray(result);
                assert.strictEquals(result.length, 0);
            })(1, 2, 3);
        });
        it('Array', () => {
            const data = [
                1,
                2,
                3,
            ];
            const result = clone(data, detectType(data)) as Array<number>;

            assert.isArray(result);
            assert.strictEquals(result.length, 0);
        });
        it('Map', () => {
            const data = new Map<number, number>([
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
            const result = clone(data, detectType(data)) as Map<number, number>;

            assert.instanceOf(result, Map);
            assert.strictEquals(result.size, 0);
        });
        it('Object', () => {
            const data = {a: 1, b: 2, c: 3};
            const result = clone(data, detectType(data)) as Record<string, number>;

            assert.instanceOf(result, Object);
            assert.strictEquals(Object.keys(result).length, 0);
        });
        it('Set', () => {
            const data = new Set<number>([
                1,
                2,
                3,
            ]);
            const result = clone(data, detectType(data)) as Set<number>;

            assert.instanceOf(result, Set);
            assert.strictEquals(result.size, 0);
        });
    });
});
describe(copy.name, () => {
    it('should return customized value', () => {
        class A {
            public isA(): void {
                console.info('Hello!');
            }
        }

        const data = new A();

        function customizer(value: unknown): A | void {
            if (value instanceof A) {
                return new A();
            }
        }

        const result = copy(data, detectType(data), customizer) as A;

        assert.instanceOf(result, A);
        assert.notStrictEquals(result, data);
        assert.strictEquals(typeof result.isA, 'function');
    });
});
