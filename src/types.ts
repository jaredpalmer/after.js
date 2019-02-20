import { match as Match } from 'react-router-dom';
import { RouteConfig, RouteConfigComponentProps } from 'react-router-config';
import { HelmetData } from 'react-helmet';
import { Request, Response } from 'express';
import { IncomingMessage, ServerResponse } from 'http';
import { History, Location } from 'history';

export interface DocumentProps {
  req: Request;
  res: Response;
  helmet: HelmetData;
  assets: Assets;
  data: Promise<any>[];
  renderPage: () => Promise<any>;
  match: Match<any> | null;
}

export interface CtxBase {
  req?: IncomingMessage;
  res?: ServerResponse;
  history?: History;
  location?: Location;
}
export interface Ctx<P> extends CtxBase {
  match: Match<P>;
}

export interface AsyncRouteComponentState {
  Component: AsyncRouteableComponent | null;
}

export interface AsyncComponent {
  getInitialProps: (props: Ctx<any>) => any;
  load?: () => Promise<React.ReactNode>;
}

export interface AsyncRouteComponent<Props = {}>
  extends AsyncComponent,
    React.Component<DocumentProps & Props, AsyncRouteComponentState> {}

export type AsyncRouteComponentType<Props = any> =
  | React.ComponentClass<Props> & AsyncComponent
  | React.StatelessComponent<Props> & AsyncComponent;

export type AsyncRouteableComponent<Props = any> =
  | AsyncRouteComponentType<RouteConfigComponentProps<Props>>
  | React.ComponentType<RouteConfigComponentProps<Props>>
  | React.ComponentType;

export interface AsyncRouteProps<Props = any> extends RouteConfig {
  component: AsyncRouteableComponent<Props>;
  redirectTo?: string;
}

export interface InitialProps {
  route?: AsyncRouteProps;
  match: Match<{}> | null,
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
