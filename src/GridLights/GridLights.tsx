import { CSSProperties, MouseEventHandler, useMemo, useState } from "react";
import "./GridLights.css";
const data = [
  [1, 1, 1],
  [1, 0, 0],
  [1, 1, 1],
];

interface GridStyles extends CSSProperties {
  "--cols": number;
  "--rows": number;
}
const GridLights = () => {
  const [selected, setSelected] = useState<Array<number>>([]);
  const [isDeactivating, setIsDeactivating] = useState(false);

  const dataArray = useMemo(() => data.flat(), []);
  const dataLength = useMemo(
    () => dataArray.filter((item) => item === 1).length,
    [dataArray]
  );

  const deactivate = () => {
    setIsDeactivating(true);
    // console.log("here 444");
    const timer = setInterval(() => {
      // console.log("here 123");
      setSelected((prev) => {
        const newState = [...prev];
        newState.pop();
        if (newState.length === 0) {
          clearInterval(timer);
          setIsDeactivating(false);
        }
        return newState;
      });
    }, 1000);
  };

  const selectHandler: MouseEventHandler<HTMLDivElement> = (e) => {
    if (isDeactivating) return;
    const elementDataSet = (e.target as HTMLDivElement).dataset;

    if ("index" in elementDataSet) {
      const index = elementDataSet.index;
      if (index !== undefined) {
        const newState = [...selected, +index];
        setSelected(() => newState);
        if (dataLength === newState.length) {
          // setIsDeactivating(true);
          deactivate();
        }
      }
    }
  };

  // const resetHandler = () => {
  //   if (isDeactivating) {
  //     deactivate();
  //   }
  // };

  return (
    <>
      <div
        className="container"
        style={
          { "--cols": data[0].length, "--rows": data.length } as GridStyles
        }
        onClick={selectHandler}
      >
        {data.flat().map((item, index) => (
          <div
            key={index}
            className={`cell ${item ? "" : "hidden"} ${
              selected.includes(index) ? "selected" : ""
            }`}
            data-index={index}
          ></div>
        ))}
      </div>
      {/* <button onClick={resetHandler}>Reset</button> */}
    </>
  );
};

export default GridLights;
