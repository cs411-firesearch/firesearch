var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

/**
 * Module dependencies.
 */

var express = require('express'),
  routes = require('./routes'),
  api = require('./routes/api');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', {
    layout: false
  });
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
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

app.get('/api/searchStock', api.searchStock);
app.get('/api/comps', api.getAllCompanies);
app.get('/api/stocks', api.getAllStocks);

app.get('/api/comp/:id', api.getCompany)
app.get('/api/stock/:id', api.getStock);

app.post('/api/addComp', api.insertCompany);
app.post('/api/addStock', api.insertStock);

app.post('/api/buyStock', api.buyStock);
app.post('/api/sellStock', api.sellStock);

// app.put('/api/post/:id', api.editPost);
// app.delete('/api/post/:id', api.deletePost);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

// Start server

app.listen(server_port, server_ip_address, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
