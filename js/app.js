window.$ = require('jquery-browserify');
var Backbone = require('backbone');
Backbone.$ = window.$;

var size = 3;

var Cell = Backbone.Model.extend({
  defaults: {
    player: null,
    winning: false
  },
  
  initialize: function(x, y) {
    this.set({x: x, y: y})
  },

  reset: function() {
    this.set({
      player: null,
      winning: false
    });
  },
  
  makeMove: function() {
    this.trigger('makeMove');
  }
});

var TicTacToe = Backbone.Model.extend({
  defaults: {
    cells: null,
    players: ['X', 'O'],
    currentPlayer: 0,
    winner: null,
    isDraw: false,
    numTilesAvailable: size * size
  },

  initialize: function() {
    var cells = [];
    for (var x = 0; x < size; ++x) {
      cells.push([]);
      for (var y = 0; y < size; ++y) {
        cells[x].push(new Cell(x, y));
        this.listenTo(cells[x][y], 'change', this.emitChange);
        this.listenTo(cells[x][y], 'makeMove', this.makeMove.bind(this, x, y));
      }
    }
    this.set('cells', cells);
  },

  reset: function() {
    this.set({
      currentPlayer: 0,
      winner: null,
      isDraw: false,
      numTilesAvailable: size * size
    });
    var cells = this.get('cells');
    for (var x = 0; x < size; ++x) {
      for (var y = 0; y < size; ++y) {
        cells[x][y].reset();
      }
    }
  },

  emitChange: function() {
    this.trigger('change');
  },

  makeMove: function(x, y) {
    if (this.get('winner')) {
      return;
    }

    var cells = this.get('cells');

    var cell = cells[x][y];
    if (cell.get('player') === null) {
      cell.set({player: this.get('players')[this.get('currentPlayer')]});
      this.set({numTilesAvailable: this.get('numTilesAvailable') - 1});
      this.updateStatusForMove(x, y);
      if (!this.get('winner') && !this.get('isDraw')) {
        this.toggleCurrentPlayer();
      }
    }
  },

  updateStatusForMove: function(moveX, moveY) {
    var x, y;
    var cells = this.get('cells');

    var samePlayer = function(x, y) {
      return cells[x][y].get('player') === cells[moveX][moveY].get('player');
    };
    var markAsWinning = function(x, y) {
      cells[x][y].set({winning: true});
      return true;
    };

    // check column
    for (x = 0; x < size && samePlayer(x, moveY); ++x);
    if (x === size) {
      this.set({winner: cells[moveX][moveY].get('player')});
      for (x = 0; x < size && markAsWinning(x, moveY); ++x);
    }

    // check row
    for (y = 0; y < size && samePlayer(moveX, y); ++y);
    if (y === size) {
      this.set({winner: cells[moveX][moveY].get('player')});
      for (y = 0; y < size && markAsWinning(moveX, y); ++y);
    }

    // check diagonal
    if (moveX === moveY) {
      for (x = 0; x < size && samePlayer(x, x); ++x);
      if (x === size) {
        this.set({winner: cells[moveX][moveY].get('player')});
        for (x = 0; x < size && markAsWinning(x, x); ++x);
      }
    }

    // check off-diagonal
    if (size - moveX - 1 === moveY) {
      for (x = 0; x < size && samePlayer(x, size - x - 1); ++x);
      if (x === size) {
        this.set({winner: cells[moveX][moveY].get('player')});
        for (x = 0; x < size && markAsWinning(x, size - x - 1); ++x);
      }
    }

    if (!this.get('numTilesAvailable') && !this.get('winner')) {
      this.set({isDraw: true});
    }
  },

  toggleCurrentPlayer: function() {
    this.set({currentPlayer: (this.get('currentPlayer') + 1) % 2})
  }
});

var TileView = Backbone.View.extend({
  events: {
    'click': 'makeMove'
  },

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },

  makeMove: function() {
    this.model.makeMove();
  },

  render: function() {
    var player = this.model.get('player');
    var winning = this.model.get('winning');
    this.$el.text(player ? player : '');
    this.$el.toggleClass('winning', winning);
  }
});

var TicTacToeRestartView = Backbone.View.extend({
  events: {
    'click': 'restart'
  },

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },

  restart: function() {
    this.model.reset();
  },

  render: function() {
    var isDraw = this.model.get('isDraw');
    var winner = this.model.get('winner');
    this.$el.prop('disabled', !isDraw && !winner);
  }
});

var ticTacToe = new TicTacToe();
for (var x = 0; x < size; ++x) {
  for (var y = 0; y < size; ++y) {
    new TileView({
      model: ticTacToe.get('cells')[x][y],
      el: $('.tile').eq(x * size + y)
    });
  }
}

new TicTacToeRestartView({
  model: ticTacToe,
  el: $('#restart')
})
