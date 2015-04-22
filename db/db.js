var db = require('mysql')
var utils = require('../utils/utils');
var algo = require('../utils/algo');
var notify = require('../utils/notify')
var async = require('async')

var pool = db.createPool({
	connectionLimit: 100,
	host	: process.env.OPENSHIFT_MYSQL_DB_HOST || 'localhost',
  port  : process.env.OPENSHIFT_MYSQL_DB_PORT || 3306,
	user	: process.env.OPENSHIFT_MYSQL_DB_USERNAME || 'root',
	password: process.env.OPENSHIFT_MYSQL_DB_PASSWORD || 'password',
	database: 'Fire'
});

var modelUninitialized = true;

db.getRecommendations = function(id, callback) {
  var next = function() {
    // var recommendations = algo.Model.recommendations(""+id);
    // callback(recommendations)
    pool.getConnection(function(err, conn) {
      conn.query('SELECT StockId, TransCode, Season4 as CurrentPrice FROM Recommend NATURAL JOIN Stock WHERE UserId = ? ORDER BY Rate LIMIT 5', [id], function(err, rst) {
        conn.release();
        if (err)
          console.log(err);
        callback(rst);
      });
    });
  }
  if (modelUninitialized) {
    db.initializeModel(next);
  } else {
    next();
  }
}

