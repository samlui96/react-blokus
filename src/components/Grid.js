import React, { useState, useEffect } from "react";
import useStyles from "./Grid.styles";

const onCell = {
  on: true,
  lock: false,
  color: "#49505E",
};
const offCell = {
  on: false,
  lock: false,
  color: "#000000",
};

const initialCells = Array.from({ length: 400 }, () => offCell);

const Grid = () => {
  // const id = useSelector((state) => state.tile.id);
  // const group = useSelector((state) => state.tile.group);
  // const endNode = useSelector((state) => state.tile.endNode);
  const [cells, setCells] = useState(initialCells);
  const [target, setTarget] = useState(null);
  const [flag, setFlag] = useState(true);

  const classes = useStyles();

  useEffect(() => {
  }, [flag])

  const updateCell = (i, defaultState) => (e) => {
    e.preventDefault()
    setCells(
      cells.map((cell, cellIndex) => {
        if (cellIndex === i) {
          if (defaultState) return defaultState;
          else e.target.removeAttribute("onClick");
          return {
            on: true,
            lock: true,
            color: "#FF0000",
          };
        }
        return cell;
      })
    );
  };

  const updateTarget = (i) => (e) => {
    setCells(
      cells.map((cell, cellIndex) => {
        if (cellIndex === i && cell.lock === false) {
          return onCell;
        }
        return cell;
      })
    );
    setTarget(i)
  }

  const clearTarget = () => (e) => {
    setCells(oldCells => {
      let newCells = oldCells
      newCells[target] = newCells[target].lock ? newCells[target]: offCell
      return newCells
    })
    setFlag(!flag)
  }

  return (
    <div>
        <div className={classes.grid}>
          {cells.map((cell, i) => (
            <div
              key={i}
              style={{ background: cell.on ? cell.color : "#FFFFFF" }}
              className={classes.cell}
              onClick={updateCell(i)}
              onContextMenu={updateCell(i, offCell)}
              onDragEnter={updateTarget(i)}
              onDragLeave={clearTarget()}
            ></div>
          ))}
        </div>
    </div>
  );
};

export default Grid;
