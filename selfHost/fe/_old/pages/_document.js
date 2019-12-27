import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps (ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render () {
    return (
      <Html>
        <Head>
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no'
          />
          <link rel='dns-prefetch' href='//fonts.googleapis.com'/>
          <link rel='dns-prefetch' href='//s.w.org'/>
          <link
            rel='stylesheet' id='ct-apex-google-fonts-css'
            href='//fonts.googleapis.com/css?family=Open+Sans%3A400%2C700%7CSatisfy&#038;subset=latin%2Clatin-ext&#038;ver=4.9.7'
            type='text/css' media='all'
          />
          <script dangerouslySetInnerHTML={{__html:`
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
              })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
              ga('create', 'UA-102911661-1', 'auto');
              ga('send', 'pageview');
          `}}>
          </script>
          <meta name="google-site-verification" content="CK5nwFZ2WpMOtJOJ1X590SvWrzQCZHByEkjFq5Gk6cI"/>
        </Head>

        <body>
        <Main/>
        <NextScript/>
        </body>
      </Html>
    )
  }
}

export default MyDocument
