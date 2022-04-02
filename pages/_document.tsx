// this file allow us to add general structure of the page
import Document, {
  Html, Head, Main, NextScript,
} from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <title>Ecommerce website</title>
          <meta name="author" content="Saddam Arbaa" />
          <meta name="description" content="Saddam ecommerce website" />
          <meta name="description" content="Ecommerce website build with React + Next Js + TypeScript" />
        </Head>
        <body>
          {/* // for add Portal */}
          <div id="portal" />
          <div id="backdrop--root" />
          <div id="modal--overlay--root" />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
