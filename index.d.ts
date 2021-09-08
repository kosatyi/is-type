interface Schema extends Object {

}

export function isOneOf(...callbacks: Function[]): Function;

export function getType(o: any): boolean;

export function isType(o: any): boolean;

export function isAnyObject(o: any): boolean;

export function isPlainObject(o: any): boolean;

export function isObject(o: any): boolean;

export function isEmptyObject(o: any): boolean;

export function isFullObject(o: any): boolean;

export function isObjectLike(o: any): boolean;

export function isFunction(o: any): boolean;

export function isRegexp(o: any): boolean;

export function isArguments(o: any): boolean;

export function isArray(o: any): boolean;

export function isEmptyArray(o: any): boolean;

export function isFullArray(o: any): boolean;

export function isNumber(o: any): boolean;

export function isElement(o: any): boolean;

export function isNull(o: any): boolean;

export function isString(o: any): boolean;

export function isEmptyString(o: any): boolean;

export function isFullString(o: any): boolean;

export function isBoolean(o: any): boolean;

export function isUndefined(o: any): boolean;

export function isMap(o: any): boolean;

export function isWeakMap(o: any): boolean;

export function isSet(o: any): boolean;

export function isWeakSet(o: any): boolean;

export function isSymbol(o: any): boolean;

export function isDate(o: any): boolean;

export function isBlob(o: any): boolean;

export function isFile(o: any): boolean;

export function isPromise(o: any): boolean;

export function isError(o: any): boolean;

export function isNaNValue(o: any): boolean;

export function isNullOrUndefined(o: any): boolean;

export function isPrimitive(o: any): boolean;

export function oneOf(...args: any[]): any;

export function or(...args: any[]): any;

export function and(...args: any[]): any;

/**
 *
 * @param {Object} target
 * @param {Object[]} list
 */
export function merge(target: Object, ...list: Object[]): Schema;

/**
 *
 * @param {Object} object
 * @param {Schema} schema
 */
export function filter(object: Object, schema: Schema): Schema;
