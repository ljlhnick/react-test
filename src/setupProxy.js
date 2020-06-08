const {
    createProxyMiddleware
} = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        createProxyMiddleware("/music", {
            target: "http://192.168.23.75:3000",
            ws: true,
            secure: false,
            changeOrigin: true,
            pathRewrite: {
                "^/music": "",
            },
        })
    );

    app.use(createProxyMiddleware("/ban", {
        target: "https://api.douban.com",
        ws: true,
        secure: false,
        changeOrigin: true,
        pathRewrite: {
            '^/ban': ''
        }
    }))

    app.use(createProxyMiddleware("/cnode", {
        target: "https://cnodejs.org/api/v1",
        ws: true,
        secure: false,
        changeOrigin: true,
        pathRewrite: {
            '^/cnode': ''
        }
    }))

};