module.exports = (api, option, rootOptions) => {
    api.extendPackage({
        scripts: {
            deploy: 'vue-cli-service deploy'
        }
    })
}

