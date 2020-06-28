import { matchPath } from 'react-router-dom';
import { AsyncRouteProps } from './types';
import { isLoadableComponent } from './utils';

/**
 * This helps us to make sure all the async code is loaded before rendering.
 */
export async function ensureReady(
  routes: AsyncRouteProps[],
  pathname?: string
) {
  let resolved = false

  const data = window.__SERVER_APP_STATE__
  const { requiredChunks } = data.afterData

  return new Promise(resolve => {
    window.webpackJsonp = window.webpackJsonp || []
    const loadedChunks = window.webpackJsonp
    const originalPush = loadedChunks.push.bind(loadedChunks)

    function checkReadyState() {
      if (
        requiredChunks.every(chunk =>
          loadedChunks.some(([chunks]: string[]) => chunks.indexOf(chunk) > -1),
        )
      ) {

        if (!resolved) {
          resolved = true

          Promise.all(routes
            .filter(route => {
              const match = matchPath(pathname || window.location.pathname, route);
              return (
                match &&
                route &&
                route.component &&
                isLoadableComponent(route.component) &&
                route.component.load
              )
            })
            .map(route => {
              // @ts-ignore
              route.component.load();
            }))
            .then(() => resolve(data))
        }
      }
    }

    loadedChunks.push = (...args: string[][]) => {
      const length = originalPush(...args)
      checkReadyState()
      return length
    }

    checkReadyState()
  })
}