import Phaser from "phaser";

const backgrounds = [
  'background1',
  'background2',
  'background3',
  'background4',
  'background5',
  'background6',
]
class DinoGame extends Phaser.Scene {
  constructor() {
    super("PlayScene");
  }

  create() {
    const { height, width } = this.game.config;
    const enemyHeight = [20, 50];
    console.log(enemyHeight[Math.floor(Math.random() * 2)]);
    this.gameSpeed = 10;
    this.background = this.add
    .tileSprite(0, height, (width*1.75), 1025, "background1")
    .setScale(0.75)
    .setOrigin(0, 1);
    // this.ground = this.add
    //   .tileSprite(0, height, width, 26, "ground")
    //   .setOrigin(0, 1);
    this.dino = this.physics.add
      .sprite(0, height, "dino-idle")
      .setCollideWorldBounds(true)
      .setGravityY(5000)
      .setOrigin(0, 1);

    this.createControl();
    this.initAnims();
  }

  createControl() {
    this.input.keyboard.on("keydown-SPACE", () => {
      if (!this.dino.body.onFloor()) {
        return;
      }
      this.dino.setTexture("dino", 0);
      this.dino.setVelocityY(-1600);
    });
  }

  initAnims() {
    this.anims.create({
      key: "dino-run",
      frames: this.anims.generateFrameNumbers("dino", { start: 2, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });
  }

  update() {
    this.background.tilePositionX += this.gameSpeed;
    // this.ground.tilePositionX += this.gameSpeed;

    if (this.dino.body.deltaAbsY() > 0) {
      this.dino.anims.stop();
      this.dino.setTexture("dino", 0);
    } else {
      this.dino.play("dino-run", true);
    }
  }
}

export default DinoGame;
