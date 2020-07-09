import { Logo } from 'components/logo';

export default {
  github: 'https://github.com/jaredpalmer/after.js',
  titleSuffix: ' – After',
  logo: (
    <>
      <Logo height={22} />
      <span className=" font-extrabold hidden md:inline sr-only">After</span>
      <span className="mx-3 text-gray-600 font-normal hidden md:inline whitespace-no-wrap">
        Next.js-like framework for server-rendered React apps built with
        <em> React Router</em>.
      </span>
    </>
  ),
  head: () => (
    <>
      {/* Favicons, meta */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />

      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en" />
      <meta
        name="description"
        content="Next.js-like framework for server-rendered React apps built with React Router."
      />
      <meta
        name="og:description"
        content="Next.js-like framework for server-rendered React apps built with React Router."
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@jaredpalmer" />
      <meta name="twitter:image" content="https://afterjs.org/og_image.png" />
      <meta
        name="og:title"
        content="After: if React Router and Next.js had a baby."
      />
      <meta name="og:url" content="https://afterjs.org" />
      <meta name="og:image" content="https://afterjs.org/og_image.png" />
      <meta name="apple-mobile-web-app-title" content="After" />
      {/* <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.css"
        media="print"
        onload="this.media='all'"
      /> */}
    </>
  ),
  footer: ({ filepath }) => (
    <>
      <div className="mt-24 flex justify-between flex-col-reverse md:flex-row items-center md:items-end">
        <a
          href="https://jaredpalmer.com/?utm_source=after.js"
          target="_blank"
          rel="noopener"
          className="inline-flex items-center no-underline text-current font-semibold"
        >
          <span className="mr-1">A Jared Palmer Project</span>
        </a>
        <div className="mt-6" />
        <a
          className="text-sm"
          href={
            'https://github.com/jaredpalmer/after.js/tree/master/website/pages' +
            filepath
          }
          target="_blank"
          rel="noopener"
        >
          Edit this page on GitHub
        </a>
      </div>
    </>
  ),
};
