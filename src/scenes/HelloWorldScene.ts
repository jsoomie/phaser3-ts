import Phaser from "phaser";

// Keys
const GROUND = "ground";


export default class HelloWorldScene extends Phaser.Scene {

  private platforms?: Phaser.Physics.Arcade.StaticGroup;

  constructor() {
    super("hello-world");
  }

  preload() {
    this.load.image("sky", "assets/sky.png");
    this.load.image(GROUND, "assets/platform.png");
    this.load.image("star", "assets/star.png");
    this.load.image("bomb", "assets/bomb.png");
    this.load.spritesheet("dude", "assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
      this.add.image(400, 300, "sky");
      this.platforms = this.physics.add.staticGroup();
      const ground = this.platforms.create(400, 568, GROUND) as Phaser.Physics.Arcade.Sprite;
      ground.setScale(2).refreshBody();

      this.platforms.create(600, 400, GROUND);
      this.platforms.create(50, 250, GROUND);
      this.platforms.create(750, 220, GROUND);
  }

  update() {}
}
