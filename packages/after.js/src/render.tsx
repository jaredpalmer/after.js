import { renderApp } from './renderApp';
import { AfterRenderOptions } from './types';

export const render = async <T extends any>(
  params: AfterRenderOptions<T>
) => {
  const { res, ssg = false } = params;

  const { redirect, statusCode, html, data } = await renderApp({
    ...params,
    ssg,
  });

  if (ssg) {
    if (redirect) {
      const { url } = params.req;
      throw new Error(
        `You are not allowed to use redirect in ssg mode, URL: ${url}`
      );
    }

    return { html, data };
  } else {
    if (redirect) {
      res.redirect(statusCode, redirect);
    }

    res.status(statusCode);

    return html;
  }
};
