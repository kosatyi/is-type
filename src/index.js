export {schemaFilter,and,or,oneOf} from './schema';

export function isOneOf() {
    const checks = [].slice.call(arguments);
    return function (v){
        return checks.some(function(c){
            return c && c(v);
        })
    }
}

export function getType(o){
    return ({}).toString.call(o).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}

/**
 * @template T
 * @param {*} o
 * @param {T} type
 * @throws {TypeError} Will throw type error if type is an invalid type
 * @returns {payload is T}
 */
export function isType(o, type) {
    if (!(type instanceof Function)) {
        throw new TypeError('Type must be a function');
    }
    if (!Object.prototype.hasOwnProperty.call(type, 'prototype')) {
        throw new TypeError('Type is not a class');
    }
    const name = type.name.toLowerCase();
    return getType(o) === name || Boolean(o && o.constructor === type);
}

export function isAnyObject(o){
    return getType(o) === 'object';
}


export function isPlainObject(o){
    if (isAnyObject(o) === false) return false;
    return o.constructor === Object && Object.getPrototypeOf(o) === Object.prototype;
}

export function isObject(o){
    return isPlainObject(o);
}

export function isEmptyObject(o){
    return isPlainObject(o) && Object.keys(o).length === 0;
}

export function isFullObject(o){
    return isPlainObject(o) && Object.keys(o).length > 0;
}

export function isObjectLike(o){
    return isAnyObject(o);
}

export function isFunction(o){
    return getType(o) === 'function';
}

export function isRegexp(o){
    return getType(o) === 'regexp';
}

export function isArguments(o){
    return getType(o) === 'arguments';
}

export function isArray(o){
    return getType(o) === 'array';
}

export function isEmptyArray(o){
    return isArray(o) && o.length === 0;
}

export function isFullArray(o){
    return isArray(o) && o.length > 0;
}

export function isNumber(o) {
    return getType(o) === 'number';
}

export function isElement(o) {
    return isObjectLike(o) && o.nodeType === 1;
}

export function isNull(o){
    return getType(o) === 'null';
}

export function isString(o) {
    return getType(o) === 'string';
}

export function isEmptyString(o){
    return o === '';
}

export function isFullString(o){
    return isString(o) && o !== '';
}

export function isBoolean(o){
    return getType(o) === 'boolean';
}

export function isUndefined(o) {
    return getType(o) === 'undefined';
}

export function isMap(o) {
    return getType(o) === 'map';
}

export function isWeakMap(o) {
    return getType(o) === 'weakmap';
}

export function isSet(o) {
    return getType(o) === 'set';
}

export function isWeakSet(o) {
    return getType(o) === 'weakset';
}

export function isSymbol(o) {
    return getType(o) === 'symbol';
}

export function isDate(o) {
    return getType(o) === 'date' && !isNaN(o);
}

export function isBlob(o) {
    return getType(o) === 'blob';
}

export function isFile(o) {
    return getType(o) === 'file';
}

export function isPromise(o) {
    return getType(o) === 'promise';
}

export function isError(o) {
    return getType(o) === 'error';
}

export function isNaNValue(o) {
    return getType(o) === 'number' && isNaN(o);
}

export const isNullOrUndefined = isOneOf(isNull, isUndefined);

export const isPrimitive = isOneOf(isBoolean,isNull,isUndefined,isNumber,isString,isSymbol);
