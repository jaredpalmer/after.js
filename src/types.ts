import { RouteProps, RouteComponentProps, match as Match } from 'react-router-dom';
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

export type AsyncRouteComponentType<Props> =
  | React.ComponentClass<Props> & AsyncComponent
  | React.StatelessComponent<Props> & AsyncComponent;

export type AsyncRouteableComponent<Props = any> =
  | AsyncRouteComponentType<RouteComponentProps<Props>>
  | React.ComponentType<RouteComponentProps<Props>>
  | React.ComponentType<Props>;

export interface AsyncRouteProps<Props = any> extends RouteProps {
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
