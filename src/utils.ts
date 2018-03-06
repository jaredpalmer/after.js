/** @private is the given object a Function? */
export const isFunction = (obj: any) => 'function' === typeof obj;

/** @private is the given object an Object? */
export const isObject = (obj: any) => obj !== null && typeof obj === 'object';

/** @private is the given object/value a promise? */
export const isPromise = (value: any): boolean =>
  isObject(value) && isFunction(value.then);