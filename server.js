var app = require('express')();
var webpack = require('webpack');
var webpackDev = require('webpack-dev-middleware');
var webpackHot = require('webpack-hot-middleware');
var webpackConf = require('./webpack.config.js');
var mock = require('./lib/mock.js');

var compiler = webpack(webpackConf);

app.use(webpackDev(compiler, {
    publicPath: webpackConf.output.publicPath,
    noInfo: true,
    inline: true,
    stats: {
        colors: true
    }
}));
app.use(webpackHot(compiler));
app.use('/api', mock([/api\/.*/]));
app.get('/test', function (req, res) {
    res.send('hello!!!');
});

// var reload = require('reload');
// var http = require('http');
// var server = http.createServer(app);
// reload(server, app);
// server.listen(8080, function () {
//     console.log('listenning on 8080...');
// });

app.listen(8080, function () {
    console.log('listenning on 8080..');
});
