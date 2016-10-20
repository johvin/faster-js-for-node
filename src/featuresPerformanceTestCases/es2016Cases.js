var es2016F = require('../esFeatures/es2016Features');

module.exports = {
  [es2016F.EXPONENTIATION_OPERATOR]: {
    desc: 'exponentiation (**) operator',
    exec: function() {/*
      function feature() {
        var a = 2;
        a **= 3;
        return 2 ** 3 === 8 && -(a ** 2) === -64 && (-5) ** 2 === 25;
      }

      function transform() {
        var a = 2;
        a = Math.pow(a, 3);

        return Math.pow(2, 3) === 8 && -Math.pow(a, 2) === -64 && Math.pow(-5, 2) === 25;
      }

    */}
  }
};
