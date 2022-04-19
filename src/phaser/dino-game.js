import Phaser from "phaser";

class DinoGame extends Phaser.Scene {
  constructor() {
    super("PlayScene");
  }

  create() {
    const { height, width } = this.game.config;

    this.gameSpeed = 10;
    this.respawnTime = 0;
    this.ground = this.add
      .tileSprite(0, height, width, 26, "ground")
      .setOrigin(0, 1);
    this.dino = this.physics.add
      .sprite(0, height, "dino-idle")
      .setCollideWorldBounds(true)
      .setGravityY(5000)
      .setOrigin(0, 1);


      this.obsticles = this.physics.add.group({ allowGravity: false });


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

  placeObsticle() {
    const obsticleNum = Math.floor(Math.random() * 7) + 1;
    const distance = Phaser.Math.Between(600, 900);
    let obsticle;

    if (obsticleNum > 6) {
      const enemyHeight = [20, 50];
      obsticle = this.obsticles.create(this.game.config.width + distance, this.game.config.height - enemyHeight[Math.floor(Math.random() * 2)], `enemy-bird`)
        .setOrigin(0, 1)
        obsticle.play('enemy-dino-fly', 1);
      obsticle.body.height = obsticle.body.height / 1.5;
    }

    else {
      obsticle = this.obsticles.create(this.game.config.width + distance, this.game.config.height, `obsticle-${obsticleNum}`)
        .setOrigin(0, 1)
     obsticle.body.offset.y = +10;
    }

    obsticle.setImmovable();
  }

  initAnims() {
    this.anims.create({
      key: "dino-run",
      frames: this.anims.generateFrameNumbers("dino", { start: 2, end: 3 }),
      frameRate: 10,
      repeat: -1,
    })

    this.anims.create({
      key: 'enemy-dino-fly',
      frames: this.anims.generateFrameNumbers('enemy-bird', {start: 0, end: 1}),
      frameRate: 6,
      repeat: -1
    })

  }

  update(time,delta) {
    this.ground.tilePositionX += this.gameSpeed;
    Phaser.Actions.IncX(this.obsticles.getChildren(), -this.gameSpeed);
    this.respawnTime += delta * this.gameSpeed * 0.08;
    if (this.respawnTime >= 1500) {
      this.placeObsticle();
      this.respawnTime = 0;
    }

    if (this.dino.body.deltaAbsY() > 0) {
      this.dino.anims.stop();
      this.dino.setTexture("dino", 0);
    } else {
      this.dino.play("dino-run", true);
    }
  }
}

export default DinoGame;