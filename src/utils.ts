import { AfterRouteableComponent, AfterRouteComponentType } from "./types";

/** @private is the given object a Function? */
export const isFunction = (obj: any) => 'function' === typeof obj;

/** @private is the given object an Object? */
export const isObject = (obj: any) => obj !== null && typeof obj === 'object';

/** @private is the given object/value a promise? */
export const isPromise = (value: any): boolean =>
  isObject(value) && isFunction(value.then);

/** @private Guard cluase to narrow the AfterRouteableComponent union type on getInitialProps */
export function isAfterComponent(Component: AfterRouteableComponent): Component is AfterRouteComponentType<any> {
  return (<AfterRouteComponentType<any>>Component).getInitialProps !== undefined;
}

/** @private Guard cluase to narrow the AfterRouteableComponent union type on load */
export function isLoadableComponent(Component: AfterRouteableComponent): Component is AfterRouteComponentType<any> {
  return (<AfterRouteComponentType<any>>Component).load !== undefined;
}
