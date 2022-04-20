
import Phaser from 'phaser';

class PreloadScene extends Phaser.Scene {

  constructor() {
    super('PreloadScene');
  }

  preload() {
    this.load.audio('jump', 'assets/sounds/jump.m4a');
    this.load.audio('hit', 'assets/sounds/hit.m4a');
    this.load.audio('reach', 'assets/sounds/reach.m4a');

    this.load.image('ground', 'assets/images/ground.png');
    this.load.image('dino-idle', 'assets/images/dino-idle.png');
    this.load.image('dino-hurt', 'assets/images/dino-hurt.png');
    this.load.image('restart', 'assets/images/restart.png');
    this.load.image('game-over', 'assets/images/game-over.png')
    this.load.image('cloud', 'assets/images/cloud.png');

    this.load.spritesheet('star', 'assets/images/stars.png', {
      frameWidth: 9, frameHeight: 9
    });

    this.load.spritesheet('moon', 'assets/images/moon.png', {
      frameWidth: 20, frameHeight: 40
    });

    this.load.spritesheet('dino', 'assets/images/dino-run.png', {
      frameWidth: 88,
      frameHeight: 94
    })

    this.load.spritesheet('dino-down', 'assets/images/dino-down.png', {
      frameWidth: 118,
      frameHeight: 94
    })

    this.load.spritesheet('enemy-bird', 'assets/images/enemy-bird.png', {
      frameWidth: 92,
      frameHeight: 77
    })

    this.load.image('obsticle-0', 'assets/images/cactuses_small_3.png')
    this.load.image('obsticle-1', 'assets/images/cactuses_small_1.png')
    this.load.image('obsticle-2', 'assets/images/cactuses_small_2.png')
    this.load.image('obsticle-3', 'assets/images/cactuses_small_3.png')
    this.load.image('obsticle-4', 'assets/images/cactuses_big_1.png')
    this.load.image('obsticle-5', 'assets/images/cactuses_big_2.png')
    this.load.image('obsticle-6', 'assets/images/cactuses_big_3.png')
  }

  create() {
    this.scene.start('PlayScene');
  }
}

export default PreloadScene;
