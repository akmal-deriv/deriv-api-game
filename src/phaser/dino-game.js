import Phaser from "phaser";

class DinoGame extends Phaser.Scene {
  constructor() {
    super("PlayScene");
  }

  create() {
    const { height, width } = this.game.config;

    this.gameSpeed = 10;
    this.ground = this.add
      .tileSprite(0, height, width, 26, "ground")
      .setOrigin(0, 1);
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
    this.ground.tilePositionX += this.gameSpeed;

    if (this.dino.body.deltaAbsY() > 0) {
      this.dino.anims.stop();
      this.dino.setTexture("dino", 0);
    } else {
      this.dino.play("dino-run", true);
    }
  }
}

export default DinoGame;
