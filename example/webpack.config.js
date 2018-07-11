const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  devServer: {
    contentBase: './',
  },
  resolve: {
    extensions: ['.vue', '.js', '.ts'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        // options: {
        //   appendTsSuffixTo: [/\.vue$/],
        // },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
      },
    ],
  },
  output: {
    path: __dirname,
  },
  plugins: [new VueLoaderPlugin()],
};
