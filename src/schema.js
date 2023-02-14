import {isType, isPlainObject, isFullArray, isUndefined, isFullObject, isFunction, isPrimitive, isArray} from "./type";

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
        return isFunction(type) && isType(value, type);
    }
}

const outer = (type) => {
    return (value) => {
        if (isPrimitive(type)) {
            return value === type;
        }
        if (isValidationFunction(type)) {
            return type(value);
        }
        return isFunction(type) && isType(value, type);
    }
}

export function merge(target, ...list) {
    for (const index of Object.keys(list)) {
        const source = list[index];
        for (const key of Object.keys(source)) {
            const value = source[key]
            if (isPlainObject(value)) {
                target[key] = merge(target[key] || {}, value);
            } else if(isArray(value)) {
                target[key] = merge(target[key] || [], value);
            } else {
                target[key] = value;
            }
        }
    }
    return target;
}

export function oneOf(...args) {
    let result = false;
    return wrapper((value) => {
        return args.some((type) => {
            return value === type;
        });
    })
}

export function or(...args) {
    let result = false;
    return wrapper((value) => {
        return args.some(inner(value));
    })
}

export function and(...args) {
    let result = false;
    return wrapper((value) => {
        return args.every(inner(value));
    })
}

export function arrayOf(type) {
    return wrapper((value) => {
        return isFullArray(value) && value.every(outer(type));
    })
}

export function filter(object, schema, arrayLike) {
    let result = arrayLike ? [] : {};
    for(let prop of Object.keys(schema)){
        let type  = schema[prop];
        if (isUndefined(object)) {
            continue;
        }
        if (isPrimitive(type)) {
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
            if (isType(object[prop], type)) {
                result[prop] = object[prop];
            } else {
                continue;
            }
        }
        if(isFullArray(type) && isFullArray(object[prop])){
            if( type.length === object[prop].length){
                result[prop] = filter(object[prop], schema[prop],true);
            } else {
                continue;
            }
        }
        if (isFullObject(type)) {
            result[prop] = filter(object[prop], schema[prop]);
        }
    }
    return result;
}
