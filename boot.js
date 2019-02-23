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

        this.load.spritesheet('cyclops', 'assets/Cyclops.png', { frameWidth: 64, frameHeight: 64});

        this.load.spritesheet('koala', 'assets/koala.png', {frameWidth: 25, frameHeight: 20});

        this.load.spritesheet('spider', 'assets/spider.png', {frameWidth: 32, frameHeight: 32});

        this.load.audio('backgroundMusic', 'assets/bensound-scifi.mp3' );

        this.load.audio('bump','assets/coinget.ogg');
    },

    create: function ()
    {


        this.anims.create({
            key: 'cyclopsFight',
            frames: this.anims.generateFrameNumbers('cyclops', { start: 0, end: 11, first: 0}),
            frameRate: 12,
            repeat: -1
        });
        koala = this.physics.add.sprite(50, 75, 'koala');
        this.anims.create({
            key: 'evilKoala',
            frames: this.anims.generateFrameNumbers('koala', {start: 0, end: 2}),
            frameRate: 12,
            repeat: -1
        });
        koala.anims.play('evilKoala');
        this.add.text(38, 150, 'Press any key to start!', {fill: 'white'});
        this.input.keyboard.on('keydown', function() {
            this.scene.start('WorldScene');
        }, this);

        this.anims.create({
            key: 'spiderFight',
            frames: this.anims.generateFrameNumbers('spider', {start: 0, end: 4, first: 0}),
            frameRate: 12,
            repeat: -1
        })


    }
});