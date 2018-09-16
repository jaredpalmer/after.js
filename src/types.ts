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

export interface AfterRouteComponentState {
  Component: AfterRouteableComponent | null;
}

export interface AfterComponent {
  getInitialProps: (props: Ctx<any>) => any;
  load?: () => Promise<React.ReactNode>;
}

export interface AfterRouteComponent<Props = {}>
  extends AfterComponent,
    React.Component<DocumentProps & Props, AfterRouteComponentState> {}

export type AfterRouteComponentType<Props> =
  | React.ComponentClass<Props> & AfterComponent
  | React.StatelessComponent<Props> & AfterComponent;

export type AfterRouteableComponent<Props = any> =
  | AfterRouteComponentType<RouteComponentProps<Props>>
  | React.ComponentType<RouteComponentProps<Props>>
  | React.ComponentType<Props>;

export interface AfterRouteProps<Props = any> extends RouteProps {
  component: AfterRouteableComponent<Props>;
  redirectTo?: string;
}

export interface InitialProps {
  match?: AfterRouteProps;
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
