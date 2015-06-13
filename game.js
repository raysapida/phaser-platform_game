var map;
var backgroundLayer;
var blockLayer;
var bg;
var player;

GameStates.Game = function (game) {

};

GameStates.Game.prototype = {

  create: function () {
    map = this.add.tilemap('myTilemap');
    bg = this.add.tileSprite(0, 0, 640, 640, 'bg');
    map.addTilesetImage('scifi_platformTiles_32x32', 'myTileset');
    backgroundLayer = map.createLayer('background');
    blockLayer = map.createLayer('blocklayer');
    this.physics.arcade.gravity.y = 300;
    this.setupPlayer();
  },

  setupPlayer: function () {
    player = this.add.sprite(50, 32, 'dude'); //50 x 32 = starting position
    this.physics.enable(player, Phaser.Physics.ARCADE);
    player.scale.setTo(1.1, 1.1);
    player.body.collideWorldBounds = true;
    player.body.setSize(20, 32, 0, 0);
    player.anchor.setTo(.5, 1); //so it flips around its middle
    player.animations.add('move', [5, 6, 7, 8], 10, true);
  },

  update: function () { },

  render: function () { },
};
