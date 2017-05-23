module.exports = {
    entry: './src/index.js',
    output: {
        path: './build',
        filename: "bundle.js",
		publicPath: '/build'
    },
    externals: {
		'react-cookie': 'reactCookie',
		'jquery': 'jQuery'
    },
    devtool: 'source-map', // generate source file
    module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
              presets: ['es2015', 'react']
            }
          }
        ]
    }
};