import Phaser from 'phaser';
import EventDispatcher from '../util/eventDispatcher';

const backgrounds = ['background1', 'background2', 'background3', 'background4', 'background5', 'background6'];
// eslint-disable-next-line no-unused-vars
let dynamic_background, background;
let background_index = 0;

class DinoGame extends Phaser.Scene {
    constructor() {
        super('PlayScene');
        this.new_background = backgrounds[0];
    }

    create() {
        const { height, width } = this.game.config;

        this.emitter = EventDispatcher.getInstance();
        this.gameSpeed = 10;
        this.isGameRunning = false;
        this.respawnTime = 0;
        this.score = 0;

        this.jumpSound = this.sound.add('jump', { volume: 0.2 });
        this.hitSound = this.sound.add('hit', { volume: 0.2 });
        this.reachSound = this.sound.add('reach', { volume: 0.2 });

        this.startTrigger = this.physics.add.sprite(0, 10).setOrigin(0, 1).setImmovable();

        this.background = this.add
            .tileSprite(0, height, window.innerWidth, window.innerHeight, backgrounds[0])
            .setOrigin(0, 1);

        this.dynamic_background = this.add
            .tileSprite(0, height, window.innerWidth, window.innerHeight, backgrounds[1])
            .setOrigin(0, 1);
        this.dynamic_background.alpha = 0;

        this.ground = this.add
            .tileSprite(0, height * 1.1, window.innerWidth, window.innerHeight, 'ground')
            .setOrigin(0, 1);
        this.dino = this.physics.add
            .sprite(5, height, 'dino-idle')
            .setCollideWorldBounds(true)
            .setGravityY(5000)
            .setBodySize(44, 92)
            .setDepth(1)
            .setOrigin(0, 1);

        this.scoreText = this.add
            .text(width - 50, 0, '00000', {
                fill: '#000000',
                font: '900 35px Courier',
                resolution: 5,
            })
            .setOrigin(1, 0)
            .setAlpha(0);

        this.highScoreText = this.add
            .text(0, 0, '00000', {
                fill: '#FF0000',
                font: '900 35px Courier',
                resolution: 5,
            })
            .setOrigin(1, 0)
            .setAlpha(0);
        this.environment = this.add.group();

        this.environment.setAlpha(0);

        this.gameOverScreen = this.add.container(width / 2, height / 2 - 50).setAlpha(0);
        this.gameOverText = this.add.image(0, 0, 'game-over');
        this.restart = this.add.image(0, 80, 'restart').setInteractive();
        this.gameOverScreen.add([this.gameOverText, this.restart]);

        this.obsticles = this.physics.add.group({ allowGravity: false });

        const fullscreen_btn = this.add
            .image(width - 5, 3, 'fullscreen', 0)
            .setOrigin(1, 0)
            .setInteractive();
        const f_key = this.input.keyboard.addKey('F');

        fullscreen_btn.on(
            'pointerup',
            function () {
                if (this.scale.isFullscreen) {
                    fullscreen_btn.setFrame(0);

                    this.scale.stopFullscreen();
                } else {
                    fullscreen_btn.setFrame(1);

                    this.scale.startFullscreen();
                }
            },
            this
        );

        f_key.on(
            'down',
            function () {
                if (this.scale.isFullscreen) {
                    fullscreen_btn.setFrame(0);
                    this.scale.stopFullscreen();
                } else {
                    fullscreen_btn.setFrame(1);
                    this.scale.startFullscreen();
                }
            },
            this
        );

        this.initAnims();
        this.initStartTrigger();
        this.initColliders();
        this.handleInputs();
        this.handleScore();
        this.changeBackgroundListener();
        this.setListeners(this);
    }

    setListeners(scene) {
        this.emitter.on('CHANGE_BACKGROUND', () => this.changeBackgroundEvent(scene));
    }

