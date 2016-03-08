import webpack_isomorphic_tools_plugin from 'webpack-isomorphic-tools/plugin';

export default {

    assets: {
        images: {
            extensions: ['png', 'jpg', 'gif', 'ico', 'svg']
        },
        styles: {
            extensions: ['css'],
            filter: function(module, regular_expression, options, log) {
                if (options.development) {
                    return webpack_isomorphic_tools_plugin.style_loader_filter(module, regular_expression, options, log);
                }
            },
            path: webpack_isomorphic_tools_plugin.style_loader_path_extractor,
            parser: webpack_isomorphic_tools_plugin.css_loader_parser
        }
    }

};
