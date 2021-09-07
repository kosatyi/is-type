import {isObject, isPrimitive, isType} from "./index";

const propertyCheck = '_$validation$_';

const isTypeObject = (t) => Object.prototype.hasOwnProperty.call(t, 'prototype');

const isValidationFunction = (t) => Object.prototype.hasOwnProperty.call(t, propertyCheck);

const wrapper = (cb) => {
    cb[propertyCheck] = true;
    return cb;
}

const inner = (value) => {
    return (type) => {
        if (isPrimitive(type)) {
            return value === type;
        }
        if (isValidationFunction(type)) {
            return type(value);
        }
        return isType(value, type);
    }
}

export function oneOf(...args) {
    return wrapper((value) => {
        return args.some((type) => {
            return value === type;
        });
    })
}


export function or(...args) {
    return wrapper((value) => {
        return args.some(inner(value));
    })
}


export function and(...args) {
    return wrapper((value) => {
        return args.every(inner(value));
    })
}

export function schemaFilter(object, schema) {
    /**
     *
     * @type {[[]]}
     */
    const result = Object.entries(schema).map(([prop, type]) => {
        if (isPrimitive(type)) {
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
            if (isType(object[prop], type)) {
                return [prop, object[prop]];
            } else {
                return null;
            }
        }
        if (isObject(type)) {
            return [prop, schemaFilter(object[prop], schema[prop])];
        }
        return null;
    }).filter((i) => i);
    return Object.fromEntries(result);
}
