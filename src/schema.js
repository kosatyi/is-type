import {isObject, isPrimitive, isType, isUndefined} from "./index";

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

export function merge(target, ...list) {
    for (const index of Object.keys(list)) {
        const source = list[index];
        for (const key of Object.keys(source)) {
            if (source[key] instanceof Object)
                Object.assign(source[key], merge(target[key], source[key]))
        }
        Object.assign(target || {}, source)
    }
    return target;
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

export function filter(object, schema) {
    /**
     * @name result
     * @type {[[]]}
     */
    const result = Object.entries(schema).map(([prop, type]) => {
        if (isUndefined(object)) {
            return null;
        }
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
            return [prop, filter(object[prop], schema[prop])];
        }
        return null;
    }).filter((i) => i);
    return Object.fromEntries(result);
}
