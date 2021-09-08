"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.merge = merge;
exports.oneOf = oneOf;
exports.or = or;
exports.and = and;
exports.arrayOf = arrayOf;
exports.filter = filter;

var _type = require("./type");

var propertyCheck = '_$validation$_';

var isTypeObject = function isTypeObject(t) {
  return Object.prototype.hasOwnProperty.call(t, 'prototype');
};

var isValidationFunction = function isValidationFunction(t) {
  return Object.prototype.hasOwnProperty.call(t, propertyCheck);
};

var wrapper = function wrapper(cb) {
  cb[propertyCheck] = true;
  return cb;
};

var inner = function inner(value) {
  return function (type) {
    if ((0, _type.isPrimitive)(type)) {
      return value === type;
    }

    if (isValidationFunction(type)) {
      return type(value);
    }

    return (0, _type.isFunction)(type) && (0, _type.isType)(value, type);
  };
};

var outer = function outer(type) {
  return function (value) {
    if ((0, _type.isPrimitive)(type)) {
      return value === type;
    }

    if (isValidationFunction(type)) {
      return type(value);
    }

    return (0, _type.isFunction)(type) && (0, _type.isType)(value, type);
  };
};

function merge(target) {
  for (var _len = arguments.length, list = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    list[_key - 1] = arguments[_key];
  }

  for (var _i = 0, _Object$keys = Object.keys(list); _i < _Object$keys.length; _i++) {
    var index = _Object$keys[_i];
    var source = list[index];

    for (var _i2 = 0, _Object$keys2 = Object.keys(source); _i2 < _Object$keys2.length; _i2++) {
      var key = _Object$keys2[_i2];
      if (source[key] instanceof Object) Object.assign(source[key], merge(target[key], source[key]));
    }

    Object.assign(target || {}, source);
  }

  return target;
}

function oneOf() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  var result = false;
  return wrapper(function (value) {
    return args.some(function (type) {
      return value === type;
    });
  });
}

function or() {
  for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
  }

  var result = false;
  return wrapper(function (value) {
    return args.some(inner(value));
  });
}

function and() {
  for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    args[_key4] = arguments[_key4];
  }

  var result = false;
  return wrapper(function (value) {
    return args.every(inner(value));
  });
}

function arrayOf(type) {
  return wrapper(function (value) {
    return (0, _type.isFullArray)(value) && value.every(outer(type));
  });
}

function filter(object, schema, arrayLike) {
  var result = arrayLike ? [] : {};

  for (var _i3 = 0, _Object$keys3 = Object.keys(schema); _i3 < _Object$keys3.length; _i3++) {
    var prop = _Object$keys3[_i3];
    var type = schema[prop];

    if ((0, _type.isUndefined)(object)) {
      continue;
    }

    if ((0, _type.isPrimitive)(type)) {
      if (object[prop] === type) {
        result[prop] = object[prop];
      } else {
        continue;
      }
    }

    if (isValidationFunction(type)) {
      if (type(object[prop], prop)) {
        result[prop] = object[prop];
      } else {
        continue;
      }
    }

    if (isTypeObject(type)) {
      if ((0, _type.isType)(object[prop], type)) {
        result[prop] = object[prop];
      } else {
        continue;
      }
    }

    if ((0, _type.isFullArray)(type) && (0, _type.isFullArray)(object[prop])) {
      if (type.length === object[prop].length) {
        result[prop] = filter(object[prop], schema[prop], true);
      } else {
        continue;
      }
    }

    if ((0, _type.isFullObject)(type)) {
      result[prop] = filter(object[prop], schema[prop]);
    }
  }

  return result;
}