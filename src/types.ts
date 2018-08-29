import { RouteProps, RouteComponentProps } from 'react-router-dom';
import { HelmetData} from 'react-helmet';

export interface DocumentProps {
  helmet: HelmetData;
  assets: Assets;
  data: Promise<any>[];
  renderPage: () => Promise<any>;
}

export interface RouteComponent {
  getInitialProps: ({ assets, data, renderPage }: DocumentProps) => any;
  load: () => Promise<React.ReactNode>;
}

export type AsyncRouteableComponent<Props = any> =
| React.ComponentType<RouteComponentProps<Props>> & RouteComponent
| React.ComponentType<any> & RouteComponent;

export interface AsyncRouteProps<Props = any> extends RouteProps {
  component: AsyncRouteableComponent<Props>;
  redirectTo: string;
}

export interface InitialProps {
  match?: AsyncRouteProps;
  data: Promise<any>[];
}

export type Module<P> =
| {
    default?: P;
    [x: string]: any;
  }
| {
    exports?: P;
    [x: string]: any;
  };

export interface Assets {
  [name: string]: {
      [ext: string]: string;
  };
}
