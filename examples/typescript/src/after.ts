// TODO: stricter types and JSDoc 

declare module '@jaredpalmer/after' {
    import { RouteComponentProps } from 'react-router-dom';
    // export interface AfterProps<P = {}> extends RouteComponentProps<P> {
    //     prefetch: (pathname: string) => void;
    //     refetch: (ctx: any) => void;
    // }

    export type AfterProps<P = {}> = RouteComponentProps<P> & P & {
        prefetch: (pathname: string) => void;
        refetch: (ctx: any) => void;
    }
}

declare module '@jaredpalmer/after/asyncComponent' {
    import * as React from 'react';

    export interface AsyncComponentProps {
        loader: () => any;
        Placeholder: any;
    }


    const AsyncComponent: React.StatelessComponent<AsyncComponentProps>;
    export default AsyncComponent;
}
