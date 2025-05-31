/**
 * These tests were combined from the files in
 * https://github.com/chaijs/type-detect/tree/4415ced2c49007f097627515806553e7f649c293/test which
 * has the following license:
 *
 *     Copyright (c) 2013 Jake Luer <jake@alogicalparadox.com> (http://alogicalparadox.com)
 *
 *     Permission is hereby granted, free of charge, to any person obtaining a copy
 *     of this software and associated documentation files (the "Software"), to deal
 *     in the Software without restriction, including without limitation the rights
 *     to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *     copies of the Software, and to permit persons to whom the Software is
 *     furnished to do so, subject to the following conditions:
 *
 *     The above copyright notice and this permission notice shall be included in
 *     all copies or substantial portions of the Software.
 *
 *     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *     IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *     AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *     OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *     THE SOFTWARE.
 */

import {assert} from '@augment-vir/assert';
import {type AnyObject} from '@augment-vir/common';
import {describe, it} from '@augment-vir/test';
import {typeDetect} from './type-detect.js';

describe('Generic', () => {
    it('array', () => {
        assert.strictEquals(typeDetect([]), 'Array');
        assert.strictEquals(typeDetect([]), 'Array');
    });

    describe('DOM Specific', () => {
        it('window', () => {
            assert.strictEquals(typeDetect(window), 'global');
        });

        it('document', () => {
            assert.strictEquals(typeDetect(document), 'Document');
        });

        it('domparser', () => {
            assert.strictEquals(typeDetect(new DOMParser()), 'DOMParser');
        });

        it('history', () => {
            assert.strictEquals(typeDetect(window.history), 'History');
        });

        it('location', () => {
            assert.strictEquals(typeDetect(window.location), 'Location');
        });

        it('attr', () => {
            const div = document.createElement('div');
            div.setAttribute('id', 'foo');
            assert.strictEquals(typeDetect(div.getAttributeNode('id')), 'Attr');
        });

        describe('Events', () => {
            it('event', () => {
                assert.strictEquals(typeDetect(document.createEvent('Event')), 'Event');
            });

            it('HashChangeEvent', () => {
                assert.strictEquals(typeDetect(new HashChangeEvent('')), 'HashChangeEvent');
            });
        });

        describe('Navigator', () => {
            it('navigator', () => {
                assert.strictEquals(typeDetect(window.navigator), 'Navigator');
            });

            it('geolocation', () => {
                assert.strictEquals(typeDetect(navigator.geolocation), 'Geolocation');
            });

            it('mediadevices', () => {
                assert.strictEquals(typeDetect(navigator.mediaDevices), 'MediaDevices');
            });

            it('mimetypearray', () => {
                // eslint-disable-next-line sonarjs/deprecation, @typescript-eslint/no-deprecated
                assert.strictEquals(typeDetect(navigator.mimeTypes), 'MimeTypeArray');
            });

            it('permissions', () => {
                assert.strictEquals(typeDetect(navigator.permissions), 'Permissions');
            });

            it('pluginarray', () => {
                // eslint-disable-next-line sonarjs/deprecation, @typescript-eslint/no-deprecated
                assert.strictEquals(typeDetect(navigator.plugins), 'PluginArray');
            });

            it('storagemanager', () => {
                assert.strictEquals(typeDetect(navigator.storage), 'StorageManager');
            });
        });

        describe('(HTMLElements)', () => {
            it('HTMLAreaElement', () => {
                assert.strictEquals(typeDetect(document.createElement('Area')), 'HTMLAreaElement');
            });

            it('HTMLBRElement', () => {
                assert.strictEquals(typeDetect(document.createElement('BR')), 'HTMLBRElement');
            });

            it('HTMLBaseElement', () => {
                assert.strictEquals(typeDetect(document.createElement('Base')), 'HTMLBaseElement');
            });

            it('HTMLBodyElement', () => {
                assert.strictEquals(typeDetect(document.createElement('Body')), 'HTMLBodyElement');
            });

            it('HTMLButtonElement', () => {
                assert.strictEquals(
                    typeDetect(document.createElement('Button')),
                    'HTMLButtonElement',
                );
            });

            it('HTMLCanvasElement', () => {
                assert.strictEquals(
                    typeDetect(document.createElement('Canvas')),
                    'HTMLCanvasElement',
                );
            });

            it('HTMLDListElement', () => {
                assert.strictEquals(typeDetect(document.createElement('DL')), 'HTMLDListElement');
            });

            // not yet supported in Safari
            it('HTMLDataListElement', () => {
                assert.strictEquals(
                    typeDetect(document.createElement('DataList')),
                    'HTMLDataListElement',
                );
            });

            it('HTMLDivElement', () => {
                assert.strictEquals(typeDetect(document.createElement('Div')), 'HTMLDivElement');
            });

            it('HTMLFieldSetElement', () => {
                assert.strictEquals(
                    typeDetect(document.createElement('FieldSet')),
                    'HTMLFieldSetElement',
                );
            });

            it('HTMLFormElement', () => {
                assert.strictEquals(typeDetect(document.createElement('Form')), 'HTMLFormElement');
            });

            it('HTMLFrameSetElement', () => {
                assert.strictEquals(
                    typeDetect(document.createElement('FrameSet')),
                    'HTMLFrameSetElement',
                );
            });

            it('HTMLHRElement', () => {
                assert.strictEquals(typeDetect(document.createElement('HR')), 'HTMLHRElement');
            });

            it('HTMLHeadElement', () => {
                assert.strictEquals(typeDetect(document.createElement('Head')), 'HTMLHeadElement');
            });

            it('HTMLHeadingElement', () => {
                assert.strictEquals(typeDetect(document.createElement('H1')), 'HTMLHeadingElement');
                assert.strictEquals(typeDetect(document.createElement('H2')), 'HTMLHeadingElement');
                assert.strictEquals(typeDetect(document.createElement('H3')), 'HTMLHeadingElement');
                assert.strictEquals(typeDetect(document.createElement('H4')), 'HTMLHeadingElement');
                assert.strictEquals(typeDetect(document.createElement('H5')), 'HTMLHeadingElement');
                assert.strictEquals(typeDetect(document.createElement('H6')), 'HTMLHeadingElement');
            });

            it('HTMLHtmlElement', () => {
                assert.strictEquals(typeDetect(document.createElement('Html')), 'HTMLHtmlElement');
            });

            it('HTMLIFrameElement', () => {
                assert.strictEquals(
                    typeDetect(document.createElement('IFrame')),
                    'HTMLIFrameElement',
                );
            });

            it('HTMLImageElement', () => {
                assert.strictEquals(typeDetect(document.createElement('Img')), 'HTMLImageElement');
            });

            it('HTMLInputElement', () => {
                assert.strictEquals(
                    typeDetect(document.createElement('Input')),
                    'HTMLInputElement',
                );
            });

            it('HTMLLIElement', () => {
                assert.strictEquals(typeDetect(document.createElement('LI')), 'HTMLLIElement');
            });

            it('HTMLLabelElement', () => {
                assert.strictEquals(
                    typeDetect(document.createElement('Label')),
                    'HTMLLabelElement',
                );
            });

            it('HTMLLegendElement', () => {
                assert.strictEquals(
                    typeDetect(document.createElement('Legend')),
                    'HTMLLegendElement',
                );
            });

            it('HTMLLinkElement', () => {
                assert.strictEquals(typeDetect(document.createElement('Link')), 'HTMLLinkElement');
            });

            it('HTMLMapElement', () => {
                assert.strictEquals(typeDetect(document.createElement('Map')), 'HTMLMapElement');
            });

            it('HTMLMetaElement', () => {
                assert.strictEquals(typeDetect(document.createElement('Meta')), 'HTMLMetaElement');
            });

            it('HTMLMeterElement', () => {
                assert.strictEquals(
                    typeDetect(document.createElement('Meter')),
                    'HTMLMeterElement',
                );
            });

            it('HTMLModElement', () => {
                assert.strictEquals(typeDetect(document.createElement('Del')), 'HTMLModElement');
            });

            it('HTMLOListElement', () => {
                assert.strictEquals(typeDetect(document.createElement('OL')), 'HTMLOListElement');
            });

            it('HTMLOptGroupElement', () => {
                assert.strictEquals(
                    typeDetect(document.createElement('OptGroup')),
                    'HTMLOptGroupElement',
                );
            });

            it('HTMLOptionElement', () => {
                assert.strictEquals(
                    typeDetect(document.createElement('Option')),
                    'HTMLOptionElement',
                );
            });

            it('HTMLOutputElement', () => {
                assert.strictEquals(
                    typeDetect(document.createElement('Output')),
                    'HTMLOutputElement',
                );
            });

            it('HTMLParagraphElement', () => {
                assert.strictEquals(
                    typeDetect(document.createElement('P')),
                    'HTMLParagraphElement',
                );
            });

            it('HTMLParamElement', () => {
                assert.strictEquals(
                    typeDetect(document.createElement('Param')),
                    'HTMLParamElement',
                );
            });

            it('HTMLPreElement', () => {
                assert.strictEquals(typeDetect(document.createElement('Pre')), 'HTMLPreElement');
            });

            it('HTMLProgressElement', () => {
                assert.strictEquals(
                    typeDetect(document.createElement('Progress')),
                    'HTMLProgressElement',
                );
            });

            it('HTMLQuoteElement', () => {
                assert.strictEquals(
                    typeDetect(document.createElement('BlockQuote')),
                    'HTMLQuoteElement',
                );
                assert.strictEquals(typeDetect(document.createElement('Q')), 'HTMLQuoteElement');
            });

            it('HTMLScriptElement', () => {
                assert.strictEquals(
                    typeDetect(document.createElement('Script')),
                    'HTMLScriptElement',
                );
            });

            it('HTMLSelectElement', () => {
                assert.strictEquals(
                    typeDetect(document.createElement('Select')),
                    'HTMLSelectElement',
                );
            });

            it('HTMLSpanElement', () => {
                assert.strictEquals(typeDetect(document.createElement('Span')), 'HTMLSpanElement');
            });

            it('HTMLStyleElement', () => {
                assert.strictEquals(
                    typeDetect(document.createElement('Style')),
                    'HTMLStyleElement',
                );
            });

            it('HTMLTableCaptionElement', () => {
                assert.strictEquals(
                    typeDetect(document.createElement('Caption')),
                    'HTMLTableCaptionElement',
                );
            });

            it('HTMLTableDataCellElement', () => {
                assert.strictEquals(
                    typeDetect(document.createElement('TD')),
                    'HTMLTableDataCellElement',
                );
            });

            it('HTMLTableHeaderCellElement', () => {
                assert.strictEquals(
                    typeDetect(document.createElement('TH')),
                    'HTMLTableHeaderCellElement',
                );
            });

            it('HTMLTableColElement', () => {
                assert.strictEquals(
                    typeDetect(document.createElement('Col')),
                    'HTMLTableColElement',
                );
                assert.strictEquals(
                    typeDetect(document.createElement('ColGroup')),
                    'HTMLTableColElement',
                );
            });

            it('HTMLTableElement', () => {
                assert.strictEquals(
                    typeDetect(document.createElement('Table')),
                    'HTMLTableElement',
                );
            });

            it('HTMLTableRowElement', () => {
                assert.strictEquals(
                    typeDetect(document.createElement('TR')),
                    'HTMLTableRowElement',
                );
            });

            it('HTMLTableSectionElement', () => {
                assert.strictEquals(
                    typeDetect(document.createElement('THead')),
                    'HTMLTableSectionElement',
                );
                assert.strictEquals(
                    typeDetect(document.createElement('TBody')),
                    'HTMLTableSectionElement',
                );
                assert.strictEquals(
                    typeDetect(document.createElement('TFoot')),
                    'HTMLTableSectionElement',
                );
            });

            it('HTMLTextAreaElement', () => {
                assert.strictEquals(
                    typeDetect(document.createElement('TextArea')),
                    'HTMLTextAreaElement',
                );
            });

            it('HTMLTitleElement', () => {
                assert.strictEquals(
                    typeDetect(document.createElement('Title')),
                    'HTMLTitleElement',
                );
            });

            it('HTMLUListElement', () => {
                assert.strictEquals(typeDetect(document.createElement('UL')), 'HTMLUListElement');
            });

            it('HTMLUnknownElement', () => {
                assert.strictEquals(
                    typeDetect(document.createElement('foobarbaz')),
                    'HTMLUnknownElement',
                );
            });
        });
    });

    describe('ES2015 Specific', () => {
        it('string iterator', () => {
            assert.strictEquals(typeDetect(''[Symbol.iterator]()), 'String Iterator');
        });

        it('array iterator', () => {
            assert.strictEquals(typeDetect([][Symbol.iterator]()), 'Array Iterator');
        });

        it('array iterator (entries)', () => {
            assert.strictEquals(typeDetect([].entries()), 'Array Iterator');
        });

        it('map', () => {
            assert.strictEquals(typeDetect(new Map()), 'Map');
        });

        it('map iterator', () => {
            assert.strictEquals(typeDetect(new Map()[Symbol.iterator]()), 'Map Iterator');
        });

        it('map iterator (entries)', () => {
            assert.strictEquals(typeDetect(new Map().entries()), 'Map Iterator');
        });

        it('weakmap', () => {
            assert.strictEquals(typeDetect(new WeakMap()), 'WeakMap');
        });

        it('set', () => {
            assert.strictEquals(typeDetect(new Set()), 'Set');
        });

        it('set iterator', () => {
            assert.strictEquals(typeDetect(new Set()[Symbol.iterator]()), 'Set Iterator');
        });

        it('set iterator', () => {
            assert.strictEquals(typeDetect(new Set().entries()), 'Set Iterator');
        });

        it('weakset', () => {
            assert.strictEquals(typeDetect(new WeakSet()), 'WeakSet');
        });

        it('symbol', () => {
            assert.strictEquals(typeDetect(Symbol('foo')), 'symbol');
        });

        it('promise', () => {
            function noop() {}
            assert.strictEquals(typeDetect(new Promise(noop)), 'Promise');
        });

        it('int8array', () => {
            assert.strictEquals(typeDetect(new Int8Array()), 'Int8Array');
        });

        it('uint8array', () => {
            assert.strictEquals(typeDetect(new Uint8Array()), 'Uint8Array');
        });

        it('uint8clampedarray', () => {
            assert.strictEquals(typeDetect(new Uint8ClampedArray()), 'Uint8ClampedArray');
        });

        it('int16array', () => {
            assert.strictEquals(typeDetect(new Int16Array()), 'Int16Array');
        });

        it('uint16array', () => {
            assert.strictEquals(typeDetect(new Uint16Array()), 'Uint16Array');
        });

        it('int32array', () => {
            assert.strictEquals(typeDetect(new Int32Array()), 'Int32Array');
        });

        it('uint32array', () => {
            assert.strictEquals(typeDetect(new Uint32Array()), 'Uint32Array');
        });

        it('float32array', () => {
            assert.strictEquals(typeDetect(new Float32Array()), 'Float32Array');
        });

        it('float64array', () => {
            assert.strictEquals(typeDetect(new Float64Array()), 'Float64Array');
        });

        it('dataview', () => {
            const arrayBuffer = new ArrayBuffer(1);
            assert.strictEquals(typeDetect(new DataView(arrayBuffer)), 'DataView');
        });

        it('arraybuffer', () => {
            assert.strictEquals(typeDetect(new ArrayBuffer(1)), 'ArrayBuffer');
        });

        it('arrow function', () => {
            assert(typeDetect(eval('() => {}')) === 'function');
        });

        it('generator function', () => {
            assert.strictEquals(typeDetect(eval('function * foo () {}; foo')), 'function');
        });

        it('generator', () => {
            assert.strictEquals(typeDetect(eval('(function * foo () {}())')), 'Generator');
        });
    });

    it('supports toStringTag on arrays', () => {
        assert(typeDetect([]) === 'Array');
        const arr: unknown[] = [];
        (arr as AnyObject)[Symbol.toStringTag] = 'foo';
        assert(typeDetect(arr) === 'foo', 'type(arr) === "foo"');
    });

    it('regexp', () => {
        assert.strictEquals(typeDetect(/a-z/gi), 'RegExp');
        assert.strictEquals(typeDetect(new RegExp('a-z')), 'RegExp');
    });

    it('function', () => {
        assert.strictEquals(
            typeDetect(() => {}),
            'function',
        );
    });

    it('arguments', function () {
        // eslint-disable-next-line prefer-rest-params
        assert.strictEquals(typeDetect(arguments), 'Arguments');
    });

    it('date', () => {
        assert.strictEquals(typeDetect(new Date()), 'Date');
    });

    it('number', () => {
        assert.strictEquals(typeDetect(1), 'number');
        assert.strictEquals(typeDetect(1.234), 'number');
        assert.strictEquals(typeDetect(-1), 'number');
        assert.strictEquals(typeDetect(-1.234), 'number');
        assert.strictEquals(typeDetect(Infinity), 'number');
        assert.strictEquals(typeDetect(NaN), 'number');
    });

    it('number objects', () => {
        // eslint-disable-next-line sonarjs/no-primitive-wrappers, unicorn/new-for-builtins
        assert.strictEquals(typeDetect(new Number(2)), 'Number');
    });

    it('string', () => {
        assert.strictEquals(typeDetect('hello world'), 'string');
    });

    it('string objects', () => {
        // eslint-disable-next-line sonarjs/no-primitive-wrappers, unicorn/new-for-builtins
        assert.strictEquals(typeDetect(new String('hello')), 'String');
    });

    it('null', () => {
        assert.strictEquals(typeDetect(null), 'null');
        assert.notStrictEquals(typeDetect(undefined), 'null');
    });

    it('undefined', () => {
        assert.strictEquals(typeDetect(undefined), 'undefined');
        assert.notStrictEquals(typeDetect(null), 'undefined');
    });

    it('object', () => {
        function Noop() {}
        assert.strictEquals(typeDetect({}), 'Object');
        assert.notStrictEquals(typeDetect(Noop), 'Object');
        // @ts-expect-error: using `new` on a non constructor
        assert.strictEquals(typeDetect(new Noop()), 'Object');
        assert.strictEquals(typeDetect(new Object()), 'Object');
        assert.strictEquals(typeDetect(Object.create(null)), 'Object');
        assert.strictEquals(typeDetect(Object.create(Object.prototype)), 'Object');
    });

    // See: https://github.com/chaijs/type-detect/pull/25
    it('object with .undefined property getter', () => {
        const foo = {};
        Object.defineProperty(foo, 'undefined', {
            get() {
                throw new Error('Should never happen');
            },
        });
        assert.strictEquals(typeDetect(foo), 'Object');
    });

    it('boolean', () => {
        assert.strictEquals(typeDetect(true), 'boolean');
        assert.strictEquals(typeDetect(false), 'boolean');
        assert.strictEquals(typeDetect(!0), 'boolean');
    });

    it('boolean object', () => {
        // eslint-disable-next-line sonarjs/no-primitive-wrappers, unicorn/new-for-builtins
        assert.strictEquals(typeDetect(new Boolean()), 'Boolean');
    });

    it('error', () => {
        assert.strictEquals(typeDetect(new Error()), 'Error');
        assert.strictEquals(typeDetect(new TypeError()), 'Error');
        assert.strictEquals(typeDetect(new EvalError()), 'Error');
        assert.strictEquals(typeDetect(new RangeError()), 'Error');
        assert.strictEquals(typeDetect(new ReferenceError()), 'Error');
        assert.strictEquals(typeDetect(new SyntaxError()), 'Error');
        assert.strictEquals(typeDetect(new TypeError()), 'Error');
        assert.strictEquals(typeDetect(new URIError()), 'Error');
    });

    it('Math', () => {
        assert.strictEquals(typeDetect(Math), 'Math');
    });

    it('JSON', () => {
        assert.strictEquals(typeDetect(JSON), 'JSON');
    });

    describe('Stubbed ES2015 Types', () => {
        // eslint-disable-next-line @typescript-eslint/unbound-method
        const originalObjectToString = Object.prototype.toString;
        function stubObjectToStringOnce(staticValue: any) {
            Object.prototype.toString = function () {
                Object.prototype.toString = originalObjectToString;
                return staticValue;
            };
        }
        // eslint-disable-next-line @typescript-eslint/no-extraneous-class
        class Thing {}

        it('map', () => {
            stubObjectToStringOnce('[object Map]');
            assert.strictEquals(typeDetect(new Thing()), 'Map');
        });

        it('weakmap', () => {
            stubObjectToStringOnce('[object WeakMap]');
            assert.strictEquals(typeDetect(new Thing()), 'WeakMap');
        });

        it('set', () => {
            stubObjectToStringOnce('[object Set]');
            assert.strictEquals(typeDetect(new Thing()), 'Set');
        });

        it('weakset', () => {
            stubObjectToStringOnce('[object WeakSet]');
            assert.strictEquals(typeDetect(new Thing()), 'WeakSet');
        });

        it('symbol', () => {
            stubObjectToStringOnce('[object Symbol]');
            assert.strictEquals(typeDetect(new Thing()), 'Symbol');
        });

        it('promise', () => {
            stubObjectToStringOnce('[object Promise]');
            assert.strictEquals(typeDetect(new Thing()), 'Promise');
        });

        it('int8array', () => {
            stubObjectToStringOnce('[object Int8Array]');
            assert.strictEquals(typeDetect(new Thing()), 'Int8Array');
        });

        it('uint8array', () => {
            stubObjectToStringOnce('[object Uint8Array]');
            assert.strictEquals(typeDetect(new Thing()), 'Uint8Array');
        });

        it('uint8clampedarray', () => {
            stubObjectToStringOnce('[object Uint8ClampedArray]');
            assert.strictEquals(typeDetect(new Thing()), 'Uint8ClampedArray');
        });

        it('int16array', () => {
            stubObjectToStringOnce('[object Int16Array]');
            assert.strictEquals(typeDetect(new Thing()), 'Int16Array');
        });

        it('uint16array', () => {
            stubObjectToStringOnce('[object Uint16Array]');
            assert.strictEquals(typeDetect(new Thing()), 'Uint16Array');
        });

        it('int32array', () => {
            stubObjectToStringOnce('[object Int32Array]');
            assert.strictEquals(typeDetect(new Thing()), 'Int32Array');
        });

        it('uint32array', () => {
            stubObjectToStringOnce('[object Uint32Array]');
            assert.strictEquals(typeDetect(new Thing()), 'Uint32Array');
        });

        it('float32array', () => {
            stubObjectToStringOnce('[object Float32Array]');
            assert.strictEquals(typeDetect(new Thing()), 'Float32Array');
        });

        it('float64array', () => {
            stubObjectToStringOnce('[object Float64Array]');
            assert.strictEquals(typeDetect(new Thing()), 'Float64Array');
        });

        it('dataview', () => {
            stubObjectToStringOnce('[object DataView]');
            assert.strictEquals(typeDetect(new Thing()), 'DataView');
        });

        it('arraybuffer', () => {
            stubObjectToStringOnce('[object ArrayBuffer]');
            assert.strictEquals(typeDetect(new Thing()), 'ArrayBuffer');
        });

        it('generatorfunction', () => {
            stubObjectToStringOnce('[object GeneratorFunction]');
            assert.strictEquals(typeDetect(new Thing()), 'GeneratorFunction');
        });

        it('generator', () => {
            stubObjectToStringOnce('[object Generator]');
            assert.strictEquals(typeDetect(new Thing()), 'Generator');
        });

        it('string iterator', () => {
            stubObjectToStringOnce('[object String Iterator]');
            assert.strictEquals(typeDetect(new Thing()), 'String Iterator');
        });

        it('array iterator', () => {
            stubObjectToStringOnce('[object Array Iterator]');
            assert.strictEquals(typeDetect(new Thing()), 'Array Iterator');
        });

        it('map iterator', () => {
            stubObjectToStringOnce('[object Map Iterator]');
            assert.strictEquals(typeDetect(new Thing()), 'Map Iterator');
        });

        it('set iterator', () => {
            stubObjectToStringOnce('[object Set Iterator]');
            assert.strictEquals(typeDetect(new Thing()), 'Set Iterator');
        });
    });

    describe('@@toStringTag Sham', () => {
        it('plain object', () => {
            // before
            // eslint-disable-next-line @typescript-eslint/unbound-method
            const originalObjectToString = Object.prototype.toString;

            const globalObject = typeof self === 'object' ? self : global;

            const test = {};
            (test as AnyObject)[Symbol.toStringTag] = function () {
                return 'foo';
            };

            if ((Object as AnyObject).prototype.toString(test) !== '[object foo]') {
                Object.prototype.toString = function () {
                    if (
                        typeof this === 'object' &&
                        typeof (this as AnyObject)[Symbol.toStringTag] === 'function'
                    ) {
                        return `[object ${(this as AnyObject)[Symbol.toStringTag]()}]`;
                    }
                    return originalObjectToString.call(this);
                };
            }

            try {
                // test
                const obj = {};
                (obj as AnyObject)[Symbol.toStringTag] = function () {
                    return 'Foo';
                };
                assert.strictEquals(typeDetect(obj), 'Foo', 'typeDetect(obj) === "Foo"');
            } finally {
                // after

                Object.prototype.toString = originalObjectToString;
            }
        });
    });
});
