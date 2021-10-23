module.exports = (api, options) =>{
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