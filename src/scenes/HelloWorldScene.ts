import Phaser from "phaser";

// Keys
const GROUND = "ground";
const DUDE = "dude";

const LEFT = "left";
const RIGHT = "right";
const TURN = "turn";


export default class HelloWorldScene extends Phaser.Scene {

  private platforms?: Phaser.Physics.Arcade.StaticGroup;
  private player?: Phaser.Physics.Arcade.Sprite;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super("hello-world");
  }
  
  preload() {
    this.load.image("sky", "assets/sky.png");
    this.load.image(GROUND, "assets/platform.png");
    this.load.image("star", "assets/star.png");
    this.load.image("bomb", "assets/bomb.png");
    this.load.spritesheet(DUDE, "assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
      this.add.image(400, 300, "sky");
      this.platforms = this.physics.add.staticGroup();
      this.platforms.create(400, 568, GROUND).setScale(2).refreshBody() as Phaser.Physics.Arcade.Sprite;

      this.platforms.create(600, 400, GROUND);
      this.platforms.create(50, 250, GROUND);
      this.platforms.create(750, 220, GROUND);

      this.player = this.physics.add.sprite(100, 450, DUDE);
      this.player.setBounce(0.2);
      this.player.setCollideWorldBounds(true);

      this.anims.create({
        key: LEFT,
        frames: this.anims.generateFrameNumbers(DUDE, {
          start: 0,
          end: 3
        }),
        frameRate: 10,
        repeat: -1,
      })

      this.anims.create({
        key: TURN,
        frames: [{
          key: DUDE,
          frame: 4
        }],
        frameRate: 20
      })

      this.anims.create({
        key: RIGHT,
        frames: this.anims.generateFrameNumbers(DUDE, {
          start: 5,
          end: 8
        }),
        frameRate: 10,
        repeat: -1
      })

      this.physics.add.collider(this.player, this.platforms);

      this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    
    if(this.cursors?.left?.isDown) {
      this.player?.setVelocityX(-160);
      this.player?.anims.play(LEFT, true);
    } else if (this.cursors?.right?.isDown) {
      this.player?.setVelocityX(160);
      this.player?.anims.play(RIGHT, true);
    } else {
      this.player?.setVelocityX(0);
      this.player?.anims.play(TURN);
    }

    if(this.cursors?.up?.isDown && this.player?.body.touching.down) {
      this.player.setVelocityY(-330);
    }
  }
}
