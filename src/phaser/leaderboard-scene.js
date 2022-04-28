import Phaser from 'phaser';
/* eslint-disable no-restricted-globals*/
class LeaderboardScene extends Phaser.Scene {
    constructor() {
        super('LeaderboardScene');
    }

    create() {
        const api_url = 'https://udgo-be.herokuapp.com/v1';

        const background = this.add.sprite(0, 0, 'title_background');
        // eslint-disable-next-line no-unused-vars
        const title = this.add.bitmapText(this.game.config.width - 500, 50, 'carrier_command', 'LEADERBOARD', 34);

        const rank = this.add.bitmapText(80, 150, 'carrier_command', 'RANK', 34);
        const score = this.add.bitmapText(280, 150, 'carrier_command', 'SCORE', 34);
        const name = this.add.bitmapText(580, 150, 'carrier_command', 'NAME', 34);

        fetch(`${api_url}/data`)
            .then(response => response.json())
            .then(data => {
                data.forEach(record => {
                    this.addScore(record.rank, record.score, record.name);
                });
            });

        const fullscreen_btn = this.add
            .image(this.game.config.width - 5, 5, 'fullscreen', 0)
            .setOrigin(1, 0)
            .setInteractive();
        const f_key = this.input.keyboard.addKey('F');

        background.setOrigin(0, 0);
        background.setDisplaySize(this.game.config.width, this.game.config.height);

        rank.tint = 0xff69b4;
        score.tint = 0xff69b4;
        name.tint = 0xff69b4;

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

    this.handleInputs();
    }

    addScore(rank, score, name) {
        this.add.bitmapText(80, 150 + 60 * rank, 'carrier_command', rank, 34);
        this.add.bitmapText(280, 150 + 60 * rank, 'carrier_command', score, 34);
        this.add.bitmapText(580, 150 + 60 * rank, 'carrier_command', name, 34);
    }
    handleInputs(){
        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.switch('TitleScene');
        });}
}

export default LeaderboardScene;
