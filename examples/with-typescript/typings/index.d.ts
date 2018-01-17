declare module '*.svg' {
  const content: any;
  export default content;
}

declare module '*.css' {
  const content: any;
  export default content;
}

declare module '@jaredpalmer/after' {
  import { RouteComponentProps } from 'react-router-dom';
  export type AfterProps<P> = RouteComponentProps<P> &
    P & {
      /** Imperatively call getInitialProps again */
      refetch: (props: P) => void;
      /** Imperatively prefetch a path */
      prefetch: (pathname: string) => void;
    };
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
