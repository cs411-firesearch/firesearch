

exports.algorithm = function(x1, x2, x3, x4) {
  x1 = parseFloat(x1);
  x2 = parseFloat(x2);
  x3 = parseFloat(x3);
  x4 = parseFloat(x4);
  var d1 = x2-x1;
  var d2 = x3-x2;
  var d3 = x4-x3;
  var model = (d1>=0 && d2>=0 && d3>=0 ) || (d1<=0 && d2<=0 && d3<=0);
  var a1=0.25, a2=0.25, a3=0.25, a4=0.25, b1=0.25, b2=0.25, b3=0.25, b4=0.25;
  if (model) {
  	a1=0.1; a2=0.1; a3=0.4; a4=0.7; b1=0.1; b2=0.1; b3=0.4; b4=0.4;
  } else {
  	a1=0.2; a2=0.2; a3=0.4; a4=0.4; b1=0.3; b2=0.3; b3=0.2; b4=0.2;
  }
  var mean = (x1+x2+x3+x4)/4.0;
  var x5 = a1*x1+a2*x2+a3*x3+a4*x4+b1*(x1-mean)+b2*(x2-mean)+b3*(x3-mean)+b4*(x4-mean);
  return x5;
}

