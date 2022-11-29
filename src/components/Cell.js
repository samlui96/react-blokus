import React, { useState, useEffect } from "react";
import useStyles from "./Cell.style";

const onCell = {
  on: true,
  lock: false,
  color: "#FFF000",
};
const offCell = {
  on: false,
  lock: false,
  color: "#000000",
};

const Cell = ({ pattern, tiles }) => {
  let cellArray = [];
  tiles.map((cell, cellI) => {
    cell.map((row, rowI) => {
      row.map((col, colI) => 
        cellArray.push(col === 1 ? onCell : offCell)
      )
    });
  })
  const [cells, setCells] = useState(cellArray);
  const classes = useStyles(pattern);

  useEffect(() => {});

  return (
    <div className={classes.cell}>
      {cellArray.map((cell, i) => (
        <div
          key={i}
          className={classes.inCell}
          style={{ 
            background: cell.on ? cell.color : "#FFFFFF", 
            outline: cell.on ? "1px solid black" : "", 
          }}
        ></div>
      ))}
      {/* {Object.entries(tiles).forEach((item) => {
                let tileItems = item[1]
                // console.log(tileItems)
                tileItems.map((row, rowI) => (
                    row.map((col, colI) => {
                        <div
                            key={rowI*4+(colI+1)}
                            className={classes.inCell}
                            style={{ background: col===1 ? "#FFF000" : "#FFFFFF" }}
                        >
                        </div>
                    })
                ))
                // <div
                //     key={item[0]}
                //     className={classes.inCell}
                //     >
                // </div>
            })} */}
    </div>
  );
};

// export default React.memo(Cell);
export default Cell;
