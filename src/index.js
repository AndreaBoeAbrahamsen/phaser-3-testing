import 'phaser';

import SpacePhaser from './SpacePhaser/config';
import WrapAroundGame from './WrapAroundGame/config';
import SnowyMountain from './SnowyMountain/config';

var currentGame = WrapAroundGame.createGame();

document.getElementById("SpacePhaserButton").addEventListener("click", addGame.bind(null, SpacePhaser));
document.getElementById("WrapAroundButton").addEventListener("click", addGame.bind(null, WrapAroundGame));
document.getElementById("SnoweyButton").addEventListener("click", addGame.bind(null, SnowyMountain));

function addGame(game){
    removeGame();
    currentGame = game;
    currentGame.createGame();
}

function removeGame(){
    currentGame.destroyGame();
    var elements = document.getElementById(currentGame.game.config.parent);
    if(elements.childNodes.length > 0){
        elements.removeChild(elements.childNodes[0]);
    }
}






