module.exports = (api, option) => {
    option.componentName = option.projectName;
    api.render('./template')
}