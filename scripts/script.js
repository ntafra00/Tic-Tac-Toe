const fieldsOfPlayground = document.querySelectorAll(".field");
const restartButton = document.querySelector(".restart-btn");
const whosTurn = document.querySelector(".turn");
const winningScreen = document.querySelector(".winning-screen");
const winner = document.querySelector(".winner");

const fields = Array.from(fieldsOfPlayground);
const stateOfField = ['', '', '', '', '', '', '', '', ''];

const playerX = 'X';
const playerO = 'O';
let currentPlayer = playerO;
whosTurn.innerHTML = `${currentPlayer}'s turn`;

const makePlayground = () => {
    for (let i = 0; i < fields.length; i++) {
        let style = '';
        if (i < 3) {
            style += "border-bottom: 3px solid var(--black);";
        }
        if (i % 3 === 0) {
            style += "border-right: 3px solid var(--black);";
        }
        if (i % 3 === 2) {
            style += "border-left: 3px solid var(--black);";
        }
        if (i > 5) {
            style += "border-top: 3px solid var(--black);";
        }

        fields[i].style = style;
    }
}

const checkForWin = (currentPlayer) => {
    if (stateOfField[0] === currentPlayer) {
        if (stateOfField[1] === currentPlayer && stateOfField[2] === currentPlayer)
            return true;
        else if (stateOfField[3] === currentPlayer && stateOfField[6] === currentPlayer)
            return true;
        else if (stateOfField[4] === currentPlayer && stateOfField[8] === currentPlayer)
            return true;
    }

    if (stateOfField[8] === currentPlayer) {
        if (stateOfField[6] === currentPlayer && stateOfField[7] === currentPlayer)
            return true;
        else if (stateOfField[5] === currentPlayer && stateOfField[2] === currentPlayer)
            return true;
    }

    if (stateOfField[1] === currentPlayer) {
        if (stateOfField[4] === currentPlayer && stateOfField[7] === currentPlayer)
            return true;
    }

    if (stateOfField[3] == currentPlayer) {
        if (stateOfField[4] === currentPlayer && stateOfField[5] === currentPlayer)
            return true;
    }

    if (stateOfField[2] === currentPlayer)
        if (stateOfField[4] === currentPlayer && stateOfField[6] === currentPlayer)
            return true;
}

const startGame = () => {
    for (let i = 0; i < fields.length; i++) {
        fields[i].addEventListener('click', () => {
            if (stateOfField[i] === '' && currentPlayer == playerO) {
                fields[i].innerHTML = playerO;
                stateOfField[i] = playerO;
                console.log(stateOfField);
                if (!checkForWin(currentPlayer)) {
                    currentPlayer = playerX;
                    whosTurn.innerHTML = `${currentPlayer}'s turn`
                } else {
                    winningScreen.style = "visibility: visible";
                    winner.innerHTML = `Winner is player${currentPlayer}`;
                    return;
                }
            } else if (stateOfField[i] === '' && currentPlayer == playerX) {
                fields[i].innerHTML = playerX;
                stateOfField[i] = playerX;
                console.log(stateOfField)
                if (!checkForWin(currentPlayer)) {
                    currentPlayer = playerO;
                    whosTurn.innerHTML = `${currentPlayer}'s turn`
                } else {
                    winningScreen.style = "visibility: visible";
                    winner.innerHTML = `Winner is player${currentPlayer}`;
                    return;
                }
            }

            if (checkDraw()) {
                winningScreen.style = "visibility: visible";
                winner.innerHTML = 'It is a draw.'
            }
        })
    }
}

const checkDraw = () => {
    const draw = stateOfField.every(space => space !== '');
    return draw;
}

restartButton.addEventListener('click', () => {
    for (let i = 0; i < stateOfField.length; i++) {
        stateOfField[i] = '';
        fields[i].innerHTML = '';
    }
    winningScreen.style = "visibility:hidden"
    currentPlayer = playerO;
    whosTurn.innerHTML = `${currentPlayer}' turn`;
})

makePlayground();
startGame();
