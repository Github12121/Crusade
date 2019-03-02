var Character = new Phaser.Class({
    Extends: Phaser.GameObjects.Sprite,

    initialize: function Character(scene, x, y, texture, frame, type, hp, damage) {
        //alert('init');
        Phaser.GameObjects.Sprite.call(this, scene, x, y, texture, frame);
        this.type = type;
        this.hp = hp;
        this.damage = damage; // default damage

        this.setInteractive({useHandCursor: true, pixelPerfect: true});
        this.on('pointerover', function() {
            this.setTint(0x00ff00);
        });
        this.on('pointerout', function() {
            this.clearTint();
        });
        this.on('pointerdown', function() {
            scene.opponent = this;
        });
    },

    setOpponents: function(opponents) {
        this.opponents = opponents;
    },

    attack: function(target) {
        if (target.hp <= 0) {
            return;
        }
        target.takeDamage(this.damage);
        if (target.hp <= 0) {
            target = null;
        }
    },

    takeDamage: function(damage) {
        this.hp -= damage;
        if (this.hp <= 0) {
            this.visible = false;
        }
    },

    choose: function() {
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
    },

    reset: function() {
        this.hp = 100;
        this.visible = true;
    },

    choose: function() {
        var index = Math.floor(Math.random() * 2);
        return this.opponents[index];
    }
});
