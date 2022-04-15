import Phaser from 'phaser';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/App';
import reportWebVitals from './reportWebVitals';

// import scenes
import PreloadScene from './phaser/preload-scene';
import playGame from './phaser/test-scene';
import playPlatformerGame from './phaser/basic-platform';
import playDinoGame from './phaser/dino-game';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false
    },
  },
  scene: [PreloadScene, playDinoGame]
};

const root = ReactDOM.createRoot(document.getElementById('root'));
const game = new Phaser.Game(config);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
