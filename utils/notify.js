var emailjs = require('emailjs')

exports.process = function(err, results, next) {
	var EmailIds = {};
	for (var i in results) {
		for (var j in results[i].notifyUsers) {
			var email = results[i].notifyUsers[j].Email;
			if (email in EmailIds) {
				EmailIds[email].push(results[i].id);
			} else {
				EmailIds[email] = [results[i].id];
			}
		}
	}
	// console.log(EmailIds);
  notify(err, EmailIds, next);
}

var send_email = function(email, stocks) {
	var server  = emailjs.server.connect({
		user:    "firesearchadm", 
		password:"cs411firesearch", 
		host:    "smtp.gmail.com", 
		ssl:     true
	});

	var message = "";
	for (var s in stocks) {
		// console.log(s)
		message += stocks[s] + " ";
	}

	server.send({
		text:    'Your following stock ids have changed significantly in the last season\n' + message, 
		from:    "firesearchadm@gmail.com", 
		to:      email,
		subject: "Notification From FireSearch"
	}, function(err, message) { 
		if (err)
			console.log(err)
	});
}

var notify = function(err, results, next) {
	// console.log(results);
	for (var e in results) {
		send_email(e, results[e])
	}
	next(err, results);
}

