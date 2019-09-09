import { getAssets } from './types';
import { isLoadableComponent } from './utils';
// @ts-ignore
import logger from 'razzle-dev-utils/logger';

export function getAssets({ route, manifest }: getAssets) {
  let scripts: string[] = [];
  let styles: string[] = [];

  // if component was isLoadableComponent and chunkName was undefined
  // print an error message to console so Developer can fix it
  // @todo add link to documentation or show more useful error message
  if (process.env.NODE_ENV !== 'production') {
    if (isLoadableComponent(route.component) && route.chunkName === undefined) {
      logger.error(
        `all async routes must have a "chunkName" property with value of /* webpackChunkName: "MyChunkName" */ ${JSON.stringify(
          { chunkName: 'MyChunkName', ...route },
          null,
          2
        )}`
      );
      throw new Error();
    }

    // if component was LoadableComponent and had a chunkName
    // then we look for it's assets from manifest
    if (isLoadableComponent(route.component) && route.chunkName) {
      const { chunkName } = route;

      if (manifest[chunkName] && manifest[chunkName].js) {
        scripts = manifest[chunkName].js;
      }

      if (manifest[chunkName] && manifest[chunkName].css) {
        styles = manifest[chunkName].css;
      }
    }
  }

  return { scripts, styles };
}
