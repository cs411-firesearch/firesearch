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
		var userInfo = req.session.user;
		delete userInfo.Salt;
		delete userInfo.Hash;
		res.json({
			loggedIn: true,
			user: userInfo
		})
	} else {
		res.json({
			loggedIn: false
		})
	}
};

auth.restrict = function(req, res, next) {
	if (req.session.user) {
		next();
	} else {
		res.json({
			loggedIn: false
		})
	}
}

auth.restrictUserPost = function(req, res, next) {
	if (req.session.user !== undefined && req.session.user.UserId == req.body.UserId) {
		next();
	} else {
		res.json({
			loggedIn: false
		})
	}
}

auth.restrictUserGet = function(req, res, next) {
	if (req.session.user !== undefined && req.session.user.UserId == req.params.id) {
		next();
	} else {
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
				var userInfo = user;
				delete userInfo.Salt;
				delete userInfo.Hash;
				req.session.user = userInfo;
				res.json({
					success: true,
					user: userInfo
				});
			});
		} else  {
			if (err)
				console.log(err);
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
		res.json({});
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
		db.signup(user, function(err, result) {
			if (result.user) {
				req.session.regenerate(function(){
					var userInfo = result.user;
					delete userInfo.Salt;
					delete userInfo.Hash;
					req.session.user = userInfo;
					res.json({
						success: true,
						user: userInfo
					});
				});
			} 
			else {
				console.log(err);
				res.json({
					success: false,
					error: result.error
				});
			}
		});
	});
};

module.exports = auth