


var async = require('async')
var Recommender = require('likely')
var db = require('../db/db')

exports.range = function(start, end) {
    var foo = [];
    for (var i = start; i <= end; i++) {
        foo.push(i);
    }
    return foo;
}

exports.matrixTransform = function(pref, callback) {
  var r = pref.row.length;
  var c = pref.column.length;
  // console.log(r)
  // console.log(c)
  var matrix = [];
  for (var i = 0; i < r; i++) {
    var row = []
    for (var j = 0; j < c ; j++) {
      row.push(0);
    }
    matrix.push(row);
  }
  var r_dict = {}
  var c_dict = {}
  var max = 0;
  async.each(exports.range(0,r-1), function(i, next) {
    var v = ""+pref.row[i].v;
    pref.row[i] = v;
    r_dict[v] = i;
    next();
  },function(err) {
    if (err) console.log(err);
  });
  async.each(exports.range(0,c-1), function(i, next) {
    var v = ""+pref.column[i].v;
    pref.column[i] = v;
    c_dict[v] = i;
    next();
  },function(err) {
    if (err) console.log(err);
  });

  async.each(pref.tuples, function(t, next) {
    var x = r_dict[t.r];
    var y = c_dict[t.c];
    matrix[x][y] = parseFloat(t.v)/100.0.toFixed(3);
    next();
  }, function(err) {
    if (err)
      console.log(err);
  });
  buildModel(matrix, pref.row, pref.column, callback);
}

// exports.Model = null;

var buildModel = function(matrix, row_label, column_label, callback) {

  var Model = Recommender.buildModel(matrix, row_label, column_label);
  async.map(row_label, function(u, next) {
    var r = Model.recommendations(u);
    next(null, {userId: u, recmd: r});
  }, function(err, results) {
    if (err) 
      console.log(err);
    callback(results);
  });
}

exports.algorithm = function(x1, x2, x3, x4) {
  x1 = parseFloat(x1);
  x2 = parseFloat(x2);
  x3 = parseFloat(x3);
  x4 = parseFloat(x4);
  var d1 = x2-x1;
  var d2 = x3-x2;
  var d3 = x4-x3;
  // var model = (d1>=0 && d2>=0 && d3>=0 ) || (d1<=0 && d2<=0 && d3<=0);
  var r = Math.random();
  if (r <= 0.25)
    model = 0;
  else if (r <= 0.75)
    model = 1;
  else
    model = 2;
  var a1=0.25, a2=0.25, a3=0.25, a4=0.25, b1=0.25, b2=0.25, b3=0.25, b4=0.25;
  if (model == 2) {
    // optimistic
  	a1=0.1; a2=0.1; a3=0.4; a4=0.7; b1=0.1; b2=0.1; b3=0.4; b4=0.4;
  } else if (model == 1) {
    // fluctuation
  	a1=0.2; a2=0.2; a3=0.4; a4=0.4; b1=0.3; b2=0.3; b3=0.2; b4=0.2;
  }
  // console.log('Use Model '+model);
  var mean = (x1+x2+x3+x4)/4.0;
  var x5 = a1*x1+a2*x2+a3*x3+a4*x4+b1*(x1-mean)+b2*(x2-mean)+b3*(x3-mean)+b4*(x4-mean);
  return x5;
}

