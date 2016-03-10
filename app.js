import webpack from 'webpack';
import config from './webpack-prod.config';
import Webpack_isomorphic_tools from 'webpack-isomorphic-tools';
const project_base_path = __dirname;
import configuration from './webpack-isomorphic-tools-configuration';

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
