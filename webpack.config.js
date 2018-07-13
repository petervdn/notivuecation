const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry: './src/index',
  resolve: {
    extensions: ['.vue', '.js', '.ts'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
    ],
  },
  externals: {
    vuex: 'vuex'
  },
  output: {
    path: __dirname,
    filename: 'index.js',
    library: 'notivuecation',
    libraryTarget: 'umd'
  },
  plugins: [new VueLoaderPlugin()],
};
