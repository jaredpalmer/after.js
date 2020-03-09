import { getAssetsParams } from './types';
import { isLoadableComponent } from './utils';
// @ts-ignore
import logger from 'razzle-dev-utils/logger';

export function getAssets({ route, chunks }: getAssetsParams) {
  let scripts: string[] = [];
  let styles: string[] = [];

  if (!route) {
    return { scripts, styles };
  }

  // if component was LoadableComponent and chunkName was undefined
  // print an error message to console so Developer can fix it
  // @todo add link to documentation or show more useful error message
  if (
    isLoadableComponent(route.component) &&
    route.component.getChunkName() === undefined
  ) {
    logger.error(errorMeesage);
    throw new Error();
  }

  // if component was LoadableComponent
  // we look for it's assets from chunks.json
  if (isLoadableComponent(route.component)) {
    const chunkName = route.component.getChunkName()!;

    if (chunks[chunkName] && chunks[chunkName].js) {
      scripts = chunks[chunkName].js;
    }

    if (chunks[chunkName] && chunks[chunkName].css) {
      styles = chunks[chunkName].css;
    }
  }

  return { scripts, styles };
}

export const errorMeesage = `all async routes must have a chunkName property with value of /* webpackChunkName: "MyChunkName" */ check your routes config or use babel-plugin-after`;
