/*
 * Serve JSON to our AngularJS client
 */

var db = require('../db/db')
var utils = require('../utils/utils')

// GET

exports.searchStock = function(req, res) {
  db.searchStock(req.query, function(err, rows) {
    res.json({
      stocks: rows
    });
  });
};

exports.getAllCompanies = function(req, res) {
  db.getAllCompanies(function(err, rows) {
    res.json({
      comps: rows
    });
  });
}

exports.getAllStocks = function (req, res) {
  db.getAll(function(err, rows) {
    res.json({
      stocks: rows
    });
  });
};

exports.getCompany = function(req, res) {
  var id = req.params.id;
  db.getCompany(id, function(err, row) {
    res.json({
        comp: row
    });
  });
};

exports.getStock = function (req, res) {
  var id = req.params.id;
  db.getStock(id, function(err, row) {
    res.json({
        stock: row
    });
  });
};

// POST
exports.insertCompany = function (req, res) {
  db.insertCompany(req.body, function(err, result) {
    if (err)
      res.json(false);
    else if (result.affectedRows !== undefined)
      res.json({ success: true })
    else if (result.error)
      res.json( {success: false, error: result.error})
    else
      res.json({ success: false });
  });
};

exports.insertStock = function (req, res) {
  db.insertStock(req.body, function(err, result) {
    if (err)
      res.json(false);
    else if (result.affectedRows !== undefined)
      res.json({ success: true })
    else if (result.error)
      res.json( {success: false, error: result.error})
    else
      res.json({ success: false });
  });
};

exports.buyStock = function(req, res) {
  db.buyStock(req.body.UserId, req.body.StockId, req.body.Volume, function(err, result) {
    if (err)
      res.json(false);
    else if (result.affectedRows !== undefined)
      res.json({ success: true })
    else if (result.error)
      res.json( {success: false, error: result.error})
    else
      res.json({ success: false });
  });
};

exports.sellStock = function(req, res) {
  db.sellStock(req.body.UserId, req.body.StockId, req.body.Volume, function(err, result) {
    if (err)
      res.json(false);
    else if (result.affectedRows !== undefined)
      res.json({ success: true })
    else if (result.error)
      res.json( {success: false, error: result.error})
    else
      res.json({ success: false });
  });
};

// PUT


// DELETE