    changeBackgroundListener() {
        setInterval(() => {
            if (this.score >= 0 && this.score < 200 && this.new_background !== backgrounds[0]) {
                this.new_background = backgrounds[0];
                this.emitter.emit('CHANGE_BACKGROUND');
            }
            if (this.score >= 200 && this.score < 400 && this.new_background !== backgrounds[1]) {
                this.new_background = backgrounds[1];
                this.emitter.emit('CHANGE_BACKGROUND');
            }
            if (this.score >= 400 && this.score < 600 && this.new_background !== backgrounds[2]) {
                this.new_background = backgrounds[2];
                this.emitter.emit('CHANGE_BACKGROUND');
            }
            if (this.score >= 600 && this.score < 800 && this.new_background !== backgrounds[3]) {
                this.new_background = backgrounds[3];
                this.emitter.emit('CHANGE_BACKGROUND');
            }
            if (this.score >= 800 && this.score < 1000 && this.new_background !== backgrounds[4]) {
                this.new_background = backgrounds[4];
                this.emitter.emit('CHANGE_BACKGROUND');
            }
            if (this.score >= 1000 && this.score < 1200 && this.new_background !== backgrounds[5]) {
                this.new_background = backgrounds[5];
                this.emitter.emit('CHANGE_BACKGROUND');
            }
        }, 1000);
    }

    changeBackgroundEvent(scene) {
        // create a function that tweens the correct background.
        const background_to_tween = [scene.dynamic_background, scene.background];
        if (background_index === 0) {
            background_to_tween[background_index].setTexture(scene.new_background);
            scene.tweens.add({
                targets: background_to_tween[background_index],
                alpha: { value: 1, duration: 2000, ease: 'Power1' },
            });
            setTimeout(() => {
                scene.tweens.killAll();
                background_index = 1;
            }, 2000);
        }
        if (background_index === 1) {
            background_to_tween[background_index].setTexture(scene.new_background);
            scene.tweens.add({
                targets: background_to_tween[0],
                alpha: { value: 0, duration: 2000, ease: 'Power1' },
            });
            setTimeout(() => {
                scene.tweens.killAll();
                background_index = 0;
            }, 2000);
        }
    }

    initColliders() {
        this.physics.add.collider(
            this.dino,
            this.obsticles,
            () => {
                this.highScoreText.x = this.scoreText.x - this.scoreText.width - 20;

                const highScore = this.highScoreText.text.substr(this.highScoreText.text.length - 5);
                const newScore = Number(this.scoreText.text) > Number(highScore) ? this.scoreText.text : highScore;

                this.highScoreText.setText('HI ' + newScore);
                this.highScoreText.setAlpha(1);

                this.physics.pause();
                this.isGameRunning = false;
                this.anims.pauseAll();
                this.dino.setTexture('dino-hurt');
                this.respawnTime = 0;
                this.gameSpeed = 10;
                this.gameOverScreen.setAlpha(1);
                this.score = 0;
                this.hitSound.play();
            },
            null,
            this
        );
    }

    initStartTrigger() {
        const { width, height } = this.game.config;
        this.physics.add.overlap(
            this.startTrigger,
            this.dino,
            () => {
                if (this.startTrigger.y === 10) {
                    this.startTrigger.body.reset(0, height);
                    return;
                }

                this.startTrigger.disableBody(true, true);

                const startEvent = this.time.addEvent({
                    delay: 1000 / 60,
                    loop: true,
                    callbackScope: this,
                    callback: () => {
                        this.dino.setVelocityX(80);
                        this.dino.play('dino-run', 1);

                        if (this.ground.width < width) {
                            this.ground.width += 17 * 2;
                        }

                        if (this.ground.width >= 1000) {
                            this.ground.width = width;
                            this.isGameRunning = true;
                            this.dino.setVelocityX(0);
                            this.scoreText.setAlpha(1);
                            this.environment.setAlpha(1);
                            startEvent.remove();
                        }
                    },
                });
            },
            null,
            this
        );
    }

