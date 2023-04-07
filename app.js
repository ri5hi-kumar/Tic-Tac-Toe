const displayController = (currentBoard, game) => {
    const fieldElements = document.querySelectorAll(".field");
    const restart = document.getElementById("restart");

    fieldElements.forEach((element) => {
        element.addEventListener("click", (e) => {
            if(game.getGameState() || e.target.textContent !== "") return;
            game.playTurn(parseInt(e.target.dataset.index));
            updateBoard();
        })
    })

    restart.addEventListener("click", (e) => {
        game.resetgame();
        updateBoard();
    })

    const updateBoard = () => {
        for(let i = 0; i < fieldElements.length; i++){
            fieldElements[i].textContent = currentBoard.getSign(i);
        }
    }
}

const gameBoard = () => {
    const board = ["", "", "", "", "", "", "", "", ""];

    const setSign = (sign, position) => {
        if(position > board.length || board[position] !== "") return false;
        board[position] = sign;
        return true;
    } 

    const getSign = (position) => {
        if(position > board.length) return;
        return board[position];
    }

    const reset = () => {
        for(let i = 0; i < board.length; i++){
            board[i] = "";
        }
    }

    return {setSign, getSign, reset};
}


const gameController = (currentBoard) => {
    let isGameOver = false;
    let player = 'X';
    let turn = 1;

    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const checkWiningCodition = () => {
        for(let i = 0; i < winConditions.length; i++){
            const gameState = winConditions[i];
            let a = currentBoard.getSign(gameState[0]);
            let b = currentBoard.getSign(gameState[1]);
            let c = currentBoard.getSign(gameState[2]);

            if(a === player && (a === b && b === c)){
                isGameOver = true;
                console.log(`${player} won!`);
                break;
            }
        }
    }

    const changePlayer = () => {
        player = player === 'X' ? 'O' : 'X';
    }

    const getGameState = () => {
        return isGameOver;
    }

    const playTurn = (index) => {
        if(turn === 9) {
            console.log('DRAW');
            isGameOver = true;
            return;
        }
        if(!currentBoard.setSign(player, index)){
            return;
        }
        checkWiningCodition();
        changePlayer();
        turn++;
    }

    const resetgame = () => {
        isGameOver = false;
        turn = 1;
        currentBoard.reset();
    }

    return {playTurn, getGameState, resetgame};
}


// execution of the game starts here

const currentBoard = gameBoard();
const game = gameController(currentBoard);

const display = displayController(currentBoard, game);

// while(!game.getGameState()){
//     game.playTurn(index);
// }