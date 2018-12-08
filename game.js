var BootScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function BootScene ()
    {
        Phaser.Scene.call(this, { key: 'BootScene' });
    },

    preload: function ()
    {
        // map tiles
        this.load.image('tiles', 'assets/map/spritesheet.png');

        // map in json format
        this.load.tilemapTiledJSON('map', 'assets/map/map.json');

        // our two characters
        this.load.spritesheet('player', 'assets/RPG_assets.png', { frameWidth: 16, frameHeight: 16 });
    },

    create: function ()
    {
        this.scene.start('WorldScene');
    }
});

var WorldScene = new Phaser.Class({});

console.log(BootScene);
console.log(WorldScene);
console.log(Phaser.Scene);

var config = {
    type: Phaser.AUTO,
    parent: 'content',
    width: 700,
    height: 700,
    zoom: 2,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },
    scene: [
        BootScene,
        WorldScene
    ]
};

var game = new Phaser.Game(config);