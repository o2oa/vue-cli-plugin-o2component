module.exports = (api, option, rootOptions) => {
    api.render('./template');
    api.extendPackage({
        "dependencies": {
            "@o2oa/web-component": "^1.0.10"
        }
    });

    let projectPath = rootOptions.projectName;
    projectPath = projectPath.replace(/\./g, "_");
    api.postProcessFiles((list)=>{
        const nameList = Object.keys(list);
        nameList.forEach((k)=>{
            const cmptName = k.replace(/\/x_component\//, '/x_component_'+projectPath+"/");
            if (cmptName!==k){
                list[cmptName] = list[k];
                delete list[k];
            }
        });
    });
}