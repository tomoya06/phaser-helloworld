import Phaser from "phaser";
import skyPng from "./assets/sky.png";
import platformPng from "./assets/platform.png";
import starPng from "./assets/star.png";
import bombPng from "./assets/bomb.png";
import dudePng from "./assets/dude.png";

let platforms: Phaser.Physics.Arcade.StaticGroup;
let player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
let cursors: Phaser.Types.Input.Keyboard.CursorKeys;

const game = new Phaser.Game({
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: {
    preload: function () {
      this.load.image("sky", skyPng);
      this.load.image("ground", platformPng);
      this.load.image("star", starPng);
      this.load.image("bomb", bombPng);
      this.load.spritesheet("dude", dudePng, {
        frameWidth: 32,
        frameHeight: 48,
      });
    },
    create: function () {
      this.add.image(0, 0, "sky").setOrigin(0, 0);
      this.add.image(0, 0, "star").setOrigin(0, 0);

      platforms = this.physics.add.staticGroup();
      platforms.create(400, 568, "ground").setScale(2).refreshBody();
      platforms.create(600, 400, "ground");
      platforms.create(50, 250, "ground");
      platforms.create(750, 220, "ground");

      player = this.physics.add.sprite(100, 0, "dude");
      player.setGravityY(100);
      player.setBounce(0.4);
      player.setCollideWorldBounds(true);
      player.body.setMass(300);

      this.anims.create({
        key: "left",
        frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1,
      });

      this.anims.create({
        key: "turn",
        frames: [{ key: "dude", frame: 4 }],
        frameRate: 20,
      });

      this.anims.create({
        key: "right",
        frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1,
      });

      this.physics.add.collider(player, platforms);

      cursors = this.input.keyboard.createCursorKeys();
    },
    update: function () {
      if (cursors.left.isDown) {
        player.setVelocityX(-100);
        player.anims.play("left", true);
      } else if (cursors.right.isDown) {
        player.setVelocityX(100);
        player.anims.play("right", true);
      } else {
        player.setVelocityX(0);
        player.anims.play("turn", true);
      }

      if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-400);
      }
    },
  },
});
