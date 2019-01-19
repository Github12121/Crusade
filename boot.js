var BootScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function BootScene ()
    {
        Phaser.Scene.call(this, { key: 'BootScene' });
    },

    preload: function ()
    {
        // map tiles
        this.load.image('tiles', 'assets/spritesheet.png');

        // map in json format
        this.load.tilemapTiledJSON('map', 'assets/map.json');

        // our two characters
        this.load.spritesheet('player', 'assets/RPG_assets.png', { frameWidth: 16, frameHeight: 16 });


        this.load.audio('backgroundMusic', 'assets/bensound-scifi.mp3' );

        this.load.audio('bump','assets/coinget.ogg');
    },

    create: function ()
    {
        this.scene.start('WorldScene');

    }
});