var isType = function(type, obj) {
  var clas = Object.prototype.toString.call(obj).slice(8, -1);
  return obj !== undefined && obj !== null && clas === type;
};

var utils = {
  'isUndefined': function(v) {
    if (typeof v === 'undefined') {
      return true;
    } else {
      return false;
    }
  },
  'isEmpty': function(v) {
    if (isType('Array', v)) {
      return v.length == 0;
    } else if (isType('Object', v)) {
      return Object.keys(v).length === 0;
    }
  }
};

module.exports = utils;
