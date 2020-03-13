import { StaticRouterContext } from 'react-router';

export interface AfterRedirectOrSetStatusCodeOptions {
  initialData: any[];
  context: StaticRouterContext;
}

export const redirectOrSetStatusCode = ({
  initialData,
  context,
}: AfterRedirectOrSetStatusCodeOptions) => {
  let result = { statusCode: 200, redirectTo: '' };
  initialData.map(data => {
    if (data) {
      const { redirectTo, statusCode } = initialData as {
        statusCode?: number;
        redirectTo?: string;
      };

      if (statusCode) {
        context.statusCode = statusCode;
      }

      if (redirectTo) {
        result = { statusCode: statusCode || 302, redirectTo };
        return;
      }
    }
  });
  return result;
};
