'use strict';
const path = require('path');
const webpack = require('webpack');
const findParam = require('./script/findEnv');

const ENV = JSON.stringify(findParam('ENV'));
const common_config = {
    entry: ['./test/test.ts', './src/main.tsx'],
    output: {
        filename: 'js/bundle.js',
        path: path.join(__dirname, 'bin'),
    },
    module: {
        rules: [
            {
                test: /(.tsx|.ts|.jsx|.js)$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                },
            },
            {
                test: /(.glsl|.fs|.vs)$/,
                loader: 'webpack-glsl-loader',
            },
        ],
    },
    resolve: {
        modules: [
            path.resolve('./test'),
            path.resolve('./libs'),
            path.resolve('./library'),
            path.resolve('./src'),
            path.resolve('./node_modules'),
        ],
        extensions: ['.tsx', '.ts', '.js', '.json'],
    },
    plugins: [new webpack.DefinePlugin({ ENV })],
};

const dev_config = {
    devtool: 'eval-source-map',
    stats: {
        warnings: false,
    },
    watch: true,
    devServer: {
        clientLogLevel: 'silent',
        host: '0.0.0.0',
        contentBase: path.join(__dirname, 'bin'),
        disableHostCheck: true,
        port: '3000',
        open: true,
        openPage: 'http://localhost:3000',
    },
};

const prod_config = {
    entry: ['./src/main.tsx'],
};
const prod_ts_compile_option = {
    sourceMap: false,
};

module.exports = (env, argv) => {
    if (argv.mode === 'development') {
        return {
            ...common_config,
            ...dev_config,
        };
    } else {
        common_config.module.rules[0].options.compilerOptions = prod_ts_compile_option;
        return {
            ...common_config,
            ...prod_config,
        };
    }
};
