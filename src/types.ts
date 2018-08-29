import { RouteProps, RouteComponentProps, match as Match } from 'react-router-dom';
import { HelmetData} from 'react-helmet';
import {Request, Response} from 'express';

export interface DocumentProps {
  req: Request;
  res: Response;
  helmet: HelmetData;
  assets: Assets;
  data: Promise<any>[];
  renderPage: () => Promise<any>;
  match: Match<any> | null;
}

export interface AsyncRouteComponent {
  getInitialProps: ({ assets, data, renderPage }: DocumentProps) => any;
  load: () => Promise<React.ReactNode>;
}

export type AsyncRouteableComponent<Props = any> =
| React.ComponentType<RouteComponentProps<Props>> & AsyncRouteComponent
| React.ComponentType<any> & AsyncRouteComponent;

export interface AsyncRouteProps<Props = any> extends RouteProps {
  component: AsyncRouteableComponent<Props>;
  redirectTo?: string;
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
