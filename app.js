const player = (sign) => {
    this.sign = sign;
    const getsign = () => {
        return sign;
    }

    return {getsign};
}

const gameBoard = () => {
    const board = ["", "", "", "", "", "", "", "", ""];

    const setSign = (sign, position) => {
        if(position > board.length) return;
        board[position] = sign;
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