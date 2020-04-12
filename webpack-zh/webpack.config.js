/**
 * @type {import('webpack').Configuration}
 */
const webpack = require('webpack');

module.exports = {
  entry: {
    main: './src/index.js',
  },

  mode: 'production',

  output: {
    filename: '[name].[chunkhash:8].js'
  },
  
  optimization: {
    runtimeChunk: {
      name: entrypoint => `runtime~${entrypoint.name}`
    },
    splitChunks: {
      chunks: 'all',
      name(module, chunks, cacheGroupKey) {
        console.log(module.context, chunks.map(item => item.name).join('~'), cacheGroupKey);
        return [cacheGroupKey, ...chunks.map(item => item.name)].join("~");
      },
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: 2,
          enforce: true
        },
        common: {
          test: /src\/common/,
          priority: 2,
          enforce: true
        },
        module1: {
          test: /src\/module-1/,
          priority: 2,
          enforce: true
        },
        module2: {
          test: /src\/module-2/,
          priority: 2,
          enforce: true
        }
      }
    }
  },
  
  plugins: [
    new webpack.HashedModuleIdsPlugin()
  ]
};
