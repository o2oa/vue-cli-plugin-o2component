module.exports = (api, options) =>{
    console.log("load plugin service!!!")
    api.registerCommand(
        'deploy',
        {
            description: 'deploy to o2 server',
            usage: 'vue-cli-service deploy'
        },
        () => {
            console.log(`👋  deploy to o2 server`)
        }
    )
}