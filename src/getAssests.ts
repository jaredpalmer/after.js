import { getAssets } from "./types"

export function getAssests({ match, routes, manifest }: getAssets) {
  let scripts: string[] = []
	let styles: string[] = []
	
  if (match) {
		// route can not be null, because it's matched 
    const route = routes.find(item => item.path === match.path)!

    if (route.name) {
      const { name: chunkName } = route

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