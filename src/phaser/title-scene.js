/* eslint-disable no-restricted-globals*/
import Phaser from "phaser";

class TitleScene extends Phaser.Scene {
  constructor() {
    super("TitleScene");
  }

  create() {
    const background = this.add.sprite(0, 0, "title_background");
    // eslint-disable-next-line no-unused-vars
    const title = this.add.bitmapText(
      this.game.config.width - 400,
      50,
      "carrier_command",
      "MAIN MENU",
      34
    );
    const option_1 = this.add.bitmapText(
      80,
      85,
      "carrier_command",
      "START",
      34,
    );
    const option_2 = this.add.bitmapText(
      80,
      140,
      "carrier_command",
      "LEVELS",
      34
    );
    const option_3 = this.add.bitmapText(
      80,
      195,
      "carrier_command",
      "OPtiONS",
      34
    );
    const option_4 = this.add.bitmapText(
      80,
      250,
      "carrier_command",
      "EXIT",
      34
    );

    background.setOrigin(0, 0);
    background.setDisplaySize(this.game.config.width, this.game.config.height);

    option_1.setInteractive({ useHandCursor: true });
    option_1.on("pointerdown", () => this.startGame());
    option_1.tint = 0xffff00;

    option_2.setInteractive({ useHandCursor: true });
    option_2.on("pointerdown", () => this.doNothing());

    option_3.setInteractive({ useHandCursor: true });
    option_3.on("pointerdown", () => this.doNothing());

    option_4.setInteractive({ useHandCursor: true });
    option_4.on("pointerdown", () => this.exitGame());
    option_4.tint = 0xff3333;
  }

  startGame() {
    this.scene.switch("PlayScene");
  }

  doNothing() {
    alert("Dear {client_name},\n\nThe current feature is only available to premium customers.\nPlay our game on your smartphone, tablet, Smart TV, laptop, all for one fixed monthly fee of $159 ONLY!\nNo extra costs, no contracts.\n\nI promise.");
  }

  exitGame() {
    const excuses = [
      "ARE YOU SURE YOU WANT TO DO IT?",
      "OUR GAME IS PERFECT!!!\nWILL YOU STILL DO THAT?",
      "THIS ACTION IS VERY DANGEROUS AND COULD LEAD TO IRREVERSIBLE DAMAGE!\nDO YOU STILL WANT TO PROCEED?",
      "THIS IS A WEB GAME.\nIMAGINE THE WORST POSSIBLE WAY HOW WE CAN CLOSE IT!\nTHIS IS EXACTLY WHAT WE WILL DO!",
      "DO YOU WANT TO TAKE THIS RISK?",
      "IT`S OK TO GIVE UP!\nJUST CLICK CANCEL..",
      "YOUR STUBBORNESS DOESN`T HAVE LIMITS.",
      "THERE WON`T BE ANY EASTER EGGS. DO YOU STILL WANT TO EXIT?",
      "ARE YOU SURE YOU WANT TO DO IT?",
      "OUR GAME IS PERFECT!!!\nWILL YOU STILL DO THAT?",
      "HAVE YOU NOTICED THAT THE MESSAGES STARTED TO REPEAT AGAIN?",
    ];

    for (let i = 0; i <= excuses.length; i++) {
      if (i === excuses.length) {
        alert(
          "I HAVE A BETTER IDEA!\nYOU HAVE NO CHOICE NOW\nDO YOU WANT TO CONTINUE PLAYING OUR GAME?"
        );
      } else if (!confirm(excuses[i])) {
        alert("WISE DECISION!");
        i = ++excuses.length;
      }
    }
  }
}

export default TitleScene;
