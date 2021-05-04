const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {

    const isProd = argv.mode === 'production'
    const isDev = !isProd

    const filename = (ext) => isProd ? `[name].[contenthash].bundle.${ext}` : `[name].bundle.${ext}`
    const plugins = () => {
        const base = [
            new HtmlWebpackPlugin({
                template: "./index.html"
            }),
            new CopyPlugin({
                patterns: [
                  { from: path.resolve(__dirname, 'src', 'favicon.png'), 
                  to: path.resolve(__dirname, 'dist') }
                ],
              }),
              new MiniCssExtractPlugin({
                  filename: filename('css')
              })
        ]

        //if(isDev) {
            //base.push(new ESLintPlugin())
        //}
        return base
    }

    console.log('isProd', isProd)
    console.log('isDev', isDev)

    return {
        target: 'web',
        context: path.resolve(__dirname, 'src'),
        entry: {
            main: './index.js'
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: filename('js'),
            clean: true
        },
        resolve: {
            extensions: ['.js'],
            alias: {
                '@': path.resolve(__dirname, 'src'),
                '@core': path.resolve(__dirname, 'core')
            }
        },
        plugins: plugins(),
        devServer: {
            port: '3000',
            open: true,
            watchContentBase: true
            //hot: true
        },
        devtool: isDev ? 'source-map' : false,
        module: {
            rules: [
              {
                test: /\.s[ac]ss$/i,
                use: [
                  // Creates `style` nodes from JS strings
                  MiniCssExtractPlugin.loader,
                  // Translates CSS into CommonJS
                  "css-loader",
                  // Compiles Sass to CSS
                  "sass-loader",
                ],
              },
            ],
          }
    }
}