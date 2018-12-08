var BootScene = new Phaser.Class({

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