import {
  AsyncRouteableComponent,
  AsyncRouteComponentType,
  AsyncRouteProps,
  TransitionBehavior,
} from './types';
import NotFoundComponent from './NotFoundComponent';

/** @private is the given object a Function? */
export const isFunction = (obj: any) => 'function' === typeof obj;

/** @private is the given object an Object? */
export const isObject = (obj: any) => obj !== null && typeof obj === 'object';

/** @private is the given object/value a promise? */
export const isPromise = (value: any): boolean =>
  isObject(value) && isFunction(value.then);

/** @private we render on client? */
export const isDOM = (): boolean =>
  typeof window === 'object' && typeof window.document === 'object';

/** @private we render on server? */
export const isServer = (): boolean => !isDOM();

/** @private Guard cluase to narrow the AsyncRouteableComponent union type on getInitialProps */
export function isAsyncComponent(
  Component: AsyncRouteableComponent
): Component is AsyncRouteComponentType<any> {
  return (
    (Component as AsyncRouteComponentType<any>).getInitialProps !== undefined
  );
}

/** @private Guard cluase to narrow the AsyncRouteableComponent union type on load */
export function isLoadableComponent(
  Component: AsyncRouteableComponent
): Component is AsyncRouteComponentType<any> {
  return (Component as AsyncRouteComponentType<any>).load !== undefined;
}

/** @private is given routes array have a 404 page?  */
export function is404ComponentAvailable(
  routes: AsyncRouteProps<any>[]
): AsyncRouteProps<any> | false {
  return (
    routes.find(route => ['**', '*', '', undefined].includes(route.path)) ||
    false
  );
}

/** @private Returns 404Component from given routes if component was not avaliable returns default 404component */
export function get404Component(
  routes: AsyncRouteProps<any>[]
): AsyncRouteableComponent<any> {
  const match = is404ComponentAvailable(routes);
  return match ? match.component : NotFoundComponent;
}

/** @private Checks if 404Component is in routes, if it's not available add default 404 component */
export function getAllRoutes(
  routes: AsyncRouteProps<any>[]
): AsyncRouteProps<any>[] {
  return is404ComponentAvailable(routes)
    ? routes
    : [...routes, { component: NotFoundComponent }];
}

/** @private Checks if given string ends with ".js" */
export function isJS(str: string) {
  return str.endsWith('.js');
}

/** @private Checks if given transition type is instant */
export function isInstantTransition(transition: TransitionBehavior) {
  return transition === 'instant';
}

/** @private Strips basename from the given URL so that matchPath can use it normally outside the router context */
export function stripBasename(location?: string, basename?: string): any {
  if (!basename || !location) return location;

  if (location.indexOf(basename) !== 0) return location;

  return location.substr(basename.length) || '/';
}
