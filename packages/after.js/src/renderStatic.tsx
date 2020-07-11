import { renderApp } from './renderApp';
import { AfterRenderStaticOptions } from './types';

export const renderStatic = async <T extends any>(
  params: AfterRenderStaticOptions<T>
) => {
  const { redirect, html, data } = await renderApp({ ...params, ssg: true });

  if (redirect) {
    const { url } = params.req;
    throw new Error(
      `You are not allowed to use redirect in ssg mode, URL: ${url}`
    );
  }

  return { html, data };
};
