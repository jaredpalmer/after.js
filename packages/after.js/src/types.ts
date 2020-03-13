import { RouteComponentProps, match as Match } from 'react-router-dom';
import {
  RouteConfig,
  MatchedRoute,
  RouteConfigComponentProps,
} from 'react-router-config';
import { HelmetData } from 'react-helmet';
import { Request, Response } from 'express';
import { History, Location } from 'history';

export interface Redirect {
  redirectTo: string;
}
export interface StatusCode {
  statusCode: number;
}

export type InitialData = any[];
export type ScrollToTop = React.RefObject<boolean>;

export interface ServerAppState {
  afterData: AfterClientData;
  initialData: InitialData;
}

export interface AfterClientData {
  scrollToTop: ScrollToTop;
}

export interface renderPageResult {
  html: string;
  helmet: HelmetData;
}

export interface DocumentgetInitialProps<T = renderPageResult> {
  req: Request;
  res: Response;
  data: ServerAppState;
  renderPage: () => Promise<T>;
  branch: MatchedRoute<any>[];
  scripts: string[];
  styles: string[];
  scrollToTop: ScrollToTop;
  chunks: Chunks;
}

export type DocumentProps<T = renderPageResult> = Omit<
  DocumentgetInitialProps<T>,
  'req' | 'res' | 'renderPage' | 'scrollToTop'
> &
  T;

export type AfterContext = DocumentProps;

export interface CtxBase {
  req?: Request;
  res?: Response;
  history?: History;
  location?: Location;
  scrollToTop?: ScrollToTop;
}
export interface Ctx<P> extends CtxBase {
  match: Match<P>;
}

export interface AsyncComponent {
  getInitialProps: (props: Ctx<any>) => any;
  load?: () => Promise<React.ReactNode>;
  getChunkName: () => string | undefined;
}

export type AsyncRouteComponentType<Props> = React.ComponentType<Props> &
  AsyncComponent;

export type AsyncRouteableComponent<Props = any> =
  | AsyncRouteComponentType<RouteComponentProps<Props>>
  | React.ComponentType<RouteComponentProps<Props>>
  | React.ComponentType<Props>;

export interface AsyncRouteComponentState {
  Component: AsyncRouteableComponent | null;
}

export interface AsyncRouteComponent<Props = {}>
  extends AsyncComponent,
    React.Component<DocumentProps & Props, AsyncRouteComponentState> {}

export type AfterRouteConfig = Omit<RouteConfig, 'routes'> & {
  routes?: AsyncRouteConfig[];
};

export interface AsyncRouteConfig<Props = any> extends AfterRouteConfig {
  Placeholder?: React.ComponentType<any>;
  component: AsyncRouteableComponent<RouteConfigComponentProps<Props>>;
}

export interface InitialProps {
  data: InitialData;
  branch: MatchedRoute<any>[];
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

export interface Chunks {
  [key: string]: {
    css: string[];
    js: string[];
  };
}

export interface getAssetsParams {
  chunks: Chunks;
  branch: MatchedRoute<any>[];
}

export interface AfterpartyProps extends RouteComponentProps<any> {
  history: History;
  location: Location;
  data: ServerAppState;
  routes: AsyncRouteConfig[];
  match: Match<any>;
}

export interface AfterpartyState {
  data?: InitialData;
  previousLocation: Location | null;
  currentLocation: Location | null;
}
