/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals*/
import Phaser from 'phaser';

class CreditsScene extends Phaser.Scene {
    constructor() {
        super('CreditsScene');
    }

    create() {

        const background = this.add.sprite(0, 0, 'title_background');
        const title = this.add.bitmapText(this.game.config.width - 500, 50, 'shortStack', 'CREDITS', 44);
        const name =  this.add.bitmapText(110, 150, 'desyrel', 'NAME', 40);
        const github = this.add.bitmapText(400, 150, 'desyrel', 'GITHUB', 40);
        const akmal = this.add.bitmapText(110, 250, 'desyrel', 'Akmal', 38);
        const akmal_git = this.add.bitmapText(400, 250, 'desyrel', 'https://github.com/akmal-binary', 38);
        const hubert = this.add.bitmapText(110, 350, 'desyrel', 'Hubert', 38);
        const hubert_git = this.add.bitmapText(400, 350, 'desyrel', 'https://github.com/hubert-deriv', 38);
        const mahdiyeh = this.add.bitmapText(110, 450, 'desyrel', 'Mahdiyeh', 38);
        const mahdiyeh_git = this.add.bitmapText(400, 450, 'desyrel', 'https://github.com/mahdiyeh-fs', 38);
        const vijayasree = this.add.bitmapText(110, 550, 'desyrel', 'Vijayasree', 38);
        const vijayasree_git = this.add.bitmapText(400, 550, 'desyrel', 'https://github.com/vijayasree-deriv', 38);
        const yauheni = this.add.bitmapText(110, 650, 'desyrel', 'Yauheni', 38);
        const yauheni_git = this.add.bitmapText(400, 650, 'desyrel', 'https://github.com/yauheni-kryzhyk-deriv', 38);

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