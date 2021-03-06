var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require("express-session");
var MongoStore = require("connect-mongo")(session);
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');    //引用mongoose模块
mongoose.connect('mongodb://localhost/wmf');; //创建一个数据库连接
var db = mongoose.connection;
db.on('error', console.error.bind(console, '数据库连接错误:'));
db.once("open", function(callback){
    console.log("数据库已连接");
});
//路由
var index = require('./routes/index');
var users = require('./routes/users');
var menus = require('./routes/menus');
var login = require("./routes/login");
var signup = require("./routes/signup");
var logout = require("./routes/logout");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser());
/*app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));*/
app.use(cookieParser());
app.use(session(({
    secret: 'wmf',
    store: new MongoStore({
        url: "mongodb://localhost/wmf",
        ttl: 7 * 24 * 60 * 60
    })
})));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/admin/user', users);
app.use('/admin/menu', menus);
app.use("/admin/login", login);
app.use("/admin/signup", signup);
app.use("/admin/logout", logout);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    return res.render("error-404");
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//设置环境
app.set("env", "development");

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: "武僧" || err.message,
        error: {}
    });
});


module.exports = app;
