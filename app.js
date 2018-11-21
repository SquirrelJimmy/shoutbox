const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const lessMiddleware = require('less-middleware');
const logger = require('morgan');
const errorhandler = require('errorhandler')
const session = require('express-session');
const methodOverride = require('method-override')

const Entry = require('./models/entry')
const user = require('./middleware/user');
const validate = require('./middleware/validate');
const messages = require('./middleware/messages');
const page = require('./middleware/page')
const entries = require('./routes/entries');
const register = require('./routes/register');
const login = require('./routes/login');
const api = require('./routes/api')


// const User = require('./models/user');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('json spaces', 2);

// 开发环境下使用错误处理插件
if (app.get('env') === 'development') {
	app.use(logger('dev'));
	app.use(errorhandler());
}

app.use(methodOverride());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: true
}));
app.use('/api', api.auth);
app.use(user);
app.use(messages);
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// 首页
app.get('/', entries.list);

// 写留言
app.get('/post', entries.form);

// 注册
app.get('/register', register.form);
app.post('/register', register.submit);

// 登录
app.get('/login', login.form);
app.post('/login', login.submit);
app.get('/logout', login.logout);

// RESTful API
app.get('/api/user/:id', api.user);
app.post('/api/entry', validate.required('entry[title]'), validate.lengthAbove('entry[title]', 4), entries.submit);
app.get('/api/entries/:page?', page(Entry.count), api.entries);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
