import Phaser from 'phaser';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/App';
import reportWebVitals from './reportWebVitals';

// import scenes
import PreloadScene from './phaser/preload-scene';
import TitleScene from './phaser/title-scene';
import LeaderboardScene from './phaser/leaderboard-scene';
import playDinoGame from './phaser/dino-game';

// import API data
import setEnemyLevelSession from './api/tick-stream';

setEnemyLevelSession();

const config = {
    type: Phaser.AUTO,
    transparent: true,
    scale: {
        mode: Phaser.Scale.FIT,
        width: window.innerWidth,
        height: window.innerHeight,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false,
        },
    },
    scene: [PreloadScene, TitleScene, LeaderboardScene, playDinoGame],
};

const root = ReactDOM.createRoot(document.getElementById('root'));
// eslint-disable-next-line no-unused-vars
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
