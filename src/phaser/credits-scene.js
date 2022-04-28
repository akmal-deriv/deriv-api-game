/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals*/
import Phaser from 'phaser';

class CreditsScene extends Phaser.Scene {
    constructor() {
        super('CreditsScene');
    }

    create() {

        const background = this.add.sprite(0, 0, 'title_background');
        const title = this.add.bitmapText(this.game.config.width - 500, 50, 'carrier_command', 'CREDITS', 34);
        const name =  this.add.bitmapText(80, 150, 'desyrel', 'NAME', 40);
        const github = this.add.bitmapText(400, 150, 'desyrel', 'GITHUB', 40);
        const akmal = this.add.bitmapText(80, 250, 'carrier_command', 'Akmal', 24);
        const akmal_git = this.add.bitmapText(400, 250, 'carrier_command', 'https://github.com/akmal-binary', 24);
        const hubert = this.add.bitmapText(80, 350, 'carrier_command', 'Hubert', 24);
        const hubert_git = this.add.bitmapText(400, 350, 'carrier_command', 'https://github.com/hubert-deriv', 24);
        const mahdiyeh = this.add.bitmapText(80, 450, 'carrier_command', 'Mahdiyeh', 24);
        const mahdiyeh_git = this.add.bitmapText(400, 450, 'carrier_command', 'https://github.com/mahdiyeh-fs', 24);
        const vijayasree = this.add.bitmapText(80, 550, 'carrier_command', 'Vijayasree', 24);
        const vijayasree_git = this.add.bitmapText(400, 550, 'carrier_command', 'https://github.com/vijayasree-deriv', 24);
        const yauheni = this.add.bitmapText(80, 650, 'carrier_command', 'Yauheni', 24);
        const yauheni_git = this.add.bitmapText(400, 650, 'carrier_command', 'https://github.com/yauheni-kryzhyk-deriv', 24);

        const fullscreen_btn = this.add
            .image(this.game.config.width - 5, 5, 'fullscreen', 0)
            .setOrigin(1, 0)
            .setInteractive();
        const f_key = this.input.keyboard.addKey('F');

        background.setOrigin(0, 0);
        background.setDisplaySize(this.game.config.width, this.game.config.height);

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
handleInputs(){
    this.input.keyboard.on('keydown-ESC', () => {
        this.scene.switch('TitleScene');
    });}
}



export default CreditsScene;