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

import {cloneBuffer} from './buffer.js';
import {typeArguments, typeArray, typeMap, typeObject, typeSet} from './detector.js';

/**
 * Clone value.
 *
 * @category Internal
 */
export function clone(value: unknown, valueType: string): unknown {
    // eslint-disable-next-line sonarjs/max-switch-cases
    switch (valueType) {
        // deep copy
        case 'ArrayBuffer':
            return (value as ArrayBuffer).slice(0);
        case 'Boolean':
            // eslint-disable-next-line sonarjs/no-primitive-wrappers, unicorn/new-for-builtins
            return new Boolean((value as boolean).valueOf());
        case 'Buffer':
            return cloneBuffer(value as Buffer);
        case 'DataView':
            return new DataView((value as DataView).buffer);
        case 'Date':
            return new Date((value as Date).getTime());
        case 'Number':
            // eslint-disable-next-line sonarjs/no-primitive-wrappers, unicorn/new-for-builtins
            return new Number(value as number);
        case 'RegExp':
            return new RegExp((value as RegExp).source, (value as RegExp).flags);
        case 'String':
            // eslint-disable-next-line sonarjs/no-primitive-wrappers, unicorn/new-for-builtins
            return new String(value as string);

        // typed arrays
        case 'Float32Array':
            return new Float32Array(value as Float32Array);
        case 'Float64Array':
            return new Float64Array(value as Float64Array);
        case 'Int16Array':
            return new Int16Array(value as Int16Array);
        case 'Int32Array':
            return new Int32Array(value as Int32Array);
        case 'Int8Array':
            return new Int8Array(value as Int8Array);
        case 'Uint16Array':
            return new Uint16Array(value as Uint16Array);
        case 'Uint32Array':
            return new Uint32Array(value as Uint32Array);
        case 'Uint8Array':
            return new Uint8Array(value as Uint8Array);
        case 'Uint8ClampedArray':
            return new Uint8ClampedArray(value as Uint8ClampedArray);

        // shallow copy
        case 'Array Iterator':
            return value;
        case 'Map Iterator':
            return value;
        case 'Promise':
            return value;
        case 'Set Iterator':
            return value;
        case 'String Iterator':
            return value;
        case 'function':
            return value;
        case 'global':
            return value;
        // NOTE: WeakMap and WeakSet cannot get entries
        case 'WeakMap':
            return value;
        case 'WeakSet':
            return value;

        // primitives
        case 'boolean':
            return value;
        case 'null':
            return value;
        case 'number':
            return value;
        case 'string':
            return value;
        case 'symbol':
            return value;
        case 'undefined':
            return value;

        // collections
        // NOTE: return empty value: because recursively copy later.
        case typeArguments:
            return [];
        case typeArray:
            return [];
        case typeMap:
            return new Map<unknown, unknown>();
        case typeObject:
            return {};
        case typeSet:
            return new Set<unknown>();

        // NOTE: type-detect returns following types
        // 'Location'
        // 'Document'
        // 'MimeTypeArray'
        // 'PluginArray'
        // 'HTMLQuoteElement'
        // 'HTMLTableDataCellElement'
        // 'HTMLTableHeaderCellElement'

        default:
            return value;
    }
}

/**
 * Allows customization of copy behavior.
 *
 * @category Internal
 */
export type CustomCopy = (value: unknown, type: string) => unknown;

/**
 * Copy value with customizer function.
 *
 * @category Internal
 */
export function copy(
    value: unknown,
    valueType: string,
    customizer: CustomCopy | null = null,
): unknown {
    if (customizer && valueType === 'Object') {
        const result = customizer(value, valueType);

        if (result !== undefined) {
            return result;
        }
    }

    return clone(value, valueType);
}
