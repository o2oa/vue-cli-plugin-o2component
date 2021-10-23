module.exports = {
    "server": {
        "host": "<%= options.o2serverHost %>",
        "port": "<%= options.o2serverCenterPort %>",
        "httpPort": "<%= options.o2serverWebPort %>",
        "https": <%= options.isHttps %>
    },
    "components": ('<%= options.o2Components %>').split(/\s*\,\s*/g)
}