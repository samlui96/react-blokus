import React, { useState, useEffect } from "react";
import useStyles from "./Cell.style";

const offCell = {
  on: false,
  lock: false,
  color: "#000000",
};

const Cell = ({ tiles, color }) => {
  let cellArray = [];
  tiles.map((row, rowI) => {
    row.map((col, colI) => 
      cellArray.push(col === 1 ? {
        on: true,
        lock: false,
        color: color,
      } : offCell)
    )
  })
  // const [cells, setCells] = useState(cellArray);
  const classes = useStyles(tiles);

  // useEffect(() => {});

  return (
    <div className={classes.cell}>
      {cellArray.map((cell, i) => (
        <div
          key={i}
          className={classes.inCell}
          style={{ 
            background: cell.on ? cell.color : "#FFFFFF", 
          }}
        ></div>
      ))}
    </div>
  );
};

// export default React.memo(Cell);
export default Cell;
