import App from 'next/app'
import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import withApolloClient from '../../shared/graphQL/withApolloClient'
import { DefaultSeo } from 'next-seo'
import './empty.css'

import defaultSEOPropsConfigs from 'shared/nextSEODefault.config'

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
