module.exports = {
    entry: './src/js/nevsuite.app.root.js',
    output: {
        filename: 'nevsuite.bundle.js',
        path: './dist'
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
};