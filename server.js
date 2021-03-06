var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

/**
 * Module dependencies.
 */

var express = require('express'),
	routes = require('./routes'),
	api = require('./routes/api'),
	auth = require('./auth/auth');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.set('view options', {
		layout: false
	});
	app.use(express.methodOverride());
	app.use(express.static(__dirname + '/public'));
	app.use(express.bodyParser());
	app.use(express.cookieParser());
	app.use(express.session({
	  secret: 'firesearch'
	 // ,cookie: { path: '/', httpOnly: false, secure: false, maxAge: null }
	}
	));
	app.use(function(req, res, next){
		var err = req.session.error
		, msg = req.session.success;
		delete req.session.error;
		delete req.session.success;
		res.locals.message = ''; 
		if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
		if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
		next();
	});
	app.use(app.router);

});


app.configure('development', function(){
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
	app.use(express.errorHandler());
});


// Routes

app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

// JSON API

app.get('/api/searchStock', auth.restrict, api.searchStock);
app.get('/api/comps', auth.restrict, api.getAllCompanies);
app.get('/api/stocks', auth.restrict, api.getAllStocks);

app.get('/api/comp/:id', auth.restrict, api.getCompany)
app.get('/api/stock/:id', auth.restrict, api.getStock);

// app.post('/api/addComp', auth.restrict, api.insertCompany);
// app.post('/api/addStock', auth.restrict, api.insertStock);

app.post('/api/buyStock',  auth.restrictUserPost, api.buyStock);
app.post('/api/sellStock', auth.restrictUserPost, api.sellStock);

app.get('/api/portfolio/:id', auth.restrictUserGet, api.portfolio);
app.get('/api/balance/:id', auth.restrictUserGet, api.balance);

// Authentication API

app.get('/auth/checklogin', auth.checkLoggedIn);
app.get('/auth/logout', auth.logout);
app.post('/auth/login', auth.login);
app.post('/auth/signup', auth.signup)

// Advanced Functions

app.get('/recommend/:id', auth.restrictUserGet, api.recommend);
app.post('/refreshPrices', api.refreshPrices);

app.get('/restricted', auth.restrict, function(req, res){
	res.send('Wahoo! restricted area, click to <a href="/logout">logout</a>');                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
});     

// app.put('/api/post/:id', api.editPost);
// app.delete('/api/post/:id', api.deletePost);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

// Start server

app.listen(server_port, server_ip_address, function(){
	console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
