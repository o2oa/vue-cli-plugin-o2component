module.exports = (api, option, rootOptions) => {
    api.extendPackage({
        scripts: {
            greet: 'vue-cli-service deploy'
        }
    })
}

