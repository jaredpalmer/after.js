import {
  AsyncRouteableComponent,
  AsyncRouteComponentType,
  AsyncRouteProps,
} from './types';
import NotFoundComponent from './NotFoundComponent';

/** @private is the given object a Function? */
export const isFunction = (obj: any) => 'function' === typeof obj;

/** @private is the given object an Object? */
export const isObject = (obj: any) => obj !== null && typeof obj === 'object';

/** @private is the given object/value a promise? */
export const isPromise = (value: any): boolean =>
  isObject(value) && isFunction(value.then);

/** @private Guard cluase to narrow the AsyncRouteableComponent union type on getInitialProps */
export function isAsyncComponent(
  Component: AsyncRouteableComponent
): Component is AsyncRouteComponentType<any> {
  return (
    (<AsyncRouteComponentType<any>>Component).getInitialProps !== undefined
  );
}

/** @private Guard cluase to narrow the AsyncRouteableComponent union type on load */
export function isLoadableComponent(
  Component: AsyncRouteableComponent
): Component is AsyncRouteComponentType<any> {
  return (<AsyncRouteComponentType<any>>Component).load !== undefined;
}

/** @private is given routes have 404 page?  */
export function is404ComponentAvailable(
  routes: AsyncRouteProps<any>[]
): AsyncRouteProps<any> | false {
  return (
    routes.find(route => ['**', '*', undefined].includes(route.path)) || false
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
