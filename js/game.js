export default class Game {
    constructor(root) {
        
        this.root = root;
        this.turnValue = "X";

        // ARRAY WITH 9 VALUES - DEFAULT NULL
        this.gameBoard = new Array(9).fill(null);

        // FOR CLICKING THE CELLS
        this.root.querySelectorAll("#cell").forEach(cell => {
            cell.addEventListener("click", () => {
                if (this.OnClicked)
                    this.OnClicked(cell.dataset.index);                
            });
        });

        // FOR RESTARTING THE GAME
        this.root.querySelectorAll("#restart-btn").forEach(button => {
            button.addEventListener("click", () => {
                if (this.OnRestarted)
                    this.OnRestarted();

                this.root.querySelector("#modal").style.display = "none";
            })
        })
                
    }

    // INITIALIZING GAME
    UpdateGame(game) {        
        this.UpdateGameStatus(game);
        this.UpdateGameBoard(game);
    }

    // RESTATING THE GAME TO DEFAULT - REMOVE STYLING
    RestartState(statusRoot, modalStatus) {
        statusRoot.classList.remove("winner", "tie");
        modalStatus.classList.remove("winner", "tie");
    }

    // GAME IN PROGRESS CHECK NO WINNER - DEFAULT RUNNING
    GameInProgress() {
        return !this.FindWinningCombinations() && this.gameBoard.includes(null);
    }

    // INITIALIZING HTML ELEMENTS - FROM ROOT
    InitializingElements() {
        return {
            gameStatusText: this.root.querySelector("#game-status-text"),
            gameStatusRoot: this.root.querySelector("#game-status-container"),
            modalStatus: this.root.querySelector("#modal-status"),
            modal: this.root.querySelector("#modal"),
        }
    }

    // GAME STATUS INITIALIZATION AND LOGIC
    UpdateGameStatus(game) {

        const { gameStatusText, gameStatusRoot, modal, modalStatus } = this.InitializingElements();

        this.RestartState(gameStatusRoot, modalStatus);
        gameStatusText.textContent = `PLAYER ${game.turnValue} TURN`;
        
        if (game.FindWinningCombinations())
            this.HandleWinningCondition(game, modal, modalStatus, gameStatusText, gameStatusRoot);

        else if (!game.GameInProgress())
            this.HandleTieCondition(modal, modalStatus, gameStatusText, gameStatusRoot);
    }

    // UPDATING THE STYLING OF THE CELLS - IF WINNING
    UpdateGameBoard(game) {
        const winningCombinations = game.FindWinningCombinations();

        for (let i=0; i < game.gameBoard.length; i++) {
            const button = this.root.querySelector(`#cell[data-index="${i}"]`);

            button.classList.remove("winner");
            button.textContent = game.gameBoard[i];

            if (winningCombinations && winningCombinations.includes(i))
                button.classList.add("winner");
        }
    }

    // INITIALIZE STYLING - FOR WINNING
    HandleWinningCondition(game, modal, modalStatus, gameStatusText, gameStatusRoot) {

        const headerWinnerText = `${game.turnValue} IS THE WINNER!`;
        const modalWinnerText = `PLAYER ${game.turnValue} WINS!`;
        
        modalStatus.textContent = modalWinnerText;
        modalStatus.classList.add("winner");

        modal.style.display = "flex";

        gameStatusText.textContent = headerWinnerText;
        gameStatusRoot.classList.add("winner");
    }

    // INITIALIZE STYLING - FOR TIE
    HandleTieCondition(modal, modalStatus, gameStatusText, gameStatusRoot) {

        modalStatus.textContent = "IT IS A TIE";
        modalStatus.classList.add("tie");

        modal.style.display = "flex";

        gameStatusText.textContent = "IT IS A TIE";
        gameStatusRoot.classList.add("tie");
    }

    /*
        
        LOGIC OF THE GAME
    
        THIS IS WHERE THE CHECKING OF THE STATUS OF THE GAME IF WINING
        BY USING AN ALGORITHM BY CHECKING AN ARRAY THROUGH LOOPING

    */

    // TURNING MOVE - DEFAULT X
    ActivateTurn() {
        this.turnValue = this.turnValue === "X" ? "O" : "X";
    }


    // INTEGRATING TURN MOVE IN THE BOARD ARRAY
    ActivateMove(idx) {

        if (!this.GameInProgress()) return;
        if (this.gameBoard[idx]) return;

        this.gameBoard[idx] = this.turnValue;

        if(!this.FindWinningCombinations())
            this.ActivateTurn();
    }

    // GAME ALGORITHM FOR CHECKING WINNING
    FindWinningCombinations() {
        const combinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let combination of combinations) {
            let [x,y,z] = combination;

            if  ( this.gameBoard[x] && 
                ( this.gameBoard[x] === this.gameBoard[y] &&
                  this.gameBoard[x] ===  this.gameBoard[z] )
            ) return combination;
        }
        return null;
    }

}