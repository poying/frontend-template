const path = require('path');
const webpack = require('webpack');
const pkg = require('./package.json');
const Dotenv = require('dotenv-webpack');
const getRepoInfo = require('git-repo-info');
const WorkboxPlugin = require('workbox-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const DynamicCdnWebpackPlugin = require('dynamic-cdn-webpack-plugin');

const env = process.env.NODE_ENV || 'development';
const repoInfo = getRepoInfo();

const plugins = [
  new WorkboxPlugin.GenerateSW(),
  new Dotenv({
    path: path.resolve(__dirname, 'config', env + '.env'),
    systemvars: true
  }),
  new HtmlWebpackPlugin({
    template: 'src/index.html',
  }),
  new WebpackPwaManifest(pkg.manifest),
  new webpack.NamedModulesPlugin(),
  new CopyWebpackPlugin([{
    from: 'locales/**/*',
    dest: 'public/locales/**/*',
  }], {
    copyUnmodified: true,
  }),
  new webpack.DefinePlugin({
    NODE_ENV: JSON.stringify(env),
    VERSION: JSON.stringify(pkg.version),
    GIT_SHA: JSON.stringify(repoInfo.abbreviatedSha),
  }),
];

if (!process.env.DISABLE_ANALYZER) {
  plugins.push(new BundleAnalyzerPlugin({
    analyzerMode: 'disabled',
    generateStatsFile: true,
  }));
}

if (env === 'production') {
  plugins.push(new DynamicCdnWebpackPlugin());
}

module.exports = {
  mode: env === 'production' ? 'production' : 'development',
  devtool: env === 'production' ? false : 'source-map',
  entry: env === 'development'
    ? ['react-hot-loader/patch', './src/index.tsx']
    : ['./src/index.tsx'],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].[hash].js',
    chunkFilename: '[name].bundle.[hash].js',
    publicPath: '/',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  devServer: {
    hot: true,
    hotOnly: true,
    overlay: true,
    contentBase: path.resolve(__dirname, 'public'),
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [new TsconfigPathsPlugin()],
    modules: ['node_modules'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'resolve-url-loader',
          'sass-loader',
          'webpack-import-glob-loader',
        ],
      },
      {
        test: /\.tsx?$/,
        use: [
          { loader: 'react-hot-loader/webpack' },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|gif|png|svg|woff2?|ttf|wav|mp3)$/,
        loader: 'file-loader',
        query: {
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
    ],
  },
  plugins,
};
