import { renderApp } from './renderApp';
import { AfterRenderOptions } from './types';

export const render = async <T extends any>(
  params: Omit<AfterRenderOptions<T>, 'ssg'>
) => {
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
