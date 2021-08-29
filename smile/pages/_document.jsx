import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="description"
            content="Smile is an Instagram-like social network. You can create a profile and share your photos and videos with other people!"
          />
          <meta
            name="keywords"
            content="Smile, Smile social network, smile, social network, social, media, smile social network, social media, instagram, instagram-like network, instagram-like media, smile instagram, instagram"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
