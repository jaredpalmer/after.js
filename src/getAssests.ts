import { getAssets } from "./types"
import { isLoadableComponent } from "./utils"

export function getAssests({ route, manifest }: getAssets) {
  let scripts: string[] = []
	let styles: string[] = []
	
	// @todo add link to documentation or show more useful error message
	if (process.env.NODE_ENV !== "production") {
		if (isLoadableComponent(route.component) && route.chunkName === undefined) {
			throw new Error(
				`all async routes must have a "chunkName" property with value of /* webpackChunkName: "MyChunkName" */ ${JSON.stringify(
					{ chunkName: "MyChunkName", ...route },
					null,
					2
				)}`
			);
		}

    if (route.chunkName) {
      const { chunkName } = route

      if (manifest[chunkName] && manifest[chunkName].js) {
        scripts = manifest[chunkName].js
      }

      if (manifest[chunkName] && manifest[chunkName].css) {
        styles = manifest[chunkName].css
      }
    }
  }

  return { scripts, styles }
}