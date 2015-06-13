var map;
var backgroundLayer;
var blockLayer;
var bg;

GameStates.Game = function (game) {

};

GameStates.Game.prototype = {

  create: function () {
    map = this.add.tilemap('myTilemap');
    map.addTilesetImage('scifi_platformTiles_32x32', 'myTileset');

    backgroundLayer = map.createLayer('background');
    blockLayer = map.createLayer('blocklayer');
    bg = this.add.tileSprite(0, 0, 640, 640, 'bg');
  },

  update: function () { },

  render: function () { },
};
