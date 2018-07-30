const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  devServer: {
    contentBase: './',
    host: '0.0.0.0',
    disableHostCheck: true,
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
