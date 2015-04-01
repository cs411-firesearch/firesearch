var db = require('mysql')
var utils = require('../utils/utils');

var pool = db.createPool({
	connectionLimit: 100,
	host	: process.env.OPENSHIFT_MYSQL_DB_HOST || 'localhost',
  port  : process.env.OPENSHIFT_MYSQL_DB_PORT || 3306,
	user	: process.env.OPENSHIFT_MYSQL_DB_USERNAME || 'root',
	password: process.env.OPENSHIFT_MYSQL_DB_PASSWORD || 'password',
	database: 'Fire'
});

db.searchStock = function(query, callback) {
  
  var q = "SELECT * FROM Issue WHERE TRUE";
  if (query.TransCode != undefined) {
    q += " AND TransCode LIKE \'%" + query.TransCode + "%\'";
  }
  if (query.VolumeLow != undefined) {
    q += " AND Volume >= " + query.VolumeLow;
  }
  if (query.VolumeHigh != undefined) {
    q += " AND Volume <= " + query.VolumeHigh;
  }
  if (query.DivYieldLow != undefined) {
    q += " AND DivYield >= " + query.DivYieldLow;
  }
  if (query.DivYieldHigh != undefined) {
    q += " AND DivYield <= " + query.DivYieldHigh;
  }
  q += ";";
  console.log(q);
  pool.getConnection(function(err, conn) {
    conn.query(q, function(err, rows) {
      conn.release();
      callback(err, rows);
    });
  });
}

db.readAllCompanies = function(callback) {
  pool.getConnection(function(err, conn) {
    conn.query('SELECT * FROM Company', function(err, rows) {
      conn.release();
      callback(err, rows);
    });
  });
}

db.readAll = function(callback) {
	pool.getConnection(function(err, conn) {
		conn.query('SELECT * FROM Issue NATURAL JOIN Company', function(err, rows) {
			conn.release();
			callback(err, rows);
		});
	});
};

db.readStock = function(id, callback) {
	pool.getConnection(function(err, conn) {
		conn.query('SELECT * FROM Issue NATURAL JOIN Company WHERE Issue.id = ?', [+id], function(err, rows) {
			conn.release();
      if (err)
        console.log(err);
			if (utils.isEmpty(rows)) {
				callback(err, {});
			} else {
				callback(err, rows[0]);
			}
		});
	});
}

db.readComp = function(id, callback) {
  pool.getConnection(function(err, conn) {
    conn.query('SELECT * FROM Company WHERE CompanyId = ?', [+id], function(err, rows) {
      conn.release();
      if (utils.isEmpty(rows)) {
        callback(err, {});
      } else {
        callback(err, rows[0]);
      }
    });
  });
}

db.insertComp = function(newRow, callback) {
  
  pool.getConnection(function(err, conn){
    conn.query('INSERT INTO Company (Username, Password, Name, Description) VALUES (?, ?, ?, ?)', [newRow['Username'], 'password', newRow['Name'], newRow['Description']], function(err, res) {
      conn.release();
      // var newId = res.insertId;
      // db.read(newId, function(err, row) {
      //   callback(err, row);
      // });
      callback(err, {});
    });
  });
  
};

db.insertStock = function(newRow, callback) {

  var CompanyId = newRow['CompanyId'];
  pool.getConnection(function(err, conn) {
    conn.query('SELECT * FROM Company WHERE id = ?', [+CompanyId], function(err, rows) {
      conn.release();
      if (utils.isEmpty(rows)) {
        console.log('could not find company id.');
        callback(err, {});
      } else {
        pool.getConnection(function(err, conn){
          conn.query('INSERT INTO Issue (TransCode, Volume, DivYield, Season1, Season2, Season3, Season4, CompanyId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [newRow['TransCode'], newRow['Volume'], newRow['DivYield'], newRow['Season1'],newRow['Season2'],newRow['Season3'],newRow['Season4'], newRow['CompanyId']], function(err, res) {
            if (err)
              console.log(err);
            conn.release();
            // var newId = res.insertId;
            // db.read(newId, function(err, row) {
            //   callback(err, row);
            // });
            callback(err, {});
          });
        });
      }
    });
  }) 
}

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