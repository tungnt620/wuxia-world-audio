const path = require('path')
require('dotenv').config()
const css = require('@zeit/next-css')
const sass = require('@zeit/next-sass')
const optimizedImages = require('next-optimized-images')
const fonts = require('next-fonts')
const size = require('next-size')
const withPlugins = require('next-compose-plugins')
const env = process.env.NODE_ENV
const pathPrefix = ''
const environment = {
  development: {
    API_BASE_URL: 'http://localhost:4002/',
  },
  production: {
    API_BASE_URL: 'https://audiocuatui.com/api/',
  },
}[env]
const nextConfiguration = {
  env: environment,
  assetPrefix: pathPrefix,
  webpack: (config, { dev, isServer }) => {

    // For load media files
    let testPattern = /\.(mp3|wav|mp4|ogg|webm)$/
    config.module.rules.push({
      test: testPattern,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 8192,
            fallback: 'file-loader',
            publicPath: `${pathPrefix}/_next/static/audios/`,
            outputPath: `${isServer ? '../' : ''}static/audios/`,
            name: '[name]-[hash].[ext]'
          }
        }
      ]
    })

    // For relative import ( must add babel-plugin-root-import to .babelrc file)
    config.resolve.modules.push(path.resolve('./'))

    // Make nextjs don't convert to css module for antd
    // css of antd must keep original class name
    if (isServer) {
      const antStyles = /antd-mobile\/.*?\/style.*?/
      const origExternals = [...config.externals]
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback()
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback)
          } else {
            callback()
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals)
      ]

      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader'
      })
    }

    return config
  }
}

module.exports = withPlugins(
  [
    optimizedImages,
    sass,
    css,
    [fonts, { assetPrefix: pathPrefix }],
    size, // For print size of files when build
  ],
  nextConfiguration
)
