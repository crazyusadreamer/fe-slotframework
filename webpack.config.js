const path = require('path')
const { EnvironmentPlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const resolveTsconfigPathsToAlias = require('./resolve-tsconfig-path-to-webpack-alias')

const isProduction = process.env.NODE_ENV === 'production'

const stylesHandler = MiniCssExtractPlugin.loader

const config = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    open: true,
    host: 'localhost',
    port: 3000,
    compress: true,
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: 'src/assets', to: './assets' }],
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),

    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },
    ],
  },
  experiments: {
    topLevelAwait: true,
  },
  resolve: {
    alias: resolveTsconfigPathsToAlias({
      tsconfigPath: './tsconfig.json',
      webpackConfigBasePath: './',
    }),
    extensions: ['.tsx', '.ts', '.js'],
  },
}

module.exports = () => {
  if (isProduction) {
    config.mode = 'production'
    config.devtool = 'inline-source-map'
    config.output.filename = 'index.js'
    config.optimization = {
      minimize: false,
    }
  } else {
    config.mode = 'development'
    config.devtool = 'inline-source-map'
    config.output.filename = 'index.js'
  }

  return config
}
