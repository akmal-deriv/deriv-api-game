import Phaser from "phaser";

let player;
let stars;
let platforms;
let cursors;
let movingPlatform;
let score = 0;
let score_text;
let bombs;
let gameOver = false;

class playPlatformerGame extends Phaser.Scene {
  constructor() {
    super("PlayPlatformerGame");
  }
  preload() {
    this.load.setBaseURL("http://labs.phaser.io"); // TODO: provide url to our own assets

    this.load.image("sky", "assets/skies/sky4.png");
    this.load.image("ground", "assets/sprites/platform.png");
    this.load.image("star", "assets/demoscene/ball-tlb.png");
    this.load.image('bomb', 'assets/sprites/ghost.png');
    this.load.spritesheet("dude", "assets/sprites/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  collectStar(player, star) {
    star.disableBody(true, true);

    score += 10;
    score_text.setText("score: " + score);

    if (stars.countActive(true) === 0)
    {
        stars.children.iterate(function (child) {
            child.enableBody(true, child.x, 0, true, true);
        });
        let x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        let bomb = bombs.create(x, 16, 'bomb').setScale(0.25).refreshBody();
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        bomb.allowGravity = false;
    }
  }

  hitBomb(player, bomb) {
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play("turn");
    gameOver = true;
  }

  create() {
    this.add.image(400, 300, "sky");

    score_text = this.add.text(16, 16, "score: 0", {
      fontSize: "32px",
      fill: "#000",
    });

    platforms = this.physics.add.staticGroup();

    platforms.create(400, 610, "ground").setScale(2).refreshBody();

    platforms.create(600, 400, "ground").setScale(0.5).refreshBody();
    platforms.create(150, 250, "ground").setScale(0.5).refreshBody();
    platforms.create(750, 220, "ground").setScale(0.5).refreshBody();

    // movingPlatform = this.physics.add.image(400, 400, "ground");

    // movingPlatform.setImmovable(true);
    // movingPlatform.body.allowGravity = false;
    // movingPlatform.setVelocityX(50);

    player = this.physics.add.sprite(100, 450, "dude");

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

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

    cursors = this.input.keyboard.createCursorKeys();

    stars = this.physics.add.group({
      key: "star",
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
    });

    stars.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    bombs = this.physics.add.group();

    this.physics.add.collider(player, platforms);
    // this.physics.add.collider(player, movingPlatform);
    this.physics.add.collider(stars, platforms);
    // this.physics.add.collider(stars, movingPlatform);
    this.physics.add.collider(bombs, platforms);

    this.physics.add.overlap(player, stars, this.collectStar, null, this);
    this.physics.add.collider(player, bombs, this.hitBomb, null, this);
  }

  update() {
    if (gameOver) {
        return;
    }

    if (cursors.left.isDown) {
      player.setVelocityX(-160);

      player.anims.play("left", true);
    } else if (cursors.right.isDown) {
      player.setVelocityX(160);

      player.anims.play("right", true);
    } else {
      player.setVelocityX(0);

      player.anims.play("turn");
    }

    if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-330);
    }

    // if (movingPlatform.x >= 500) {
    //   movingPlatform.setVelocityX(-50);
    // } else if (movingPlatform.x <= 300) {
    //   movingPlatform.setVelocityX(50);
    // }
  }
}

export default playPlatformerGame;
