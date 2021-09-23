import Phaser from "phaser";

// Keys
const SKY = "sky";
const BOMB = "bomb";
const GROUND = "ground";
const DUDE = "dude";
const STAR = "stars";

const LEFT = "left";
const RIGHT = "right";
const TURN = "turn";


export default class HelloWorldScene extends Phaser.Scene {

  private platforms?: Phaser.Physics.Arcade.StaticGroup;
  private player?: Phaser.Physics.Arcade.Sprite;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private stars?: Phaser.Physics.Arcade.Group;

  private score = 0;
  private scoreText?: Phaser.GameObjects.Text;
  

  constructor() {
    super("hello-world");
  }
  
  preload() {
    this.load.image(SKY, "assets/sky.png");
    this.load.image(GROUND, "assets/platform.png");
    this.load.image(STAR, "assets/star.png");
    this.load.image(BOMB, "assets/bomb.png");
    this.load.spritesheet(DUDE, "assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
      this.add.image(400, 300, SKY);
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

      this.stars = this.physics.add.group({
        key: STAR,
        repeat: 11,
        setXY: {
          x: 12,
          y: 0,
          stepX: 70
        }
      })

      this.stars.children.iterate((c) => {
        const child = c as Phaser.Physics.Arcade.Image;
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      })

      this.physics.add.collider(this.stars, this.platforms);
      this.physics.add.overlap(this.player, this.stars, this.handleCollectStars, undefined, this);

      this.scoreText = this.add.text(16, 16, `Score: ${this.score}`, {
        fontSize: "32px", color: "#000"
      })
      
  }

  private handleCollectStars(player: Phaser.GameObjects.GameObject, s: Phaser.GameObjects.GameObject) {
    const star = s as Phaser.Physics.Arcade.Image;
    star.disableBody(true, true);

    this.score += 10;
    this.scoreText?.setText(`Score: ${this.score}`)
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
