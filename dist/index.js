"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isOneOf = isOneOf;
exports.getType = getType;
exports.isType = isType;
exports.isAnyObject = isAnyObject;
exports.isPlainObject = isPlainObject;
exports.isObject = isObject;
exports.isEmptyObject = isEmptyObject;
exports.isFullObject = isFullObject;
exports.isObjectLike = isObjectLike;
exports.isFunction = isFunction;
exports.isRegexp = isRegexp;
exports.isArguments = isArguments;
exports.isArray = isArray;
exports.isEmptyArray = isEmptyArray;
exports.isFullArray = isFullArray;
exports.isNumber = isNumber;
exports.isElement = isElement;
exports.isNull = isNull;
exports.isString = isString;
exports.isEmptyString = isEmptyString;
exports.isFullString = isFullString;
exports.isBoolean = isBoolean;
exports.isUndefined = isUndefined;
exports.isMap = isMap;
exports.isWeakMap = isWeakMap;
exports.isSet = isSet;
exports.isWeakSet = isWeakSet;
exports.isSymbol = isSymbol;
exports.isDate = isDate;
exports.isBlob = isBlob;
exports.isFile = isFile;
exports.isPromise = isPromise;
exports.isError = isError;
exports.isNaNValue = isNaNValue;
Object.defineProperty(exports, "schemaFilter", {
  enumerable: true,
  get: function get() {
    return _schema.schemaFilter;
  }
});
Object.defineProperty(exports, "and", {
  enumerable: true,
  get: function get() {
    return _schema.and;
  }
});
Object.defineProperty(exports, "or", {
  enumerable: true,
  get: function get() {
    return _schema.or;
  }
});
Object.defineProperty(exports, "oneOf", {
  enumerable: true,
  get: function get() {
    return _schema.oneOf;
  }
});
exports.isPrimitive = exports.isNullOrUndefined = void 0;

var _schema = require("./schema");

function isOneOf() {
  var checks = [].slice.call(arguments);
  return function (v) {
    return checks.some(function (c) {
      return c && c(v);
    });
  };
}

function getType(o) {
  return {}.toString.call(o).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}
/**
 * @template T
 * @param {*} o
 * @param {T} type
 * @throws {TypeError} Will throw type error if type is an invalid type
 * @returns {payload is T}
 */


function isType(o, type) {
  if (!(type instanceof Function)) {
    throw new TypeError('Type must be a function');
  }

  if (!Object.prototype.hasOwnProperty.call(type, 'prototype')) {
    throw new TypeError('Type is not a class');
  }

  var name = type.name.toLowerCase();
  return getType(o) === name || Boolean(o && o.constructor === type);
}

function isAnyObject(o) {
  return getType(o) === 'object';
}

function isPlainObject(o) {
  if (isAnyObject(o) === false) return false;
  return o.constructor === Object && Object.getPrototypeOf(o) === Object.prototype;
}

function isObject(o) {
  return isPlainObject(o);
}

function isEmptyObject(o) {
  return isPlainObject(o) && Object.keys(o).length === 0;
}

function isFullObject(o) {
  return isPlainObject(o) && Object.keys(o).length > 0;
}

function isObjectLike(o) {
  return isAnyObject(o);
}

function isFunction(o) {
  return getType(o) === 'function';
}

function isRegexp(o) {
  return getType(o) === 'regexp';
}

function isArguments(o) {
  return getType(o) === 'arguments';
}

function isArray(o) {
  return getType(o) === 'array';
}

function isEmptyArray(o) {
  return isArray(o) && o.length === 0;
}

function isFullArray(o) {
  return isArray(o) && o.length > 0;
}

function isNumber(o) {
  return getType(o) === 'number';
}

function isElement(o) {
  return isObjectLike(o) && o.nodeType === 1;
}

function isNull(o) {
  return getType(o) === 'null';
}

function isString(o) {
  return getType(o) === 'string';
}

function isEmptyString(o) {
  return o === '';
}

function isFullString(o) {
  return isString(o) && o !== '';
}

function isBoolean(o) {
  return getType(o) === 'boolean';
}

function isUndefined(o) {
  return getType(o) === 'undefined';
}

function isMap(o) {
  return getType(o) === 'map';
}

function isWeakMap(o) {
  return getType(o) === 'weakmap';
}

function isSet(o) {
  return getType(o) === 'set';
}

function isWeakSet(o) {
  return getType(o) === 'weakset';
}

function isSymbol(o) {
  return getType(o) === 'symbol';
}

function isDate(o) {
  return getType(o) === 'date' && !isNaN(o);
}

function isBlob(o) {
  return getType(o) === 'blob';
}

function isFile(o) {
  return getType(o) === 'file';
}

function isPromise(o) {
  return getType(o) === 'promise';
}

function isError(o) {
  return getType(o) === 'error';
}

function isNaNValue(o) {
  return getType(o) === 'number' && isNaN(o);
}

var isNullOrUndefined = isOneOf(isNull, isUndefined);
exports.isNullOrUndefined = isNullOrUndefined;
var isPrimitive = isOneOf(isBoolean, isNull, isUndefined, isNumber, isString, isSymbol);
exports.isPrimitive = isPrimitive;