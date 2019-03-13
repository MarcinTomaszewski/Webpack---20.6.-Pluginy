const path = require('path');
// pod spodem pluginy
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeJsPlugin = require('optimize-js-plugin');
// zmienna zawiera wszystkie pluginy
const plugins = [new HtmlWebpackPlugin({
    template: 'src/index.html',
    filename: 'index.html',
    inject: 'body'
})];

//webpack.config.js
// Możemy na przykład zmienić nazwę bundle'a w zależności od środowiska:
// Pliki będą wyglądać następująco:
// Dla production: app.production.bundle.js  npm start - pliki duże :)
// Dla development: app.development.bundle.js npm build - pliki zminimalizowane i pozbawione komentarzy react
module.exports = (env) => {
    // jeśli jesteśmy w środowisku produkcyjnym to do pluginów zostanie dodany plugin OtimizeJs
    if (env === 'production') {
        plugins.push(
            new OptimizeJsPlugin({
                sourceMap: false
            })
        )
    }

    const environment = env || 'production';
    return {
        mode: environment,
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: 'app.' + environment + '.bundle.js'
        },
        // Webpack zawiera dużo ustawień domyślnych np tutaj optimization zostało nadpisane na false. Domyślnie jest na true i w trybie produkcyjnym powoduje minimalizowanie plików żródłowych. Reszta ustawień domyślnych w domumentacji webpacka tutaj 
        // https://webpack.js.org/concepts/mode/
        // optimization: {
        //     minimize: false
        // },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: "babel-loader",
                    options: {
                        plugins: env !== 'production' ? ["react-hot-loader/babel"] : []
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        { loader: 'style-loader' },
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true
                            }
                        }
                    ]
                }
            ]
        },
        plugins
    }
};