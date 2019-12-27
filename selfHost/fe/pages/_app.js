import App from 'next/app'
import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import withApolloClient from '../shared/graphQL/withApolloClient'
import { DefaultSeo } from 'next-seo'
// have bug, if haven't this import, page will be can't goto link after a time page un interact
import './empty.css'

import defaultSEOPropsConfigs from '../shared/nextSEODefaultConfig'

class MyApp extends App {
  render () {
    const { Component, pageProps, apolloClient } = this.props
    return (
      <ApolloProvider client={apolloClient}>
        <DefaultSeo {...defaultSEOPropsConfigs}/>
        <Component {...pageProps} />
      </ApolloProvider>
    )
  }
}

export default withApolloClient(MyApp)
