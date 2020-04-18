import React from 'react';
import { CustomRoute } from '../../types/Routing/Route';
import { asyncComponent, AsyncRouteProps } from '@jaredpalmer/after';
import { getPageByType } from '../pages';
  
export const mapDynamicRoutesWithComponents = (routes: CustomRoute[]): AsyncRouteProps[] => {
    const mappedRoutes: AsyncRouteProps[] = routes.map((route) => {
        return {
            path: route.url,
            exact: true,
            component: asyncComponent({
                loader: getPageByType(route.pageType),
                Placeholder: () => <div>...LOADING...</div>, // this is optional, just returns null by default
            })
        };
    });

    return mappedRoutes;
};