import { CSSProperties, MouseEventHandler, useCallback, useState } from "react";

import "./SelectionDiv.css";
const totalRow = 10;
const totalColumn = 10;

interface GridStyles extends CSSProperties {
  "--cols": number;
  "--rows": number;
}
const SelectionDiv = () => {
  const [selectedCells, setSelectedCells] = useState<Array<number>>([]);
  const [mouseDown, setMouseDown] = useState(false);

  const mouseDownHandler: MouseEventHandler<HTMLDivElement> = (e) => {
    const elementDataSet = (e.target as HTMLElement).dataset;
    // console.log(index, mouseDown);
    if (!mouseDown && "value" in elementDataSet) {
      const index = elementDataSet.value;
      if (index) {
        setMouseDown(true);
        setSelectedCells((prev) => {
          prev.push(+index);
          return prev;
        });
      }
    }
  };

  const mouseMoveHandler: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      const elementDataSet = (e.target as HTMLElement).dataset;
      if (mouseDown && "value" in elementDataSet) {
        const endBox = elementDataSet.value;
        if (endBox) {
          const startBox = selectedCells[0];
          // console.log(startBox);
          const startRow = Math.floor((startBox - 1) / totalColumn);
          const startCol = (startBox - 1) % totalColumn;
          const endRow = Math.floor((+endBox - 1) / totalColumn);
          const endCol = (+endBox - 1) % totalColumn;
          // console.log({startBox}, {startRow}, {startCol}, {endBox}, {endCol}, {endRow});
          const minRow = Math.min(endRow, startRow);
          const maxRow = Math.max(endRow, startRow);
          const minCol = Math.min(endCol, startCol);
          const maxCol = Math.max(endCol, startCol);
          // console.log({ minCol }, { minRow }, { maxRow }, { maxCol });
          const selected: number[] = [];
          for (let row = minRow; row <= maxRow; row++) {
            for (let col = minCol; col <= maxCol; col++) {
              selected.push(row * totalColumn + col + 1);
            }
          }
          setSelectedCells(() => selected);
        }
      }
    },
    [mouseDown, selectedCells]
  );

  const mouseUpHandler = () => {
    if (mouseDown) setMouseDown(false);
  };

  const resetHandler = () => {
    setMouseDown(false);
    setSelectedCells(() => []);
  };
  return (
    <>
      <div
        className="container"
        style={
          {
            "--rows": totalRow,
            "--cols": totalColumn,
          } as GridStyles
        }
        onMouseUp={() => mouseUpHandler()}
        onMouseDown={mouseDownHandler}
        onMouseMove={mouseMoveHandler}
      >
        {[...Array(totalRow * totalColumn).keys()].map((_, index) => (
          <div
            key={index}
            className={`${
              selectedCells.includes(index + 1) ? "cell selected" : "cell"
            }`}
            data-value={index + 1}
          >
            {index + 1}
          </div>
        ))}
      </div>
      <button onClick={resetHandler}>Reset</button>
    </>
  );
};

export default SelectionDiv;
