module.exports = (api, option, rootOptions) => {
    const name = rootOptions.projectName;
    rootOptions.o2componentName = name.replace('x_component_', '').split('_').join('.');
        api.render('./template');
    api.extendPackage({
        'dependencies': {
            '@o2oa/component': '^1.1.6'
        },
        'scripts': {
            'o2-deploy': 'vue-cli-service build --dest ../../dest/'+name,
            'o2-build': 'vue-cli-service build --dest ../../../target/o2server/servers/webServer/'+name,
            'deploy': 'vue-cli-service build && vue-cli-service deploy'
        }
    });

    // let projectPath = rootOptions.projectName;
    // projectPath = projectPath.replace(/\./g, '_');
    // api.postProcessFiles((list)=>{
    //     const nameList = Object.keys(list);
    //     nameList.forEach((k)=>{
    //         const cmptName = k.replace(/\/x_component\//, '/x_component_'+projectPath+'/');
    //         if (cmptName!==k){
    //             list[cmptName] = list[k];
    //             delete list[k];
    //         }
    //     });
    // });
}
