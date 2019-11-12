const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(proxy('/users',
        {
            target: 'http://cmpt373.csil.sfu.ca:8083/',
            // target: 'http://localhost:8080',
            changeOrigin: true,
        })),
        app.use(proxy('/assessments',
            {
                target: 'http://cmpt373.csil.sfu.ca:8083/',
                // target: 'http://localhost:8080',
                changeOrigin: true,
            }
        ));
}
