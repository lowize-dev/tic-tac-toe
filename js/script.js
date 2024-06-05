import Game from "./game.js";

let game = new Game(document.getElementById("container"));

// CLICKING THE CELLS - PLAYER MOVE
game.OnClicked = function(i) {
    game.ActivateMove(i);
    game.UpdateGame(game);

};

// RESTARTING THE GAME - NEW GAME
game.OnRestarted = function() {
    game = new Game(document.getElementById("container"));
    game.UpdateGame(game);
};

// INITIALIZATION OF THE GAME - TURN ON
game.UpdateGame(game);