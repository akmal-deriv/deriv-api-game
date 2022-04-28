/* eslint-disable no-restricted-globals*/
import Phaser from 'phaser';

class LeaderboardScene extends Phaser.Scene {
    constructor() {
        super('LeaderboardScene');
    }

    create() {
        const api_url = 'http://example.com/userRanks.json';

        const testing_data = [
            {
                rank: '1',
                score: '2700',
                name: 'player 1',
            },
            {
                rank: '2',
                score: '2600',
                name: 'player 2',
            },
            {
                rank: '3',
                score: '2500',
                name: 'player 3',
            },
            {
                rank: '4',
                score: '2400',
                name: 'player 4',
            },
            {
                rank: '5',
                score: '2300',
                name: 'player 5',
            },
            {
                rank: '6',
                score: '2200',
                name: 'player 6',
            },
            {
                rank: '7',
                score: '2100',
                name: 'player 7',
            },
            {
                rank: '8',
                score: '2000',
                name: 'player 8',
            },
            {
                rank: '9',
                score: '1900',
                name: 'player 9',
            },
            {
                rank: '10',
                score: '1800',
                name: 'player 10',
            },
        ];

        const background = this.add.sprite(0, 0, 'title_background');
        // eslint-disable-next-line no-unused-vars
        const title = this.add.bitmapText(this.game.config.width - 500, 50, 'carrier_command', 'LEADERBOARD', 34);

        const rank = this.add.bitmapText(80, 150, 'carrier_command', 'RANK', 34);
        const score = this.add.bitmapText(280, 150, 'carrier_command', 'SCORE', 34);
        const name = this.add.bitmapText(580, 150, 'carrier_command', 'NAME', 34);

        testing_data.forEach(record => {
            this.addScore(record.rank, record.score, record.name);
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
    }

    addScore(rank, score, name) {
        this.add.bitmapText(80, 150 + 60 * rank, 'carrier_command', rank, 34);
        this.add.bitmapText(280, 150 + 60 * rank, 'carrier_command', score, 34);
        this.add.bitmapText(580, 150 + 60 * rank, 'carrier_command', name, 34);
    }
}

export default LeaderboardScene;
