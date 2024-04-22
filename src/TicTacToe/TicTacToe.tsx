import { CustomStyle } from "../types/CustomStyles";
import "./TicTacToe.css";
import useTicTacToe from "./useTicTacToe";
const BOARD_SIZE = 3;

const initialArray = (): number[] => Array(BOARD_SIZE * BOARD_SIZE).fill(-1);

const findLabel = (item: number) => {
  let result = "";
  switch (item) {
    case 0:
      result = "O";
      break;
    case 1:
      result = "X";
      break;
    default:
      result = "";
      break;
  }
  return result;
};

const TicTacToe = () => {
  const { board, handleClick, getStatusMessage, resetGame } = useTicTacToe(
    initialArray()
  );
  return (
    <div>
      <div className="header">
        <div>{getStatusMessage()}</div>
        <button role="button" onClick={() => resetGame()}>
          Reset
        </button>
      </div>
      <div
        className="board_container"
        style={{ "--rows": BOARD_SIZE, "--cols": BOARD_SIZE } as CustomStyle}
      >
        {board.map((item, index) => (
          <button
            key={index}
            className={`cell ${item === -1 ? "" : "selected"}`}
            onClick={() => handleClick(index)}
            disabled={item !== -1}
          >
            {findLabel(item)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TicTacToe;
