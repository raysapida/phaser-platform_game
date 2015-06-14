var map;
var backgroundLayer;
var blockLayer;
var bg;
var player;
var jumpTimer = 0;
var cursors;
var jumpButton;
var enemySpeed = 40;
var currentDir = "right";
var treasure;
var treasureCollected = false;

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
    this.setupEnemy();
    cursors = this.input.keyboard.createCursorKeys();
    jumpButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    //collision on blockedLayer
    //setCollisionBetween(start, stop, collides, layer, recalculate)
    map.setCollisionBetween(781, 786, true, 'blocklayer');
    map.setCollisionBetween(463, 464, true, 'blocklayer');
    map.setCollision(779, true, 'blocklayer');
    this.setupTreasure();
  },

  setupPlayer: function () {
    player = this.add.sprite(50, 32, 'dude'); //50 x 32 = starting position
    this.physics.enable(player, Phaser.Physics.ARCADE);
    player.scale.setTo(1.1, 1.1);
    player.body.collideWorldBounds = true;
    player.body.setSize(20, 32, 0, 0);
    player.anchor.setTo(.5, 1); //so it flips around its middle
    player.animations.add('move', [5, 6, 7, 8], 10, true);
    //player.body.collideWorldBounds = true;
    if (treasureCollected == true) {
      player.body.collideWorldBounds = false;
    }
    else {
      player.body.collideWorldBounds = true;
    }
  },

  setupEnemy: function () {
    skeleton = this.add.sprite(400, 400, 'skeleton'); //50 x 32 = starting position
    this.physics.enable(skeleton, Phaser.Physics.ARCADE);
    skeleton.body.collideWorldBounds = true;
    skeleton.body.setSize(16, 40, 0, -3);
    skeleton.anchor.setTo(.5, 1); //so it flips around its middle
    skeleton.animations.add('move-enemy-right', [148, 149, 150, 151], 10, true);
    skeleton.animations.add('move-enemy-left', [118, 119, 120, 121], 10, true);
    skeleton.animations.play('move-enemy-right', 10, true); // get enemy moving
  },

  setupTreasure: function () {
    treasure = this.add.sprite(565, 550, 'treasure');
    this.physics.enable(treasure, Phaser.Physics.ARCADE);
  },

  moveSkeleton: function () {
    skeleton.body.velocity.x = enemySpeed;
  },

  playerHit: function () {
    player.kill();
    this.setupPlayer();
  },

  checkForCliff: function (side) {
    var offsetX; //check tile ahead of sprite as opposed to right under
    if (side == "left") {
      offsetX = -3;
    } else if (side == "right") {
      offsetX = 23;
    }

    var tile = map.getTileWorldXY(skeleton.body.x + offsetX, skeleton.body.y + 48, 32, 32, blockLayer);

    if (skeleton.body.onFloor() && tile == null) {
      return true;
    } else {
      return false;
    }
  },

  treasureCollect: function () {
    treasure.kill();
    treasureCollected = true;
    player.body.collideWorldBounds = false;
  },

  update: function () {
    this.physics.arcade.collide(treasure, blockLayer);
    this.physics.arcade.collide(skeleton, blockLayer, this.moveSkeleton);
    this.physics.arcade.collide(player, blockLayer);
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
      jumpTimer = this.time.now + 750;
    }
    //player death
    this.physics.arcade.overlap(player, skeleton, this.playerHit, null, this);

    if (skeleton.body.blocked.right == true && currentDir == "right") {
      //player.x = 12;
      enemySpeed *= -1;
      currentDir = "left";
      skeleton.animations.play('move-enemy-left');
    }
    else if (skeleton.body.blocked.left == true && currentDir == "left") {
      //player.x = 12;
      enemySpeed *= -1;
      currentDir = "right";
      skeleton.animations.play('move-enemy-right');
    }
    else if (this.checkForCliff(currentDir) == true) {
      enemySpeed *= -1;
      if (currentDir == "right") {
        currentDir = "left";
        skeleton.animations.play('move-enemy-left');
      }
      else {
        currentDir = "right";
        skeleton.animations.play('move-enemy-right');
      }
    }

    //treasure collected
    this.physics.arcade.overlap(player, treasure, this.treasureCollect, null, this);

    if (treasureCollected && player.position.x > map.widthInPixels) {
      //end level here     
    }
  },

  render: function () { },
};
