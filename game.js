var map;
var backgroundLayer;
var blockLayer;
var bg;
var player;
var jumpTimer = 0;
var cursors;
var jumpButton;

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
    cursors = this.input.keyboard.createCursorKeys();
    jumpButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    //collision on blockedLayer
    //setCollisionBetween(start, stop, collides, layer, recalculate)
    map.setCollisionBetween(781, 786, true, 'blocklayer');
    map.setCollisionBetween(463, 464, true, 'blocklayer');
    map.setCollision(779, true, 'blocklayer');
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

  update: function () {
    this.game.physics.arcade.collide(player, blockLayer);
    player.body.velocity.x = 0; //default speed - stationary

    if (cursors.left.isDown) {
      player.scale.x = -1;
      player.body.velocity.x = -150;
      player.animations.play('move');
    }
    else if (cursors.right.isDown) {
      player.scale.x = 1;
      player.body.velocity.x = 150;
      player.animations.play('move');
    }
    else {
      player.animations.stop();
      player.frame = 5;
    }

    if (jumpButton.isDown && player.body.onFloor() && this.time.now > jumpTimer) {
      player.body.velocity.y = -250;
      jumpTimer = game.time.now + 750;
    }
  },

  render: function () { },
};
