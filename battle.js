
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
    },

    choose: function() {
        return Math.floor(Math.random() * 4);
    }
});

var Player = new Phaser.Class({
    Extends: Character,

    initialize: function Player(scene, x, y, texture, frame, type, hp, damage) {
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

        this.currentCharacter = null;

        var warrior = new Player(this, 250, 50, 'player', 1, 'Warrior', 100, 20);
        warrior.flipX = true;
        warrior.setScale(1.5);
        this.add.existing(warrior);

        var mage = new Player(this, 250, 100, 'player', 4, 'Mage', 100, 20);
        mage.flipX = true;
        mage.setScale(2);
        this.add.existing(mage);

        var cyclops = new Enemy(this, 50, 50, 'cyclops', 0, 'Cyclops', 100, 20);
        cyclops.flipX = false;
        cyclops.setScale(1.2);
        cyclops.anims.play('cyclopsFight');
        this.add.existing(cyclops);

        var spider = new Enemy(this, 50, 100, 'spider', 0, 'Spider', 100, 20);
        spider.flipX = true;
        spider.setScale(2);
        spider.anims.play('spiderFight');
        this.add.existing(spider);

        this.currentCharacter = warrior;
        this.characters = [warrior, mage, cyclops, spider];
        this.characterIndex = 0;

        // Create status box and retain handle
        this.scene.launch('BattleSceneUI');
        this.status = this.scene.get('BattleSceneUI');

    },

    update: function()
    {
        this.nextTurn();
    },

    nextTurn: function() {
        this.characterIndex = this.characterIndex + 1;
        if(this.characterIndex > 3) {
            this.characterIndex = 0;
        }
        this.currentCharacter = this.characters[this.characterIndex];
        this.status.text.setText("It is the " + this.currentCharacter.type + "'s turn");

        var opponent = this.currentCharacter.choose();
        this.currentCharacter = null;
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
        this.graphics.strokeRect(10, 150, 300, 80);
        this.graphics.fillRect(10,151,299,79);
        this.text = this.add.text(35, 160, 'Let us begin!', {fill: 'white'});
    }
});
