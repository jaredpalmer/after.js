import { GetAssetsParams } from './types';
import { isLoadableComponent } from './utils';
// @ts-ignore
import logger from 'razzle-dev-utils/logger';

export const errorMeesage = `all async routes must have a chunkName property with value of /* webpackChunkName: "MyChunkName" */ check your routes config or use babel-plugin-after`;

export function getAssets({ route, chunks }: GetAssetsParams) {
  let scripts: string[] = [];
  let styles: string[] = [];

  // if route.component is not an asyncComponent
  // it's assets (JS and CSS files) will go into the
  // main bundle.js and bundle.css ...
  if (!route || !isLoadableComponent(route.component)) {
    return { scripts, styles };
  }

  const chunkName = route.component.getChunkName();

  // if component was LoadableComponent and chunkName was undefined
  // print an error message to console so Developer can fix it
  // todo add link to documentation or show more useful error message
  if (chunkName === undefined) {
    logger.error(errorMeesage);
    throw new Error();
  }

  // we look for component assets from chunks.json
  if (chunks[chunkName] && chunks[chunkName].js) {
    scripts = chunks[chunkName].js;
  }

  if (chunks[chunkName] && chunks[chunkName].css) {
    styles = chunks[chunkName].css;
  }

  return { scripts, styles };
}