    initAnims() {
        this.anims.create({
            key: 'dino-run',
            frames: this.anims.generateFrameNumbers('dino', { start: 2, end: 3 }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: 'dino-down-anim',
            frames: this.anims.generateFrameNumbers('dino-down', {
                start: 0,
                end: 1,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: 'doge-coin-fly',
            frames: this.anims.generateFrameNumbers('doge-coin', {
                start: 0,
                end: 1,
            }),
            frameRate: 6,
            repeat: -1,
        });
    }

    handleScore() {
        this.time.addEvent({
            delay: 1000 / 10,
            loop: true,
            callbackScope: this,
            callback: () => {
                if (!this.isGameRunning) {
                    return;
                }

                this.score++;
                this.gameSpeed += 0.01;

                if (this.score % 100 === 0) {
                    this.reachSound.play();

                    this.tweens.add({
                        targets: this.scoreText,
                        duration: 100,
                        repeat: 3,
                        alpha: 0,
                        yoyo: true,
                    });
                }

                const score = Array.from(String(this.score), Number);
                for (let i = 0; i < 5 - String(this.score).length; i++) {
                    score.unshift(0);
                }

                this.scoreText.setText(score.join(''));
            },
        });
    }
    
    jumpsCount = 0;

    jump() {
        if (this.jumpsCount >= 2) {
            return;
        }

        this.jumpSound.play();
        this.dino.body.height = 92;
        this.dino.body.offset.y = 0;
        this.dino.setVelocityY(-1600);
        this.dino.setTexture('dino', 0);
        this.jumpsCount = this.jumpsCount + 1;
    }

    handleInputs() {
        this.restart.on('pointerdown', () => {
            this.dino.setVelocityY(0);
            this.dino.body.height = 92;
            this.dino.body.offset.y = 0;
            this.physics.resume();
            this.obsticles.clear(true, true);
            this.isGameRunning = true;
            this.gameOverScreen.setAlpha(0);
            this.anims.resumeAll();
        });

        this.input.keyboard.on('keydown-SPACE', () => {
            if (this.dino.body.onFloor()) {
                this.jumpsCount = 0;
            }
            this.jump();
        });

        this.input.keyboard.on('keydown-UP', () => {
            if (this.dino.body.onFloor()) {
                this.jumpsCount = 0;
            }
            this.jump();
        });

        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.switch('TitleScene');
        });

        this.input.keyboard.on('keydown-DOWN', () => {
            if (!this.dino.body.onFloor() || !this.isGameRunning) {
                return;
            }

            this.dino.body.height = 58;
            this.dino.body.offset.y = 34;
        });

        this.input.keyboard.on('keyup-DOWN', () => {
            if (this.score !== 0 && !this.isGameRunning) {
                return;
            }

            this.dino.body.height = 92;
            this.dino.body.offset.y = 0;
        });
    }

    placeObsticle(enemy_level) {
        const distance = Phaser.Math.Between(600, 900);

        let obsticle;

        if (enemy_level >= 10) {
            const enemyHeight = [50, 80];
            obsticle = this.obsticles
                .create(
                    this.game.config.width + distance,
                    this.game.config.height - enemyHeight[Math.floor(Math.random() * 2)],
                    `doge-coin`
                )
                .setOrigin(0, 1);
            obsticle.play('doge-coin-fly', 1);
            obsticle.body.height = obsticle.body.height / 1.5;
        } else {
            obsticle = this.obsticles
                .create(
                    this.game.config.width + distance,
                    this.game.config.height,
                    `enemy_coin_${enemy_level || Math.floor(Math.random() * 7)}`
                )
                .setOrigin(0, 1);

            obsticle.body.offset.y = +10;
        }

        obsticle.setImmovable();
    }

    update(time, delta) {
        if (!this.isGameRunning) {
            return;
        }
        this.ground.tilePositionX += this.gameSpeed;
        this.background.tilePositionX += this.gameSpeed * 0.25;
        this.dynamic_background.tilePositionX += this.gameSpeed * 0.25;
        Phaser.Actions.IncX(this.obsticles.getChildren(), -this.gameSpeed);
        Phaser.Actions.IncX(this.environment.getChildren(), -0.5);
        this.respawnTime += delta * this.gameSpeed * 0.08;
        if (this.respawnTime >= 1500) {
            const enemy_level = parseInt(sessionStorage.getItem('enemy_level')) ?? 0;
            this.placeObsticle(enemy_level);
            this.respawnTime = 0;
        }

        this.obsticles.getChildren().forEach(obsticle => {
            if (obsticle.getBounds().right < 0) {
                this.obsticles.killAndHide(obsticle);
            }
        });

        this.environment.getChildren().forEach(env => {
            if (env.getBounds().right < 0) {
                env.x = this.game.config.width + 30;
            }
        });

        if (this.dino.body.deltaAbsY() > 0) {
            this.dino.anims.stop();
            this.dino.setTexture('dino', 0);
        } else {
            this.dino.body.height <= 58 ? this.dino.play('dino-down-anim', true) : this.dino.play('dino-run', true);
        }
    }
}

export default DinoGame;
