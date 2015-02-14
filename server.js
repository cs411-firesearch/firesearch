var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

var bodyParser = require('body-parser');
var express = require('express');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var _users = {
  1: {name: 'User 1'},
  2: {name: 'User 2'},
  10: {name: 'User 10'}
};

app.use('/', express.static(__dirname + '/static'));

app.get('/api/users', function(req, res) {
  res.json(_users);
});

app.get('/api/users/:id', function(req, res) {
  var id = req.params.id;
  res.json(_users[id] || {});
});

app.use(function(req, res) {
  res.sendFile('/static/index.html', {root: __dirname});
});

// var port = process.argv[2] || 8000;
app.listen(server_port, server_ip_address);
console.log('Server running ...');
