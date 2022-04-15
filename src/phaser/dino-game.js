import Phaser from 'phaser';

class DinoGame extends Phaser.Scene {

  constructor() {
    super('PlayScene');
  }

  create() {
    const { height, width } = this.game.config;
    this.gameSpeed = 10;
    this.ground = this.add.tileSprite(0, height, width, 26,    'ground').setOrigin(0, 1);
    this.dino = this.physics.add.sprite(0, height, 'dino-  idle').setOrigin(0, 1);
  }

  update() {

  }
}

export default DinoGame;