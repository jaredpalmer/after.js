import { getAssetsParams } from './types';
import { isLoadableComponent } from './utils';
// @ts-ignore
import logger from 'razzle-dev-utils/logger';

export function getAssets({ route, manifest }: getAssetsParams) {
  let scripts: string[] = [];
	let styles: string[] = [];
	
	if (!route) {
		return { scripts, styles };
	}

  // if component was LoadableComponent and chunkName was undefined
  // print an error message to console so Developer can fix it
  // @todo add link to documentation or show more useful error message
  if (isLoadableComponent(route.component) && route.chunkName === undefined) {
    logger.error(errorMeesage);
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

  return { scripts, styles };
}

export const errorMeesage = `all async routes must have a chunkName property with value of /* webpackChunkName: "MyChunkName" */ check your routes config or use babel-plugin-after-async-component`;
