// this file allow us to add general structure of the page

import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta charSet="utf-8" />
          <meta name="author" content="Saddam Arbaa" />
          <meta name="description" content="Saddam ecommerce website" />
          <meta
            name="description"
            content="Ecommerce website build with React + Next Js + TypeScript"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link
            href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;600;900&display=swap"
            rel="stylesheet"
          />
          <link rel="icon" href="/icons/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
          {/* // for add Portal */}
          <div id="backdrop--root" />
          <div id="modal--overlay--root" />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
