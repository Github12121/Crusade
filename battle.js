
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
