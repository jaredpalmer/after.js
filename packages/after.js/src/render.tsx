import { renderApp } from './renderApp';
import { AfterRenderOptions } from './types';

type TRender = <T>(params: AfterRenderOptions<T>) => Promise<string>;

export const render: TRender = async params => {
  const { res } = params;
  const { redirect, statusCode, html } = await renderApp({
    ...params,
    ssg: false,
  });

  if (redirect) {
    res.redirect(statusCode, redirect);
  }

  res.status(statusCode);

  return html;
};
