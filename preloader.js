// Preloader will load all of the assets like graphics and audio
GameStates.Preloader = function (game) {
  this.preloadBar = null;
}

GameStates.Preloader.prototype = {
  preload: function () {
    // common to add a loading bar sprite here...
    this.preloadBar = this.add.sprite(this.game.width / 2 - 100, this.game.height / 2, 'preloaderBar');
    this.load.setPreloadSprite(this.preloadBar);
    // load all game assets
    // images, spritesheets, atlases, audio etc..
    this.load.image('logo', 'assets/phaser2.png');
    this.load.image('bg', 'assets/scifi_platform_BG1.jpg')
    this.load.tilemap('myTilemap', 'assets/tilemaps/scifi.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('myTileset', "assets/tilemaps/scifi_platformTiles_32x32.png");
    this.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    this.load.spritesheet('skeleton', 'assets/skeleton_3.png', 64, 64);
    this.load.image('treasure', 'assets/star2.png');
  },

  create: function () {
    //call next state
    //this.state.start('MainMenu');
    this.state.start('Game');
  }
};
