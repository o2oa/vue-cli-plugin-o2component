const path = require('path');
const axios = require('axios');
const fs = require('fs/promises');
const componentPlugin = require('./compilerPlugin');

const p = path.resolve(process.cwd(), './o2.config.js');
const config = require(p);
const server = config.server;
const pkg = require(path.resolve(process.cwd(), './package.json'));
const componentPath = pkg.name;
//const componentName = componentPath.replace('x_component_', '').split('_').join('.');

let domian = '';
const host = `${(server.https) ? 'https' : 'http'}://${server.host}${(!server.httpPort || server.httpPort==='80') ? '' : ':'+server.httpPort}`;

const o={
    target: host,
    changeOrigin: true,
    bypass: function(req, res, proxyOptions) {
        if (req.url.startsWith('/'+componentPath+'/')) return false;
    },
    onProxyRes: (proxyRes, req, res) => {
        const cookie = proxyRes.headers['set-cookie'];
        if (cookie && cookie[0]){
            const host = req.headers['host'].split(':')[0];
            cookie[0] = cookie[0].replace(/(domain=)\.([^\s;]+)/, '$1'+host);
        }
    }
}
const proxy = {};
(config.components || []).concat(['o2_core', 'o2_lib', 'x_']).forEach((path)=>{
    proxy['^/'+path] = Object.assign({}, o);
});

module.exports = {
    publicPath:  process.env.NODE_ENV === 'production' ? "../"+componentPath+"/" : "/"+componentPath+"/",
    outputDir: "./dist/"+componentPath,
    assetsDir: "$Main",
    devServer: {
        proxy: proxy,
        open: true
    },
    configureWebpack: {
        plugins: [
            new componentPlugin()
        ]
    }
}
