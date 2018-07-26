import 'phaser';

import SpacePhaser from './SpacePhaser/config';
import WrapAroundGame from './WrapAroundGame/config';

var gameName = 'WrapAroundGame';

if(gameName == 'WrapAroundGame'){
    WrapAroundGame.createGame();
} else {
    SpacePhaser.createGame();
}

document.getElementById("WrapAroundButton").addEventListener("click", function(){
    removeGames();
    WrapAroundGame.createGame();
});

document.getElementById("SpacePhaserButton").addEventListener("click", function(){
    removeGames();
    SpacePhaser.createGame();
});

function removeGames(){
    if(SpacePhaser.game != null){
        SpacePhaser.destroyGame();
        var elements = document.getElementById("MyGameTests")
        if(elements.childNodes.length > 0){
            elements.removeChild(elements.childNodes[0]);
        }
    }
    if(WrapAroundGame.game != null){
        WrapAroundGame.destroyGame();
        var elements = document.getElementById("WrapAround")
        if(elements.childNodes.length > 0){
            elements.removeChild(elements.childNodes[0]);
        }
    }
}






