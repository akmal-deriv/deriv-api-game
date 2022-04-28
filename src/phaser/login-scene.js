// /* eslint-disable no-restricted-globals*/
import Phaser from 'phaser';

// import Authorize API data
import getUserAuthorization from '../api/authorize';

const COLOR_PRIMARY = 0x83580b;
const COLOR_LIGHT = 0xd69830;

class LoginScene extends Phaser.Scene {
    constructor() {
        super('LoginScene');
    }

    create() {
        let print = this.add.text(0, 0, '');
        const background = this.add.sprite(0, 0, 'title_background');
        background.setOrigin(0, 0);
        background.setDisplaySize(this.game.config.width, this.game.config.height);
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;

        let loginDialog = CreateLoginDialog(this, {
            x: screenCenterX,
            y: 450,
            title: 'Deriv',
            error: 'error',
            userToken: '',
        })
            .on('login', function (userToken) {
                getUserAuthorization(userToken)
                    .then(response => {
                        sessionStorage.setItem('user_token', userToken);
                        sessionStorage.setItem('user_email', response.authorize.email);

                        showTitlePage();
                    })
                    .catch(err => {
                        alert(err.error.message);
                        sessionStorage.removeItem('user_token');
                        sessionStorage.removeItem('user_email');
                    });
            })
            .popUp(500);

        this.message = this.add
            .text(screenCenterX, 250, 'Submit your Deriv API token for playing the game', {
                color: '#FFFFFF',
                fontSize: 30,
                fontStyle: 'bold',
                align: 'center',
            })
            .setOrigin(0.5);

        const showTitlePage = () => {
            this.scene.switch('TitleScene');
        };
    }

    update() {}
}

const GetValue = Phaser.Utils.Objects.GetValue;
let CreateLoginDialog = function (scene, config, onSubmit) {
    let userToken = GetValue(config, 'userToken', '');
    let title = GetValue(config, 'title', 'Deriv');

    let x = GetValue(config, 'x', 0);
    let y = GetValue(config, 'y', 0);
    let width = GetValue(config, 'width', undefined);
    let height = GetValue(config, 'height', undefined);

    let background = scene.rexUI.add.roundRectangle(0, 0, 10, 10, 10, COLOR_PRIMARY);
    let titleField = scene.add.text(0, 0, title);

    let userTokenField = scene.rexUI.add
        .label({
            orientation: 'x',
            background: scene.rexUI.add.roundRectangle(0, 0, 10, 10, 10).setStrokeStyle(2, COLOR_LIGHT),
            icon: scene.add.image(0, 0, 'token'),
            text: scene.rexUI.add.BBCodeText(0, 0, userToken, { fixedWidth: 250, fixedHeight: 36, valign: 'center' }),
            space: { top: 5, bottom: 5, left: 5, right: 5, icon: 10 },
        })
        .setInteractive()
        .on('pointerdown', () => {
            let config = {
                type: 'text',
                text: userToken,
                onTextChanged: function (textObject, text) {
                    userToken = text;
                    textObject.text = text;
                },
            };
            scene.rexUI.edit(userTokenField.getElement('text'), config);
        });

    let submitButton = scene.rexUI.add
        .label({
            orientation: 'x',
            background: scene.rexUI.add.roundRectangle(0, 0, 10, 10, 10, COLOR_LIGHT),
            text: scene.add.text(0, 0, 'Submit'),
            space: { top: 8, bottom: 8, left: 8, right: 8 },
        })
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', function () {
            loginDialog.emit('login', userToken);
        });

    let loginDialog = scene.rexUI.add
        .sizer({
            orientation: 'y',
            x: x,
            y: y,
            width: width,
            height: height,
        })
        .addBackground(background)
        .add(titleField, 0, 'center', { top: 20, bottom: 30, left: 10, right: 10 }, false)
        .add(userTokenField, 0, 'left', { bottom: 30, left: 10, right: 10 }, true)
        .add(submitButton, 0, 'center', { bottom: 20, left: 10, right: 10 }, false)
        .layout();
    return loginDialog;
};

export default LoginScene;
