import './components/RequestServer'

const proxy = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(proxy('/users',
        {
            target: getServerLocation(),
            changeOrigin: true,
        })),
        app.use(proxy('/assessments',
            {
                target: getServerLocation(),
                changeOrigin: true,
            }
        ));
}