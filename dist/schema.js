"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.oneOf = oneOf;
exports.or = or;
exports.and = and;
exports.filter = filter;

var _index = require("./index");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
    if ((0, _index.isPrimitive)(type)) {
      return value === type;
    }

    if (isValidationFunction(type)) {
      return type(value);
    }

    return (0, _index.isType)(value, type);
  };
};

function oneOf() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return wrapper(function (value) {
    return args.some(function (type) {
      return value === type;
    });
  });
}

function or() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return wrapper(function (value) {
    return args.some(inner(value));
  });
}

function and() {
  for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
  }

  return wrapper(function (value) {
    return args.every(inner(value));
  });
}

function filter(object, schema) {
  /**
   *
   * @type {[[]]}
   */
  var result = Object.entries(schema).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        prop = _ref2[0],
        type = _ref2[1];

    if ((0, _index.isUndefined)(object)) {
      return null;
    }

    if ((0, _index.isPrimitive)(type)) {
      if (object[prop] === type) {
        return [prop, object[prop]];
      } else {
        return null;
      }
    }

    if (isValidationFunction(type)) {
      if (type(object[prop], prop)) {
        return [prop, object[prop]];
      } else {
        return null;
      }
    }

    if (isTypeObject(type)) {
      if ((0, _index.isType)(object[prop], type)) {
        return [prop, object[prop]];
      } else {
        return null;
      }
    }

    if ((0, _index.isObject)(type)) {
      return [prop, filter(object[prop], schema[prop])];
    }

    return null;
  }).filter(function (i) {
    return i;
  });
  return Object.fromEntries(result);
}