GameStates.Game = function (game) {

};

GameStates.Game.prototype = {
  var map;
  var backgroundLayer;
  var blockLayer;

  create: function () {
    map = this.add.tilemap('myTilemap');
    map.addTilesetImage('scifi_platformTiles_32x32', 'myTileset');

    backgroundLayer = map.createLayer('background');
    blockLayer = map.createLayerteLayer('blocklayer');
  },

  update: function () { },

  render: function () { },
};
