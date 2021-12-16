import { renderApp } from './renderApp';
import { AfterRenderStaticOptions, RenderResult } from './types';

type TRenderStatic = <T extends any>(
  params: AfterRenderStaticOptions<T>
) => Promise<Pick<RenderResult, 'html' | 'data'>>;

export const renderStatic: TRenderStatic = async params => {
  const { redirect, html, data } = await renderApp({ ...params, ssg: true });

  if (redirect) {
    const { url } = params.req;
    throw new Error(
      `You are not allowed to use redirect in ssg mode, URL: ${url}`
    );
  }

  return { html, data };
};
