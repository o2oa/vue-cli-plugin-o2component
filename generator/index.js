module.exports = (api, option) => {
    api.render('./template');
    api.extendPackage({
        "dependencies": {
            "@o2oa/web-component": "^1.0.9"
        },
        "devDependencies": {
            "@o2oa/component-devserever": "^1.0.8"
        }
    })
}