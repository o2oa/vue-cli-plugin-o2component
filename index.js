module.exports = (api, options) =>{
    console.log("load plugin service!!!")
    api.registerCommand(
        'greet',
        {
            description: 'Write a greeting to the console',
            usage: 'vue-cli-service greet'
        },
        () => {
            console.log(`👋  Hello`)
        }
    )
}