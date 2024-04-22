import { useState } from "react";

function useTicTacToe(initialBoard: number[]) {
  const [board, setBoard] = useState(initialBoard);
  const [isCurrentX, setIsCurrentX] = useState(true);

  const WINNING_PATTERN: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const calculateWinner = (currentBoard: number[]) => {
    for (let i = 0; i < WINNING_PATTERN.length; i++) {
      const [a, b, c] = WINNING_PATTERN[i];
      if (
        currentBoard[a] !== -1 &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return isCurrentX ? "O is Winner" : "X is Winner";
      }
    }
    return "";
  };

  const handleClick = (index: number) => {
    const winner = calculateWinner(board);
    console.log(winner);
    if (winner || board[index] !== -1) return;

    const newBoard = [...board];
    newBoard[index] = isCurrentX ? 1 : 0;
    setBoard(() => newBoard);
    setIsCurrentX((prev) => !prev);
  };

  const getStatusMessage = () => {
    const winner = calculateWinner(board);
    if (winner) return winner;
    if (!board.includes(-1)) return "match drawn";
    if (isCurrentX) return "X player turn";
    if (!isCurrentX) return "O player turn";
  };

  const resetGame = () => {
    setBoard(() => initialBoard);
    setIsCurrentX(true);
  };

  return { board, handleClick, calculateWinner, getStatusMessage, resetGame };
}

export default useTicTacToe;
