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
import {doesBufferExist} from './buffer.js';
import {deepCopy} from './deep-copy.js';

describe(deepCopy.name, () => {
    describe('deep copy targets', () => {
        it('can copy ArrayBuffer', () => {
            const data = new ArrayBuffer(3);
            const result = deepCopy(data);

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

        it('can copy boolean', () => {
            assert.isTrue(deepCopy(true));
            assert.isFalse(deepCopy(false));
        });

        it('can copy Boolean', () => {
            // eslint-disable-next-line sonarjs/no-primitive-wrappers, unicorn/new-for-builtins
            const data = new Boolean(false);
            const result = deepCopy(data);

            assert.instanceOf(result, Boolean);
            assert.notStrictEquals(result, data);
            assert.strictEquals(result.valueOf(), data.valueOf());
        });

        it('can copy Buffer', () => {
            if (!doesBufferExist) {
                return;
            }

            const data = Buffer.from('buffer');
            const result = deepCopy(data);

            assert.instanceOf(result, Buffer);
            assert.notStrictEquals(result, data);
            assert.strictEquals(result.toString('utf8'), data.toString('utf8'));

            data[0] = 97; // 'a'

            assert.notStrictEquals(result.toString('utf8'), data.toString('utf8'));
        });

        it('can copy DataView', () => {
            const data = new DataView(new ArrayBuffer(5));
            const result = deepCopy(data);

            assert.instanceOf(result, DataView);
            assert.notStrictEquals(result, data);
        });

        it('can copy Date', () => {
            const data = new Date();
            const result = deepCopy(data);

            assert.instanceOf(result, Date);
            assert.notStrictEquals(result, data);
            assert.strictEquals(result.getTime(), data.getTime());
        });

        it('can copy null', () => {
            assert.strictEquals(deepCopy(null), null);
        });

        it('can copy number', () => {
            assert.strictEquals(deepCopy(0), 0);
            assert.strictEquals(deepCopy(Number.MAX_SAFE_INTEGER), Number.MAX_SAFE_INTEGER);
            assert.strictEquals(deepCopy(Number.MIN_SAFE_INTEGER), Number.MIN_SAFE_INTEGER);
            assert.strictEquals(deepCopy(Number.POSITIVE_INFINITY), Number.POSITIVE_INFINITY);
            assert.strictEquals(deepCopy(Number.NEGATIVE_INFINITY), Number.NEGATIVE_INFINITY);
            assert.isNaN(deepCopy(NaN));
        });

        it('can copy Number', () => {
            // eslint-disable-next-line sonarjs/no-primitive-wrappers, unicorn/new-for-builtins
            const data = new Number(65_535);
            const result = deepCopy(data);

            assert.instanceOf(result, Number);
            assert.notStrictEquals(result, data);
            assert.strictEquals(result.valueOf(), data.valueOf());
        });

        it('can copy RegExp', () => {
            // eslint-disable-next-line sonarjs/no-empty-group
            const data = new RegExp('', 'i');
            const result = deepCopy(data);

            assert.instanceOf(result, RegExp);
            assert.notStrictEquals(result, data);
            assert.strictEquals(result.source, data.source);
            assert.strictEquals(result.flags, data.flags);
        });

        it('can copy string', () => {
            assert.strictEquals(deepCopy('Hello!'), 'Hello!');
        });

        it('can copy String', () => {
            // eslint-disable-next-line sonarjs/no-primitive-wrappers, unicorn/new-for-builtins
            const data = new String('Hello!');
            const result = deepCopy(data);

            assert.instanceOf(result, String);
            assert.notStrictEquals(result, data);
            assert.strictEquals(result.valueOf(), data.valueOf());
        });

        it('can copy symbol', () => {
            const data = Symbol();
            const result = deepCopy(data);

            assert.strictEquals(result, data);
        });

        it('can copy undefined', () => {
            assert.strictEquals(deepCopy(undefined), undefined);
        });

        it('can copy Float32Array', () => {
            const data = new Float32Array([
                1,
                2,
                3,
            ]);
            const result = deepCopy(data);

            assert.instanceOf(result, Float32Array);
            assert.notStrictEquals(result, data);

            data[0] = 4;
            data[1] = 5;
            data[2] = 6;

            assert.strictEquals(result[0], 1);
            assert.strictEquals(result[1], 2);
            assert.strictEquals(result[2], 3);
        });
        it('can copy Float64Array', () => {
            const data = new Float64Array([
                1,
                2,
                3,
            ]);
            const result = deepCopy(data);

            assert.instanceOf(result, Float64Array);
            assert.notStrictEquals(result, data);

            data[0] = 4;
            data[1] = 5;
            data[2] = 6;

            assert.strictEquals(result[0], 1);
            assert.strictEquals(result[1], 2);
            assert.strictEquals(result[2], 3);
        });
        it('can copy Int16Array', () => {
            const data = new Int16Array([
                1,
                2,
                3,
            ]);
            const result = deepCopy(data);

            assert.instanceOf(result, Int16Array);
            assert.notStrictEquals(result, data);

            data[0] = 4;
            data[1] = 5;
            data[2] = 6;

            assert.strictEquals(result[0], 1);
            assert.strictEquals(result[1], 2);
            assert.strictEquals(result[2], 3);
        });

        it('can copy Int32Array', () => {
            const data = new Int32Array([
                1,
                2,
                3,
            ]);
            const result = deepCopy(data);

            assert.instanceOf(result, Int32Array);
            assert.notStrictEquals(result, data);

            data[0] = 4;
            data[1] = 5;
            data[2] = 6;

            assert.strictEquals(result[0], 1);
            assert.strictEquals(result[1], 2);
            assert.strictEquals(result[2], 3);
        });
        it('can copy Int8Array', () => {
            const data = new Int8Array([
                1,
                2,
                3,
            ]);
            const result = deepCopy(data);

            assert.instanceOf(result, Int8Array);
            assert.notStrictEquals(result, data);

            data[0] = 4;
            data[1] = 5;
            data[2] = 6;

            assert.strictEquals(result[0], 1);
            assert.strictEquals(result[1], 2);
            assert.strictEquals(result[2], 3);
        });
        it('can copy Uint16Array', () => {
            const data = new Uint16Array([
                1,
                2,
                3,
            ]);
            const result = deepCopy(data);

            assert.instanceOf(result, Uint16Array);
            assert.notStrictEquals(result, data);

            data[0] = 4;
            data[1] = 5;
            data[2] = 6;

            assert.strictEquals(result[0], 1);
            assert.strictEquals(result[1], 2);
            assert.strictEquals(result[2], 3);
        });
        it('can copy Uint32Array', () => {
            const data = new Uint32Array([
                1,
                2,
                3,
            ]);
            const result = deepCopy(data);

            assert.instanceOf(result, Uint32Array);
            assert.notStrictEquals(result, data);

            data[0] = 4;
            data[1] = 5;
            data[2] = 6;

            assert.strictEquals(result[0], 1);
            assert.strictEquals(result[1], 2);
            assert.strictEquals(result[2], 3);
        });
        it('can copy Uint8Array', () => {
            const data = new Uint8Array([
                1,
                2,
                3,
            ]);
            const result = deepCopy(data);

            assert.instanceOf(result, Uint8Array);
            assert.notStrictEquals(result, data);

            data[0] = 4;
            data[1] = 5;
            data[2] = 6;

            assert.strictEquals(result[0], 1);
            assert.strictEquals(result[1], 2);
            assert.strictEquals(result[2], 3);
        });
        it('can copy Uint8ClampedArray', () => {
            const data = new Uint8ClampedArray([
                1,
                2,
                3,
            ]);
            const result = deepCopy(data);

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

    describe('shallow copy targets', () => {
        it('can shallow copy function', () => {
            const data = function (): void {
                return;
            };
            const result = deepCopy(data);

            assert.strictEquals(result, data);
        });

        it('can shallow copy global object', () => {
            if (typeof globalThis !== 'undefined') {
                assert.strictEquals(globalThis, deepCopy(globalThis));
            } else if (typeof self !== 'undefined') {
                assert.strictEquals(self, deepCopy(self));
            } else if (typeof global === 'undefined') {
                assert.never();
            } else {
                assert.strictEquals(global, deepCopy(global));
            }
        });

        it('can shallow copy Promise', () => {
            const data = new Promise(function (): void {
                return;
            });
            const result = deepCopy(data);

            assert.strictEquals(result, data);
        });

        it('can shallow copy WeakMap', () => {
            const data = new WeakMap();
            const result = deepCopy(data);

            assert.strictEquals(result, data);
        });

        it('can shallow copy WeakSet', () => {
            const data = new WeakSet();
            const result = deepCopy(data);

            assert.strictEquals(result, data);
        });

        it('can shallow copy Array Iterator', () => {
            const data = [
                1,
                2,
                3,
            ][Symbol.iterator]();
            const result = deepCopy(data);

            assert.strictEquals(result, data);
        });
        it('can shallow copy Map Iterator', () => {
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
            const result = deepCopy(data);

            assert.strictEquals(result, data);
        });
        it('can shallow copy Set Iterator', () => {
            const data = new Set<number>([
                1,
                2,
                3,
            ])[Symbol.iterator]();
            const result = deepCopy(data);

            assert.strictEquals(result, data);
        });
        it('can shallow copy String Iterator', () => {
            const data = '寿司'[Symbol.iterator]();
            const result = deepCopy(data);

            assert.strictEquals(result, data);
        });
    });

    describe('recursively copy', () => {
        it('can copy Arguments, it convert to an Array', () => {
            (function (one: number, two: number, three: number): void {
                // eslint-disable-next-line prefer-rest-params
                const data = arguments;
                const result = deepCopy(data as any);

                assert.notStrictEquals(result, data);
                assert.isArray(result);
                assert.strictEquals(result[0], 1);
                assert.strictEquals(result[1], 2);
                assert.strictEquals(result[2], 3);
            })(1, 2, 3);
        });

        it('can copy Array', () => {
            const data = [
                1,
                2,
                3,
            ];
            const result = deepCopy(data);

            assert.notStrictEquals(result, data);
            assert.strictEquals(result[0], 1);
            assert.strictEquals(result[1], 2);
            assert.strictEquals(result[2], 3);
        });

        it('can copy Map', () => {
            const data = new Map([
                [
                    'a',
                    1,
                ],
                [
                    'b',
                    2,
                ],
                [
                    'c',
                    3,
                ],
            ]);
            const result = deepCopy(data);

            assert.notStrictEquals(result, data);

            data.clear();

            const iterator = result.entries();

            assert.strictEquals(iterator.next().value?.join(','), 'a,1');
            assert.strictEquals(iterator.next().value?.join(','), 'b,2');
            assert.strictEquals(iterator.next().value?.join(','), 'c,3');
        });

        it('can copy Object', () => {
            const data = {
                a: 1,
                b: 2,
                c: 3,
            };
            const result = deepCopy(data);

            assert.notStrictEquals(result, data);
            assert.strictEquals(result.a, 1);
            assert.strictEquals(result.b, 2);
            assert.strictEquals(result.c, 3);
        });

        it('can copy Set', () => {
            const data = new Set([
                1,
                2,
                3,
            ]);
            const result = deepCopy(data);

            assert.notStrictEquals(result, data);

            data.clear();

            assert.isTrue(result.has(1));
            assert.isTrue(result.has(2));
            assert.isTrue(result.has(3));
        });

        describe('dive deep', () => {
            it('Array', () => {
                const result = deepCopy([
                    [
                        1,
                        2,
                        3,
                    ],
                    [
                        4,
                        5,
                        6,
                    ],
                    [
                        7,
                        8,
                        9,
                    ],
                ]);

                assert.strictEquals(result[0]?.join(','), '1,2,3');
                assert.strictEquals(result[1]?.join(','), '4,5,6');
                assert.strictEquals(result[2]?.join(','), '7,8,9');
            });

            it('Object in Array', () => {
                const result = deepCopy([
                    {
                        a: 1,
                        b: 2,
                        c: 3,
                    },
                    {
                        a: 4,
                        b: 5,
                        c: 6,
                    },
                ]);

                assert.strictEquals(result[0]?.a, 1);
                assert.strictEquals(result[0].b, 2);
                assert.strictEquals(result[0].c, 3);
                assert.strictEquals(result[1]?.a, 4);
                assert.strictEquals(result[1].b, 5);
                assert.strictEquals(result[1].c, 6);
            });

            it('Object', () => {
                const result = deepCopy({
                    a: {
                        a: 1,
                        b: 2,
                        c: 3,
                    },
                    b: {
                        d: 4,
                        e: 5,
                        f: 6,
                    },
                    c: {
                        g: 7,
                        h: 8,
                        i: 9,
                    },
                });

                assert.strictEquals(result.a.a, 1);
                assert.strictEquals(result.a.b, 2);
                assert.strictEquals(result.a.c, 3);
                assert.strictEquals(result.b.d, 4);
                assert.strictEquals(result.b.e, 5);
                assert.strictEquals(result.b.f, 6);
                assert.strictEquals(result.c.g, 7);
                assert.strictEquals(result.c.h, 8);
                assert.strictEquals(result.c.i, 9);
            });

            it('Symbol in Object', () => {
                const s1 = Symbol();
                const s2 = Symbol();
                const s3 = Symbol();

                const result = deepCopy({
                    [s1]: [
                        {
                            a: 1,
                        },
                        {
                            b: 2,
                        },
                        {
                            c: 3,
                        },
                    ],
                    [s2]: [
                        {
                            a: 1,
                        },
                        {
                            b: 2,
                        },
                        {
                            c: 3,
                        },
                    ],
                    [s3]: [
                        {
                            a: 1,
                        },
                        {
                            b: 2,
                        },
                        {
                            c: 3,
                        },
                    ],
                });

                assert.strictEquals(result[s1][0]?.a, 1);
                assert.strictEquals(result[s1][1]?.b, 2);
                assert.strictEquals(result[s1][2]?.c, 3);
                assert.strictEquals(result[s2][0]?.a, 1);
                assert.strictEquals(result[s2][1]?.b, 2);
                assert.strictEquals(result[s2][2]?.c, 3);
                assert.strictEquals(result[s3][0]?.a, 1);
                assert.strictEquals(result[s3][1]?.b, 2);
                assert.strictEquals(result[s3][2]?.c, 3);
            });

            it('Object in Map', () => {
                const result = deepCopy(
                    new Map([
                        [
                            1,
                            {
                                a: 1,
                                b: 2,
                                c: 3,
                            },
                        ],
                        [
                            2,
                            {
                                a: 4,
                                b: 5,
                                c: 6,
                            },
                        ],
                        [
                            3,
                            {
                                a: 7,
                                b: 8,
                                c: 9,
                            },
                        ],
                    ]),
                );

                assert.strictEquals((result.get(1) || {}).a, 1);
                assert.strictEquals((result.get(1) || {}).b, 2);
                assert.strictEquals((result.get(1) || {}).c, 3);
                assert.strictEquals((result.get(2) || {}).a, 4);
                assert.strictEquals((result.get(2) || {}).b, 5);
                assert.strictEquals((result.get(2) || {}).c, 6);
                assert.strictEquals((result.get(3) || {}).a, 7);
                assert.strictEquals((result.get(3) || {}).b, 8);
                assert.strictEquals((result.get(3) || {}).c, 9);
            });
        });
    });

    describe('options', () => {
        describe('customizer', () => {
            it('can copy unknown class', () => {
                class A {
                    public isA(): void {
                        console.info('Hello!');
                    }
                }

                const data = new A();
                const result = deepCopy(data, {
                    customizer(value: unknown): A | void {
                        if (value instanceof A) {
                            return new A();
                        }
                    },
                });

                assert.instanceOf(result, A);
                assert.notStrictEquals(result, data);
                assert.strictEquals(typeof result.isA, 'function');
            });
        });
    });

    describe('issues', () => {
        it('#2', () => {
            function fn(): void {
                return;
            }

            const result = deepCopy({
                a: fn,
                b: fn,
            });

            assert.strictEquals(result.a, fn);
            assert.strictEquals(result.b, fn);
        });

        it('#7', () => {
            const result = deepCopy({
                a: {
                    x: new Date(),
                    y: new Date(),
                },
                b: {
                    x: 1,
                    y: 1,
                },
            });

            assert.instanceOf(result.a.x, Date);
            assert.instanceOf(result.a.y, Date);
            assert.strictEquals(result.b.x, 1);
            assert.strictEquals(result.b.y, 1);
        });

        it('#9', () => {
            const result = deepCopy([
                {
                    a: 1,
                    b: 1,
                },
                {
                    a: 2,
                    b: 2,
                },
            ]);

            assert.strictEquals(result[0]?.a, 1);
            assert.strictEquals(result[0].b, 1);
            assert.strictEquals(result[1]?.a, 2);
            assert.strictEquals(result[1].b, 2);
        });

        it('#10', () => {
            function fn(): void {
                return;
            }

            const result = deepCopy([
                {
                    a: fn,
                    b: 'asdf',
                },
                {
                    x: fn,
                    y: 'asdf',
                },
            ]);

            assert.strictEquals(result[0]?.a, fn);
            assert.strictEquals(result[0].b, 'asdf');
            assert.strictEquals(result[1]?.x, fn);
            assert.strictEquals(result[1].y, 'asdf');
        });

        it('#11', () => {
            const result = deepCopy({
                a: 1,
                b: 2,
                c: 3,
                d(): void {
                    return;
                },
                e: 4,
                f: [],
            });

            assert.strictEquals(result.a, 1);
            assert.strictEquals(result.b, 2);
            assert.strictEquals(result.c, 3);
            assert.strictEquals(typeof result.d, 'function');
            assert.strictEquals(result.e, 4);
            assert.isArray(result.f);
        });

        it('#12', () => {
            const result = deepCopy({
                a: 1,
                b: 2,
                c: 3,
                d: {
                    e: {
                        f: false,
                    },
                },
            });

            assert.strictEquals(result.a, 1);
            assert.strictEquals(result.b, 2);
            assert.strictEquals(result.c, 3);
            assert.isFalse(result.d.e.f);
        });
    });
});
