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
  
  var q = "SELECT * FROM Stock WHERE TRUE";
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
      if (err)
        console.log(err);
      callback(err, rows);
    });
  });
}


db.getAll = function(callback) {
  pool.getConnection(function(err, conn) {
    conn.query('SELECT * FROM Stock NATURAL JOIN Company', function(err, rows) {
      conn.release();
      if (err)
        console.log(err);
      callback(err, rows);
    });
  });
};

db.getStock = function(id, callback) {
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

db.getAllCompanies = function(callback) {
  pool.getConnection(function(err, conn) {
    conn.query('SELECT * FROM Company', function(err, rows) {
      conn.release();
      if (err)
        console.log(err);
      callback(err, rows);
    });
  });
}

db.getCompany = function(id, callback) {
  pool.getConnection(function(err, conn) {
    conn.query('SELECT * FROM Company WHERE CompanyId = ?', [+id], function(err, rows) {
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

db.insertCompany = function(newRow, callback) {
  
  pool.getConnection(function(err, conn){
    conn.query('INSERT INTO Company (Username, Password, Name, Description) VALUES (?, ?, ?, ?)', [newRow['Username'], 'password', newRow['Name'], newRow['Description']], function(err, res) {
      conn.release();
      if (err)
        console.log(err);
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
      if (err) 
        console.log(err);
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

var updateOwn = function(updateType, userId, stockId, Volume, Price, callback) {
  pool.getConnection(function(err, conn) {
    if (updateType == 0) {
      conn.query('INSERT INTO Own (UserId, StockId, Volume, Price) VALUES (?, ?, ?, ?)', [+userId], [+stockId], [+Volume], [+Price], function(err, res) {
        if (err)
          console.log(err);
        conn.release();
        callback(err, {});
      });  
    } else if (updateType == 1) {
      conn.query('UPDATE Own SET Volume = ?, Price = ? WHERE UserId = ? AND StockId = ?', [+Volume], [+Price], [+UserId], [+StockId], function(err, res) {
        if (err)
          console.log(err);
        conn.release();
        callback(err, {});
      });
    } else if (updateType == 2) {
      conn.query('DELETE FROM Own WHERE UserId = ? AND StockId = ?', [+userId], [+stockId], function(err, res) {
        if (err)
          console.log(err);
        conn.release();
        callback(err, {});
      })
    }
  });
}

var getCurrentPrice = function(stockId, callback, respondCallBack) {
  pool.getConnection(function(err, conn) {
    conn.query('SELECT Season1, Season2, Season3, Season4 FROM Stock WHERE StockId = ?', [+stockId], function(err, res) {
      conn.release();
      if (err)
        console.log(err);
      callback(err, res, respondCallBack);
    });
  });
}

var updateUserBalance = function(userId, balanceOffset, callback) {
  pool.getConnection( function(err, conn) {
    conn.query('UPDATE User SET Balance = Balance + ? WHERE UserId = ?', [+userId], [+balanceOffset], function(err, res){
      conn.release();
      if (err)
        console.log(err);
      callback(err, {});
    });
  });
}


db.buyStock = function(userRequest, callback) {
  var userId = userRequest.userId;
  var stockId = userRequest.stockId;
  var buyVolume = userRequest.buyVolume;
  var getPriceCallback = function(err, prices, callback) {
    var currentPrice = prices.Season4;
    pool.getConnection( function(err, conn) {
      conn.query('SELECT * FROM Own WHERE UserId = ? AND stockId = ?', [+userId], [+stockId], function(err, res) {
        conn.release();
        if (err)
          console.log(err);
        if (utils.isEmpty(res)) {
          updateOwn(0, userId, stockId, buyVolume, currentPrice, callback);
        } else {
          var existOwn = res[0];
          var newPrice = (existOwn.Price*existOwn.Volume + currentPrice*buyVolume) / (existOwn.Volume + buyVolume);
          var newVolume = existOwn.Volume + buyVolume;
          updateOwn(1, userId, stockId, newVolume, newPrice, callback);
        };
      });
    });
  };
  // execute function here
  getCurrentPrice(stockId, getPriceCallback, callback);
}


db.sellStock = function(userRequest, callback) {
  var userId = userRequest.userId;
  var stockId = userRequest.stockId;
  var sellVolume = userRequest.sellVolume;
  var getPriceCallback = function(err, prices, callback) {
    var currentPrice = prices.Season4;
    pool.getConnection( function(err, conn) {
      conn.query('SELECT * FROM OWn WHERE UserId = ? AND StockId = ?', [+userId], [+stockId], function(err, res) {
        conn.release();
        if (err)
          console.log(err);
        var oldVolume = res[0].Volume;
        var oldPrice = res[0].Price;
        var gain = (oldPrice - currentPrice) * sellVolume;

        // here is to link two async functions
        var nextSql = function(err, res){
          updateUserBalance(userId, gain, callback);
        };

        if (sellVolume < oldVolume) {
          updateOwn(1, userId, stockId, oldVolume - sellVolume, oldPrice, nextSql);
        } else {
          updateOwn(2, userId, stockId, 0, 0, nextSql);
        }

      });
    });
  };
  getCurrentPrice(stockId, getPriceCallback, callback);
}

// db.remove = function(id, callback) {

// 	pool.getConnection(function(err, conn){
//     conn.query('DELETE FROM Blog WHERE id = ?', [+id], function(err, res) {
//       conn.release();
//       callback(err);
//     });
//   });

// }

// db.update = function(id, newRow, callback) {

// 	db.read(id, function(err, row) {
//     if (utils.isEmpty(row) || utils.isUndefined(row['id']) || +row['id'] !== +id) {
//       callback(err, {});
//     } else {
//       // var mergeRow = row;
//       // for (var key in newRow) {
//       //   mergeRow[key] = newRow[key];
//       // }
//       pool.getConnection(function(err, conn){
//         var query = conn.query('UPDATE Blog SET title = ?, text = ? WHERE id = ?', [newRow['title'], newRow['text'], +id]);
//         query.on('end', function() {
//           conn.release();
//           db.read(id, function(err, row) {
//             callback(err, row);
//           });
//         });
//       });
//     }
//   });

// }

module.exports = db