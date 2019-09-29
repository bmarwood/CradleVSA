const proxy = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(proxy('/users',
        { target: 'http://localhost:8080' ,
        changeOrigin : true,
    })),
    app.use(proxy('/assessments',
        { target: 'http://localhost:8080' ,
        changeOrigin : true,
    }
    ));
}