var db = require('mysql')
var utils = require('../utils/utils');

var pool = db.createPool({
	connectionLimit: 100,
	host	: 'localhost',
	user	: 'root',
	password: 'password',
	database: 'blog'
});

db.readAll = function(callback) {
	pool.getConnection(function(err, conn) {
		conn.query('SELECT * FROM Blog', function(err, rows) {
			conn.release();
			callback(err, rows);
		});
	});
};

db.read = function(id, callback) {
	pool.getConnection(function(err, conn) {
		conn.query('SELECT * FROM Blog WHERE id = ?', [+id], function(err, rows) {
			conn.release();
			if (utils.isEmpty(rows)) {
				callback(err, {});
			} else {
				callback(err, rows[0]);
			}
		});
	});
}

db.insert = function(newRow, callback) {
  
  pool.getConnection(function(err, conn){
    conn.query('INSERT INTO Blog (title, text) VALUES (?, ?)', [newRow['title'], newRow['text']], function(err, res) {
      conn.release();
      var newId = res.insertId;
      db.read(newId, function(err, row) {
        callback(err, row);
      });
    });
  });
  
};

db.remove = function(id, callback) {

	pool.getConnection(function(err, conn){
    conn.query('DELETE FROM Blog WHERE id = ?', [+id], function(err, res) {
      conn.release();
      callback(err);
    });
  });

}

db.update = function(id, newRow, callback) {

	db.read(id, function(err, row) {
    if (utils.isEmpty(row) || utils.isUndefined(row['id']) || +row['id'] !== +id) {
      callback(err, {});
    } else {
      // var mergeRow = row;
      // for (var key in newRow) {
      //   mergeRow[key] = newRow[key];
      // }
      pool.getConnection(function(err, conn){
        var query = conn.query('UPDATE Blog SET title = ?, text = ? WHERE id = ?', [newRow['title'], newRow['text'], +id]);
        query.on('end', function() {
          conn.release();
          db.read(id, function(err, row) {
            callback(err, row);
          });
        });
      });
    }
  });

}

module.exports = db