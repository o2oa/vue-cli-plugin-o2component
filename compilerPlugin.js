const config = require('@o2oa/vue-cli-plugin-o2component/config');
const UglifyJS = require("uglify-js");
const path = require('path');
const pkg = require(path.resolve(process.cwd(), './package.json'));
const componentPath = pkg.name;
//const componentPath = "x_component_"+pkg.name.replace(/\./g, '_');
const componentName = componentPath.replace('x_component_', '').split('_').join('.');
const p = path.resolve(process.cwd(), './o2.config.js');
const o2config = require(p);
const globalWords = o2config.globals || ["webpackJsonp"];
const includeMainReg = o2config.includeMain || /(app\.)|(chunk-vendors\.)/;

function compilerO2ComponentPlugin(options) {}

function includeMain(fileList, filter, extname, every){
    let list = fileList.filter((v)=>{
        const flag = v.startsWith(filter) && path.extname(v)===extname;
        if (flag) if (every) every(v);
        return flag && includeMainReg.test(v);
    });
    if (list && list.length){
        list = list.map((file)=>{
            return `../${componentPath}/` + file;
        });
        return '"'+list.join('", "')+'"';
    }
    return '';
}
compilerO2ComponentPlugin.prototype.apply = function(compiler) {
    // compiler.plugin('emit', function(compilation, callback) {
    compiler.hooks.emit.tapAsync('compilerO2ComponentPlugin', function(compilation, callback) {
        const fileList = Object.keys(compilation.assets);

        let mainFileContent = `o2.component("${componentName}", {\n`;

        const css = includeMain(fileList, '$Main/css', '.css');
        if (css) mainFileContent += `    css: [${css}],\n`;

        const js = includeMain(fileList, '$Main/js', '.js', (name)=>{
            let code = compilation.assets[name].source();
            globalWords.forEach((w)=>{
                const reg1 = new RegExp('window\\.'+w, 'g');
                const reg2 = new RegExp('window\\[\''+w+'\'\\]', 'g');
                const reg3 = new RegExp('window\\["'+w+'"\\]', 'g');

                code = code.replace(reg1, "winsow."+w+componentPath)
                    .replace(reg2, "window['"+w+componentPath+"']")
                    .replace(reg3, "window[\""+w+componentPath+"\"]");
            });
            compilation.assets[name].source = ()=>{return code};
            compilation.assets[name].size = ()=>{return code.length};
        });
        if (js) mainFileContent += `    js: [${js}],\n`;

        mainFileContent += `});`;

        compilation.assets['Main.js'] = {
            source: ()=>{ return mainFileContent},
            size: ()=>{ return mainFileContent.length}
        };
        const miniMainFileContent = UglifyJS.minify(mainFileContent).code;
        compilation.assets['Main.min.js'] = {
            source: ()=>{ return miniMainFileContent},
            size: ()=>{ return miniMainFileContent.length}
        };

        let lpList = fileList.filter((v)=>{
            return v.startsWith('lp/') && path.extname(v)===".js";
        });
        if (lpList && lpList.length){
            lpList.forEach((lp)=>{
                let str = String(compilation.assets[lp].source());
                str = UglifyJS.minify(str).code;
                let name = path.basename(lp, '.js')+'.min.js';
                name = path.dirname(lp)+'/'+name;

                compilation.assets[name] = {
                    source: ()=>{ return str},
                    size: ()=>{ return str.length}
                };
            })
        }

        callback();
    });
};
module.exports = compilerO2ComponentPlugin;
