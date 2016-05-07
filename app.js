require('babel-register');
const webpack = require('webpack');
const config = require('./webpack-prod.config');
const Webpack_isomorphic_tools = require('webpack-isomorphic-tools');
const project_base_path = __dirname;
const configuration = require('./webpack-isomorphic-tools-configuration').default;

const compiler = webpack(config);

compiler.run( (err, stats) => {
    if (err) {
        console.error(err);
    }

    global.webpack_isomorphic_tools = new Webpack_isomorphic_tools(configuration)
        .development(process.env.NODE_ENV === 'development')
        .server(project_base_path, function()
        {
            require('./server');
        });
});
