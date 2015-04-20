var db = require('../db/db');
var auth = require('./pwd');
var utils = require('../utils/utils')

auth.authenticate = function (name, pass, fn) {
	// if (!module.parent) 
	// 	console.log('authenticating %s:%s', name, pass);
	db.retrieveUser(name, function(err, res) {
		if (err) {
			// console.log(err);
			return fn(new Error('Authentication failure'));
		}
		// query the db for the given username
		if (utils.isEmpty(res)) 
			return fn(new Error('Cannot find user'));
		// first row
		var user = res[0]; 
		// apply the same algorithm to the POSTed password, applying
		// the hash against the pass / salt, if there is a match we
		// found the user
		auth.hash(pass, user.Salt, function(err, hash) {
			if (err) return fn(err);
			if (hash.toString() == user.Hash) 
				return fn(null, user);
			else
				fn(new Error('Invalid password'));
		});
	});	
};

auth.checkLoggedIn = function(req, res) {
	if (req.session.user) {
		res.json({
			loggedIn: true,
			userId: req.session.user.UserId,
			userName: req.session.user.Username
		})
	} else {
		res.json({
			loggedIn: false
		})
	}
};

auth.restrict = function(req, res, next) {
	if (req.session.user) {
		// console.log(req.session);
		next();
	} else {
		// console.log('Wrong.');
		// res.redirect('/login');
		// req.session.error = 'Access denied!';
		res.json({
			loggedIn: false
		})
	}
}

auth.login = function(req, res) {
	auth.authenticate(req.body.username, req.body.password, function(err, user) {
		if (user) {
			// Regenerate session when signing in
			// to prevent fixation        
			req.session.regenerate(function(){
				// Store the user's primary key
				// in the session store to be retrieved,
				// or in this case the entire user object
				// console.log('Log In Success!');
				req.session.user = user;
				req.session.success = 'Authenticated as ' + user.Username 
				 	+ ' click to <a href="/logout">logout</a>. ' 
					+ ' You may now access <a href="/restricted">/restricted</a>.';
				// res.redirect('/');
				// console.log(req.session);
				res.json({
					success: true,
					user: user
				});
			});
		} else  {
			if (err)
				console.log(err);
			console.log('Log In Failed!');
			req.session.error = 'Authentication failed, please check your '
				+ ' username and password.';
			// res.redirect('/login');
			res.json({
				success: false
			});
		}
	});
};

auth.logout = function(req, res){
	// destroy the user's session to log them out
	// will be re-created next request
	req.session.destroy(function(){
		// res.redirect('/');
	});
}

auth.signup = function(req, res) {
	auth.hash(req.body.password, function(err, salt, hash) {
		if (err)
			console.log(err);
		var user = {
			Username: req.body.username,
			Email: req.body.email,
			Salt: salt,
			Hash: hash
		}
		db.signup(user, function(err, user) {
			if (user) {
				req.session.regenerate(function(){
				req.session.user = user;
				req.session.success = 'Authenticated as ' + user.Username +
					+ ' click to <a href="/logout">logout</a>. ' 
					+ ' You may now access <a href="/restricted">/restricted</a>.';
				res.redirect('back');
				});
			} 
			else {
				console.log(err);
				req.session.error ='Sign up failure.';
				res.redirect('/signup')
			}
		});
	});
};

module.exports = auth