db.initializeModel = function(callback) {
  pool.getConnection(function(err, conn) {
    conn.query('DELETE FROM Recommend', function(err, rst) {
      conn.release();
      if (err)
        console.log(err);

      var prefs = {}
      pool.getConnection(function(err, conn) {
        conn.query('SELECT Volume as v, UserId as r, StockId as c FROM Own', function(err, tuples) {
          conn.release();
          if (err)
            console.log(err);
          prefs.tuples = tuples;
          pool.getConnection(function(err, conn) {
            conn.query('SELECT DISTINCT UserId as v FROM Own ORDER BY UserId', function(err, r1) {
              conn.release();
              if (err)
                console.log(err);
              prefs.row = r1;
              pool.getConnection(function(err, conn) {
                conn.query('SELECT DISTINCT StockId as v FROM Own ORDER BY StockId', function(err, r2) {
                  conn.release();
                  if (err)
                    console.log(err);
                  prefs.column = r2;
                  algo.matrixTransform(prefs, function(recmds) {

                    async.each(recmds, function(userRec, next){
                      var userId = userRec.userId;
                      async.each(algo.range(0, userRec.recmd.length-1), function(i, next2) {

                        var item = userRec.recmd[i];
                        var stockId = item[0];
                        var query = 'INSERT INTO Recommend (UserId, StockId, Rate) VALUES ('+userId +','+stockId+','+(1+i)+')';
                        pool.getConnection(function(err, conn) {
                          conn.query(query, function(err, res) {
                            conn.release();
                            if (err)
                              console.log(err);
                            next2(err);
                          })
                        });
                      }, function(err) {
                        if (err)
                          console.log(err);
                        next(err);
                      });
                    }, function(err) {
                      if (err)
                        console.log(err);
                      modelUninitialized = false;
                      callback();
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
}

db.refreshPrices = function(rspCallback ) {
  pool.getConnection(function(err, conn) {
    conn.query('SELECT StockId, Season1, Season2, Season3, Season4 FROM Stock', function(err, rows) {
      if (err)
        console.log(err);
      conn.release();

      async.map(rows, function(row, next) {
        var stockId = row.StockId;
        var newSeason1 = parseFloat(row.Season2);
        var newSeason2 = parseFloat(row.Season3);
        var newSeason3 = parseFloat(row.Season4);
        var newSeason4 = algo.algorithm(row.Season1, row.Season2, row.Season3, row.Season4);
        var newValues = [newSeason1, newSeason2, newSeason3, newSeason4, stockId];
        pool.getConnection(function(err, conn) {
          conn.query('UPDATE Stock SET Season1 = ?, Season2 = ?, Season3 = ?, Season4 = ? WHERE StockId = ?', newValues, function(err, result) {
            conn.release();
            if (err)
              console.log(err);
            var notify = Math.abs((newSeason3 - newSeason4) / newSeason3) > 0.2;
            if (notify) {
              pool.getConnection(function(err, conn) {
                conn.query('SELECT DISTINCT Email FROM Own NATURAL JOIN User WHERE StockId = ?', stockId, function(err, emails) {
                  conn.release();
                  if (err)
                    console.log(err);
                  next(err, { id: stockId, notifyUsers: emails});
                })
              })
            } else {
              next(err, { id: stockId, notifyUsers: [] });
            }

          });
        });
      }, function(err, results) {
        // algo.clearModel();
        modelUninitialized = true;
        notify.process(err, results, rspCallback);
      });
    });
  });
}

db.getPortFolio = function(id, callback ) {
  pool.getConnection(function(err, conn) {
    conn.query('SELECT Own.StockId, Stock.TransCode, Own.Price AS BuyInPrice, Own.Volume, Stock.Season4 AS CurrentPrice FROM Own JOIN Stock ON Own.StockID = Stock.StockId WHERE UserId = ?', [+id], function(err, result) {
      conn.release();
      if (err)
        console.log(err);
      callback(err, result);
    });
  });
}

db.getBalance = function(id, callback) {
  pool.getConnection(function(err, conn) {
    conn.query('SELECT Balance FROM User WHERE UserId = ?', [id], function(err, result) {
      conn.release();
      if (err)
        console.log(err);
      callback(err, result[0]);
    })
  })
}

db.signup = function(user, callback ) {
  var name = user.Username;
  db.retrieveUser(name, function(err, res) {
    if (utils.isEmpty(res) == false)  {
      // user already exist
      callback(err, {error: 'Username already exist'});
    } else {
      pool.getConnection(function(err, conn) {
        conn.query('INSERT INTO User (Username, Email, Salt, Hash) VALUES (?, ?, ?, ?)', [user['Username'], user['Email'], user['Salt'], user['Hash']], function(err, res) {
          if (err)
            console.log(err);
          conn.release();
          user.UserId = res.insertId;
          callback(err, {user: user});
        });
      });
    }
  });
}

db.retrieveUser = function(name, callback) {
  pool.getConnection(function(err, conn) {
    // console.log(name);
    conn.query('SELECT * FROM User WHERE Username = ?', [name], function(err, res) {
      if (err)
        console.log(err);
      conn.release();
      // console.log(res);
      callback(err, res);
    })
  })
};

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
    conn.query('SELECT * FROM Stock NATURAL JOIN Company WHERE Stock.StockId = ?', [+id], function(err, rows) {
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
    conn.query('INSERT INTO Company (Name, Description) VALUES (?, ?, ?, ?)', [newRow['Name'], newRow['Description']], function(err, res) {
      conn.release();
      if (err)
        console.log(err);
      // var newId = res.insertId;
      // db.read(newId, function(err, row) {
      //   callback(err, row);
      // });
      callback(err, res);
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
        callback(err, {error: ' Could not find company id'});
      } else {
        pool.getConnection(function(err, conn){
          conn.query('INSERT INTO Stock (TransCode, Volume, DivYield, Season1, Season2, Season3, Season4, CompanyId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [newRow['TransCode'], newRow['Volume'], newRow['DivYield'], newRow['Season1'],newRow['Season2'],newRow['Season3'],newRow['Season4'], newRow['CompanyId']], function(err, res) {
            if (err)
              console.log(err);
            conn.release();
            // var newId = res.insertId;
            // db.read(newId, function(err, row) {
            //   callback(err, row);
            // });
            callback(err, res);
          });
        });
      }
    });
  }) 
}

var updateOwn = function(updateType, userId, stockId, Volume, Price, callback) {
  pool.getConnection(function(err, conn) {
    if (updateType == 0) {
      conn.query('INSERT INTO Own (UserId, StockId, Volume, Price) VALUES (?, ?, ?, ?)', [[+userId], [+stockId], [+Volume], [+Price]], function(err, result) {
        if (err)
          console.log(err);
        conn.release();
        callback(err, result);
      });  
    } else if (updateType == 1) {
      conn.query('UPDATE Own SET Volume = ?, Price = ? WHERE UserId = ? AND StockId = ?', [[+Volume], [+Price], [+userId], [+stockId]], function(err, result) {
        if (err)
          console.log(err);
        conn.release();
        callback(err, result);
      });
    } else if (updateType == 2) {
      conn.query('DELETE FROM Own WHERE UserId = ? AND StockId = ?', [[+userId], [+stockId]], function(err, result) {
        if (err)
          console.log(err);
        conn.release();
        callback(err, result);
      })
    }
  });
}

var getCurrentStockInfo = function(stockId, next, callback) {
  pool.getConnection(function(err, conn) {
    conn.query('SELECT Season1, Season2, Season3, Season4, Type FROM Stock WHERE StockId = ?', [+stockId], function(err, res) {
      conn.release();
      if (err)
        console.log(err);
      if (utils.isEmpty(res))
        next(err, {error: 'StockId not found.'}, callback);
      else
        next(err, res[0], callback);
    });
  });
}

var updateUserBalance = function(userId, balanceOffset, callback) {
  pool.getConnection( function(err, conn) {
    conn.query('UPDATE User SET Balance = Balance + ? WHERE UserId = ?', [[+balanceOffset], [+userId]], function(err, result){
      conn.release();
      if (err)
        console.log(err);
      callback(err, result);
    });
  });
}


db.buyStock = function(userId, stockId, buyVolume, callback) {
  var getPriceCallback = function(err, stockInfo, callback) {
    if (stockInfo.error) {
      callback(err, stockInfo)
      return;
    }
    var currentPrice = parseFloat(stockInfo.Season4);
    pool.getConnection( function(err, conn) {
      conn.query('SELECT * FROM Own WHERE UserId = ? AND StockId = ?', [[+userId], [+stockId]], function(err, res) {
        conn.release();
        if (err) 
          console.log(err);
        if (utils.isEmpty(res)) {
          updateOwn(0, userId, stockId, buyVolume, currentPrice, callback);
        } else {
          var existOwn = res[0];
          var a = parseFloat(existOwn.Price);
          var b = parseFloat(currentPrice);
          var c = parseInt(existOwn.Volume);
          var d = parseInt(buyVolume);
          var newPrice = (a * c + b * d) / (c + d);
          var newVolume = c + d;
          updateOwn(1, userId, stockId, newVolume, newPrice, callback);
        };
      });
    });
  };
  // execute function here
  getCurrentStockInfo(stockId, getPriceCallback, callback);
}


db.sellStock = function(userId, stockId, sellVolume, callback) {
  var getPriceCallback = function(err, stockInfo, callback) {
    if (stockInfo.error) {
      callback(err, stockInfo)
      return;
    }
    var currentPrice = parseFloat(stockInfo.Season4);
    pool.getConnection( function(err, conn) {
      conn.query('SELECT * FROM Own WHERE UserId = ? AND StockId = ?', [[+userId], [+stockId]], function(err, res) {
        conn.release();
        if (err)
          console.log(err);
        if (utils.isEmpty(res)) {
          callback(err, {error: 'Does not own any volumes.'});
          return;
        }


        var oldVolume = parseInt(res[0].Volume);
        var oldPrice = parseFloat(res[0].Price);
        var gain = (currentPrice - oldPrice) * parseInt(sellVolume);

        // here is to link two async functions
        var nextSql = function(err, res){
          updateUserBalance(userId, gain, callback);
        };

        if (sellVolume > oldVolume) {
          callback(err, {error: 'Not enough volumes.'})
          return;
        }

        if (sellVolume < oldVolume) {
          updateOwn(1, userId, stockId, oldVolume - sellVolume, oldPrice, nextSql);
        } else {
          updateOwn(2, userId, stockId, 0, 0, nextSql);
        }

      });
    });
  };
  getCurrentStockInfo(stockId, getPriceCallback, callback);
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