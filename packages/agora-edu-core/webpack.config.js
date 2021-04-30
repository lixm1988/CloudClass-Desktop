const threadLoader = require('thread-loader');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// const config = require('dotenv').config().parsed

const path = require('path');

// const isProd = true
const isProd = process.env.NODE_ENV === 'production'

const packageInfo = require('./package.json')

const babelConfig = packageInfo.babel

console.log(`run edu-core webpack isProd ${isProd}, NODE_ENV: ${process.env.NODE_ENV}`)

module.exports = {
  entry: {
    ['agora-edu-core']: './src/index.ts',
  },
  mode: isProd ? 'production' : 'development',
  output: {
    publicPath: '',
    // filename: '[name].js',
    filename: 'index.js',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'lib'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              ...babelConfig,
              // presets: [
              //   '@babel/preset-env',
              //   '@babel/preset-typescript'
              // ],
              // plugins: [
              //   ['@babel/plugin-proposal-decorators', { legacy: true }],
              //   ['@babel/plugin-proposal-class-properties', { loose: true }],
              //   ['@babel/plugin-transform-runtime', { regenerator: true }],
              // ],
            }
          }
        ],
        exclude: /node_modules/,
      },
      // fix: https://github.com/gildas-lormeau/zip.js/issues/212#issuecomment-769766135
      {
        test: /\.js$/,
        loader: require.resolve('@open-wc/webpack-import-meta-loader'),
      }
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
          parallel: require('os').cpus().length,
      })
    ]
},
  plugins: [
    // new webpack.DefinePlugin({
    //   REACT_APP_AGORA_RECORDING_OSS_URL: JSON.stringify(config.REACT_APP_AGORA_RECORDING_OSS_URL),
    //   REACT_APP_AGORA_GTM_ID: JSON.stringify(config.REACT_APP_AGORA_GTM_ID),
    //   REACT_APP_BUILD_VERSION: JSON.stringify(config.REACT_APP_BUILD_VERSION),
    //   REACT_APP_NETLESS_APP_ID: JSON.stringify(config.REACT_APP_NETLESS_APP_ID),
    //   REACT_APP_AGORA_APP_ID: JSON.stringify(config.REACT_APP_AGORA_APP_ID),
    //   REACT_APP_AGORA_CUSTOMER_ID: JSON.stringify(config.REACT_APP_AGORA_CUSTOMER_ID),
    //   REACT_APP_AGORA_CUSTOMER_CERTIFICATE: JSON.stringify(config.REACT_APP_AGORA_CUSTOMER_CERTIFICATE),
    //   REACT_APP_AGORA_APP_TOKEN: JSON.stringify(config.REACT_APP_AGORA_APP_TOKEN),
    //   REACT_APP_AGORA_LOG: JSON.stringify(config.REACT_APP_AGORA_LOG),

    //   REACT_APP_AGORA_APP_SDK_DOMAIN: JSON.stringify(config.REACT_APP_AGORA_APP_SDK_DOMAIN),
    //   REACT_APP_YOUR_OWN_OSS_BUCKET_KEY: JSON.stringify(''),
    //   REACT_APP_YOUR_OWN_OSS_BUCKET_SECRET: JSON.stringify(''),
    //   REACT_APP_YOUR_OWN_OSS_BUCKET_NAME: JSON.stringify(''),
    //   REACT_APP_YOUR_OWN_OSS_CDN_ACCELERATE: JSON.stringify(''),
    //   REACT_APP_YOUR_OWN_OSS_BUCKET_FOLDER: JSON.stringify(''),
    //   // 'process': 'utils'
    // }),
    new HardSourceWebpackPlugin({
      root: process.cwd(),
      directories: [],
      environmentHash: {
        root: process.cwd(),
        directories: [],
        files: [
          'package.json',
          'package-lock.json',
          'yarn.lock',
          '.env',
          '.env.local',
          'env.local',
          'config-overrides.js',
          'webpack.config.js',
          'tsconfig.json',
        ],
      }
    })
  ],
  externals: {
    'white-web-sdk': 'white-web-sdk',
    'react': 'react',
    'react-dom': 'react-dom',
    'dayjs': 'dayjs'
  }
};