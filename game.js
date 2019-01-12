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

var Character = new Phaser.Class({
    Extends: Phaser.GameObjects.Sprite,

    initialize: function Character(scene, x, y, texture, frame, type, hp, damage) {
        Phaser.GameObjects.Sprite.call(this, scene, x, y, texture, frame);
        this.type = type;
        this.maxHp = this.hp = hp;
        this.damage = damage; // default damage
    },

    attack: function(target) {
        target.takeDamage(this.damage);
    },

    takeDamage: function(damage) {
        this.hp -= damage;
    }
});

var Player = new Phaser.Class({
    Extends: Character,

    initialize: function Enemy(scene, x, y, texture, frame, type, hp, damage) {
        Character.call(this, scene, x, y, texture, frame, type, hp, damage);
    }
});

var Enemy = new Phaser.Class({
    Extends: Character,

    initialize: function Enemy(scene, x, y, texture, frame, type, hp, damage) {
        Character.call(this, scene, x, y, texture, frame, type, hp, damage);
    }
});

var BattleScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function BattleScene () {
        Phaser.Scene.call(this, { key: 'BattleScene'});
    },

    create: function() {
        //alert('Muahahaha');
        this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');
        //var warrior = new Player(this, 250, 50, 'player', 1, 'Warrior', 100, 20);
        //this.add.existing(warrior);
        this.scene.launch('BattleSceneUI');

        var warrior = new Player(this, 250, 50, 'player', 1, 'Warrior', 100, 20);
        var mage = new Player(this, 250, 10, 'player', 1, 'Mage', 100, 20);

        console.log(warrior.type, warrior.hp);
        console.log(mage.type, mage.hp);

        var hobbit = new Enemy(this, 50, 50, 'enemy', 1, 'Hobbit', 100, 20);
        var blackCat = new Enemy(this, 50, 10, 'enemy', 1, 'Black Cat', 100, 20);

        console.log(hobbit.type, warrior.hp);
        console.log(blackCat.type, blackCat.hp);

        hobbit.takeDamage(20);
        console.log(hobbit.type, hobbit.hp);
        hobbit.attack(warrior);
        console.log(warrior.type, warrior.hp);
    }

});
var BattleSceneUI = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function BattleSceneUI () {
        Phaser.Scene.call(this, {key: 'BattleSceneUI'});
    },

    create: function() {
        this.graphics = this.add.graphics();
        this.graphics.lineStyle(1, 0xffffff);
        this.graphics.fillStyle(0x031f4c, 1);
        this.graphics.strokeRect(2, 150, 90, 100);
    }
});

var WorldScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function BootScene () {
        Phaser.Scene.call(this, { key: 'WorldScene' });
    },

    preload: function () {

    },

    create: function () {
        music = this.sound.add('backgroundMusic');

        music.play();
        var map = this.make.tilemap({key: 'map'});
        var tiles = map.addTilesetImage('spritesheet', 'tiles');

        var grass = map.createStaticLayer('Grass', tiles, 0, 0);
        var obstacles = map.createStaticLayer('Obstacles', tiles, 0, 0);
        obstacles.setCollisionByExclusion([-1]);
        this.player = this.physics.add.sprite(50, 100, 'player', 6);

        this.physics.world.bounds.width = map.widthInPixels;
        this.physics.world.bounds.height = map.heightInPixels;
        this.player.setCollideWorldBounds(true);


        this.cursors = this.input.keyboard.createCursorKeys();

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.roundPixels = true;

        //  animation with key 'left', we don't need left and right as we will use one and flip the sprite
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { frames: [1, 7, 1, 13]}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { frames: [1, 7, 1, 13]}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('player', {frames: [2, 8, 2, 14]}),
            frameRate: 10,
            repeat: -1

        });

        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('player', {frames: [0, 6, 0, 12]}),
            frameRate: 10,
            repeat: -1
        });

        this.physics.add.collider(this.player, obstacles, this.soundEffectPlay, false, this );

        this.spawns = this.physics.add.group({ classType: Phaser.GameObjects.Zone });
        for (var i = 0; i < 30; i++) {
            var x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
            var y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
            // parameters are x, y, width, height
            this.spawns.create(x, y, 20, 20);
        }

        this.physics.add.overlap(this.player, this.spawns, this.onMeetEnemy, false, this);
    },
    update: function (time, delta) {
        this.player.body.setVelocity(0);

        // Horizontal movement
        if (this.cursors.left.isDown)
        {
            this.player.body.setVelocityX(-80);
            this.player.flipX = true;
        }
        else if (this.cursors.right.isDown)
        {
            this.player.body.setVelocityX(80);
            this.player.flipX = false;

        }
        // Vertical movement
        if (this.cursors.up.isDown)
        {
            this.player.body.setVelocityY(-80);
        }
        else if (this.cursors.down.isDown)
        {
            this.player.body.setVelocityY(80);
        }

        if (this.cursors.left.isDown)
        {
            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.anims.play('right', true);
        }
        else if (this.cursors.up.isDown)
        {
            this.player.anims.play('up', true);
        }
        else if (this.cursors.down.isDown)
        {
            this.player.anims.play('down', true);
        }
        else
        {
            this.player.anims.stop();
        }

    },
    onMeetEnemy: function(player, zone){
        zone.x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
        zone.y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
        this.cameras.main.shake(3000);
        this.scene.switch('BattleScene');
    },
    soundEffectPlay: function(){
        var bump = this.sound.add('bump');
        bump.play();
    }

});

console.log(BootScene);
console.log(WorldScene);
console.log(BattleScene);
console.log(Phaser.Scene);

var config = {
    type: Phaser.AUTO,
    parent: 'content',
    width: 320,
    height: 240,
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
        WorldScene,
        BattleScene
    ]
};

var game = new Phaser.Game(config);