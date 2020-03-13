import { getAssetsParams } from './types';
import { isLoadableComponent } from './utils';
// @ts-ignore
import logger from 'razzle-dev-utils/logger';

export function getAssets({ branch, chunks }: getAssetsParams) {
  let scripts: string[] = [];
  let styles: string[] = [];

  branch.forEach(({ route }) => {
    // if component was LoadableComponent and chunkName was undefined
    // print an error message to console so Developer can fix it
    // @todo add link to documentation or show more useful error message
    if (!route.component) return;

    if (
      isLoadableComponent(route.component) &&
      route.component.getChunkName() === undefined
    ) {
      logger.error(errorMeesage);
      throw new Error(errorMeesage);
    }

    // if component was LoadableComponent
    // we look for it's assets from chunks.json
    if (isLoadableComponent(route.component)) {
      const chunkName = route.component.getChunkName()!;

      if (chunks[chunkName] && chunks[chunkName].js) {
        scripts.push(...chunks[chunkName].js);
      }

      if (chunks[chunkName] && chunks[chunkName].css) {
        styles.push(...chunks[chunkName].css);
      }
    }
  });

  return { scripts, styles };
}

export const errorMeesage =
  `all async routes must have a chunkName` +
  `property with value of /* webpackChunkName: "MyChunkName" */` +
  `check your routes config or use babel-plugin-after`;
